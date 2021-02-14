import {
  SIGN_IN,
  LOAD_ROOM,
  ROOM_CLEANED,
  ROOM_REMOVED,
  COMMON_AREA_CLEANED,
  ADD_SHIFT_TIME,
} from "./actionsConstant";

export const signinUser = (enteredEmaiPassword) => {
  return {
    type: SIGN_IN,
    payload: enteredEmaiPassword,
  };
};

export const loadRooms = (blockName, roomArray) => {
  return {
    type: LOAD_ROOM,
    payload: { blockName, roomArray },
  };
};

export const roomCleaned = (room) => {
  return {
    type: ROOM_CLEANED,
    payload: room,
  };
};

export const roomRemoved = (room) => {
  return {
    type: ROOM_REMOVED,
    payload: room,
  };
};

export const commonAreaCleaned = (boolStatus) => {
  return {
    type: COMMON_AREA_CLEANED,
    payload: boolStatus,
  };
};

export const addShiftTime = (time) => {
  return {
    type: ADD_SHIFT_TIME,
    payload: time,
  };
};
