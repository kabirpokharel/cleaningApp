import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./redux/store";
import CleaningApp from "./CleaningApp";
import { Provider as PaperProvider } from "react-native-paper";
// import { themeConst } from "./constants/theme";

export default () => {
  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      {/* <PaperProvider theme={themeConst}> */}
      <CleaningApp />
      {/* </PaperProvider> */}
    </Provider>
  );
};
