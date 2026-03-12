import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isKeepLogin, setIsKeepLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // ProtectedRoute에서 넘어온 경우 원래 가려던 페이지로 복귀
    const from = (location.state as { from?: Location })?.from?.pathname ?? '/';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;

        if (!email || !password) {
            setErrorMsg('이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setErrorMsg('');

        try {
            await login(email, password, isKeepLogin);
            navigate(from, { replace: true });
        } catch (error) {
            setErrorMsg(error instanceof Error ? error.message : '로그인 처리 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="contents login">
            <div className="page_con">
                <div className="page_con_wrap login_wrap">
                    <div className="login_box">

                        <div className="left_box bg1">
                            <div>
                                <h2>ALLTEACHERS</h2>
                                <p>올티쳐스에 <br />오신것을 환영합니다.</p>
                                <Link className="join_btn" to="/join">회원가입</Link>
                            </div>
                            <div className="bg-triangle"></div>
                        </div>

                        <div className="right_box">
                            <div className="box_title">로그인</div>
                            <form onSubmit={handleLogin} id="frm">
                                <div className="input_id">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="이메일"
                                        title="이메일"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="input_password">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="비밀번호"
                                        title="비밀번호"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                {errorMsg && (
                                    <div className="error_msg" style={{ color: '#e53e3e', fontSize: '13px', margin: '4px 0 8px' }}>
                                        {errorMsg}
                                    </div>
                                )}

                                <div className="bottom_zone">
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="keep_login"
                                            checked={isKeepLogin}
                                            onChange={(e) => setIsKeepLogin(e.target.checked)}
                                        />
                                        <label htmlFor="keep_login">로그인 유지</label>
                                    </div>
                                    <div>
                                        <Link to="/find-id">ID/PW 찾기<i className="fa-solid fa-chevron-right"></i></Link>
                                    </div>
                                </div>
                                <div className="login_btn">
                                    <button
                                        type="submit"
                                        id="btn_login"
                                        className="submit_btn"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? '처리중...' : '로그인'}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
