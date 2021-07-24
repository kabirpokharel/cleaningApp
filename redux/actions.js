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
  SET_LOCATION,
  INITILIZE_TASK_LOG,
  UPDATE_CURRENT_BLOCK_ID,
} from './actionsConstant';

export const signinUser = (enteredEmaiPassword) => ({
  type: SIGN_IN,
  payload: enteredEmaiPassword,
});
// export const logoutUser = () => ({ type: LOGOUT_USER });

// *********************************below are rooms and time actions******************************************

export const setLocation = (location) => ({
  type: SET_LOCATION,
  payload: location,
});

export const initilizeTaskLog = (taskLog) => ({
  type: INITILIZE_TASK_LOG,
  payload: taskLog,
});

export const roomCleaned = (selectedBlockId, roomId, cleaningType) => ({
  type: ROOM_CLEANED,
  payload: { selectedBlockId, roomId, cleaningType },
});

// export const updateCurrentBlockId = (blockId) => ({
//   type: UPDATE_CURRENT_BLOCK_ID,
//   payload: blockId,
// });

// *********************below are old action creators

export const loadRooms = (id) => ({
  type: LOAD_ROOM,
  payload: id,
});

// export const roomCleaned = ({
//   currentBlockId, blockName, roomNumber, cleaningType,
// }) => ({
//   type: ROOM_CLEANED,
//   payload: {
//     currentBlockId, blockName, roomNumber, cleaningType,
//   },
// });

export const removeRoom = (currentBlockId, roomNumber) => ({
  type: REMOVE_ROOM,
  payload: { currentBlockId, roomNumber },
});

export const commonAreaCleanedAct = (boolStatus) => ({
  type: COMMON_AREA_CLEANED,
  payload: boolStatus,
});

export const initilizeTimeLog = (logIndex) => ({
  type: INITILIZE_TIME_LOG,
  payload: logIndex,
});
export const addShiftTime = (time) => ({
  type: ADD_SHIFT_TIME,
  payload: time,
});
export const deleteTimeLog = (logIndex) => ({
  type: DELETE_TIMELOG,
  payload: logIndex,
});

export const selectAllRooms = (blockId, blockName, rooms) => {
  console.log('see the values for selectAllRooms action creator======>', blockId);
  return {
    type: SELECT_ALL_ROOMS,
    payload: { blockId, blockName, rooms },
  };
};

export const resetCurrentBlock = (currentBlockId) => {
  console.log('this is blockId');
  return {
    type: RESET_BLOCK,
    payload: { currentBlockId },
  };
};
