import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
// import HomeScreen from "./screens/HomeScreen";
// import ProfileScreen from "./screens/ProfileScreen";
import HomeStack from "./navigation/homeStack";
import DrawerStack from "./navigation/drawerStack";
import { SigninScreen, SignupScreen } from "./screens";
import { COLORS, SIZES, FONTS } from "./constants/theme";
import AuthStack from "./navigation/authStack";

const Stack = createStackNavigator();

const NavigatePage = (props) => {
  const authData = useSelector((state) => {
    // console.log("this is auth state in reudx form Nativate==> ", state);
    return state.auth;
  });
  return (
    <NavigationContainer>
      {!authData.isSignedIn ? (
        <AuthStack />
      ) : (
        // <Stack.Navigator>
        //   <Stack.Screen name="signin" component={SigninScreen} />
        // </Stack.Navigator>
        <DrawerStack />
      )}
    </NavigationContainer>
  );
};

export default NavigatePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
