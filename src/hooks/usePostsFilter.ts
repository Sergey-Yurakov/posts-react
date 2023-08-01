import { Post } from '@/components/Posts/model/types/postSchema';
import { useMemo } from 'react';

export const useSearchPost = (data?: Post[], search: string = '') => {
    const searchPost = useMemo(
        () => data?.filter(post => post.title.includes(search) || post.body.includes(search)),
        [data, search]
    );

    return searchPost;
};

export const usePostsFilter = (data?: Post[], search: string = '', sort?: 'asc' | 'desc') => {
    const searchPost = useSearchPost(data, search);

    const searchDataAndFilter = useMemo(() => {
        if (sort === 'desc') {
            return searchPost?.sort((a, b) => b.id - a.id);
        }

        if (sort === 'asc') {
            return searchPost?.sort((a, b) => a.id - b.id);
        }

        return searchPost;
    }, [searchPost, sort]);

    return searchDataAndFilter;
};
