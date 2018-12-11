import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import messageReducer from './message';

const rootReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
  message: messageReducer,
});

export default rootReducer;
