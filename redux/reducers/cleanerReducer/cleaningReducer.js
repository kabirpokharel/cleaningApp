import { roomsBlock, blocks } from "../../../dummyValues/roomsBlock";

const initialState = {
  roomsLoading: true,
  currentBlock: "",
  rooms: [],
  commonAreaCleaned: false,
  time: [],
  error: null,
};

const updateTime = (payload, time) => {
  time[payload.inputId] = { ...time[payload.inputId], ...payload };
  return time;
};

const cleaningDetail = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOAD_ROOM":
      return {
        ...state,
        currentBlock: payload.blockName,
        rooms: payload.roomArray,
        roomsLoading: false,
        error: null,
      };
    case "ROOM_CLEANED":
      const updatedRooms = state.rooms.map((room) =>
        room.id == payload.id
          ? !!room.cleaningType
            ? { ...room, cleaningType: "" }
            : payload
          : room
      );
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
    case "ADD_SHIFT_TIME":
      const updatedTime = updateTime(payload, [...state.time]);
      return {
        ...state,
        time: updatedTime,
      };
    default:
      return state;
  }
};

export default cleaningDetail;
