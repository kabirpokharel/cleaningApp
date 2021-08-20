import { COLORS } from '../../constants/theme';

const roomButtonStyle = {
  defaultStyle: {
    backgroundColor: COLORS.white,
    color: COLORS.primary1,
    borderWidth: 1,
    borderColor: COLORS.light1,
  },
  thoroughStyle: {
    color: COLORS.white,
    borderWidth: 4,
    borderColor: '#05c46b',
    backgroundColor: '#05c46b',
    // borderColor: COLORS.primary,
    // backgroundColor: COLORS.primary,
  },
  dailyStyle: {
    color: COLORS.primary1,
    fontWeight: 'bold',
    borderWidth: 4,
    borderColor: '#05c46b',
    backgroundColor: COLORS.white,
  },
};

const roomStyle = (roomObj) => {
  const { defaultStyle, thoroughStyle, dailyStyle } = roomButtonStyle;
  if ('cleaningType' in roomObj) {
    const buttonStyle = roomObj.cleaningType === 'daily' ? dailyStyle : thoroughStyle;
    return buttonStyle;
  } return defaultStyle;
  // // if (!taskLog.length) return defaultStyle;
  // const currentBlock = taskLog.find((block) => block.shortId === selectedBlockId);
  // if (!currentBlock) return defaultStyle;
  // const selectedRoom = currentBlock.rooms.find((aRoom) => aRoom.roomId === roomId);
  // if (!selectedRoom) return defaultStyle;

  // switch (selectedRoom.cleaningType) {
  //   case 'daily':
  //     return dailyStyle;
  //     break;
  //   case 'thorough':
  //     return thoroughStyle;
  //     break;
  //   default:
  //     return defaultStyle;
  // }
};

export default roomStyle;
