import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    apiClient,
    setAccessToken,
    registerLogoutCallback,
    tryRestoreSession,
    AuthUser,
} from '../api/apiClient';

// ─── 타입 정의 ────────────────────────────────────────────────────────────────

export type { AuthUser };

interface AuthContextType {
    user: AuthUser | null;
    isLoggedIn: boolean;
    isLoading: boolean; // 세션 복원 중 여부 (ProtectedRoute 깜빡임 방지)
    login: (email: string, password: string, keepLogin: boolean) => Promise<void>;
    logout: () => Promise<void>;
    // OAuth 2단계 가입 완료 후 정식 토큰으로 상태 전환
    setUserAfterJoin: (accessToken: string, user: AuthUser) => void;
}

// ─── Context 생성 ─────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true); // 복원 완료 전까지 true

    // 앱 초기화: HttpOnly 쿠키의 refreshToken으로 세션 복원 시도
    // localStorage/sessionStorage를 전혀 읽지 않음 → XSS 탈취 불가
    useEffect(() => {
        tryRestoreSession()
            .then((data) => {
                if (data) {
                    setAccessToken(data.accessToken);
                    setUser(data.user);
                }
            })
            .finally(() => setIsLoading(false));
    }, []);

    const logout = async () => {
        // 백엔드: DB의 refresh_token null 처리 + 쿠키 삭제 (Set-Cookie: Max-Age=0)
        await fetch(`${import.meta.env.VITE_API_URL ?? ''}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        }).catch(() => {
            // 네트워크 오류여도 클라이언트 상태는 반드시 정리
        });

        setAccessToken(null);
        setUser(null);
    };

    // apiClient의 401 인터셉터에서 refresh 실패 시 이 함수를 호출
    // → React 상태까지 깔끔하게 정리
    useEffect(() => {
        registerLogoutCallback(() => {
            setAccessToken(null);
            setUser(null);
        });
    }, []);

    const login = async (email: string, password: string, keepLogin: boolean) => {
        // keepLogin을 백엔드로 전달 → 백엔드에서 쿠키 Max-Age 결정
        //   keepLogin=true  → 영구 쿠키 (e.g., Max-Age=30d)
        //   keepLogin=false → 세션 쿠키 (브라우저 닫으면 만료)
        const data = await apiClient.post<{ accessToken: string; user: AuthUser }>(
            '/auth/login',
            { email, password, keepLogin }
        );

        // Access Token은 메모리에만 저장 (localStorage/sessionStorage 미사용)
        setAccessToken(data.accessToken);
        setUser(data.user);
    };

    // OAuth 2단계 가입 완료 시: pendingToken → 정식 JWT로 교체
    const setUserAfterJoin = (token: string, userData: AuthUser) => {
        setAccessToken(token);
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: user !== null, isLoading, login, logout, setUserAfterJoin }}>
            {children}
        </AuthContext.Provider>
    );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.');
    return ctx;
};
