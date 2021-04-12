import { COLORS } from "../../constants/theme";

const roomButtonStyle = {
  defaultStyle: {
    backgroundColor: COLORS.light4,
    color: COLORS.primary1,
    borderWidth: 2,
    borderColor: COLORS.primary2,
  },
  thoroughStyle: {
    color: COLORS.white,
    borderWidth: 4,
    borderColor: "#05c46b",
    backgroundColor: "#05c46b",
  },
  dailyStyle: {
    color: COLORS.primary1,
    fontWeight: "bold",
    borderWidth: 4,
    borderColor: "#05c46b",
    backgroundColor: COLORS.white,
  },
};

const roomStyle = (roomId, cleaningDetail) => {
  const { currentBlockId, taskLog } = cleaningDetail;
  const { defaultStyle, thoroughStyle, dailyStyle } = roomButtonStyle;

  if (!taskLog.length) return defaultStyle;
  const currentBlock = taskLog.find((block) => block.id === currentBlockId);
  if (!currentBlock) return defaultStyle;
  const room = currentBlock.rooms.find((room) => room.id === roomId);
  if (!room) return defaultStyle;

  switch (room.cleaningType) {
    case "daily":
      return dailyStyle;
      break;
    case "thorough":
      return thoroughStyle;
      break;
    default:
      return defaultStyle;
  }
};

export { roomStyle };
