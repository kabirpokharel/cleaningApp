import moment from 'moment';

const resettingRoom = ({ selectedBlockId, roomIndex }, stateCopy) => {
  const { taskLog, cleaningTypeCount } = stateCopy;
  const blockIndex = taskLog.findIndex((block) => block.shortid === selectedBlockId);

  if (taskLog[blockIndex].rooms[roomIndex].cleaningType === 'daily') {
    cleaningTypeCount.daily -= 1;
  } else cleaningTypeCount.thorough -= 1;
  delete taskLog[blockIndex].rooms[roomIndex].cleaningType;
  return stateCopy;
  // removing cleaningType to reset the room
};
const roomIsCleaned = ({ selectedBlockId, roomIndex, cleaningType }, stateCopy) => {
  const { taskLog, cleaningTypeCount } = stateCopy;
  const blockIndex = taskLog.findIndex((block) => block.shortid === selectedBlockId);
  taskLog[blockIndex].rooms[roomIndex].cleaningType = cleaningType;
  if (cleaningType === 'daily') {
    cleaningTypeCount.daily += 1;
  } else cleaningTypeCount.thorough += 1;
  return stateCopy;
};

const timeError = (diff) => (!(diff.hours() >= 0 && diff.minutes() >= 0));
const getTimeDiff = (start, end) => moment.duration(moment(end, 'HH:mm:ss a').diff(moment(start, 'HH:mm:ss a')));
const deleteTimeLog = (index, time) => time.filter((timeSet, id) => index !== id);
const initilizeTimeLog = (index, time) => {
  time[index] = { ...time[index], inputId: index };
  return time;
};
const updateTime = (payload, time) => {
  time[payload.inputId] = { ...time[payload.inputId], ...payload };
  if (!time[payload.inputId].start || !time[payload.inputId].end) {
    time[payload.inputId].status = 'incomplete';
  } else {
    const diff = getTimeDiff(time[payload.inputId].start, time[payload.inputId].end);
    if (!timeError(diff)) {
      time[payload.inputId].status = `${diff.hours()}:${diff.minutes()}`;
    } else time[payload.inputId].status = 'diff error';
  }
  return time;
};

// const resetBlock = (state, currentBlockId) => {
//   const newTaskLog = state.taskLog.map((block) => (
//     block.id === currentBlockId ? { ...block, rooms: [] } : block
//   ));
//   return { ...state, taskLog: newTaskLog };
// };

// const roomAdded = (state, payload) => {
//   const {
//     currentBlockId, blockName, roomNumber, cleaningType,
//   } = payload;
//   const stateHasBlock = state.taskLog.find((block) => block.id === currentBlockId);
//   let newTaskLog = [];
//   if (stateHasBlock) {
//     newTaskLog = state.taskLog.map((block) => (block.id === currentBlockId
//       ? {
//         ...block,
//         rooms: [
//           ...block.rooms,
//           {
//             id: roomNumber,
//             cleaningType,
//           },
//         ],
//       }
//       : block));
//   } else {
//     newTaskLog = [
//       ...state.taskLog,
//       {
//         id: currentBlockId,
//         blockName,
//         rooms: [
//           {
//             id: roomNumber,
//             cleaningType,
//           },
//         ],
//       },
//     ];
//   }
//   return newTaskLog;
// };

export {
  roomIsCleaned,
  resettingRoom,
  timeError,
  getTimeDiff,
  deleteTimeLog,
  initilizeTimeLog,
  updateTime,
  // resetBlock,
  // roomAdded,
};
