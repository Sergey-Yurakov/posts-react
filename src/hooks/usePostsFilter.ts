import { Post } from '@/components/Posts/model/types/postSchema';
import { useMemo } from 'react';

export const useSearchPost = (data?: Post[], search: string = '') => {
    const searchPost = useMemo(
        () =>
            data?.filter(
                post =>
                    post.title.toLowerCase().includes(search.toLowerCase()) ||
                    post.body.toLowerCase().includes(search.toLowerCase())
            ),
        [data, search]
    );

    return searchPost;
};

export const usePostsFilter = (
    data?: Post[],
    search: string = '',
    sort?: 'asc' | 'desc',
    type?: 'id' | 'title' | 'body'
) => {
    const searchPost = useSearchPost(data, search);

    const searchDataAndFilter = useMemo(() => {
        if (sort === 'desc' && type === 'id') {
            return searchPost?.sort((a, b) => b.id - a.id);
        }

        if (sort === 'asc' && type === 'id') {
            return searchPost?.sort((a, b) => a.id - b.id);
        }

        if (sort === 'desc' && type === 'title') {
            return searchPost?.sort((a, b) => b.title.localeCompare(a.title));
        }

        if (sort === 'asc' && type === 'title') {
            return searchPost?.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (sort === 'desc' && type === 'body') {
            return searchPost?.sort((a, b) => b.body.localeCompare(a.body));
        }

        if (sort === 'asc' && type === 'body') {
            return searchPost?.sort((a, b) => a.body.localeCompare(b.body));
        }

        return searchPost;
    }, [searchPost, sort, type]);

    return searchDataAndFilter;
};
