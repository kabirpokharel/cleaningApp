import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import HomeStack from "../homeStack";
import AuthStack from "../authStack";
import CustomDrawer from "../../component/CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        options={{ title: "Home" }}
        name="homeStack"
        component={HomeStack}
      />
      <Drawer.Screen
        options={{ title: "Settings" }}
        name="authStack"
        component={AuthStack}
      />
    </Drawer.Navigator>
  );
};
export default DrawerStack;
