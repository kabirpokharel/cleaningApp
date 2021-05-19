import React from "react";
import { View, Text, ActivityIndicator, PixelRatio } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./redux/store";
import CleaningApp from "./CleaningApp";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { loading: true };
//   }

//   async componentWillMount() {
//     await useFonts.loadAsync({
//       RobotoBlack: require("./assets/fonts/Roboto-Black.ttf"),
//       RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
//       RobotoCondensedBold: require("./assets/fonts/RobotoCondensed-Bold.ttf"),
//     });
//     this.setState({ loading: false });
//   }

//   render() {
//     if (this.state.loading) {
//       return (
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//           <ActivityIndicator size="large" color="#00ff00" />
//         </View>
//       );
//     }
//     return (
//       <Provider store={store}>
//         <CleaningApp />
//       </Provider>
//     );
//   }
// }

// export default App;
const pixelRatio = PixelRatio.get();
export default () => {
  let [fontsLoaded] = useFonts({
    RobotoBlack: require("./assets/fonts/Roboto-Black.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoCondensedBold: require("./assets/fonts/RobotoCondensed-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            height: pixelRatio > 2 ? 200 * 0.9 : 200,
            width: pixelRatio > 2 ? 200 * 0.9 : 200,
            backgroundColor: "pink",
            margin: 20,
          }}
        >
          <Text style={{ fontSize: pixelRatio > 2 ? 30 * 0.85 : 30 }}>Hello World</Text>
        </View>
      </View> */}
      <CleaningApp />
    </Provider>
  );
};
