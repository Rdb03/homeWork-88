import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Link, useNavigate} from "react-router-dom";
import {selectLoginError} from "./usersSlice.ts";
import React, {useState} from "react";
import {LoginMutation} from "../../type";
import {login} from "./usersThunk.ts";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";


const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectLoginError);

    const [state, setState] = useState<LoginMutation>({
        username: '',
        password: '',
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await dispatch(login(state)).unwrap();
            setState(prevState => ({
                ...prevState,
                username: '',
                password: ''
            }));
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Grid sx={{textAlign: 'center'}}>
            <Typography sx={{fontSize: '30px', margin: '30px'}}>Authorization</Typography>
            {error && (
                <Grid >
                    {error.error}
                </Grid>
            )}
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={submitFormHandler}>
                <input
                    style={{width: '500px', marginBottom: '20px', height: '50px', boxSizing: 'border-box', padding: '10px'}}
                    required
                    className="form-input"
                    placeholder="Login"
                    name="username"
                    maxLength={10}
                    value={state.username}
                    onChange={inputChangeHandler}
                />
                <input
                    style={{width: '500px', marginBottom: '20px', height: '50px', boxSizing: 'border-box', padding: '10px'}}
                    required
                    className="form-input"
                    placeholder="Password"
                    name="password"
                    maxLength={10}
                    value={state.password}
                    onChange={inputChangeHandler}
                />
                <button
                    className="form-btn"
                    type="submit"
                    style={{
                        width: '200px',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        height: '40px',
                        fontSize: '20px',
                        cursor: 'pointer',
                        marginBottom: '20px'
                    }}
                >
                    Send
                </button>
                <Link style={{color: 'black'}} className="go-to-form-link" to={'/register'}><Typography>You're not registered?</Typography></Link>
            </form>
        </Grid>
    );
};

export default Login;