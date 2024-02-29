import {IPost, ValidationError} from "../../type";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchPosts, createPost} from "./postsThunk";
interface PostsState {
    items: IPost[];
    fetchLoadingPosts: boolean;
    createLoading: boolean;
    error: ValidationError | null,
}

const initialState: PostsState = {
    items: [],
    fetchLoadingPosts: false,
    createLoading: false,
    error: null
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.fetchLoadingPosts = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
            state.fetchLoadingPosts = false;
            state.items = posts;
        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.fetchLoadingPosts = false;
        });

        builder.addCase(createPost.pending, (state) => {
            state.createLoading = true;
            state.error = null;
        });
        builder.addCase(createPost.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createPost.rejected, (state, {payload: error}) => {
            state.createLoading = false;
            state.error = error || null;
        });
    }
})

export const postReducer = postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) => state.posts.fetchLoadingPosts;
export const selectPostsCreateLoading = (state: RootState) => state.posts.createLoading;
export const selectError = (state: RootState) => state.posts.error;
