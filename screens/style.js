import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants/theme";

const commonStyle = StyleSheet.create({
  containerWrapper: {
    // marginHorizontal: 20,
  },
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
});

export default commonStyle;
