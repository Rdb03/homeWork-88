import {Link} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import Typography from "@mui/material/Typography";

const AnonymousMenu = () => {
  return (
      <div style={{display: 'flex'}}>
          <Link sx={{color: 'white', marginRight: '20px'}} component={RouterLink} to="/register" underline="hover">
              <Typography>Register</Typography>
          </Link>
          <Link sx={{color: 'white', marginRight: '20px'}} component={RouterLink} to="/login" underline="hover">
              <Typography>Login</Typography>
          </Link>
      </div>
  );
};

export default AnonymousMenu;
