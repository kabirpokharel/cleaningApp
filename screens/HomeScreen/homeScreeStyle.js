import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONTS } from "../../constants/theme";

export default StyleSheet.create({
  titleText: {
    // marginBottom: 15,
    paddingLeft: 20,
    // letterSpacing: 1,
    color: COLORS.primary1,
  },
  descriptionText: {
    color: COLORS.primary2,
    paddingLeft: 20,
  },
  blockContainerWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
