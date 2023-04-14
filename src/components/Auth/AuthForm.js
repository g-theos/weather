import { useState, useRef, useContext } from 'react';
import useHttp from '../../hooks/use-http';
import { FIREBASE_API_KEY } from '../../global-config';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authActions';

import { useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  TextField,
  Typography,
  CircularProgress,
  CardContent,
  //CssBaseline
} from '@mui/material';
import { Margin } from '@mui/icons-material';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoginIsNotSignUp, setIsLoginIsNotSignUp] = useState(true);
  //const [formIsValid, setFormIsValid] = useState(true);
  const { isLoading, error, sendRequest: fetchUser } = useHttp();

  const switchAuthModeHandler = () => {
    setIsLoginIsNotSignUp((prevState) => !prevState);
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
    if (isLoginIsNotSignUp) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
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
            {isLoginIsNotSignUp ? 'Login' : 'Sign Up'}
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
                  {isLoginIsNotSignUp ? 'Login' : 'Create Account'}
                </Button>
              )}
              {isLoading && <CircularProgress />}
              {error && <Typography color="error">{error}</Typography>}
              <Button variant="text" onClick={switchAuthModeHandler}>
                {isLoginIsNotSignUp
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
