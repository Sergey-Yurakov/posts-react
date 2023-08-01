import { fetchPosts } from '@/components/Posts/model/services/fetchPosts/fetchPosts';
import { createSlice } from '@reduxjs/toolkit';

import { PostSchema } from '../types/postSchema';

const initialState: PostSchema = {
    isLoading: false,
    error: '',
    data: [],
    totalCount: 0,
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, state => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data;
                state.totalCount = Number(action.payload.headers?.['x-total-count'] || 0);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: postReducers } = postsSlice;
export const { actions: postActions } = postsSlice;
