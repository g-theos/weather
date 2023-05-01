import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Button, TextField, Alert } from '@mui/material';
import useHttp from '../../hooks/useHttp';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const { isLoading, error, sendRequest: fetchPassword } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    //add validation

    const passwordData = (data) => {
      setPasswordChanged(true);
    };

    fetchPassword(
      {
        url: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        method: 'POST',
        body: {
          idToken: token,
          password: enteredNewPassword,
          returnSecureToken: false,
        },
        headers: { 'Content-Type': 'application/json' },
      },
      passwordData
    );
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '2rem' }}>
      <CardContent>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="new-password">New Password</label>
            <TextField
              type="password"
              id="new-password"
              minLength={8}
              required
              inputRef={newPasswordInputRef}
              variant='outlined'
              fullWidth
            />
          </div>
          {!isLoading && !error && (
            <div style={{ margin: '1rem' }}>
              <Button variant="contained" color="primary" type="submit">Change Password</Button>
            </div>
          )}
          {isLoading && <Alert severity='info'>Sending request...</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          {passwordChanged && <Alert severity='info'>Password changed successfully</Alert>}
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
