import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * 인증이 필요한 라우트를 감싸는 가드 컴포넌트.
 * 미인증 상태면 /login 으로 redirect하되, 현재 경로를 state.from 에 담아
 * 로그인 성공 후 원래 페이지로 돌아올 수 있게 한다.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isLoggedIn, isLoading } = useAuth();
    const location = useLocation();

    // 세션 복원 중(POST /auth/refresh 응답 대기)에는 판단 보류
    // → 깜빡임(flash) 없이 인증 상태가 확정된 후 리다이렉트 결정
    if (isLoading) return null;

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
