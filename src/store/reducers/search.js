const INITIAL_STATE = {
  foundUsers: null,
  isSearching: false
};

export const FOUND_USERS_SET = 'FOUND_USERS_SET';
export const IS_SEARCHING_SET = 'IS_SEARCHING_SET';

export const handleFoundUsers = payload => ({ type: FOUND_USERS_SET, payload });
export const handleStartSearching = payload => ({ type: IS_SEARCHING_SET, payload });

export default function searchReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FOUND_USERS_SET: {
      return {
        ...state,
        foundUsers: action.payload
      };
    }
    case IS_SEARCHING_SET: {
      return {
        ...state,
        isSearching: action.payload
      };
    }
    default:
      return state;
  }
}
