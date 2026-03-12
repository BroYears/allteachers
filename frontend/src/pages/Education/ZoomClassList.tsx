import React from 'react';

const ZoomClassList: React.FC = () => {
    // Mock Data for Zoom classes
    const mockZoomClasses = [
        { id: 1, date: '2025-01-20', time: '10:00 ~ 12:00(2시간)', company: 'oo컴퍼니', instructor: '홍길동', subject: '입문영어회화' },
        { id: 2, date: '2025-01-20', time: '13:00 ~ 14:00(1시간)', company: 'oo전자', instructor: '김철수', subject: '고급 일본어회화' },
        { id: 3, date: '2025-01-20', time: '18:00 ~ 19:00(1시간)', company: 'oo대학교', instructor: '김영희', subject: '초급중국어회화' },
    ];

    const handleEnterClass = (e: React.MouseEvent) => {
        e.preventDefault();
        alert('줌 회의실로 연결됩니다. (임시)');
    };

    return (
        <div className="contents education zoom">
            {/* Top Banner */}
            <div className="top_banner"></div>
            <div className="course-title">
                <div className="container">
                    <h3 className="page_tit">
                        <span>줌 Zoom</span>
                    </h3>
                </div>
            </div>

            <div className="detail_con">
                <div className="container">
                    <div className="content">
                        <div className="title-wrap">
                            <h3 className="title">실시간 <strong>Zoom</strong>수업 리스트</h3>
                        </div>
                        <div className="zoom-class-list">
                            <table className="class-table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>수업일자</th>
                                        <th>시간</th>
                                        <th>고객사명</th>
                                        <th>강사명</th>
                                        <th>과목</th>
                                        <th>수업입장하기</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockZoomClasses.map((cl, idx) => (
                                        <tr key={cl.id}>
                                            <td data-label="NO">{idx + 1}</td>
                                            <td data-label="수업일자">{cl.date}</td>
                                            <td data-label="시간">{cl.time}</td>
                                            <td data-label="고객사명">{cl.company}</td>
                                            <td data-label="강사명">{cl.instructor}</td>
                                            <td data-label="과목">{cl.subject}</td>
                                            <td>
                                                <a href="#!" className="btn-enter-class" onClick={handleEnterClass}>입장하기</a>
                                            </td>
                                        </tr>
                                    ))}
                                    {mockZoomClasses.length === 0 && (
                                        <tr>
                                            <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>예정된 수업이 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZoomClassList;
