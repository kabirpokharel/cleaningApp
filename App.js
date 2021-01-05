import React from "react";
import CleaningApp from "./CleaningApp";
import { Provider as PaperProvider } from "react-native-paper";
import { defaultTheme, primary, primaryDark } from "./constants/theme";

export default () => (
  <PaperProvider theme={defaultTheme}>
    <CleaningApp />
  </PaperProvider>
);
