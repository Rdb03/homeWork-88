import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../users/usersSlice.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import PostForm from "./components/PostForm.tsx";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

const NewPost = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <Grid sx={{margin: '50px'}}>
            <Typography sx={{fontSize: '50px'}}>Add new post</Typography>
            <PostForm/>
        </Grid>
    );
};

export default NewPost;