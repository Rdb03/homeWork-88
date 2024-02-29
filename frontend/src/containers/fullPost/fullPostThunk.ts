import axiosApi from "../../axiosApi";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IInfo} from "../../type";

export const fetchInfo = createAsyncThunk<IInfo | null, string>(
    'info/fetchInfo',
    async (id) => {
        const { data }  = await axiosApi<IInfo>(`/posts/${id}`);

        if (!data) {
            return null;
        }

        return  {
            title: data.title,
            description: data.description,
            date: data.date,
            user: data.user
        }
    }
);