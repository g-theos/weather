import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';
import settingsReducer from './settingsReducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer
});

const store = createStore(rootReducer, composeWithDevTools( ));

export default store;