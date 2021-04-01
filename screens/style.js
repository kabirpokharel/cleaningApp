import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants/theme";

const commonStyle = StyleSheet.create({
  containerWrapper: {
    // marginHorizontal: 20,
  },
  titleContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  titleText: {
    color: COLORS.primary1,
  },
  descriptionText: {
    color: COLORS.primary2,
  },
  blockContainerWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default commonStyle;
