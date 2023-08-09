import { Post } from '@/components/Posts/model/types/postSchema';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import cl from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    pageQty: number;
    data?: Post[];
}

export const Pagination = memo((props: PaginationProps) => {
    const { currentPage, pageQty, data } = props;

    if (!data?.length) {
        return null;
    }

    return (
        <div className={cl.wrap}>
            <Link to={`/?page=${currentPage - 1}`} className={[cl.btn, currentPage === 1 ? cl.disabled : ''].join(' ')}>
                Назад
            </Link>
            <div className={cl.pagination}>
                {Array.from({ length: pageQty }).map((_, index) => (
                    <Link
                        to={`/?page=${index + 1}`}
                        key={index + 1}
                        className={currentPage === index + 1 ? cl.activePage : ''}
                    >
                        {index + 1}
                    </Link>
                ))}
            </div>
            <Link
                to={`?page=${currentPage + 1}`}
                className={[cl.btn, currentPage === pageQty ? cl.disabled : ''].join(' ')}
            >
                Далее
            </Link>
        </div>
    );
});
