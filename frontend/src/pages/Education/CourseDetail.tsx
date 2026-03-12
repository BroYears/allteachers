import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<'info' | 'view'>('info');

    // Mock Detail Data
    const courseDetail = {
        name: '회사에서 자주쓰는 기본영어1',
        instructor: '홍길동',
        category: '비지니스회화',
        lectureCount: '20강',
        difficulty: '중급회화',
        book: '자체교재',
        thumbnail: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
        bookImg: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
        features: [
            '스피킹 중점 대상자를 위한 강의로 문법 설명보다는 실제 표현들 위주로 학습하는 강의',
            '원어민의 연음을 듣고, 학습하고, 따라하는 강의',
            '듣고 따라하면서 자연스럽게 주제에 대한 표현들을 익힐 수 있는 강의'
        ],
        targets: [
            '문법, 단어는 충분한데 말하기에 자신 없는 학습자',
            '청취 실력과 스피킹 실력을 동시에 향상시키고 싶은 학습자',
            '일상 회화도 비즈니스 상황에 따른 회화도 모두 학습하고 싶은 학습자'
        ],
        instructorBio: [
            '한국 외국어 대학교 졸업',
            '뉴욕 시립 Hunter College ILEI 수료'
        ],
        playlist: [
            { num: 1, title: 'The Weather', time: '11:50' },
            { num: 2, title: 'Eating Out', time: '10:22' },
            { num: 3, title: 'Ordering Food over the Phone', time: '11:50' },
            { num: 4, title: 'Direction', time: '10:22' },
            { num: 5, title: 'Hospitals', time: '11:50' },
            { num: 6, title: 'Public Transportations', time: '10:22' },
        ]
    };

    return (
        <div className="contents education detail">
            {/* Top Banner */}
            <div className="top_banner"></div>
            
            <div className="course-title">
                <div className="container">
                    <h3 className="page_tit">
                        <span>영어 &gt; {courseDetail.category} - {courseDetail.difficulty} (강의 ID: {id})</span>
                    </h3>
                </div>
            </div>

            <div className="detail_con">
                <div className="container">
                    {/* Lecture Info Top Section */}
                    <div className="lecture-info">
                        <div className="lecture-thumbnail">
                            <img src={courseDetail.thumbnail} alt="강의썸네일" />
                        </div>
                        <div className="lecture-meta">
                            <table>
                                <thead className="lecture-name">
                                    <tr>
                                        <th colSpan={4}>{courseDetail.name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>강사</th>
                                        <td>{courseDetail.instructor}</td>
                                        <th>구분</th>
                                        <td>{courseDetail.category}</td>
                                    </tr>
                                    <tr>
                                        <th>강의수</th>
                                        <td>{courseDetail.lectureCount}</td>
                                        <th>난이도</th>
                                        <td>{courseDetail.difficulty}</td>
                                    </tr>
                                    <tr>
                                        <th>교재</th>
                                        <td colSpan={3}>{courseDetail.book}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="lecture-book">
                            <a href="#!" className="btn-download" onClick={(e) => { e.preventDefault(); alert('교재 다운로드 시뮬레이션'); }}>
                                <div className="image-box">
                                    <img src={courseDetail.bookImg} alt="교재 이미지" />
                                </div>
                                <p>교재 다운로드</p>
                            </a>
                        </div>
                    </div>

                    {/* Lecture Tab Menu */}
                    <div className="lecture-tab">
                        <button 
                            type="button" 
                            className={`tab-item lecture-tab-btn ${activeTab === 'info' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('info')}
                        >
                            강의소개
                        </button>
                        <button 
                            type="button" 
                            className={`tab-item lecture-tab-btn ${activeTab === 'view' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('view')}
                        >
                            강의보기
                        </button>
                    </div>

                    {/* Tab Contents */}
                    <div className="tab-contents-wrap">
                        {/* Info Tab Content */}
                        {activeTab === 'info' && (
                            <div className="lecture-tab-content active">
                                <div className="introdution">
                                    <h4 className="lecture-title">강의특징</h4>
                                    <ul className="lecture-desc">
                                        {courseDetail.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="introdution">
                                    <h4 className="lecture-title">학습대상</h4>
                                    <ul className="lecture-desc">
                                        {courseDetail.targets.map((target, idx) => (
                                            <li key={idx}>{target}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="introdution">
                                    <h4 className="lecture-title">강사소개</h4>
                                    <div className="instructor-box">
                                        <div className="instructor-info">
                                            <div className="instructor-img">
                                                <img src={courseDetail.thumbnail} alt={`${courseDetail.instructor} 강사님`} />
                                            </div>
                                            <strong className="instructor-name">{courseDetail.instructor} 강사님</strong>
                                        </div>
                                        <div className="instructor-info">
                                            <ul className="instructor-desc">
                                                {courseDetail.instructorBio.map((bio, idx) => (
                                                    <li key={idx}>{bio}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="introdution">
                                    <h4 className="lecture-title">교재소개</h4>
                                    <p className="lecture-desc">(예시)'Business A'자체 교재</p>
                                </div>
                            </div>
                        )}

                        {/* View Tab Content */}
                        {activeTab === 'view' && (
                            <div className="lecture-tab-content active">
                                <div className="lecture-playlist-top">
                                    <h4 className="lecture-title">강의보기</h4>
                                    <p className="play">재생하기</p>
                                </div>
                                <ul className="lecture-playlist">
                                    {courseDetail.playlist.map((item, idx) => (
                                        <li key={idx}>
                                            <span className="lecture-num">{item.num}.</span>
                                            <span className="lecture-name">{item.title}</span>
                                            <span className="lecture-time">{item.time}</span>
                                            <a href="#!" className="btn-paly" onClick={(e) => { e.preventDefault(); alert('강의 재생 시뮬레이션'); }}>▶</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
