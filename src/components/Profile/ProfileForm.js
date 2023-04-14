import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FIREBASE_API_KEY } from '../../global-config';
import useHttp from '../../hooks/use-http';

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
        url: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`,
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
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="8"
          ref={newPasswordInputRef}
        />
      </div>
      {!isLoading && !error && (
        <div>
          <button>Change Password</button>
        </div>
      )}
      {isLoading && <p>Sending request...</p>}
      {error && <p>{error}</p>}
      {passwordChanged && <p>Password changed successfully</p>}
    </form>
  );
};

export default ProfileForm;
