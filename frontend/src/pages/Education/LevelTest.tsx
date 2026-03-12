import React from 'react';
import LevelTestCard from '../../components/LevelTestCard';

const LevelTest: React.FC = () => {
    const testData = [
        { id: 1, language: '영어', iconSrc: '/img/education/icon1.png', iconAlt: '영어 아이콘' },
        { id: 2, language: '중국어', iconSrc: '/img/education/icon2.png', iconAlt: '중국어 아이콘' },
        { id: 3, language: '일본어', iconSrc: '/img/education/icon3.png', iconAlt: '일본어 アイ콘' },
        { id: 4, language: '제2외국어', iconSrc: '/img/education/icon4.png', iconAlt: '제2외국어 아이콘' },
    ];

    return (
        <div className="contents education level">
            {/* Top Banner */}
            <div className="top_banner"></div>
            <div className="course-title">
                <div className="container">
                    <h3 className="page_tit">
                        <span>Level Test</span>
                    </h3>
                </div>
            </div>

            <div className="detail_con">
                <div className="container">
                    <div className="content">
                        <div className="title-wrap">
                            <h3 className="title">레벨테스트</h3>
                        </div>
                        <div className="level-test-list">
                            {testData.map((test) => (
                                <LevelTestCard 
                                    key={test.id}
                                    language={test.language}
                                    iconSrc={test.iconSrc}
                                    iconAlt={test.iconAlt}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LevelTest;
