import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import HomeScreen from "./screens/HomeScreen";
// import ProfileScreen from "./screens/ProfileScreen";
import HomeStack from "./navigation/homeStack";
import DrawerStack from "./navigation/drawerStack";

const Stack = createStackNavigator();

const NavigatePage = () => {
  return (
    <NavigationContainer>
      {/* <HomeStack /> */}
      <DrawerStack />
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
