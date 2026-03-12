import React from 'react';

interface LevelTestCardProps {
    language: string;
    iconSrc: string;
    iconAlt: string;
}

const LevelTestCard: React.FC<LevelTestCardProps> = ({ language, iconSrc, iconAlt }) => {
    
    const handleTestClick = (level: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        alert(`${language} ${level} 레벨테스트가 시작됩니다. (임시)`);
    };

    return (
        <div className="level-test-card">
            <h4 className="title">{language} 회화<br/><span>Level Test</span></h4>
            <div className="icon-wrap">
                <img src={iconSrc} alt={iconAlt} />
            </div>
            <div className="level-test-btns">
                <a href="#!" className="btn-level" onClick={handleTestClick('초급')}>
                    <span>초급 Test</span>
                    <i className="fa-regular fa-circle-right"></i>
                </a>
                <a href="#!" className="btn-level" onClick={handleTestClick('중급')}>
                    <span>중급 Test</span>
                    <i className="fa-regular fa-circle-right"></i>
                </a>
                <a href="#!" className="btn-level" onClick={handleTestClick('고급')}>
                    <span>고급 Test</span>
                    <i className="fa-regular fa-circle-right"></i>
                </a>
            </div>
        </div>
    );
};

export default LevelTestCard;
