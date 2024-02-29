import {IComment} from "../../type";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchComments} from "./commentsThunk";
interface CommentsState {
    comments: IComment[];
    fetchLoadingComments: boolean;
}

const initialState: CommentsState = {
    comments: [],
    fetchLoadingComments: false,
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.fetchLoadingComments = true;
        });
        builder.addCase(fetchComments.fulfilled, (state, {payload: comment}) => {
            state.fetchLoadingComments = false;
            state.comments = comment;
        });
        builder.addCase(fetchComments.rejected, (state) => {
            state.fetchLoadingComments = false;
        });
    }
})

export const commentReducer = commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoading = (state: RootState) => state.comments.fetchLoadingComments;
