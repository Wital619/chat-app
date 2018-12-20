const INITIAL_STATE = {
  foundUsers: null
};

const FOUND_USERS_SET = 'FOUND_USERS_SET';

export const handleFoundUsers = payload => ({ type: FOUND_USERS_SET, payload });

export default function searchReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FOUND_USERS_SET: {
      return {
        ...state,
        foundUsers: action.payload
      };
    }
    default:
      return state;
  }
}
