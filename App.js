import React from "react";
import CleaningApp from "./CleaningApp";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
};

export default () => (
  <PaperProvider theme={theme}>
    <CleaningApp />
  </PaperProvider>
);
