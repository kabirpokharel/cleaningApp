import React, { useState } from "react";
import { View, Text, ActivityIndicator, PixelRatio, TouchableOpacity } from "react-native";
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
  const [clickCount, setClickCount] = useState(0);
  const [singleClickTimer, setSingleClickTimer] = useState("");

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
      <CleaningApp />
    </Provider>
  );
};
