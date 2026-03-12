import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FindPass: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        uname: '',
        email: '',
        email_code: '',
        uid: ''
    });

    const [passData, setPassData] = useState({
        upw: '',
        upw2: ''
    });

    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isPassResetMode, setIsPassResetMode] = useState(false);
    const [userKey, setUserKey] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPassData(prev => ({ ...prev, [name]: value }));
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

    const handleFindPass = async () => {
        if (!formData.uname) return alert('이름을 입력해주세요.');
        if (!isEmailVerified) return alert('이메일 인증을 완료해주세요.');
        if (!formData.uid) return alert('아이디를 입력해주세요.');

        setIsLoading(true);

        try {
            // Mock API Call to verify user and get auth key
            console.log('Find Pass attempt:', formData);
            setTimeout(() => {
                setUserKey('dummy_user_key_123');
                setIsPassResetMode(true);
            }, 500);

        } catch (error) {
            console.error('Find Pass error:', error);
            alert('비밀번호 찾기 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePass = async () => {
        if (!passData.upw) return alert('새 비밀번호를 입력해주세요.');
        if (passData.upw !== passData.upw2) return alert('비밀번호가 일치하지 않습니다.');

        setIsLoading(true);

        try {
            // Mock API Call to change password
            console.log('Change Pass attempt:', { userKey, passData });
            setTimeout(() => {
                alert('비밀번호 변경이 성공적으로 완료되었습니다.');
                navigate('/login');
            }, 500);

        } catch (error) {
            console.error('Change Pass error:', error);
            alert('비밀번호 변경 중 오류가 발생했습니다.');
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
                                <h1>비밀번호 찾기</h1>

                                {!isPassResetMode ? (
                                    <div className="find_pass">                                     
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
                                        <div className="form-group" style={{ marginBottom: '5px' }}>
                                            <label className="control-label">인증코드</label>
                                            <div className="wr_form_item">
                                                <input type="text" name="email_code" value={formData.email_code} onChange={handleChange} placeholder="인증코드 입력" disabled={isEmailVerified} />
                                                <button type="button" className="confirm_btn2" onClick={handleCheckMailCode} style={{ width: '200px' }} disabled={isEmailVerified}>인증확인</button>
                                            </div>
                                        </div>
                                        <div className="form-group" style={{ marginBottom: '30px' }}>
                                            <label className="control-label">아이디</label>
                                            <div className="wr_form_item">
                                                <input type="text" name="uid" value={formData.uid} onChange={handleChange} placeholder="아이디를 입력하세요" />
                                            </div>
                                        </div>
                                        
                                        <button type="button" id="find_btn" onClick={handleFindPass} disabled={isLoading}>
                                            {isLoading ? '조회중...' : '비밀번호 찾기'}
                                        </button>
                                        
                                        <div className="login_extra">
                                            <ul>
                                                <li><Link to="/login">로그인 페이지로 이동</Link></li>
                                                <li><Link to="/find-id">아이디 찾기</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="pass_box" style={{ display: 'block' }}>                                     
                                        {/* userKey would be sent in the hidden input conceptually, but React state manages it here */}
                                        <div className="form-group" style={{ marginBottom: '5px' }}>
                                            <label className="control-label">새 비밀번호</label>
                                            <div className="wr_form_item">
                                                <input type="password" name="upw" value={passData.upw} onChange={handlePassChange} placeholder="새 비밀번호를 입력하세요" />
                                            </div>
                                        </div>
                                        <div className="form-group" style={{ marginBottom: '20px' }}>
                                            <label className="control-label">새 비밀번호 확인</label>
                                            <div className="wr_form_item">
                                                <input type="password" name="upw2" value={passData.upw2} onChange={handlePassChange} placeholder="새 비밀번호를 한번 더 입력하세요" />
                                            </div>
                                        </div>
                                        <button type="button" id="change_btn" onClick={handleChangePass} disabled={isLoading}>
                                            {isLoading ? '변경중...' : '비밀번호 변경'}
                                        </button>
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

export default FindPass;
