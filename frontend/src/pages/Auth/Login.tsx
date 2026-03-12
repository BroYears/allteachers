import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [isKeepLogin, setIsKeepLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isLoading) return;
        
        if (!userId || !password) {
            alert('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        setIsLoading(true);

        try {
            // Temporary mock logic for demonstration since backend is not yet connected
            console.log('Login Attempt:', { userId, password, isKeepLogin });
            
            // Simulating API call
            setTimeout(() => {
                alert('임시 로그인 성공! 메인 페이지로 이동합니다.');
                navigate('/');
            }, 500);

            /* Real API Call Structure (To be implemented later)
            const formData = new FormData();
            formData.append('user_id', userId);
            formData.append('password', password);
            
            const response = await fetch('/api/login', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.status === 'OK') {
                navigate('/');
            } else {
                alert(data.msg);
            }
            */

        } catch (error) {
            console.error('Login error:', error);
            alert('로그인 처리 중 오류가 발생했습니다.');
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
                                        type="text" 
                                        name="user_id" 
                                        placeholder="아이디" 
                                        title="아이디"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
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
