import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchPosts } from '../services/fetchPosts/fetchPosts';
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
    reducers: {
        setTotalCount(state, { payload }: PayloadAction<number>) {
            state.totalCount = payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, state => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchPosts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.data = payload;
                state.totalCount = payload.length;
            })
            .addCase(fetchPosts.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
    },
});

export const { reducer: postReducer } = postsSlice;
export const { actions: postActions } = postsSlice;
