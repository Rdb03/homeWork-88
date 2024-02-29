import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectComments, selectCommentsLoading} from "./commentsSlice.ts";
import {selectUser} from "../users/usersSlice.ts";
import React, {useEffect, useState} from "react";
import {createComments, fetchComments} from "./commentsThunk.ts";
import {CommentMutation} from "../../type";
import {CircularProgress, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";


interface Props {
    id: string;
}

const Comments:React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const comments = useAppSelector(selectComments);
    const loading = useAppSelector(selectCommentsLoading);
    const user = useAppSelector(selectUser);

    const [state, setState] = useState<CommentMutation>({
        title: '',
        post: props.id
    });

    useEffect(() => {
        dispatch(fetchComments(props.id));
    }, [dispatch, props.id]);

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(createComments(state));
            await dispatch(fetchComments(props.id));
        } finally {
            setState(prevState => ({
                ...prevState,
                title: ''
            }));
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    return loading? <CircularProgress/> :(
        <Grid sx={{margin: '40px', borderTop: '1px solid black'}}>
            {user
                ?
                <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px'}} className="comment-form" onSubmit={submitFormHandler}>
                    <input
                        style={{
                            marginBottom: '20px',
                            height: '70px',
                            boxSizing: 'border-box',
                            padding: '10px',
                            width: '100%',
                            fontSize: '20px'
                    }}
                        placeholder="Enter comment"
                        className="comment-input"
                        name="title"
                        value={state.title}
                        onChange={inputChangeHandler}
                    />
                    <button style={{
                        width: '200px',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        height: '40px',
                        fontSize: '20px',
                        cursor: 'pointer',
                        marginBottom: '20px'
                    }}>Send</button>
                </form>
                :
                ''
            }
            <Grid sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography sx={{fontSize: '40px', margin: '0 auto'}}>Commentaries</Typography>
                {comments.map((item, index) => (
                    <Grid sx={{
                        border: '1px solid black',
                        marginTop: '20px',
                        padding: '20px',
                        boxSizing: 'border-box'
                    }} item className="comment" key={index}>
                        <Typography sx={{fontSize: '30px', marginBottom: '30px'}}>{item.user.username}</Typography>
                        <Typography>{item?.title}</Typography>
                    </Grid>
                )).reverse()}
            </Grid>
        </Grid>
    );
};

export default Comments;