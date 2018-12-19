const INITIAL_STATE = {
  rooms: [],
  currentRoomMessages: [],
};

export const USER_ROOMS_SET = 'USER_ROOMS_SET';
export const CURRENT_ROOM_MESSAGES_SET = 'CURRENT_ROOM_MESSAGES_SET';
export const ROOM_LAST_MESSAGE_SET = 'ROOM_LAST_MESSAGE_SET';

export const setUserRooms = payload => ({ type: USER_ROOMS_SET, payload });
export const setCurrentRoomMessages = payload => ({ 
  type: CURRENT_ROOM_MESSAGES_SET, 
  payload 
});
export const setRoomLastMessage = payload => ({ type: ROOM_LAST_MESSAGE_SET, payload });

export default function roomReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_ROOMS_SET: {
      return {
        ...state,
        userRooms: action.payload
      };
    }
    case CURRENT_ROOM_MESSAGES_SET: {
      return {
        ...state,
        currentRoomMessages: action.payload
      };
    }
    case ROOM_LAST_MESSAGE_SET: {
      return {
        ...state,
        rooms: []
      };
    }
    default:
      return state;
  }
}
