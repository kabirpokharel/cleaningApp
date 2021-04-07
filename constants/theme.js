import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  //   primary: "#FC6D3F", // orange
  //   secondary: "#CDCDD2", // gray

  primary: "#034748",
  primary1: "#5d867a",
  primary2: "#9ab4ac",
  secondary: "#fd5523",
  secondary1: "#fd774f",
  secondary2: "#feaa91",
  // dark
  dark1: "#101f1b",
  dark2: "#152a24",
  dark3: "#1b342d",
  //light
  light1: "#c2d2cd",
  light2: "#cddada",
  light3: "#d7e1de",
  light4: "#e6eded",

  error: "#ff0033",
  white: "#ffffff",
};

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
  h2: 28,
  h3: 22,
  h4: 20,
  h5: 19,
  h6: 14,
  body1: 30,
  body2: 28,
  body3: 20,
  body4: 16,
  body5: 14,
  body6: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 33 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontFamily: "Roboto-Bold", fontSize: SIZES.h5, lineHeight: 20 },
  h6: { fontFamily: "Roboto-Bold", fontSize: SIZES.h6, lineHeight: 18 },
  body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 25 },
  body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
  body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
  body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body6, lineHeight: 22 },
};
