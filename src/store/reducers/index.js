import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import messageReducer from './message';
import roomReducer from './room';
import searchReducer from './search';

const rootReducer = combineReducers({
  session  : sessionReducer,
  user     : userReducer,
  message  : messageReducer,
  room     : roomReducer,
  search   : searchReducer
});

export default rootReducer;
