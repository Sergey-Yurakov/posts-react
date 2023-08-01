import { memo } from 'react';
import { Link } from 'react-router-dom';

import cl from './Pagination.module.css';

interface PaginationProps {
    pagination: number[];
    page: number;
    pageQty: number;
    prevPage: (page: number) => void;
    nextPage: (page: number) => void;
    onClickPage: (page: number) => void;
}

export const Pagination = memo((props: PaginationProps) => {
    const { pagination, page, pageQty, nextPage, prevPage, onClickPage } = props;

    return (
        <div className={cl.wrap}>
            <Link
                to={`/?page=${page - 1}`}
                onClick={() => prevPage(page - 1)}
                className={[cl.btn, page === 1 ? cl.disabled : ''].join(' ')}
            >
                Назад
            </Link>
            <div className={cl.pagination}>
                {pagination &&
                    pagination.map(i => (
                        <Link
                            to={`/?page=${i + 1}`}
                            key={i}
                            className={page === i + 1 ? cl.activePage : ''}
                            onClick={() => onClickPage(i + 1)}
                        >
                            {i + 1}
                        </Link>
                    ))}
            </div>
            <Link
                to={`?page=${page + 1}`}
                onClick={() => nextPage(page + 1)}
                className={[cl.btn, page === pageQty ? cl.disabled : ''].join(' ')}
            >
                Далее
            </Link>
        </div>
    );
});

// disabled={page === pageQty}
