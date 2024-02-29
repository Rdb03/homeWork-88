import React from 'react';
import imageNotAvailable from '../../../assets/images/noImage.png';
import {Grid, Link} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import {apiURL} from "../../../constants.ts";


interface Props {
    id: string;
    image: string | null;
    title: string;
    date: string;
    user: {
        username: string;
        _id: string;
    }
}

const PostItem: React.FC<Props> = (props) => {
    let noImage = imageNotAvailable;

    return (
        <Grid sx={{
            border: '3px solid black',
            margin: '20px',
            borderRadius: '7px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px'
        }}>
            <img style={{width: '100px'}} className="post-item-img" src={props.image ? apiURL + '/' + props.image : noImage} alt="img"/>
            <Typography variant="body1">
                Date: {props.date}
            </Typography>
            <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="body2" sx={{marginRight: '100px'}}>
                    Post: {props.user ? props.user.username : 'user'}
                </Typography>
                <Link color='inherit' underline="hover" component={RouterLink} to={'/fullpost/' + props.id}>
                    <Typography>
                        Read full post
                    </Typography>
                </Link>
            </Grid>
        </Grid>
    );
};


export default PostItem;