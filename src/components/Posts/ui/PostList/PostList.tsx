import arrowIcon from '@/assets/icon/arrow.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/hooksStore';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { getSortOrder, getSortType } from '../../model/selectors/filtersPost/filtersPost';
import { filterPostActions } from '../../model/slices/filterPostSLice';
import { FilterPost, Post } from '../../model/types/postSchema';
import { PostItem } from '../PostItem/PostItem';
import cl from './PostList.module.css';

interface PostListProps {
    data?: Post[];
}

export const PostList = memo((props: PostListProps) => {
    const { data } = props;
    const dispatch = useAppDispatch();
    const currentSortOrder = useAppSelector(getSortOrder);
    const sortType = useAppSelector(getSortType);

    if (!data?.length) {
        return (
            <>
                <p className={cl.error}>Такой страницы нет!</p>
                <Link to={`/?page=${1}`} className={cl.error}>
                    Перейти на 1 страницу
                </Link>
            </>
        );
    }

    const onClickSort = ({ typeSort }: Omit<FilterPost, 'searchValue'>) => {
        dispatch(
            filterPostActions.setSort({
                sortOrder: currentSortOrder === 'asc' ? 'desc' : 'asc',
                typeSort,
            })
        );
    };

    const sortId = currentSortOrder === 'desc' && sortType === 'id';
    const sortTitle = currentSortOrder === 'desc' && sortType === 'title';
    const sortBody = currentSortOrder === 'desc' && sortType === 'body';

    return (
        <div className={cl.wrap}>
            <table className={cl.table}>
                <thead className={cl.thead}>
                    <tr>
                        <td className={cl.idHead}>
                            <button
                                onClick={() => onClickSort({ sortOrder: 'desc', typeSort: 'id' })}
                                className={cl.tdBtn}
                            >
                                ID
                                <span className={cl.arrow}>
                                    <img
                                        src={arrowIcon}
                                        alt="arrow icon"
                                        className={sortId ? cl.activeSort : cl.noActiveSort}
                                    />
                                </span>
                            </button>
                        </td>
                        <td className={cl.titleHead}>
                            <button
                                onClick={() => onClickSort({ sortOrder: 'desc', typeSort: 'title' })}
                                className={cl.tdBtn}
                            >
                                Заголовок
                                <span className={cl.arrow}>
                                    <img
                                        src={arrowIcon}
                                        alt="arrow icon"
                                        className={sortTitle ? cl.activeSort : cl.noActiveSort}
                                    />
                                </span>
                            </button>
                        </td>
                        <td className={cl.bodyHead}>
                            <button
                                onClick={() => onClickSort({ sortOrder: 'desc', typeSort: 'body' })}
                                className={cl.tdBtn}
                            >
                                Описание
                                <span className={cl.arrow}>
                                    <img
                                        src={arrowIcon}
                                        alt="arrow icon"
                                        className={sortBody ? cl.activeSort : cl.noActiveSort}
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
