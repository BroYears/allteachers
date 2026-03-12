import React from 'react';

import NoticeSubMenu from '../../components/NoticeSubMenu';

const Partnership: React.FC = () => {
    return (
        <div className="contents notice notice_page board">
            {/* Top Banner */}
            <div className="top_banner">
                <div className="dim"></div>
                <div className="top-title">
                    <h2 className="title">고객 • 제휴문의</h2>
                </div>
            </div>

            <NoticeSubMenu />

            {/* Page Content */}
            <div className="container">
                <div className="title-wrap" style={{ textAlign: 'center', margin: '50px 0 30px' }}>
                    <h2 className="title">
                        <img src="/img/common/edu-logo.png" alt="에듀컴퍼니 로고" style={{ maxWidth: '400px', width: '100%' }} />
                    </h2>
                </div>
                <div className="contact-list" style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ margin: '15px 0' }}>
                            <a href="tel:0221357870" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'linear-gradient(90deg, #f39c12 0%, #f1c40f 100%)', color: '#fff', padding: '15px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textDecoration: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                <i className="fa-solid fa-phone"></i>
                                대표전화 : 02-2135-7870
                            </a>
                        </li>
                        <li style={{ margin: '15px 0' }}>
                            <a href="mailto:justin@educompany.co.kr" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'linear-gradient(90deg, #f39c12 0%, #f1c40f 100%)', color: '#fff', padding: '15px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textDecoration: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                <i className="fa-solid fa-envelope"></i>
                                email : justin@educompany.co.kr
                            </a>
                        </li>
                        <li style={{ margin: '15px 0' }}>
                            <a href="https://pf.kakao.com/_오픈채팅링크" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'linear-gradient(90deg, #f39c12 0%, #f1c40f 100%)', color: '#fff', padding: '15px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textDecoration: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                <i className="fa-solid fa-comment"></i>
                                kakaotalk 오픈채팅 문의하기
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Partnership;
