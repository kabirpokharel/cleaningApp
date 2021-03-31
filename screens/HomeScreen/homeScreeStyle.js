import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONTS } from "../../constants/theme";

export default StyleSheet.create({
  titleText: {
    paddingLeft: 20,
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
  //choose block style s
  blockStyle: {
    width: 50,
    height: 50,
    // borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 26,
    borderColor: COLORS.white,
  },
  //choose block style e
});
