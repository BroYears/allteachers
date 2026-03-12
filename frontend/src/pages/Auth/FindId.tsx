import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FindId: React.FC = () => {
    const [formData, setFormData] = useState({
        uname: '',
        email: '',
        email_code: ''
    });

    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [foundId, setFoundId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendMail = () => {
        if (!formData.email) return alert('이메일을 입력해주세요.');
        alert('인증 메일이 발송되었습니다. (임시)');
    };

    const handleCheckMailCode = () => {
        if (!formData.email_code) return alert('인증코드를 입력해주세요.');
        setIsEmailVerified(true);
        alert('인증이 완료되었습니다. (임시)');
    };

    const handleFindId = async () => {
        if (!formData.uname) return alert('이름을 입력해주세요.');
        if (!isEmailVerified) return alert('이메일 인증을 완료해주세요.');

        setIsLoading(true);

        try {
            // Mock API Call
            console.log('Find ID attempt:', formData);
            setTimeout(() => {
                setFoundId('user1234'); // Dummy successful response
            }, 500);

        } catch (error) {
            console.error('Find ID error:', error);
            alert('아이디 찾기 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="contents login">
            <div className="page_con">
                <div className="page_con_wrap login_wrap">
                    <div id="find_idpw">
                        <div className="container">
                            <div className="member_wrapper">
                                <h1>아이디 찾기</h1>

                                {!foundId ? (
                                    <div className="find_id">                                     
                                        <div className="form-group" style={{ marginBottom: '5px' }}>
                                            <label className="control-label">이름</label>
                                            <div className="wr_form_item">
                                                <input type="text" name="uname" value={formData.uname} onChange={handleChange} placeholder="이름을 입력하세요" />
                                            </div>
                                        </div>
                                        <div className="form-group" style={{ marginBottom: '5px' }}>
                                            <label className="control-label">이메일</label>
                                            <div className="wr_form_item">
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="이메일을 입력하세요" disabled={isEmailVerified} />
                                                
                                                {isEmailVerified ? (
                                                    <button type="button" className="confirm_btn2" style={{ width: '200px' }} disabled>인증완료</button>
                                                ) : (
                                                    <button type="button" className="confirm_btn" onClick={handleSendMail} style={{ width: '200px' }}>이메일인증</button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group" style={{ marginBottom: '30px' }}>
                                            <label className="control-label">인증코드</label>
                                            <div className="wr_form_item">
                                                <input type="text" name="email_code" value={formData.email_code} onChange={handleChange} placeholder="인증코드 입력" disabled={isEmailVerified} />
                                                <button type="button" className="confirm_btn2" onClick={handleCheckMailCode} style={{ width: '200px' }} disabled={isEmailVerified}>인증확인</button>
                                            </div>
                                        </div>
                                        
                                        <button type="button" id="find_btn" onClick={handleFindId} disabled={isLoading}>
                                            {isLoading ? '조회중...' : '아이디 찾기'}
                                        </button>
                                        
                                        <div className="login_extra">
                                            <ul>
                                                <li><Link to="/login">로그인 페이지로 이동</Link></li>
                                                <li><Link to="/find-pass">비밀번호 찾기</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="id_box" style={{ display: 'block' }}>
                                        <p>회원님의 아이디 입니다.</p>
                                        <h3 id="myId">{foundId}</h3>
                                        <div className="login_extra _2">
                                            <ul>
                                                <li><Link to="/login">로그인 페이지로 이동</Link></li>
                                                <li><Link to="/find-pass">비밀번호 찾기</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindId;
