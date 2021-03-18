import { roomsBlock, blocks } from "../../../dummyValues/roomsBlock";
import moment from "moment";

const initialState = {
  roomsLoading: true,
  currentBlock: "",
  rooms: [],
  commonAreaCleaned: false,
  time: [],
  error: null,
};

const timeError = (diff) => {
  return diff.hours() >= 0 && diff.minutes() >= 0 ? false : true;
};
const getTimeDiff = (start, end) => {
  return moment.duration(moment(end, "HH:mm:ss a").diff(moment(start, "HH:mm:ss a")));
};
const deleteTimeLog = (index, time) => {
  return time.filter((timeSet, id) => index !== id);
};
const updateTime = (payload, time) => {
  time[payload.inputId] = { ...time[payload.inputId], ...payload };
  if (!time[payload.inputId].start || !time[payload.inputId].end) {
    time[payload.inputId].status = "incomplete";
  } else {
    let diff = getTimeDiff(time[payload.inputId].start, time[payload.inputId].end);
    if (!timeError(diff)) {
      time[payload.inputId].status = `${diff.hours()}:${diff.minutes()}`;
    } else time[payload.inputId].status = "diff error";
  }
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
    case "ADD_SHIFT_TIME": {
      const updatedTime = updateTime(payload, [...state.time]);
      return {
        ...state,
        time: updatedTime,
      };
    }
    case "DELETE_TIMELOG": {
      const updatedTime = deleteTimeLog(payload, [...state.time]);
      return {
        ...state,
        time: updatedTime,
      };
    }
    default:
      return state;
  }
};

export default cleaningDetail;
