import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Calculate if any menu item is hovered to toggle global active states
    const isHeaderActive = hoveredMenu !== null;

    return (
        <>
            {/* Header */}
            <header id="header" className={`container ${isHeaderActive ? 'active' : ''}`}>
                <div className="header_con_top">
                    <div className="header_con">
                        <h1 className="logo">
                            <Link to="/">
                                <img src="/img/common/logo.png" alt="올티쳐스 로고" />
                            </Link>
                        </h1>
                        <div className="all_menu_btn" id="all_menu" onClick={toggleMobileMenu}>
                            <a href="#!" onClick={(e) => e.preventDefault()}>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </a>
                        </div>
                        <div className="util">
                            <div className="login_btn"><Link to="/login">로그인</Link></div>
                            <div className="customer_btn"><Link to="/notice/partnership">고객문의</Link></div>
                            <div className="educompany_btn"><a href="http://www.educompany.co.kr/" target="_blank" rel="noreferrer">에듀컴퍼니</a></div>
                        </div>
                    </div>
                </div>
                
                {/* Desktop Navigation */}
                <div className={`header_con_bottom ${isHeaderActive ? 'active' : ''}`}>
                    <div className="header_con">
                        <div className="pc_gnb">
                            <div className="gnb-left">
                                <ul className="depth_1">
                                    {/* 기업교육 */}
                                    <li onMouseEnter={() => setHoveredMenu(0)} onMouseLeave={() => setHoveredMenu(null)}>
                                        <Link to="/education/course-list/language/english-conversation"><span>기업교육</span></Link>
                                        <div className={`depth_2_wrap ${hoveredMenu === 0 ? 'active' : ''}`}>
                                            <div className="depth_2_inner">
                                                <ul className="depth_2">
                                                    <li className="menu-category-title"><strong>언어교육</strong></li>
                                                    <li><Link to="/education/course-list/language/english-conversation"><span>영어회화</span></Link></li>
                                                    <li><Link to="/education/course-list/language/business-english"><span>비지니스 영어</span></Link></li>
                                                    <li><Link to="/education/course-list/language/english-certificate"><span>영어 자격증</span></Link></li>
                                                    <li><Link to="/education/course-list/language/chinese-conversation"><span>중국어회화</span></Link></li>
                                                    <li><Link to="/education/course-list/language/business-chinese"><span>비지니스 중국어</span></Link></li>
                                                    <li><Link to="/education/course-list/language/chinese-certificate"><span>중국어 자격증</span></Link></li>
                                                    <li><Link to="/education/course-list/language/japanese-conversation"><span>일본어회화</span></Link></li>
                                                    <li><Link to="/education/course-list/language/business-japanese"><span>비지니스 일본어</span></Link></li>
                                                    <li><Link to="/education/course-list/language/japanese-certificate"><span>일본어 자격증</span></Link></li>
                                                    <li><Link to="/education/course-list/language/second-language"><span>제2외국어</span></Link></li>
                                                </ul>
                                                <ul className="depth_2">
                                                    <li className="menu-category-title"><strong>직무교육</strong></li>
                                                    <li><Link to="/education/course-list/job/ai"><span>AI인공지능</span></Link></li>
                                                    <li><Link to="/education/course-list/job/programming"><span>프로그래밍</span></Link></li>
                                                    <li><Link to="/education/course-list/job/data-science"><span>데이터사이언스</span></Link></li>
                                                    <li><Link to="/education/course-list/job/leadership"><span>리더십/커뮤니케이션</span></Link></li>
                                                    <li><Link to="/education/course-list/job/sales-service"><span>영업/서비스</span></Link></li>
                                                    <li><Link to="/education/course-list/job/business-planning"><span>비지니스/기획</span></Link></li>
                                                    <li><Link to="/education/course-list/job/productivity"><span>업무 생산성</span></Link></li>
                                                    <li><Link to="/education/course-list/job/marketing"><span>마케팅</span></Link></li>
                                                    <li><Link to="/education/course-list/job/design"><span>디자인</span></Link></li>
                                                    <li><Link to="/education/course-list/job/media"><span>영상/미디어</span></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    
                                    {/* 대학/대학원교육 */}
                                    <li onMouseEnter={() => setHoveredMenu(1)} onMouseLeave={() => setHoveredMenu(null)}>
                                        <Link to="/education/course-list/job/career"><span>대학/대학원교육</span></Link>
                                        <div className={`depth_2_inner ${hoveredMenu === 1 ? 'active' : ''}`}>
                                            <ul className={`depth_2 ${hoveredMenu === 1 ? 'active' : ''}`}>
                                                <li><Link to="/education/course-list/job/career"><span>취업/창업</span></Link></li>
                                                <li><Link to="/education/course-list/job/path"><span>진로/적성</span></Link></li>
                                                <li><Link to="/education/course-list/subject/thesis-english"><span>논문/영어논문</span></Link></li>
                                                <li><Link to="/education/course-list/subject/major-deepening"><span>전공심화</span></Link></li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* 중등/고등교육 */}
                                    <li onMouseEnter={() => setHoveredMenu(2)} onMouseLeave={() => setHoveredMenu(null)}>
                                        <Link to="/education/course-list/job/path"><span>중등/고등교육</span></Link>
                                        <div className={`depth_2_inner ${hoveredMenu === 2 ? 'active' : ''}`}>
                                            <ul className={`depth_2 ${hoveredMenu === 2 ? 'active' : ''}`}>
                                                <li><Link to="/education/course-list/job/path"><span>진로/적성</span></Link></li>
                                                <li><Link to="/education/course-list/job/career"><span>취업/창업</span></Link></li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* 유아/초등교육 */}
                                    <li onMouseEnter={() => setHoveredMenu(3)} onMouseLeave={() => setHoveredMenu(null)}>
                                        <Link to="/education/course-list/subject/english-elementary"><span>유아/초등교육</span></Link>
                                        <div className={`depth_2_inner ${hoveredMenu === 3 ? 'active' : ''}`}>
                                            <ul className={`depth_2 ${hoveredMenu === 3 ? 'active' : ''}`}>
                                                <li><Link to="/education/course-list/subject/english-elementary"><span>영어</span></Link></li>
                                                <li><Link to="/education/course-list/subject/korean-elementary"><span>국어</span></Link></li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* 화상교육, 레벨테스트, 수업점검 */}
                                    <li onMouseEnter={() => setHoveredMenu(4)} onMouseLeave={() => setHoveredMenu(null)}>
                                        <Link to="/education/zoom-class-list"><span>화상교육(줌Live)</span></Link>
                                    </li>
                                    <li onMouseEnter={() => setHoveredMenu(5)} onMouseLeave={() => setHoveredMenu(null)}>
                                        <Link to="/education/level-test"><span>레벨테스트</span></Link>
                                    </li>
                                    <li onMouseEnter={() => setHoveredMenu(6)} onMouseLeave={() => setHoveredMenu(null)}>
                                        <Link to="/info/mypage"><span>수업점검</span></Link>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="gnb-right">
                                <ul className="depth_1">
                                    <li onMouseEnter={() => setHoveredMenu(7)} onMouseLeave={() => setHoveredMenu(null)}>
                                        <Link to="/education/education-guide"><span>교육안내</span></Link>
                                    </li>
                                    <li onMouseEnter={() => setHoveredMenu(8)} onMouseLeave={() => setHoveredMenu(null)}>
                                        <Link to="/info/employment-refund"><span>고용보험환급안내</span></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Nav Area */}
            {isMobileMenuOpen && (
                <>
                    <div className="nav_event_bg" style={{ display: 'block' }}></div>
                    <nav style={{ display: 'block', right: '0' }}>
                        <div className="nav_top">
                            <div className="util">
                                <div className="util-top">
                                    <div className="customer_con">
                                        <Link to="/notice/partnership">고객문의</Link>
                                        <i className="fa-solid fa-headset"></i>
                                    </div>
                                    <div className="close_con">
                                        <a href="#!" className="gnb_close_btn" onClick={toggleMobileMenu}>
                                            <span className="blind">전체 메뉴 닫기</span>
                                            <i className="fa-solid fa-x btn-close"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="util-bottom">
                                    <div className="login_btn"><Link to="/login">로그인</Link></div> 
                                    <div className="join_btn"><Link to="/join">회원가입</Link></div>   
                                </div>
                            </div>
                        </div>
                        <div className="nav_bottom">
                            <div className="nav-header">
                                <a href="http://www.educompany.co.kr/" target="_blank" rel="noreferrer">에듀컴퍼니 바로가기</a>
                                <i className="fa-solid fa-up-right-from-square"></i>
                            </div>
                        </div>
                    </nav>
                </>
            )}
        </>
    );
};

export default Header;
