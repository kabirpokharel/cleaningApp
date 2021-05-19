import moment from "moment";

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

const roomAdded = (state, payload) => {
  const { currentBlockId, blockName, roomNumber, cleaningType } = payload;
  const stateHasBlock = state.taskLog.find((block) => block.id === currentBlockId);
  let newTaskLog = [];
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
  return newTaskLog;
};

export {
  timeError,
  getTimeDiff,
  deleteTimeLog,
  initilizeTimeLog,
  updateTime,
  resetBlock,
  roomAdded,
};
