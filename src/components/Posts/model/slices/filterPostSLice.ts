import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FilterPost } from '../types/postSchema';

const initialState: FilterPost = {
    searchValue: '',
    sortOrder: 'asc',
    typeSort: 'id',
    limit: 10,
    currentPage: 1,
};

export const filterPostSLice = createSlice({
    name: 'filterPost',
    initialState,
    reducers: {
        setSort(state, { payload }: PayloadAction<Omit<FilterPost, 'searchValue'>>) {
            state.sortOrder = payload.sortOrder;
            state.typeSort = payload.typeSort;
        },
        setSearchValue(state, { payload }: PayloadAction<string>) {
            state.searchValue = payload;
        },
        setCurrentPage(state, { payload }: PayloadAction<number>) {
            state.currentPage = payload;
        },
    },
});

export const { actions: filterPostActions } = filterPostSLice;
export const { reducer: filterPostReducer } = filterPostSLice;
