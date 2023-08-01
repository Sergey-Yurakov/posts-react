import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

export const getPostAll = (state: RootState) => state.posts.data;
export const getPostError = (state: RootState) => state.posts.error || '';
export const getPostIsLoading = (state: RootState) => state.posts.isLoading;
export const getPostTotalCount = (state: RootState) => state.posts.totalCount ?? 0;

export const searchPost = createSelector(
    getPostAll,
    post => (search: string) => post.filter(i => i.body.includes(search))
);
