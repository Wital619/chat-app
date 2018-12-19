import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import roomReducer from './room';
import searchReducer from './search';

const rootReducer = combineReducers({
  session  : sessionReducer,
  user     : userReducer,
  room     : roomReducer,
  search   : searchReducer
});

const USER_LOGOUT = 'USER_LOGOUT';

export const logoutUser = () => ({ type: USER_LOGOUT });

export default (state, action) => (
  action.type === USER_LOGOUT
    ? rootReducer(undefined, action)
    : rootReducer(state, action)
);
