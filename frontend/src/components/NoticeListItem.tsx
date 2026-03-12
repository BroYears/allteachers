import React from 'react';
import { Link } from 'react-router-dom';

interface NoticeItemProps {
    idx: number;
    title: string;
    writer: string;
    date: string;
    hits: number;
}

const NoticeListItem: React.FC<NoticeItemProps> = ({ idx, title, writer, date, hits }) => {
    return (
        <tr>
            <td>{idx}</td>
            <td>
                <Link to={`/notice/detail/${idx}`}>
                    {title}
                </Link>
            </td>
            <td>{writer}</td>
            <td>{date}</td>
            <td>{hits}</td>
        </tr>
    );
};

export default NoticeListItem;