import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const MyPage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="contents mypage">
            {/* Top Banner */}
            <div className="top_banner">
                <div className="dim"></div>
                <div className="top-title">
                    <h2 className="title">내정보</h2>
                </div>
            </div>

            {/* Content */}
            <div className="container">
                <div className="mypage-wrap">
                    <aside className="sidebar">
                        <div className="company-info">
                            <div className="info-wrap">
                                <div className="img-box"></div>
                                <h3 className="user">{user?.nickname}님 반갑습니다</h3>
                            </div>
                        </div>

                        <nav className="sidebar-menu">
                            <ul>
                                <li className="active"><Link to="/info/mypage">나의 수업 점검</Link></li>
                                <li><a href="#!" onClick={(e) => { e.preventDefault(); alert('준비중입니다.'); }}>회원정보 수정</a></li>
                                <li><a href="#!" onClick={(e) => { e.preventDefault(); handleLogout(); }}>로그아웃</a></li>
                            </ul>
                        </nav>
                    </aside>

                    <main className="content">
                        <h2>나의 수업 점검</h2>
                        <a href="#!" className="btn-primary" onClick={(e) => { e.preventDefault(); alert('수업 점검 페이지로 이동합니다. (임시)'); }}>바로가기</a>
                        <div className="attend-wrap">
                            <h3>출석부</h3>
                            <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px', marginTop: '10px' }}>
                                출석 관리 시스템이 연동될 예정입니다.
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
