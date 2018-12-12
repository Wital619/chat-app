const INITIAL_STATE = {
  authUser: null
};

export const AUTH_USER_SET = 'AUTH_USER_SET';

export const setAuthUser = payload => ({ type: AUTH_USER_SET, payload });

export default function sessionReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER_SET: {
      return {
        ...state,
        authUser: action.payload
      };
    }
    default:
      return state;
  }
}
