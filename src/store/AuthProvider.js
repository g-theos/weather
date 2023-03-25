import { Provider } from 'react-redux';
import store from './store';

const AuthProvider = (props) => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
};

export default AuthProvider;