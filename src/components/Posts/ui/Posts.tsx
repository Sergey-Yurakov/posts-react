import searchIcon from '@/assets/icon/search.svg';
import { Pagination } from '@/components/Pagination';
import { usePostsData } from '@/hooks/usePostsData';
import { memo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { PostList } from './PostList/PostList';
import cl from './Posts.module.css';

export const Posts = memo(() => {
    const location = useLocation();
    const [page, setPage] = useState<number>(parseInt(location.search?.split('=')[1]) || 1);

    const {
        error,
        pagination,
        nextPage,
        prevPage,
        onClickPage,
        isLoading,
        onChangeInput,
        filter,
        setFilter,
        pageQty,
        sortAndSearchData,
    } = usePostsData({ page, setPage });

    if (isLoading) {
        return <p className={cl.loading}>Loading...</p>;
    }

    if (error) {
        return <p className={cl.error}>Server error!</p>;
    }

    return (
        <div className={cl.wrapper}>
            <div className={cl.inputWrap}>
                <input placeholder="Поиск" className={cl.input} onChange={e => onChangeInput(e)} />
                <img src={searchIcon} alt="search icon" />
            </div>
            <PostList filter={filter} setFilter={setFilter} data={sortAndSearchData} />
            <Pagination
                pageQty={pageQty}
                page={page}
                pagination={pagination}
                prevPage={prevPage}
                nextPage={nextPage}
                onClickPage={onClickPage}
            />
        </div>
    );
});
