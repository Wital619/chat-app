const INITIAL_STATE = {
  currentRoomMessages: [],
};

const CURRENT_ROOM_MESSAGES_SET = 'CURRENT_ROOM_MESSAGES_SET';

export const setCurrentRoomMessages = payload => ({ 
  type: CURRENT_ROOM_MESSAGES_SET, 
  payload 
});

export default function roomReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CURRENT_ROOM_MESSAGES_SET: {
      return {
        ...state,
        currentRoomMessages: action.payload
      };
    }
    default:
      return state;
  }
}
