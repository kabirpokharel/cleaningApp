import { COLORS } from "../../constants/theme";

const roomButtonStyle = ({ cleaningType }) => {
  switch (cleaningType) {
    case "daily":
      return {
        color: COLORS.primary1,
        fontWeight: "bold",
        borderWidth: 5,
        borderColor: "#05c46b",
        backgroundColor: COLORS.white,
      };
      break;
    case "thorough":
      return {
        fontWeight: "bold",
        color: COLORS.white,
        borderWidth: 5,
        // borderColor: "#218c74",
        // borderColor: COLORS.secondary,
        borderColor: "#05c46b",
        // backgroundColor: "#05c46b60",
        backgroundColor: COLORS.primary,
      };
      break;
    default:
      return { backgroundColor: COLORS.white, color: COLORS.primary1 };
  }
};

export { roomButtonStyle };
