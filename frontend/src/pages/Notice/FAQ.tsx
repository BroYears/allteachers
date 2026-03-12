import React, { useState } from 'react';

import NoticeSubMenu from '../../components/NoticeSubMenu';

const FAQ: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'general' | 'qna'>('general');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchFilter, setSearchFilter] = useState('title');

    // Mock Data for General FAQ
    const mockGeneralFaqs = [
        { idx: 5, title: '[일반] 수강 기간 연장이 가능한가요?', hits: 89 },
        { idx: 4, title: '[일반] 환불 규정이 어떻게 되나요?', hits: 56 },
        { idx: 3, title: '[결제] 결제 영수증은 어디서 확인하나요?', hits: 142 },
        { idx: 2, title: '[기타] 교재 배송은 얼마나 걸리나요?', hits: 320 },
        { idx: 1, title: '[시스템] 동영상 재생이 끊깁니다.', hits: 210 },
    ];

    // Mock Data for Q&A (User Questions)
    const mockQna = [
        { idx: 10, title: '강의 자료는 어디서 다운받나요?', writer: '김*수', date: '2025-05-10', status: '답변 완료' },
        { idx: 9, title: '결제 오류가 발생했습니다.', writer: '이*진', date: '2025-05-09', status: '답변 대기중' },
        { idx: 8, title: '모바일에서도 수강 가능한가요?', writer: '박*훈', date: '2025-05-05', status: '답변 완료' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`검색 실행: [${searchFilter}] ${searchTerm}`);
    };

    return (
        <div className="contents notice question board">
            {/* Top Banner */}
            <div className="top_banner">
                <div className="dim"></div>
                <div className="top-title">
                    <h2 className="title">FAQ</h2>
                </div>
            </div>

            <NoticeSubMenu />

            {/* Page Content */}
            <div className="page_con">
                <h2 className="page_tit">
                    <span>FAQ</span>
                </h2>
                
                <div className="page_con_wrap">
                    
                    {/* FAQ Internal Tabs */}
                    <div style={{ display: 'flex', borderBottom: '2px solid #333', marginBottom: '30px' }}>
                        <button 
                            type="button"
                            onClick={() => setActiveTab('general')}
                            style={{ flex: 1, padding: '15px 0', fontSize: '16px', fontWeight: 'bold', backgroundColor: activeTab === 'general' ? '#333' : '#f8f8f8', color: activeTab === 'general' ? '#fff' : '#666', border: 'none', cursor: 'pointer' }}
                        >
                            기본 문의사항
                        </button>
                        <button 
                            type="button"
                            onClick={() => setActiveTab('qna')}
                            style={{ flex: 1, padding: '15px 0', fontSize: '16px', fontWeight: 'bold', backgroundColor: activeTab === 'qna' ? '#333' : '#f8f8f8', color: activeTab === 'qna' ? '#fff' : '#666', border: 'none', cursor: 'pointer' }}
                        >
                            Q&A (1:1 문의)
                        </button>
                    </div>

                    <table className="board_table notice_table">
                        <colgroup>
                            <col width="100" />
                            <col width="*" />
                            {activeTab === 'general' ? (
                                <col width="150" />
                            ) : (
                                <>
                                    <col width="120" />
                                    <col width="150" />
                                    <col width="150" />
                                </>
                            )}
                        </colgroup>
                        <thead>
                            <tr>
                                <th className="num">번호</th>
                                <th className="subject">제목</th>
                                {activeTab === 'general' ? (
                                    <th className="hits">조회수</th>
                                ) : (
                                    <>
                                        <th className="writer">작성자</th>
                                        <th className="regdate">날짜</th>
                                        <th className="status">상태</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {activeTab === 'general' ? (
                                mockGeneralFaqs.length === 0 ? (
                                    <tr><td colSpan={3} className="text-center">등록된 기본 문의사항이 없습니다.</td></tr>
                                ) : (
                                    mockGeneralFaqs.map((l) => (
                                        <tr key={l.idx}>
                                            <td>{l.idx}</td>
                                            <td style={{ textAlign: 'left', paddingLeft: '20px' }}><a href="#!">{l.title}</a></td>
                                            <td>{l.hits}</td>
                                        </tr>
                                    ))
                                )
                            ) : (
                                mockQna.length === 0 ? (
                                    <tr><td colSpan={5} className="text-center">등록된 Q&A가 없습니다.</td></tr>
                                ) : (
                                    mockQna.map((l) => (
                                        <tr key={l.idx}>
                                            <td>{l.idx}</td>
                                            <td style={{ textAlign: 'left', paddingLeft: '20px' }}><a href="#!">{l.title}</a></td>
                                            <td>{l.writer}</td>
                                            <td>{l.date}</td>
                                            <td style={{ color: l.status === '답변 완료' ? '#f39c12' : '#999', fontWeight: 'bold' }}>{l.status}</td>
                                        </tr>
                                    ))
                                )
                            )}
                        </tbody>
                    </table>
                    
                    {/* Pagination */}
                    <div className="pagination">
                        <button className="btn icon_btn active" type="button">1</button>
                    </div>
                    
                    {/* Search & Write Area */}
                    <div className="search_wrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                        <form onSubmit={handleSearch} style={{ display: 'flex' }}>
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
                        
                        {activeTab === 'qna' && (
                            <div className="write_btn_wrap" style={{ position: 'absolute', right: 0 }}>
                                <button className="btn write_btn" type="button" style={{ backgroundColor: '#f39c12', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>문의 작성</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
