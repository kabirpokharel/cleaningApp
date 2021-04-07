import {
  SIGN_IN,
  LOAD_ROOM,
  ROOM_CLEANED,
  REMOVE_ROOM,
  COMMON_AREA_CLEANED,
  ADD_SHIFT_TIME,
  DELETE_TIMELOG,
  INITILIZE_TIME_LOG,
  SELECT_ALL_ROOMS,
  RESET_BLOCK,
} from "./actionsConstant";

export const signinUser = (enteredEmaiPassword) => {
  return {
    type: SIGN_IN,
    payload: enteredEmaiPassword,
  };
};

export const loadRooms = (id) => {
  return {
    type: LOAD_ROOM,
    payload: id,
  };
};

export const roomCleaned = ({ currentBlockId, blockName, roomNumber, cleaningType }) => {
  return {
    type: ROOM_CLEANED,
    payload: { currentBlockId, blockName, roomNumber, cleaningType },
  };
};

export const removeRoom = (currentBlockId, roomNumber) => {
  return {
    type: REMOVE_ROOM,
    payload: { currentBlockId, roomNumber },
  };
};

export const commonAreaCleanedAct = (boolStatus) => {
  return {
    type: COMMON_AREA_CLEANED,
    payload: boolStatus,
  };
};

export const initilizeTimeLog = (logIndex) => {
  return {
    type: INITILIZE_TIME_LOG,
    payload: logIndex,
  };
};
export const addShiftTime = (time) => {
  return {
    type: ADD_SHIFT_TIME,
    payload: time,
  };
};
export const deleteTimeLog = (logIndex) => {
  return {
    type: DELETE_TIMELOG,
    payload: logIndex,
  };
};

export const selectAllRooms = (blockId, blockName, rooms) => {
  console.log("see the values for selectAllRooms action creator======>", blockId);
  return {
    type: SELECT_ALL_ROOMS,
    payload: { blockId, blockName, rooms },
  };
};

export const resetCurrentBlock = (currentBlockId) => {
  console.log("this is blockId");
  return {
    type: RESET_BLOCK,
    payload: { currentBlockId },
  };
};
