import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        daum: any;
    }
}

const Join: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        email_code: '',
        password: '',
        password_confirm: '',
        nickname: '',
        phone1: '',
        phone2: '',
        phone3: '',
        address: '',
        address_detail: '',
        belong: '',
        position: '',
        mailing: '0',
        privacy: false,
        terms: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddressSearch = () => {
        if (!window.daum || !window.daum.Postcode) {
            alert('주소 검색 스크립트를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
            return;
        }

        new window.daum.Postcode({
            oncomplete: function (data: any) {
                const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
                setFormData(prev => ({
                    ...prev,
                    address: addr,
                    address_detail: ''
                }));
            }
        }).open();
    };

    // 비밀번호 정책: 8~16자리, 영문 대/소문자·숫자·특수문자 중 3가지 이상 조합
    const validatePassword = (pw: string): string => {
        if (pw.length < 8 || pw.length > 16) return '비밀번호는 8~16자리여야 합니다.';
        let score = 0;
        if (/[A-Z]/.test(pw)) score++;       // 영문 대문자
        if (/[a-z]/.test(pw)) score++;       // 영문 소문자
        if (/[0-9]/.test(pw)) score++;       // 숫자
        if (/[^A-Za-z0-9]/.test(pw)) score++; // 특수문자
        if (score < 3) return '영문 대/소문자, 숫자, 특수문자 중 3가지 이상을 조합해주세요.';
        return '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrorMsg('');
        setPasswordError('');

        if (!formData.email) { setErrorMsg('이메일을 입력해주세요.'); return; }
        if (!formData.password) { setErrorMsg('비밀번호를 입력해주세요.'); return; }

        const pwErr = validatePassword(formData.password);
        if (pwErr) { setPasswordError(pwErr); return; }

        if (formData.password !== formData.password_confirm) { setErrorMsg('비밀번호가 일치하지 않습니다.'); return; }
        if (!formData.nickname) { setErrorMsg('닉네임을 입력해주세요.'); return; }
        if (!formData.privacy) { setErrorMsg('개인정보처리방침에 동의해주세요.'); return; }
        if (!formData.terms) { setErrorMsg('이용약관에 동의해주세요.'); return; }

        setIsLoading(true);

        try {
            // TODO: 백엔드 연동 후 POST /api/auth/join 으로 대체
            console.log('Join Attempt:', formData);
            setTimeout(() => {
                alert('임시 회원가입 성공! 로그인 페이지로 이동합니다.');
                navigate('/login');
            }, 500);

        } catch (error) {
            console.error('Join error:', error);
            alert('회원가입 처리 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="contents join">
            <div className="page_con">
                <div className="page_con_wrap join_wrap">

                    <div className="join_title_wrap">
                        <h2>ALLTEACHERS</h2>
                        <h5>
                            <span>ALLTEACHERS</span>
                            <span>올티쳐스 회원가입</span>
                        </h5>
                        <p>아직 회원이 아니신가요? 회원가입을 해주세요.</p>
                    </div>

                    <div className="join_form">
                        <form onSubmit={handleSubmit} id="frm">
                            <table>
                                <colgroup>
                                    <col width="100%" />
                                </colgroup>
                                <tbody>
                                    {/* 이메일 — 로그인 아이디로 사용 */}
                                    <tr><th scope="row">이메일 (아이디)<span className="required">*</span></th></tr>
                                    <tr>
                                        <td>
                                            <div className="auth_box">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="이메일 주소를 입력해주세요"
                                                />
                                                <button type="button" className="confirm_btn" onClick={() => alert('이메일 인증 발송 (임시)')}>이메일인증</button>
                                            </div>
                                            <div className="auth_box" style={{ marginTop: '5px' }}>
                                                <input
                                                    type="text"
                                                    name="email_code"
                                                    value={formData.email_code}
                                                    onChange={handleChange}
                                                    placeholder="인증코드 입력"
                                                />
                                                <button type="button" className="confirm_btn2" onClick={() => alert('인증 확인 (임시)')}>인증확인</button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr><th scope="row">비밀번호 <span className="required">*</span></th></tr>
                                    <tr>
                                        <td>
                                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="8~16자리 영문 대소문자, 숫자, 특수문자 중 3가지 이상 조합" />
                                            {passwordError && (
                                                <p style={{ color: '#e03131', fontSize: '13px', marginTop: '4px' }}>{passwordError}</p>
                                            )}
                                        </td>
                                    </tr>
                                    <tr><th scope="row">비밀번호 확인 <span className="required">*</span></th></tr>
                                    <tr>
                                        <td>
                                            <input type="password" name="password_confirm" value={formData.password_confirm} onChange={handleChange} placeholder="위 비밀번호와 동일하게 입력" />
                                        </td>
                                    </tr>

                                    <tr><th scope="row">닉네임 <span className="required">*</span></th></tr>
                                    <tr>
                                        <td>
                                            <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="닉네임을 입력해주세요" />
                                        </td>
                                    </tr>

                                    <tr><th scope="row">전화번호</th></tr>
                                    <tr>
                                        <td>
                                            <input type="tel" name="phone1" className="phone1" value={formData.phone1} onChange={handleChange} style={{ width: '31%' }} /> -
                                            <input type="tel" name="phone2" className="phone2" value={formData.phone2} onChange={handleChange} style={{ width: '31%' }} /> -
                                            <input type="tel" name="phone3" className="phone3" value={formData.phone3} onChange={handleChange} style={{ width: '31%' }} />
                                        </td>
                                    </tr>

                                    <tr><th scope="row">주소</th></tr>
                                    <tr>
                                        <td>
                                            <input type="text" name="address" id="addr" value={formData.address} onClick={handleAddressSearch} readOnly placeholder="주소를 입력해주세요 (클릭하여 검색)" />
                                            <input type="text" name="address_detail" id="addr_dtl" style={{ marginTop: '5px' }} value={formData.address_detail} onChange={handleChange} placeholder="상세주소를 입력해주세요" />
                                        </td>
                                    </tr>

                                    <tr><th scope="row">소속</th></tr>
                                    <tr>
                                        <td>
                                            <input type="text" name="belong" value={formData.belong} onChange={handleChange} placeholder="소속을 입력해주세요" />
                                        </td>
                                    </tr>
                                    <tr><th scope="row">직위</th></tr>
                                    <tr>
                                        <td>
                                            <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="직위를 입력해주세요" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Agreements */}
                            <div className="person_agreement">
                                <h3>메일링 동의</h3>
                                <div>
                                    <input type="radio" name="mailing" id="mailingYes" value="1" checked={formData.mailing === '1'} onChange={handleChange} />
                                    <label htmlFor="mailingYes">예</label>
                                    <input type="radio" name="mailing" id="mailingNo" value="0" checked={formData.mailing === '0'} onChange={handleChange} />
                                    <label htmlFor="mailingNo">아니오</label>
                                </div>
                            </div>

                            <div className="bh_agreement row_group">
                                <div className="title_wrap clearfix">
                                    <div className="title">개인정보처리방침<span className="required">[필수]</span></div>
                                </div>
                                <div className="text" style={{ height: '100px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                                    (주)에듀컴퍼니는 고객님의 개인정보를 중요시하며, 정보통신망 이용촉진 및 정보보호에 관한 법률을 준수하고 있습니다... (생략)
                                </div>
                                <div className="confirm">
                                    <label htmlFor="accept_agreement_1">
                                        <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} id="accept_agreement_1" />
                                        위의 내용을 모두 읽었으며 동의합니다.
                                    </label>
                                </div>
                            </div>

                            <div className="bh_agreement row_group">
                                <div className="title_wrap clearfix">
                                    <div className="title">이용약관<span className="required">[필수]</span></div>
                                </div>
                                <div className="text" style={{ height: '100px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                                    제1조 (목적) 이 약관은 (주)에듀컴퍼니가 운영하는 온라인 웹 사이트에서 제공하는 인터넷 관련 서비스... (생략)
                                </div>
                                <div className="confirm">
                                    <label htmlFor="accept_agreement_2">
                                        <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} id="accept_agreement_2" />
                                        위의 내용을 모두 읽었으며 동의합니다.
                                    </label>
                                </div>
                            </div>

                            {errorMsg && (
                                <div style={{ color: '#e03131', fontSize: '13px', margin: '8px 0' }}>{errorMsg}</div>
                            )}

                            <div>
                                <button type="submit" className="submit_btn" disabled={isLoading} style={{ border: 'none', cursor: 'pointer' }}>
                                    {isLoading ? '처리중...' : '회원가입 완료'}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Join;
