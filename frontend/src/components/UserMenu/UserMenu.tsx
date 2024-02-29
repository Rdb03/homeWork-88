import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectUser, unsetUser} from "../../containers/users/usersSlice.ts";
import {logout} from "../../containers/users/usersThunk.ts";
import {Link as RouterLink} from 'react-router-dom';
import {Grid, Link} from "@mui/material";
import Typography from "@mui/material/Typography";


const UserMenu = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const handleLogout = async () => {
        dispatch(logout());
        dispatch(unsetUser());
    };

    return (
        <Grid sx={{display: 'flex', alignItems: 'center'}}>
            {user ? <Typography sx={{marginTop: '1px'}}>Hello, {user.username}!</Typography> : 'Anonymous user'}
            <Link sx={{color: 'white', margin: '20px'}} component={RouterLink} to="/newpost" underline="hover">
                <Typography>Add new post</Typography>
            </Link>
            <Link
                sx={{color: 'white', fontSize: '16px'}}
                component="button"
                variant="body2"
                onClick={handleLogout}
            >
                Logout
            </Link>
        </Grid>
    );
};

export default UserMenu;