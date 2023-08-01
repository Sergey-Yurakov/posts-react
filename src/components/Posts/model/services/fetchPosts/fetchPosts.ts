import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

export const fetchPosts = createAsyncThunk<AxiosResponse, number, { rejectValue: string }>(
    'posts/fetchPosts',
    async (page, { rejectWithValue }) => {
        const result = await axios.get(`https://jsonplaceholder.typicode.com/posts?`, {
            params: {
                _page: page,
                _limit: 10,
            },
        });

        if (!result.data) {
            return rejectWithValue('Server error');
        }
        return result;
    }
);
