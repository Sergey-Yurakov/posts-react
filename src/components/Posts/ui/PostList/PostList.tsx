import { ReactComponent as ArrowIcon } from '@/assets/icon/arrow.svg';
import Table from '@/components/Table/ui/Table';
import { useAppDispatch, useAppSelector } from '@/hooks/hooksStore';
import { classNames as cn } from '@/shared/classNames/classNames';
import { memo, useRef } from 'react';
import FlipMove from 'react-flip-move';
import { Link } from 'react-router-dom';

import { getSortOrder, getSortType } from '../../model/selectors/filtersPost/filtersPost';
import { filterPostActions } from '../../model/slices/filterPostSLice';
import { FilterPost, Post } from '../../model/types/postSchema';
import { PostItem } from '../PostItem/PostItem';
import cl from './PostList.module.css';
import { tableHeader } from './mockHeader';

interface PostListProps {
    data?: Post[];
}

export const PostList = memo((props: PostListProps) => {
    const ref = useRef(null);
    const { data } = props;
    const dispatch = useAppDispatch();
    const currentSortOrder = useAppSelector(getSortOrder);
    const sortType = useAppSelector(getSortType);

    const onClickSort = ({ typeSort }: Omit<FilterPost, 'searchValue'>) => {
        dispatch(
            filterPostActions.setSort({
                sortOrder: currentSortOrder === 'asc' ? 'desc' : 'asc',
                typeSort,
            })
        );
    };

    const activeSort = (type: string) => cn('', { [cl.activeSort]: currentSortOrder === 'desc' && sortType === type });

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

    return (
        <div className={cl.wrap}>
            <Table className={cl.table}>
                <Table.Head className={cl.thead}>
                    <tr>
                        {tableHeader.map(({ name, type, className, id }) => (
                            <td className={className} key={id}>
                                <button
                                    className={cl.tdBtn}
                                    onClick={() => onClickSort({ sortOrder: 'desc', typeSort: type })}
                                >
                                    {name}
                                    <span className={cl.arrow}>
                                        <ArrowIcon className={activeSort(type)} />
                                    </span>
                                </button>
                            </td>
                        ))}
                    </tr>
                </Table.Head>
                <Table.Body className={cl.tbody}>
                    <FlipMove typeName={null} duration={500}>
                        {data?.map(({ id, title, body }) => (
                            <PostItem ref={ref} key={id} id={id} title={title} body={body} />
                        ))}
                    </FlipMove>
                </Table.Body>
            </Table>
        </div>
    );
});
