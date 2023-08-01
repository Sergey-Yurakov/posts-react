import {
    getPostAll,
    getPostError,
    getPostIsLoading,
    getPostTotalCount,
} from '@/components/Posts/model/selectors/getPosts/getPosts';
import { fetchPosts } from '@/components/Posts/model/services/fetchPosts/fetchPosts';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from './hooksStore';
import { usePostsFilter } from './usePostsFilter';

const LIMIT = 10;

export type TFilter = {
    input: string;
    sort: 'asc' | 'desc';
    type?: 'id' | 'title' | 'body';
};

interface PostsDataProps {
    page: number;
    setPage: (val: number) => void;
}

export const usePostsData = (props: PostsDataProps) => {
    const { page, setPage } = props;

    const dispatch = useAppDispatch();
    const postsAll = useAppSelector(getPostAll);
    const isLoading = useAppSelector(getPostIsLoading);
    const error = useAppSelector(getPostError);
    const totalCount = useAppSelector(getPostTotalCount);

    const [pageQty, setPageQty] = useState<number>(0);
    const [filter, setFilter] = useState<TFilter>({ input: '', sort: 'asc', type: 'id' });

    const sortAndSearchData = usePostsFilter(postsAll, filter.input, filter.sort, filter.type);

    const pagination = useMemo(() => Array.from(Array(pageQty).keys()), [pageQty]);

    const prevPage = useCallback(
        (pageCurr: number) => {
            if (page !== pageCurr) {
                setFilter({ sort: 'asc', input: '', type: 'id' });
            }
            setPage(page - 1);
        },
        [page, setPage]
    );

    const nextPage = useCallback(
        (pageCurr: number) => {
            if (page !== pageCurr) {
                setFilter({ sort: 'asc', input: '', type: 'id' });
            }
            setPage(page + 1);
        },
        [page, setPage]
    );

    const onClickPage = useCallback(
        (pageCurr: number) => {
            if (page !== pageCurr) {
                setFilter({ sort: 'asc', input: '', type: 'id' });
            }
            setPage(pageCurr);
        },
        [page, setPage]
    );

    const onChangeInput = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setFilter({ ...filter, input: e.target.value });
        },
        [filter]
    );

    useEffect(() => {
        dispatch(fetchPosts(page));
    }, [dispatch, page]);

    useEffect(() => {
        if (totalCount) {
            setPageQty(Math.ceil(totalCount / LIMIT));
        }
    }, [totalCount]);

    return {
        isLoading,
        error,
        pagination,
        prevPage,
        nextPage,
        onClickPage,
        onChangeInput,
        filter,
        page,
        pageQty,
        sortAndSearchData,
        setFilter,
    };
};
