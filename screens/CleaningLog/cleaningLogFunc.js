import { COLORS } from "../../constants/theme";

const roomButtonStyle = ({ cleaningType }) => {
  switch (cleaningType) {
    case "daily":
      return {
        color: COLORS.primary1,
        fontWeight: "bold",
        borderWidth: 4,
        borderColor: "#05c46b",
        backgroundColor: COLORS.white,
      };
      break;
    case "thorough":
      return {
        color: COLORS.white,
        borderWidth: 4,
        borderColor: "#05c46b",
        backgroundColor: "#05c46b",
        // backgroundColor: "#05c46b60",
        // backgroundColor: COLORS.primary,
        // backgroundColor: COLORS.secondary,
      };
      break;
    default:
      return {
        backgroundColor: COLORS.light2,
        color: COLORS.primary1,
        borderWidth: 2,
        borderColor: COLORS.primary2,
      };
  }
};

export { roomButtonStyle };
