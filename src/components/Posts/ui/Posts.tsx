import searchIcon from '@/assets/icon/search.svg';
import { Pagination } from '@/components/Pagination';
import { postActions } from '@/components/Posts/model/slices/postsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooksStore';
import { ChangeEvent, memo, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
    getCurrentPage,
    getLimit,
    getSearchValue,
    slicePosts,
    sortAndFilteredPosts,
} from '../model/selectors/filtersPost/filtersPost';
import { getPostError, getPostIsLoading, getPostTotalCount } from '../model/selectors/getPosts/getPosts';
import { fetchPosts } from '../model/services/fetchPosts/fetchPosts';
import { filterPostActions } from '../model/slices/filterPostSLice';
import { PostList } from './PostList/PostList';
import cl from './Posts.module.css';

export const Posts = memo(() => {
    let [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const totalCount = useAppSelector(getPostTotalCount);
    const isLoading = useAppSelector(getPostIsLoading);
    const error = useAppSelector(getPostError);

    const inputValue = useAppSelector(getSearchValue);
    const filteredData = useAppSelector(sortAndFilteredPosts);
    const limit = useAppSelector(getLimit);
    const currentPage = useAppSelector(getCurrentPage);
    const data = useAppSelector(slicePosts);

    const pageQty = useMemo(() => Math.ceil(totalCount / limit), [limit, totalCount]);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(postActions.setTotalCount(filteredData.length));
    }, [dispatch, filteredData.length]);

    useEffect(() => {
        dispatch(filterPostActions.setCurrentPage(Number(searchParams.get('page'))));
    }, [dispatch, searchParams]);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterPostActions.setSearchValue(e.target.value.trim()));
        setSearchParams('page=1');
    };

    if (isLoading) {
        return <p className={cl.loading}>Loading...</p>;
    }

    if (error) {
        return <p className={cl.error}>Server error!</p>;
    }

    return (
        <div className={cl.wrapper}>
            <div className={cl.inputWrap}>
                <input
                    placeholder="Поиск"
                    defaultValue={inputValue}
                    type="text"
                    className={cl.input}
                    onChange={e => onChangeInput(e)}
                />
                <img src={searchIcon} alt="search icon" />
            </div>
            <PostList data={data} />
            <Pagination data={data} pageQty={pageQty} currentPage={currentPage} />
        </div>
    );
});
