import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import messageReducer from './message';
import roomReducer from './room';

const rootReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
  message: messageReducer,
  room: roomReducer
});

export default rootReducer;
