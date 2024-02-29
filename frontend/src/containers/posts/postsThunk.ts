import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {IPost, PostMutation, ValidationError} from "../../type";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const fetchPosts = createAsyncThunk<IPost[]>(
    'posts/fetchPosts',
    async () => {
        const response = await axiosApi.get<IPost[]>('/posts');
        return response.data;
    }
);

export const createPost = createAsyncThunk<
    void,
    PostMutation,
    { state:RootState, rejectValue: ValidationError }
>(
    'posts/create',
    async (postMutation, {getState, rejectWithValue}) => {
        const usersState = getState().users;
        const token = usersState.user?.token;

        const formData = new FormData();
        const keys = Object.keys(postMutation) as (keyof PostMutation)[];

        keys.forEach(key => {
            const value = postMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        try {
            await axiosApi.post(
                '/posts',
                formData,
                { headers: {
                        'Authorization': token
                    }});
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);