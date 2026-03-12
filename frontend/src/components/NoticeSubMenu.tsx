import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NoticeSubMenu: React.FC = () => {
    const location = useLocation();
    
    // Style active/inactive tabs based on the current URL
    const getTabStyle = (path: string) => {
        const isActive = location.pathname.includes(path) || (path === '/notice/partnership' && location.pathname === '/partnership');
        
        if (isActive) {
            return { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 25px', backgroundColor: '#f39c12', color: '#fff', borderRadius: '30px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: 'none', height: 'auto', width: 'auto' };
        } else {
            return { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 25px', backgroundColor: '#fff', color: '#666', borderRadius: '30px', fontWeight: '500', fontSize: '15px', textDecoration: 'none', border: '1px solid #ddd', height: 'auto', width: 'auto' };
        }
    };

    return (
        <div className="sub_menu" style={{ background: 'transparent', border: 'none', paddingTop: '30px', paddingBottom: '10px' }}>
            <div className="sub_menu_con" style={{ justifyContent: 'center' }}>
                {/* PC Sub Menu */}
                <div className="pc_snb" style={{ width: 'auto' }}>
                    <ul style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: 0, padding: 0 }}>
                        <li>
                            <Link to="/notice/partnership" style={getTabStyle('/notice/partnership')}>
                                <span>고객 • 제휴문의</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/notice/faq" style={getTabStyle('/notice/faq')}>
                                <span>FAQ</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/notice/list" style={getTabStyle('/notice/list')}>
                                <span>공지사항</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NoticeSubMenu;
