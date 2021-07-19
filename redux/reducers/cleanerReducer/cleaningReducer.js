import { ScaledSheet } from "react-native-size-matters";
import {
  deleteTimeLog,
  initilizeTimeLog,
  updateTime,
  resetBlock,
  roomAdded,
} from "./cleaningReducerFunc";

const initialState = {
  location : "",
  roomsLoading: true,
  taskLog: [],
  // taskLog: [
  //   {
  //     id: 1,
  //     blockName:"green",
  //     rooms: [
  //       {
  //         id: 1,
  //         cleaningType: "thorogh or normal",
  //       },
  //     ],
  //   },
  // ],
  currentBlockId: null,
  time: [],
  error: null,
  commonAreaCleaned: false,
};

const cleaningDetail = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_LOCATION":
      return { ...state, location:payload };
      break;
    case "LOAD_ROOM":
      const newTaskLog = state.taskLog.filter(
        (block) => !!block.rooms.length || block.id === payload
      );
      return { ...state, taskLog: newTaskLog, currentBlockId: payload };
      break;
    case "ROOM_CLEANED": {
      let newState = { ...state };
      newState.taskLog = roomAdded(state, payload); //returns updated taskLog (ie. collection of block) with selected room
      return newState;
      break;
    }
    case "REMOVE_ROOM":
      {
        let newTaskLog = state.taskLog.map((block) => {
          if (block.id === payload.currentBlockId) {
            let updatedRooms = block.rooms.filter((room) => {
              return room.id !== payload.roomNumber;
            });
            return { ...block, rooms: updatedRooms };
          } else return block;
        });
        return { ...state, taskLog: newTaskLog };
      }
      break;
    case "COMMON_AREA_CLEANED":
      return {
        ...state,
        commonAreaCleaned: payload,
      };
      break;
    case "INITILIZE_TIME_LOG": {
      const updatedTime = initilizeTimeLog(payload, [...state.time]);
      return {
        ...state,
        time: updatedTime,
      };
      break;
    }
    case "ADD_SHIFT_TIME": {
      const updatedTime = updateTime(payload, [...state.time]);
      return {
        ...state,
        time: updatedTime,
      };
      break;
    }
    case "DELETE_TIMELOG": {
      const updatedTime = deleteTimeLog(payload, [...state.time]);
      return {
        ...state,
        time: updatedTime,
      };
      break;
    }
    case "SELECT_ALL_ROOMS": {
      const { blockId, blockName, rooms } = payload;
      const newTaskLog = [...state.taskLog].filter((block) => block.id !== blockId);
      const allRooms = rooms.map((room) => ({ id: room, cleaningType: "daily" }));
      const newBlock = { id: blockId, blockName, rooms: allRooms };
      return { ...state, taskLog: [...newTaskLog, newBlock] };
      break;
    }
    case "RESET_BLOCK": {
      return resetBlock(state, payload.currentBlockId);
      break;
    }
    default:
      return state;
  }
};

export default cleaningDetail;
