import React from 'react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
    id: number;
    title: string;
    instructor: string;
    level: string;
    thumbnailUrl?: string;
    categoryName?: string;
    viewCount?: number;
    lessonCount?: number;
    isNew?: boolean;  // 신규 뱃지 표시용
}

const CourseCard: React.FC<CourseCardProps> = ({
    id,
    title,
    instructor,
    level,
    thumbnailUrl,
    categoryName,
    viewCount,
    lessonCount,
    isNew = false,
}) => {
    const imgSrc = thumbnailUrl || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

    return (
        <div className="course-card">
            <Link to={`/education/course-detail/${id}`}>
                <div className="course-thumb">
                    {isNew && <span className="course-badge-new">NEW</span>}
                    <img src={imgSrc} alt={`${title} 강의 썸네일`} />
                </div>
                <div className="course-info">
                    {categoryName && <span className="course-category">{categoryName}</span>}
                    <div className="course-name">{title}</div>
                    <div className="course-meta">
                        <span className="course-instructor">{instructor}</span>
                        <span className="course-level">{level}</span>
                    </div>
                    <div className="course-stats">
                        {viewCount !== undefined && (
                            <span className="course-view">
                                <i className="fa-solid fa-eye" /> {viewCount.toLocaleString()}
                            </span>
                        )}
                        {lessonCount !== undefined && lessonCount > 0 && (
                            <span className="course-lesson">
                                <i className="fa-solid fa-play-circle" /> {lessonCount}강
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CourseCard;
