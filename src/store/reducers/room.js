const INITIAL_STATE = {
  rooms: null,
  currentRoomMessages: []
};

export const ROOMS_SET = 'ROOMS_SET';
export const CURRENT_ROOM_MESSAGES_SET = 'CURRENT_ROOM_MESSAGES_SET';

export const setRooms = payload => ({ type: ROOMS_SET, payload });
export const setCurrentRoomMessages = payload => ({ 
  type: CURRENT_ROOM_MESSAGES_SET, 
  payload 
});

export default function roomReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ROOMS_SET: {
      return {
        ...state,
        rooms: action.payload
      };
    }
    case CURRENT_ROOM_MESSAGES_SET: {
      const obj = {
        ...state,
        currentRoomMessages: action.payload
      };

      return obj;
    }
    default:
      return state;
  }
}
