const INITIAL_STATE = {
  userRooms: [],
  currentRoomMessages: []
};

export const USER_ROOMS_SET = 'USER_ROOMS_SET';
export const CURRENT_ROOM_MESSAGES_SET = 'CURRENT_ROOM_MESSAGES_SET';

export const setUserRooms = payload => ({ type: USER_ROOMS_SET, payload });
export const setCurrentRoomMessages = payload => ({ 
  type: CURRENT_ROOM_MESSAGES_SET, 
  payload 
});

export default function roomReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_ROOMS_SET: {
      return {
        ...state,
        userRooms: action.payload
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
