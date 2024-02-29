import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {selectError, selectPostsCreateLoading} from "../postsSlice.ts";
import React, {useState} from "react";
import {PostMutation} from "../../../type";
import {createPost} from "../postsThunk.ts";
import {Grid, TextField} from "@mui/material";
import FileInput from "../../../components/UI/FileInput.tsx";
import {LoadingButton} from "@mui/lab";

function SendIcon() {
    return null;
}

const PostForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectPostsCreateLoading);
    const error = useAppSelector(selectError);

    const [state, setState] = useState<PostMutation>({
        title: '',
        description: '',
        image: null,
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(createPost(state)).unwrap();
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if (files) {
            setState((prevState) => ({
                ...prevState,
                [name]: files[0]
            }));
        }
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField style={{width: '400px'}}
                        id="title"
                        placeholder={"Title"}
                        value={state.title}
                        onChange={inputChangeHandler}
                        name="title"
                        required
                    />
                </Grid>

                <Grid item>
                    <TextField style={{width: '400px'}}
                        multiline rows={3}
                        id="description"
                        placeholder={"Description"}
                        value={state.description}
                        onChange={inputChangeHandler}
                        name="description"
                        error={Boolean(getFieldError('description'))}
                        helperText={getFieldError('description')}
                    />
                </Grid>

                <Grid item xs>
                    <FileInput
                        onChange={fileInputChangeHandler}
                        error={error}
                        name="image"
                        label="image"
                    />
                </Grid>

                <Grid item xs>
                    <LoadingButton
                        type="submit"
                        size="small"
                        endIcon={<SendIcon />}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        <span>Save</span>
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
};



export default PostForm;

