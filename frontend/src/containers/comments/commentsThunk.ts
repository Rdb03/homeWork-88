import axiosApi from "../../axiosApi";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommentMutation, IComment} from "../../type";
import {RootState} from "../../app/store";

export const fetchComments = createAsyncThunk<IComment[], string>(
    'comments/fetchComments',
    async (id:string) => {
        const  responseComments  = await axiosApi.get<IComment[]>(`/comments?post_id=${id}`);

        return responseComments.data;
    }
);

export const createComments = createAsyncThunk<void, CommentMutation, { state:RootState }>(
    'comments/createComment',
    async (commentMutation, thunkAPI) => {
        const usersState = thunkAPI.getState().users;
        const token = usersState.user?.token;

        await axiosApi.post(
            '/comments',
            commentMutation,
            { headers: {
                    'Authorization': token
                }}
        );
    }
);