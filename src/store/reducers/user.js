const INITIAL_STATE = {
  users: null
};

export const USER_SET = 'USER_SET'; 
export const USERS_SET = 'USERS_SET'; 

export const setUser = payload => ({ type: USER_SET, payload });
export const setUsers = payload => ({ type: USERS_SET, payload });

export default function userReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USERS_SET: {
      return {
        ...state,
        users: action.payload
      };
    }
    case USER_SET: {
      return {
        ...state,
        users: {
          ...state.users,
          [action.uid]: action.payload,
        }
      };
    }
    default:
      return state;
  }
}
