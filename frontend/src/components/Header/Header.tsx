import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import {selectUser} from "../../containers/users/usersSlice.ts";
import {useAppSelector} from "../../app/hooks.ts";
import AnonymousMenu from "../AnonymousMenu/AnonymMenu.tsx";
import UserMenu from "../UserMenu/UserMenu.tsx";

const Header = () => {
    const user = useAppSelector(selectUser);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link sx={{color: 'white', marginRight: '20px'}} component={RouterLink} to="/">
                        <Typography sx={{fontSize: '30px'}}>Forum</Typography>
                    </Link>
                    {user
                        ?
                        <UserMenu/>
                        :
                        <AnonymousMenu/>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;