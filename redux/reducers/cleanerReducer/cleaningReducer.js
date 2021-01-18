import { roomsBlock, blocks } from "../../../dummyValues/roomsBlock";

const initialState = {
  roomsLoading: true,
  currentBlock: "",
  rooms: [],
  commonAreaCleaned: false,
  error: null,
};

const cleaningDetail = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOAD_ROOM":
      return {
        ...state,
        currentBlock: payload.blockName, // change in this value
        rooms: payload.roomArray,
        roomsLoading: false,
        error: null,
      };
    case "ROOM_CLEANED":
      const updatedRooms = [...state.rooms].map((room) => {
        let temp =
          room.id == payload.id
            ? !!room.cleaningType
              ? { ...room, cleaningType: "" }
              : payload
            : room;
        return temp;
      });
      return {
        ...state,
        rooms: updatedRooms,
        roomsLoading: false,
        error: null,
      };

    case "ROOM_REMOVED":
      return {
        ...state,
        rooms: payload.roomArray,
        roomsLoading: false,
        error: null,
      };
    case "COMMON_AREA_CLEANED":
      return {
        ...state,
        commonAreaCleaned: true,
        roomsLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default cleaningDetail;
