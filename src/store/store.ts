import { filterPostReducer } from '@/components/Posts/model/slices/filterPostSLice';
import { postReducer } from '@/components/Posts/model/slices/postsSlice';
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        posts: postReducer,
        filter: filterPostReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
