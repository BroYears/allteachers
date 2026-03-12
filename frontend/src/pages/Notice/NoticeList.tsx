import React, { useState } from 'react';
import NoticeSubMenu from '../../components/NoticeSubMenu';
import NoticeListItem from '../../components/NoticeListItem';

const NoticeList: React.FC = () => {
    // Mock Data for Notice List
    const mockNotices = [
        { idx: 15, title: '[안내] 2025년도 상반기 교육 과정 안내', writer: '관리자', date: '2025-05-10', hits: 142 },
        { idx: 14, title: '시스템 정기 점검 안내 (5/15)', writer: '관리자', date: '2025-05-08', hits: 89 },
        { idx: 13, title: '올티쳐스 신규 회원 가입 이벤트 당첨자 발표', writer: '운영팀', date: '2025-05-01', hits: 320 },
        { idx: 12, title: '개인정보 처리방침 개정 안내', writer: '관리자', date: '2025-04-25', hits: 56 },
        { idx: 11, title: '중국어 회화 신규 강사진 영입 안내', writer: '교육팀', date: '2025-04-10', hits: 210 },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [searchFilter, setSearchFilter] = useState('title');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`검색 실행: [${searchFilter}] ${searchTerm}`);
    };

    return (
        <div className="contents notice notice_page board">
            {/* Top Banner */}
            <div className="top_banner">
                <div className="dim"></div>
                <div className="top-title">
                    <h2 className="title">공지사항</h2>
                </div>
            </div>

            <NoticeSubMenu />

            {/* Page Content */}
            <div className="page_con">
                <h2 className="page_tit">
                    <span>공지사항</span>
                </h2>
                <div className="page_con_wrap">
                    <table className="board_table notice_table">
                        <colgroup>
                            <col width="100" />
                            <col width="*" />
                            <col width="150" />
                            <col width="150" />
                            <col width="100" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th className="num">번호</th>
                                <th className="subject">제목</th>
                                <th className="writer">작성자</th>
                                <th className="regdate">날짜</th>
                                <th className="hits">조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockNotices.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center">등록된 게시물이 없습니다.</td>
                                </tr>
                            ) : (
                                mockNotices.map((notice) => (
                                    <NoticeListItem 
                                        key={notice.idx}
                                        idx={notice.idx}
                                        title={notice.title}
                                        writer={notice.writer}
                                        date={notice.date}
                                        hits={notice.hits}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination (Mock Structure) */}
                    <div className="pagination">
                        <button className="btn icon_btn active" type="button">1</button>
                        <button className="btn icon_btn" type="button">2</button>
                        <button className="btn icon_btn" type="button">3</button>
                    </div>

                    {/* Search Area */}
                    <div className="search_wrap">
                        <form onSubmit={handleSearch}>
                            <div className="select_wrap" style={{ width: '120px' }}>
                                <select 
                                    name="filter" 
                                    value={searchFilter} 
                                    onChange={(e) => setSearchFilter(e.target.value)}
                                >
                                    <option value="title">제목</option>
                                    <option value="content">내용</option>
                                </select>
                            </div>
                            <input 
                                type="text" 
                                name="term" 
                                className="search_box" 
                                placeholder="검색어를 입력하세요"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn search_btn icon_btn" type="submit">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeList;
