import { SET_THRESHOLD } from './settingsActions';

const initialState = { threshold: 5 };

const settingsReducer = (state = initialState, action) => {
  if (action.type === SET_THRESHOLD) {
    return { threshold: action.threshold };
  } else {
    return state;
  }
};

export default settingsReducer;
