const INITIAL_STATE = {
  messages: null,
  limit: 5
};

export const MESSAGES_SET = 'MESSAGES_SET';
export const MESSAGES_LIMIT_SET = 'MESSAGES_LIMIT_SET';

export const setMessages = payload => ({ type: MESSAGES_SET, payload });
export const setMessagesLimit = payload => ({ type: MESSAGES_LIMIT_SET, payload });

export default function messageReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MESSAGES_SET: {
      return {
        ...state,
        messages: action.payload
      };
    }
    case MESSAGES_LIMIT_SET: {
      return {
        ...state,
        limit: action.payload
      };
    }
    default:
      return state;
  }
}
