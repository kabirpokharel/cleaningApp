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

const Stack = createStackNavigator();

const NavigatePage = () => {
  const authData = useSelector((state) => {
    console.log("this is auth state in reudx form Nativate==> ", state);
    return state.auth;
  });
  return (
    <NavigationContainer>
      {/* {!authData.isSignedIn ? ( */}
      {!authData.isSignedIn && false ? (
        <Stack.Navigator>
          <Stack.Screen name="signin" component={SigninScreen} />
        </Stack.Navigator>
      ) : (
        <DrawerStack />
      )}
    </NavigationContainer>
  );
};

export default NavigatePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
