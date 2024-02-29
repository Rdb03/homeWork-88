import {IInfo} from "../../type";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchInfo} from "./fullPostThunk";
interface InfoState {
    info: IInfo | null;
    fetchLoadingInfo: boolean;
}

const initialState: InfoState = {
    info: null,
    fetchLoadingInfo: false,
}

export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchInfo.pending, (state) => {
            state.fetchLoadingInfo = true;
        });
        builder.addCase(fetchInfo.fulfilled, (state, {payload: inf}) => {
            state.fetchLoadingInfo = false;
            state.info = inf;
        });
        builder.addCase(fetchInfo.rejected, (state) => {
            state.fetchLoadingInfo = false;
        });
    }
})

export const infoReducer = infoSlice.reducer;
export const selectInfo = (state: RootState) => state.info.info;
export const selectInfoLoading = (state: RootState) => state.info.fetchLoadingInfo;
