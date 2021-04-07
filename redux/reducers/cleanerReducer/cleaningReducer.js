import moment from "moment";
import { loadRooms } from "../../actions";

const initialState = {
  roomsLoading: true,
  taskLog: [],
  // taskLog: [
  //   {
  //     id: 1,
  //     blockName:"green",
  //     rooms: [
  //       {
  //         id: 1,
  //         cleaningType: "",
  //       },
  //     ],
  //   },
  // ],
  currentBlockId: null,
  time: [],
  error: null,
  commonAreaCleaned: false,
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
const initilizeTimeLog = (index, time) => {
  time[index] = { ...time[index], inputId: index };
  return time;
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

const resetBlock = (state, currentBlockId) => {
  const newTaskLog = state.taskLog.map((block) => {
    return block.id === currentBlockId ? { ...block, rooms: [] } : block;
  });
  return { ...state, taskLog: newTaskLog };
};

const cleaningDetail = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOAD_ROOM":
      const newTaskLog = state.taskLog.filter(
        (block) => !!block.rooms.length || block.id === payload
      );
      return { ...state, taskLog: newTaskLog, currentBlockId: payload };
      break;
    case "ROOM_CLEANED": {
      const { currentBlockId, blockName, roomNumber, cleaningType } = payload;
      const stateHasBlock = state.taskLog.find((block) => block.id === currentBlockId);
      let newState = { ...state };
      let newTaskLog = {};
      if (!!stateHasBlock) {
        newTaskLog = state.taskLog.map((block) =>
          block.id === currentBlockId
            ? {
                ...block,
                rooms: [
                  ...block.rooms,
                  {
                    id: roomNumber,
                    cleaningType,
                  },
                ],
              }
            : block
        );
      } else {
        newTaskLog = [
          ...state.taskLog,
          {
            id: currentBlockId,
            blockName,
            rooms: [
              {
                id: roomNumber,
                cleaningType,
              },
            ],
          },
        ];
      }
      newState.taskLog = newTaskLog;
      return newState;
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
    }
    case "RESET_BLOCK": {
      return resetBlock(state, payload.currentBlockId);
    }
    default:
      return state;
  }
};

export default cleaningDetail;
