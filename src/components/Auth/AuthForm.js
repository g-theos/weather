import { useState, useRef } from 'react';
import useHttp from '../../hooks/useHttp';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authActions';

import { useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  TextField,
  Typography,
  CircularProgress,
  CardContent,
  Alert
} from '@mui/material';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  //const [formIsValid, setFormIsValid] = useState(true);
  const { isLoading, error, sendRequest: fetchUser } = useHttp();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    /* if (!(enteredPassword.trim().length >= 8)) {
      setFormIsValid(false);
      return;
    } */

    const userData = (data) => {
      dispatch(login(data.idToken, data.localId));
      navigate('/', { replace: true });
    };

    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    }

    fetchUser(
      {
        url: url,
        method: 'POST',
        body: {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
        headers: { 'content-type': 'application/json' },
      },
      userData
    );

    //setFormIsValid(true);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, margin: '2rem' }}>
        <CardContent>
          <Typography variant="h5" component="div" align="center" mb={2}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Typography>
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="email">Your Email</label>
              <TextField
                id="email"
                type="email"
                inputRef={emailInputRef}
                required
                variant="outlined"
                fullWidth
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <TextField
                id="password"
                type="password"
                inputRef={passwordInputRef}
                required
                minLength={8}
                variant="outlined"
                fullWidth
              />
            </div>
            <div style={{ margin: '1rem' }}>
              {!isLoading && (
                <Button variant="contained" color="primary" type="submit">
                  {isLogin ? 'Login' : 'Create Account'}
                </Button>
              )}
              {isLoading && <CircularProgress />}
              {error && <Alert severity="error">{error}</Alert>}
              <Button variant="text" onClick={switchAuthModeHandler}>
                {isLogin
                  ? 'Create new account'
                  : 'Login with existing account'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AuthForm;
