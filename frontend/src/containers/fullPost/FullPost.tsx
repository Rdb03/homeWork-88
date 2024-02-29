import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectInfo, selectInfoLoading} from "./fullPostSlice.ts";
import {useEffect} from "react";
import {fetchInfo} from "./fullPostThunk.ts";
import Comments from "../comments/Comments.tsx";
import {CircularProgress, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

const FullPost = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const info = useAppSelector(selectInfo);
    const loading = useAppSelector(selectInfoLoading);

    useEffect( () => {
        if (id) {
            dispatch(fetchInfo(id));
        }
    }, [dispatch, id]);

    return loading ? (
        <CircularProgress />
    ) : (
        <Grid sx={{ margin: '20px' }}>
            <Grid item>
                <Typography>
                    <Typography variant="h4">Datetime: {info ? info.date : 'error date'}</Typography>
                </Typography>
                <Typography variant="h2">User: {info ? (info.user ? info.user.username : 'user') : 'Error username'}</Typography>
                <Typography variant="body1" sx={{ marginTop: '30px' }}>
                    {info ? info.description : 'error description'}
                </Typography>
                {id ? <Comments id={id} /> : null}
            </Grid>
        </Grid>
    );

};

export default FullPost;