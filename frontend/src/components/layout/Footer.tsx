import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer id="footer">
            <div className="contact-info">
                <p className="title">교육문의</p>
                <p className="phone">02-2135-7870</p>
                <p className="desc">평일 09:00 ~ 18:00 (토/일/공휴일 휴무)</p>
            </div>
            <div className="footer_con container">
                <div className="foot_con">
                    <div className="util_wrap">
                        <div className="logo_con">올티쳐스</div>
                        <ul className="util">
                            <li><Link to="/company">회사소개</Link></li>
                            <li><Link to="/partnership">제휴문의</Link></li>
                            <li><Link to="/info/policy?tab=policy">개인정보 처리방침</Link></li>
                            <li><Link to="/info/policy?tab=terms">약관</Link></li>
                        </ul>
                        <address>
                            <div className="address">
                                <p>서울시 서초구 서초대로50길 62-9 한림빌딩 3층 | 사업자 등록번호 : 513-87-03047</p>
                                <p>대표명 : 윤주훈 | 대표 전화 : 02-2135-7870</p>
                            </div>
                            <div className="copy">Copyright © (주)에듀컴퍼니 All rights reserved.</div>
                        </address>
                    </div>
                    <div className="family_site" id="partner_site" style={{ padding: 0 }}>
                        <a href="http://www.educompany.co.kr/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', border: 'none', padding: 0, backgroundColor: 'transparent' }}>
                            <img src="/img/common/logo-footer.png" style={{ width: '200px', display: 'block' }} alt="에듀컴퍼니 로고" />
                        </a>
                    </div>
                </div>
            </div>
            
            {/* Fixed Top Button */}
            <div className="top_btn">
                <a className="btn_top" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <span className="blind">TOP으로 이동</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
