import { RootState } from '@/store/store';

export const getPostAll = (state: RootState) => state.posts.data;
export const getPostError = (state: RootState) => state.posts.error || '';
export const getPostIsLoading = (state: RootState) => state.posts.isLoading;
export const getPostTotalCount = (state: RootState) => state.posts.totalCount ?? 0;
