import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

import { getPostAll } from '../getPosts/getPosts';

export const getSearchValue = (state: RootState) => state.filter.searchValue || '';
export const getSortOrder = (state: RootState) => state.filter.sortOrder;
export const getSortType = (state: RootState) => state.filter.typeSort;
export const getCurrentPage = (state: RootState) => state.filter.currentPage || 1;
export const getLimit = (state: RootState) => state.filter.limit || 10;

export const filteredPosts = createSelector([getPostAll, getSearchValue], (posts, searchVal) =>
    posts.filter(
        post =>
            post.title.toLowerCase().includes(searchVal.toLowerCase()) ||
            post.body.toLowerCase().includes(searchVal.toLowerCase())
    )
);

export const sortAndFilteredPosts = createSelector(
    [filteredPosts, getSortOrder, getSortType],
    (posts, sortOrder, sortType) => {
        return posts.sort((a, b) => {
            const [firstValue, secondValue] = sortOrder === 'desc' ? [b, a] : [a, b];
            switch (sortType) {
                case 'id':
                    return firstValue[sortType] - secondValue[sortType];
                case 'title':
                case 'body':
                default:
                    return firstValue[sortType].localeCompare(secondValue[sortType]);
            }
        });
    }
);

export const slicePosts = createSelector(
    [sortAndFilteredPosts, getCurrentPage, getLimit, getSortOrder, getSortType],
    (posts, page, limit) => {
        const toIndex = page * limit;
        const fromIndex = toIndex - limit;
        return posts.slice(fromIndex, toIndex);
    }
);
