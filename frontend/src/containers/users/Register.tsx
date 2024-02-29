import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectRegisterError} from "./usersSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {RegisterMutation} from "../../type";
import {register} from "./usersThunk.ts";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const navigate = useNavigate();

    const [state, setState] = useState<RegisterMutation>({
        username: '',
        password: ''
    });
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await dispatch(register(state)).unwrap();
            navigate('/');
            setState(prevState => ({
                ...prevState,
                username: '',
                password: ''
            }));
        } catch (e) {
            console.log(e);
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
        <Grid sx={{textAlign: 'center'}}>
            <Typography sx={{fontSize: '30px', margin: '30px'}}>Registration</Typography>
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={submitFormHandler}>
                {Boolean(getFieldError('username')) &&
                    <Typography>{getFieldError('username')}</Typography>
                }
                <input
                    style={{width: '500px', marginBottom: '20px', height: '50px', boxSizing: 'border-box', padding: '10px'}}
                    placeholder="Login"
                    name="username"
                    maxLength={10}
                    value={state.username}
                    onChange={inputChangeHandler}
                />
                {Boolean(getFieldError('password')) &&
                    <Typography>{getFieldError('password')}</Typography>
                }
                <input
                    style={{width: '500px', marginBottom: '20px', height: '50px', boxSizing: 'border-box', padding: '10px'}}
                    placeholder="Passwrod"
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
                <Link style={{color: 'black'}} className="go-to-form-link" to={'/login'}><Typography>Do you already have an account?</Typography></Link>
            </form>
        </Grid>
    );
};

export default Register;