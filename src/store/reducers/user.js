const INITIAL_STATE = {
  users: null,
  selectedUser: {
    uid: null,
    displayName: null
  }
};

export const USER_SELECT = 'USER_SELECT';
export const USER_SET = 'USER_SET'; 
export const USERS_SET = 'USERS_SET';

export const selectUser = payload => ({ type: USER_SELECT, payload });
export const setUser = payload => ({ type: USER_SET, payload });
export const setUsers = payload => ({ type: USERS_SET, payload });

export default function userReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_SELECT: {
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          ...action.payload
        }
      };
    }
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
