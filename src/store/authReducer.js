import { LOGIN, LOGOUT } from './authActions';

const initialState = {
  token: null,
  userId: null,
  isLoggedIn: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
        isLoggedIn: true
      };
    case LOGOUT:
      return {
        token: null,
        userId: null,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export default authReducer;