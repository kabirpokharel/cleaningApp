import React from "react";

import { Provider } from "react-redux";
import store from "./redux/store";
import CleaningApp from "./CleaningApp";
import { Provider as PaperProvider } from "react-native-paper";
import { themeConst } from "./constants/theme";

export default () => (
  <Provider store={store}>
    <PaperProvider theme={themeConst}>
      <CleaningApp />
    </PaperProvider>
  </Provider>
);
