import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NoticeSubMenu from '../../components/NoticeSubMenu';

const NoticeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

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
                    {/* TODO: 백엔드 연동 후 GET /api/boards/{id} 로 실제 데이터 렌더링 */}
                    <div style={{ padding: '40px 20px', textAlign: 'center', color: '#888' }}>
                        <p>게시글 번호: {id}</p>
                        <p style={{ marginTop: '12px' }}>백엔드 연동 후 공지 내용이 표시됩니다.</p>
                    </div>

                    <div className="btn_wrap" style={{ marginTop: '20px' }}>
                        <Link to="/notice/list" className="btn">목록으로</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeDetail;
