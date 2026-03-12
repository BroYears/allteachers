import React from 'react';
import { Link } from 'react-router-dom';

interface CourseItemProps {
    id: number;
    category: string;
    title: string;
    thumbnailUrl?: string; // Optional if we want a fallback
}

const CourseCard: React.FC<CourseItemProps> = ({ id, category, title, thumbnailUrl }) => {
    // Default dummy image from the original template if none provided
    const imgSrc = thumbnailUrl || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

    return (
        <div className="course-card" data-category={category}>
            <Link to={`/education/course-detail/${id}`}>
                <div className="course-thumb">
                    <img src={imgSrc} alt={`${title} 강의 썸네일`} />
                </div>
                <div className="course-name">{title}</div>
            </Link>
        </div>
    );
};

export default CourseCard;
