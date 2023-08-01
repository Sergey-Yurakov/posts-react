import arrowIcon from '@/assets/icon/arrow.svg';
import { TFilter } from '@/hooks/usePostsData';
import { Dispatch, SetStateAction, memo, useCallback, useMemo } from 'react';

import { Post } from '../../model/types/postSchema';
import { PostItem } from '../PostItem/PostItem';
import cl from './PostList.module.css';

interface PostListProps {
    data?: Post[];
    filter: TFilter;
    setFilter: Dispatch<SetStateAction<TFilter>>;
}

export const PostList = memo((props: PostListProps) => {
    const { data, filter, setFilter } = props;

    const onClickSort = useCallback(() => {
        if (filter.sort === 'asc') {
            setFilter({
                ...filter,
                sort: 'desc',
            });
        } else {
            setFilter({
                ...filter,
                sort: 'asc',
            });
        }
    }, [filter, setFilter]);

    const sort = useMemo(() => filter.sort === 'desc', [filter.sort]);

    return (
        <div className={cl.wrap}>
            <table className={cl.table}>
                <thead className={cl.thead}>
                    <tr>
                        <td className={cl.idHead}>
                            <button onClick={onClickSort} className={cl.tdBtn}>
                                ID
                                <span className={cl.arrow}>
                                    <img
                                        src={arrowIcon}
                                        alt="arrow icon"
                                        className={sort ? cl.activeSort : cl.noActiveSort}
                                    />
                                </span>
                            </button>
                        </td>
                        <td className={cl.titleHead}>
                            <button onClick={onClickSort} className={cl.tdBtn}>
                                Заголовок
                                <span className={cl.arrow}>
                                    <img
                                        src={arrowIcon}
                                        alt="arrow icon"
                                        className={sort ? cl.activeSort : cl.noActiveSort}
                                    />
                                </span>
                            </button>
                        </td>
                        <td className={cl.bodyHead}>
                            <button onClick={onClickSort} className={cl.tdBtn}>
                                Описание
                                <span className={cl.arrow}>
                                    <img
                                        src={arrowIcon}
                                        alt="arrow icon"
                                        className={sort ? cl.activeSort : cl.noActiveSort}
                                    />
                                </span>
                            </button>
                        </td>
                    </tr>
                </thead>
                <tbody className={cl.tbody}>
                    {data?.map(post => (
                        <PostItem key={post.id} id={post.id} title={post.title} body={post.body} />
                    ))}
                </tbody>
            </table>
        </div>
    );
});
