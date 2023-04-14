import { SetThreshold } from './settingsActions';

const initialState = { threshold: 5 };

const settingsReducer = (state = initialState, action) => {
  if (action.type === SetThreshold) {
    return { threshold: action.threshold };
  } else {
    return state;
  }
};

export default settingsReducer;
