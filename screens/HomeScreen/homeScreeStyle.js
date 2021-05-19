import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONTS } from "../../constants/theme";

export default StyleSheet.create({
  titleText: {
    paddingLeft: SIZES.baseSize * 20,
    color: COLORS.primary1,
  },
  descriptionText: {
    color: COLORS.primary2,
    paddingLeft: SIZES.baseSize * 20,
  },
  blockContainerWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  //choose block style s
  blockStyle: {
    width: SIZES.baseSize * 45,
    height: SIZES.baseSize * 45,
    // borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    borderRadius: SIZES.baseSize * 26,
    borderColor: "transparent",
  },
  //choose block style e
});
