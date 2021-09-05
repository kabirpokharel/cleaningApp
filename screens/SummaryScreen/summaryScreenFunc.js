import axios from 'axios';
import { baseUrl } from '../../constants/constants';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const dataFormatter = (taskLog, setblockDetails) => {
  const dailyCleaned = {};
  const thoroughCleaned = {};
  const unAttended = {};
  const blockNames = [];
  taskLog.forEach((block) => {
    blockNames.push(block.name);
    let dailyCleanedHolder = [];
    let thoroughCleanedHolder = [];
    let unAttendedArrayHolder = [];
    block.rooms.forEach((room) => {
      if (!('_id' in room)) {
        if ('cleaningType' in room) {
          if (room.cleaningType === 'daily') {
            console.log('watch out for cleaning type daily --- --> ', room.roomId);
            dailyCleanedHolder = [...dailyCleanedHolder, room.roomId];
            dailyCleaned[block.name] = dailyCleanedHolder;
          } else {
            thoroughCleanedHolder = [...thoroughCleanedHolder, room.roomId];
            thoroughCleaned[block.name] = thoroughCleanedHolder;
          }
        } else {
          unAttendedArrayHolder = [...unAttendedArrayHolder, room.roomId];
          unAttended[block.name] = unAttendedArrayHolder;
        }
      }
    });
  });
  setblockDetails({
    blockNames, dailyCleaned, thoroughCleaned, unAttended,
  });
};

const submitTaskLog = (setLoding, setPopup, setError, taskLog, currentUser, location, startAt) => {
  setLoding(true);
  console.log('see this tasklog -- -- > ', taskLog.length);
  const refinedTasklog = taskLog.map((block) => { // data to send to server
    if ('shortid' in block) {
      // jsut to change shortid to block in tasks array
      delete Object.assign(block, { block: block.shortid }).shortid;
    }
    const filterdRooms = block.rooms.filter((room) => !('_id' in room) && ('cleaningType' in room));
    const filteredExtras = block.extras.filter((item) => !('_id' in item) && 'cleaningType' in item);
    // console.log('this is filtered extras --- --> ', filteredExtras);
    return { ...block, rooms: filterdRooms, extras: filteredExtras };
  });
    // console.log('this is refined tasklog -- -- > ', refinedTasklog);
    // console.log('888888888888888888888888888 > ', {
    //   user: currentUser.shortid, tasks: refinedTasklog, location: location.shortid, startAt, endAt: new Date().toString(),
    // });
  axios({
    method: 'post',
    url: `${baseUrl}/tasklog/create`,
    data: {
      user: currentUser.shortid,
      tasks: refinedTasklog,
      location: location.shortid,
      startAt,
      endAt: new Date().toString(),
    },
    // data: temp,
  }).then((res) => {
    console.log('tasklog stored to database....success!!!------->', res.data);
    setLoding(false);
    setPopup(true);
  })
    .catch((err) => {
      console.log('see this is an error in tasklog create***--------> ', err);
      setLoding(false);
      setError(true);
      setPopup(true);
    });
};

const processBlockRoomStatus = (blockName, cleaningTypeObj) => {
  if (blockName in cleaningTypeObj) {
    return cleaningTypeObj[blockName];
  } return [];
};

export {
  dataFormatter,
  submitTaskLog,
  processBlockRoomStatus,
};
