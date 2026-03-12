// ─── 베이스 URL ───────────────────────────────────────────────────────────────
// 개발: VITE_API_URL 미설정 → '' → Vite proxy 사용 (/api/* → localhost:8080, CORS 우회)
// 프로덕션: VITE_API_URL=https://api.allteachers.co.kr → 직접 호출
const BASE_URL = import.meta.env.VITE_API_URL ?? '';

// ─── 모듈 레벨 상태 ───────────────────────────────────────────────────────────

// Access Token은 메모리에만 저장 (XSS로 localStorage 탈취 불가)
let _accessToken: string | null = null;

// 401 발생 시 호출할 로그아웃 콜백 (AuthContext가 등록)
let _logoutCallback: (() => void) | null = null;

// Refresh 중복 요청 방지 (여러 API가 동시에 401을 받아도 refresh는 1번만)
let _isRefreshing = false;
let _refreshQueue: Array<(token: string | null) => void> = [];

// ─── 외부 공개 함수 ───────────────────────────────────────────────────────────

export function setAccessToken(token: string | null): void {
    _accessToken = token;
}

export function registerLogoutCallback(fn: () => void): void {
    _logoutCallback = fn;
}

// ─── 세션 복원 (페이지 새로고침 시 AuthContext에서 호출) ───────────────────────
// HttpOnly 쿠키에 담긴 refreshToken을 백엔드로 전송해 새 accessToken을 받아옴.
// 일반 request()를 거치지 않아 401 인터셉터 루프 방지.

export interface AuthUser {
    usersId: number;
    email: string;
    nickname: string;
    role: 'USER' | 'ADMIN';
}

export async function tryRestoreSession(): Promise<{ accessToken: string; user: AuthUser } | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
            method: 'POST',
            credentials: 'include', // HttpOnly 쿠키 자동 전송
        });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

// ─── 내부: Access Token 갱신 ──────────────────────────────────────────────────
// 동시에 여러 요청이 401을 받으면 큐에 쌓아두고, 최초 1개만 실제 refresh 요청을 보냄.

async function refreshAccessToken(): Promise<string | null> {
    if (_isRefreshing) {
        return new Promise((resolve) => {
            _refreshQueue.push(resolve);
        });
    }

    _isRefreshing = true;

    try {
        const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!res.ok) throw new Error('refresh 실패');

        const { accessToken } = await res.json();
        setAccessToken(accessToken);
        _refreshQueue.forEach((resolve) => resolve(accessToken));
        return accessToken;
    } catch {
        setAccessToken(null);
        _refreshQueue.forEach((resolve) => resolve(null));
        _logoutCallback?.(); // AuthContext의 logout 호출 → React 상태 정리
        return null;
    } finally {
        _isRefreshing = false;
        _refreshQueue = [];
    }
}

// ─── 내부: 공통 요청 함수 ─────────────────────────────────────────────────────
// isRetry: 401 후 재시도 요청임을 표시 → 무한 루프 차단

async function request<T>(path: string, options: RequestInit = {}, isRetry = false): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(_accessToken ? { Authorization: `Bearer ${_accessToken}` } : {}),
    };

    if (options.headers) {
        Object.assign(headers, options.headers as Record<string, string>);
    }

    const res = await fetch(`${BASE_URL}/api${path}`, {
        ...options,
        headers,
        credentials: 'include', // 모든 요청에 쿠키 포함
    });

    // 401: Access Token 만료 → refresh 시도 후 원래 요청 재시도
    if (res.status === 401 && !isRetry) {
        const newToken = await refreshAccessToken();
        if (newToken) {
            return request<T>(path, options, true);
        }
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message ?? '서버 오류가 발생했습니다.');
    }

    // 204 No Content (DELETE 등)
    if (res.status === 204) return undefined as T;

    return res.json() as Promise<T>;
}

// ─── 외부 공개 API 클라이언트 ─────────────────────────────────────────────────

export const apiClient = {
    get:    <T>(path: string)                  => request<T>(path),
    post:   <T>(path: string, body: unknown)   => request<T>(path, { method: 'POST',   body: JSON.stringify(body) }),
    put:    <T>(path: string, body: unknown)   => request<T>(path, { method: 'PUT',    body: JSON.stringify(body) }),
    // DELETE는 거의 항상 204 No Content → T=void로 고정
    // request<void> 내부에서 undefined as void가 되어 타입 안전
    delete: (path: string)                     => request<void>(path, { method: 'DELETE' }),
};
