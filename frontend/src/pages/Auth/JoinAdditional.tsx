import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiClient } from '../../api/apiClient';
import { AuthUser } from '../../contexts/AuthContext';

const JoinAdditional: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { setUserAfterJoin } = useAuth();

    // OAuth 백엔드가 ?token=... 으로 리다이렉트한 경우와
    // URL 정리 후 location.state로 넘어온 경우 모두 처리
    // useRef: navigate replace 이후 리렌더가 발생해도 값이 유지됨
    const pendingTokenRef = useRef<string | null>(
        (location.state as { pendingToken?: string } | null)?.pendingToken
        ?? searchParams.get('token')
    );
    const pendingToken = pendingTokenRef.current;

    // mount 시 1회: URL에 노출된 토큰을 즉시 정리
    // replace: true → 브라우저 히스토리에서 ?token=... 제거
    useEffect(() => {
        if (searchParams.get('token')) {
            navigate('/join/additional', {
                replace: true,
                state: { pendingToken: pendingTokenRef.current },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [formData, setFormData] = useState({
        phone1: '',
        phone2: '',
        phone3: '',
        phone_code: '',
        belong: '',
        position: '',
        address: '',
        address_detail: '',
        mailing_agreed: false,
    });

    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        // pendingToken 없이 직접 접근 차단
        if (!pendingToken) {
            alert('잘못된 접근입니다.');
            navigate('/login');
        }
    }, [pendingToken, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePhoneSend = async () => {
        const phone = `${formData.phone1}-${formData.phone2}-${formData.phone3}`;
        if (!formData.phone1 || !formData.phone2 || !formData.phone3) {
            alert('전화번호를 모두 입력해주세요.');
            return;
        }
        try {
            // TODO: POST /api/auth/phone/send { phone }
            alert(`${phone} 으로 인증번호를 발송했습니다. (임시)`);
        } catch (error) {
            alert('인증번호 발송에 실패했습니다.');
        }
    };

    const handlePhoneVerify = async () => {
        if (!formData.phone_code) {
            alert('인증번호를 입력해주세요.');
            return;
        }
        try {
            // TODO: POST /api/auth/phone/verify { phone, code }
            setIsPhoneVerified(true);
            alert('전화번호 인증이 완료되었습니다. (임시)');
        } catch (error) {
            alert('인증번호가 올바르지 않습니다.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.phone1 || !formData.phone2 || !formData.phone3) {
            setErrorMsg('전화번호를 입력해주세요.');
            return;
        }
        if (!isPhoneVerified) {
            setErrorMsg('전화번호 인증을 완료해주세요.');
            return;
        }

        setIsLoading(true);
        setErrorMsg('');

        try {
            const phone = `${formData.phone1}-${formData.phone2}-${formData.phone3}`;

            // pendingToken을 함께 전송 → 백엔드가 Valkey에서 usersId 조회
            const data = await apiClient.post<{ accessToken: string; user: AuthUser }>(
                '/auth/complete-join',
                {
                    pendingToken,
                    phone,
                    belong: formData.belong || null,
                    position: formData.position || null,
                    address: formData.address || null,
                    address_detail: formData.address_detail || null,
                    mailing_agreed: formData.mailing_agreed,
                }
            );

            // 가입 완료 → 정식 JWT로 로그인 상태 전환
            setUserAfterJoin(data.accessToken, data.user);
            navigate('/', { replace: true });

        } catch (error) {
            setErrorMsg(error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.');
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
                            <span>추가 정보 입력</span>
                        </h5>
                        <p>서비스 이용을 위해 추가 정보를 입력해주세요.</p>
                    </div>

                    <div className="join_form">
                        <form onSubmit={handleSubmit}>
                            <table>
                                <colgroup>
                                    <col width="100%" />
                                </colgroup>
                                <tbody>
                                    {/* 전화번호 (필수) */}
                                    <tr><th scope="row">전화번호 <span className="required">*</span></th></tr>
                                    <tr>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <input type="tel" name="phone1" className="phone1" value={formData.phone1} onChange={handleChange} style={{ width: '28%' }} placeholder="010" disabled={isPhoneVerified} /> -
                                                <input type="tel" name="phone2" className="phone2" value={formData.phone2} onChange={handleChange} style={{ width: '28%' }} disabled={isPhoneVerified} /> -
                                                <input type="tel" name="phone3" className="phone3" value={formData.phone3} onChange={handleChange} style={{ width: '28%' }} disabled={isPhoneVerified} />
                                                <button type="button" className="confirm_btn" onClick={handlePhoneSend} disabled={isPhoneVerified}>
                                                    인증번호 발송
                                                </button>
                                            </div>
                                            <div className="auth_box" style={{ marginTop: '5px' }}>
                                                <input
                                                    type="text"
                                                    name="phone_code"
                                                    value={formData.phone_code}
                                                    onChange={handleChange}
                                                    placeholder="인증번호 입력"
                                                    disabled={isPhoneVerified}
                                                />
                                                <button type="button" className="confirm_btn2" onClick={handlePhoneVerify} disabled={isPhoneVerified}>
                                                    {isPhoneVerified ? '인증완료 ✓' : '인증확인'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* 소속 (선택) */}
                                    <tr><th scope="row">소속</th></tr>
                                    <tr>
                                        <td>
                                            <input type="text" name="belong" value={formData.belong} onChange={handleChange} placeholder="소속을 입력해주세요 (선택)" />
                                        </td>
                                    </tr>

                                    {/* 직위 (선택) */}
                                    <tr><th scope="row">직위</th></tr>
                                    <tr>
                                        <td>
                                            <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="직위를 입력해주세요 (선택)" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* 메일링 동의 */}
                            <div className="person_agreement">
                                <h3>마케팅 수신 동의 (선택)</h3>
                                <div>
                                    <input type="checkbox" name="mailing_agreed" id="mailing_agreed" checked={formData.mailing_agreed} onChange={handleChange} />
                                    <label htmlFor="mailing_agreed">이메일 마케팅 정보 수신에 동의합니다.</label>
                                </div>
                            </div>

                            {errorMsg && (
                                <div style={{ color: '#e53e3e', fontSize: '13px', margin: '8px 0' }}>
                                    {errorMsg}
                                </div>
                            )}

                            <div>
                                <button type="submit" className="submit_btn" disabled={isLoading} style={{ border: 'none', cursor: 'pointer' }}>
                                    {isLoading ? '처리중...' : '가입 완료'}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JoinAdditional;
