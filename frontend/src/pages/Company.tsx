import React from 'react';

const Company: React.FC = () => {
    return (
        <div className="contents">
            {/* Top Banner */}
            <div className="top_banner">
                <div className="dim"></div>
                <div className="top-title">
                    <h2 className="title">회사소개</h2>
                </div>
            </div>

            {/* TODO: 회사소개 페이지 디자인 및 콘텐츠 추가 예정 */}
            <div className="page_con">
                <div className="page_con_wrap" style={{ padding: '60px 20px', textAlign: 'center', color: '#888' }}>
                    <p>회사소개 페이지 준비 중입니다.</p>
                </div>
            </div>
        </div>
    );
};

export default Company;
