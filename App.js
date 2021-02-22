import React from "react";

import { Provider } from "react-redux";
import store from "./redux/store";
import CleaningApp from "./CleaningApp";
import { Provider as PaperProvider } from "react-native-paper";
import { defaultTheme, primary, primaryDark } from "./constants/theme";

export default () => (
  <Provider store={store}>
    <PaperProvider theme={primary}>
      <CleaningApp />
    </PaperProvider>
  </Provider>
);
