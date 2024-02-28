import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link sx={{color: 'white', marginRight: '20px'}} component={RouterLink} to="/">
                        <Typography sx={{fontSize: '30px'}}>Forum</Typography>
                    </Link>
                    <div style={{display: 'flex'}}>
                        <Link sx={{color: 'white', marginRight: '20px'}} component={RouterLink} to="/register" underline="hover">
                            <Typography>Register</Typography>
                        </Link>
                        <Link sx={{color: 'white', marginRight: '20px'}} component={RouterLink} to="/login" underline="hover">
                            <Typography>Login</Typography>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;