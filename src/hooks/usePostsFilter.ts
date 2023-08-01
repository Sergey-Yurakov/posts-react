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
        if (type) {
            searchPost?.sort((a, b) => {
                const [firstValue, secondValue] = sort === 'desc' ? [b, a] : [a, b];
                switch (type) {
                    case 'id':
                        return firstValue[type] - secondValue[type];
                    case 'title':
                    case 'body':
                    default:
                        return firstValue?.[type].localeCompare(secondValue?.[type]);
                }
            });
        }

        return searchPost;
    }, [searchPost, sort, type]);

    return searchDataAndFilter;
};
