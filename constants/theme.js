import { DefaultTheme } from "react-native-paper";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const themeConst = {
  dark: false,
  roundness: 4,
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#034748",
    accent: "#11B5E4",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    text: "#001021",
    error: "#B71F0E",
    disabled: "#BEC6C6",
    placeholder: "#1481BA",
    backdrop: "#001021",
  },
  // fonts: configureFonts(fonts),
  animation: { scale: 1.0 },
  screenDimension: {
    height: height,
    width: width,
  },
  FONTS: {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
  },
};

// export const COLORS = {
//   // base colors
//   primary: "#FC6D3F", // orange
//   secondary: "#CDCDD2", // gray

//   // colors
//   black: "#1E1F20",
//   white: "#FFFFFF",

//   lightGray: "#F5F5F6",
//   lightGray2: "#F6F6F7",
//   lightGray3: "#EFEFF1",
//   lightGray4: "#F8F8F9",
//   transparent: "transparent",
//   darkgray: "#898C95",
// };

// export const FONTS = {
//   largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
//   h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
//   h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
//   h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
//   h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
//   body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
//   body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
//   body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
//   body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
//   body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
// };

// const appTheme = { defaultTheme, primary, primaryDark, COLORS, SIZES, FONTS };
// export default appTheme;
