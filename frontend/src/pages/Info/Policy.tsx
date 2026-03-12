import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Policy: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'terms' | 'policy'>('terms');
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tab = searchParams.get('tab');
        if (tab === 'terms' || tab === 'policy') {
            setActiveTab(tab);
        }
    }, [location.search]);

    return (
        <div className="contents policies">
            {/* Policy Tab Menu */}
            <div className="policy-tabs">
                <button 
                    type="button" 
                    className={`tab-item policy-tab ${activeTab === 'terms' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('terms')}
                >
                    회원 약관
                </button>
                <button 
                    type="button" 
                    className={`tab-item policy-tab ${activeTab === 'policy' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('policy')}
                >
                    개인정보처리방침
                </button>
            </div>

            {/* Terms Content */}
            {activeTab === 'terms' && (
                <section className="policy-content active">
                    <div className="title-wrap">
                        <h2 className="title">회원 약관</h2>
                    </div>
                    <div className="container">
                        <h3 className="policy-chapter">제1장 총칙</h3>
                        <div className="policy-group">
                            <h4 className="policy-subtitle">제 1 조(목적)</h4>
                            <p className="policy-text">본 약관은 주식회사 에듀컴퍼니(이하 ”회사”라 합니다)에서 제공하는 인터넷 관련 서비스(접속 가능한 유•무선 단말기의 종류와 관계없이 회사가
                                제공하는 이용 가능한 모든 서비스를 의미하며, 이하 “서비스”라 합니다)를 이용함에 있어 회사와 회원의 권리와 의무, 책임사항을 규정함을 그 목적으로 합니다.</p>
                        </div>
                        <div className="policy-group">
                            <h4 className="policy-subtitle">제 2 조 (정의)</h4>
                            <p className="policy-text spaced">본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
                            <ol className="policy-list">
                                <li>“사이트”란 회사가 재화 또는 서비스(이하 “상품 등”이라 합니다)를 회원에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 상품 등을 거래할 수 있도록 설정한 가상의
                                    영업장을 말하며 회사가 모바일 환경에서 서비스하는 모바일 웹과 앱을 포함합니다.</li>
                                <li>“회원”이라 함은 사이트에서 정한 소정의 절차를 거쳐 회원가입을 한 자로서, 약관에 따라 회사가 제공하는 서비스를 이용할 수 있는 자를 말합니다. “비회원”이라 함은 사이트
                                    회원가입을 하지 않은 자로서 “회원” 이외의 자를 의미하고, “비회원”은 사이트 또는 커뮤니티에 대해 회사가 이용 가능하도록 지정하여 제한된 서비스만 이용할 수 있습니다.</li>
                                <li>“아이디(ID)”라 함은 회원의 식별과 서비스의 이용을 위하여 회원이 설정하고 회사가 승인하여 등록된 전자우편주소 또는 소셜 서비스 연동을 통해 수집된 전자우편주소를 말합니다.</li>
                                <li>“메일 인증”이라 함은 회원이 서비스의 이용을 위하여 제출한 인증번호를 통해 이메일의 진위여부를 확인하는 것을 말합니다.</li>
                                <li>“비밀번호(Password)”라 함은 회원의 동일성 확인과 회원의 권익 및 비밀보호를 위하여 회원 스스로가 설정하여 사이트에 등록한 문자와 숫자의 조합을 말합니다.</li>
                                <li>위 항에서 정의되지 않은 약관 상의 용어의 의미는 일반적인 거래관행에 따릅니다.</li>
                            </ol>
                        </div>
                        <div className="policy-group">
                            <h4 className="policy-subtitle">제 3 조 (약관의 명시와 효력 및 개정)</h4>
                            <ol className="policy-list">
                                <li>회사는 본 약관의 내용과 상호, 영업소 소재지 주소, 전화번호, 대표자의 성명, 사업자등록번호, 통신판매업신고번호, 개인정보관리책임자 등을 회원이 쉽게 확인할 수 있도록
                                    사이트의 초기 화면에 게시합니다. 다만, 약관의 구체적 내용은 회원이 연결화면을 통하여 볼 수 있도록 합니다.</li>
                                <li>회사는 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
                                <li>회사가 약관을 개정할 경우에는 적용일자 및 개정 사유를 명시하여 현행 약관과 함께 그 적용일자 7일 이전부터 적용일자 전일까지 사이트의 초기 화면 등에 공지합니다.</li>
                                <li>제3항에 의해 변경된 약관은 법령에 특별한 규정이나 기타 부득이한 사유가 없는 한 그 적용일자 이전으로 소급하여 적용되지 않습니다.</li>
                                <li>회원은 변경된 약관에 동의하지 않을 권리가 있으며, 변경된 약관에 동의하지 않을 경우 언제든지 자유롭게 서비스 이용을 중단하고 탈퇴할 수 있습니다.</li>
                                <li>회사는 제공하는 서비스 내의 개별 서비스에 대한 별도의 약관 및 이용조건을 둘 수 있으며 개별 서비스에 대한 이용약관 등이 이 약관에 우선합니다.</li>
                            </ol>
                        </div>
                        <div className="policy-group">
                            <h4 className="policy-subtitle">제 4 조 (약관 외 준칙)</h4>
                            <p className="policy-text">이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 관계법령 및 상관례에 따릅니다.</p>
                        </div>
                        <div className="policy-group">
                            <h4 className="policy-subtitle">제 5 조 (이용계약의 성립)</h4>
                            <ol className="policy-list">
                                <li>이용계약은 회원이 회사가 정한 가입 양식에 따라 회사에서 제공한 필요사항을 기재하여야 합니다. 메일 인증과 회원정보를 기입하고 약관에 동의하여야 체결됩니다.</li>
                                <li>회사는 합리적인 판단에 의하여 승낙을 유보하거나 거절할 수 있습니다.</li>
                            </ol>
                        </div>
                        <div className="policy-group">
                            <h4 className="policy-subtitle">제 6 조 (회원의 의무)</h4>
                            <ol className="policy-list">
                                <li>회원은 관련 법령, 이 약관의 규정, 이용안내 등 회사가 통지하는 사항을 준수하여야 하며, 기타 회사 업무에 방해되는 행위를 하여서는 안됩니다.</li>
                            </ol>
                        </div>
                        {/* More terms sections can be added here if needed for completeness */}
                        
                        <div className="policy-end">
                            <h3 className="end-title">부칙</h3>
                            <p className="end-text">1. 이 약관은 2025년 05월 1일부터 시행합니다.</p>
                        </div>
                        <a href="/info/policy?tab=terms" className="old-policy-link" target="_blank" rel="noopener noreferrer">2025년 05월 1일 이용약관 보기</a>
                    </div>
                </section>
            )}

            {/* Privacy Policy Content */}
            {activeTab === 'policy' && (
                <section className="policy-content active">
                    <div className="title-wrap">
                        <h2 className="title">개인정보처리방침</h2>
                    </div>
                    <div className="container">
                        <div className="policy-group policy">
                            <p className="policy-text policy">
                                에듀컴퍼니(이하 “회사”)는 『개인정보 보호법』 및 관련 법령상의 개인정보 보호규정을 준수하며, 『개인정보 보호법』에 의거한 개인정보 처리방침을 정하여 이용자 권익보호에 최선을 다하고 있습니다.
                            </p>
                        </div>
                        <div className="policy-group">
                            <ul className="policy-index">
                                <li><a href="#purpose">1. 개인정보의 처리 목적</a></li>
                                <li><a href="#period">2. 개인정보의 처리 및 보유기간</a></li>
                                <li><a href="#items">3. 처리하는 개인정보의 항목</a></li>
                                <li><a href="#third-party">4. 개인정보의 제3자 제공</a></li>
                                <li><a href="#consignment">5. 개인정보처리의 위탁</a></li>
                                <li><a href="#destruction">6. 개인정보의 파기절차 및 방법</a></li>
                                <li><a href="#rights">7. 이용자와 법정대리인의 권리ㆍ의무 및 행사방법</a></li>
                                <li><a href="#security">8. 개인정보의 안전성 확보조치</a></li>
                                <li><a href="#auto-collection">9. 개인정보 자동 수집 장치의 설치ㆍ운영 및 거부에 관한 사항</a></li>
                                <li><a href="#behavior">10. 행태정보의 수집ㆍ이용 및 거부 등에 관한 사항</a></li>
                                <li><a href="#responsible">11. 개인정보 보호책임부서 및 개인정보 열람청구 접수ㆍ처리 부서</a></li>
                                <li><a href="#link-site">12. 링크 사이트</a></li>
                                <li><a href="#change">13. 개인정보 처리방침의 변경</a></li>
                            </ul>
                        </div>
                        
                        <div className="policy-group policy">
                            <h3 id="purpose" className="policy-subtitle">1. 개인정보의 처리 목적</h3>
                            <ul className="policy-list">
                                <li>
                                    <p className="policy-title"><span className="label">①</span> 회원 가입 및 관리</p>
                                </li>
                                <li>
                                    <p className="policy-title"><span className="label">②</span> 재화 또는 서비스 제공</p>
                                </li>
                                <li>
                                    <p className="policy-title"><span className="label">③</span> 서비스 개선 및 마케팅 활용</p>
                                </li>
                            </ul>
                        </div>

                        <div className="policy-group policy">
                            <h3 id="period" className="policy-subtitle">2. 개인정보의 처리 및 보유기간</h3>
                            <p className="policy-text">
                                회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다.
                            </p>
                        </div>
                        
                        {/* More privacy sections can be added here if needed for completeness */}
                        
                        <div className="policy-group policy">
                            <h3 id="change" className="policy-subtitle">13. 개인정보 처리방침의 변경</h3>
                            <ul className="policy-list">
                                <li>
                                    <p className="policy-text">
                                        <span className="label">①</span> 이 개인정보 처리방침은 2025. 05. 01부터 적용됩니다.
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <a href="/info/policy?tab=policy" className="old-policy-link" target="_blank" rel="noopener noreferrer">2025년 05월 1일 이용약관 보기</a>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Policy;
