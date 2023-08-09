import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

export const fetchPosts = createAsyncThunk<AxiosResponse, void, { rejectValue: string }>(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        const result = await axios.get(`https://jsonplaceholder.typicode.com/posts`);

        if (!result.data) {
            return rejectWithValue('Server error');
        }
        return result;
    }
);
