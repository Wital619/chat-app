const INITIAL_STATE = {
  users: [],
  selectedUser: {}
};

const USER_SELECT = 'USER_SELECT';
const USERS_SET = 'USERS_SET';

export const selectUser = payload => ({ type: USER_SELECT, payload });
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
    default:
      return state;
  }
}
