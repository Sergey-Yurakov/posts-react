import { Post } from '@/components/Posts/model/types/postSchema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk<Post[], void, { rejectValue: string }>(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        const result = await axios.get(`https://jsonplaceholder.typicode.com/posts`);

        if (!result.data) {
            return rejectWithValue('Server error');
        }
        return result.data;
    }
);
