import React from "react";
import { View, Text } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "../homeStack";
import AuthStack from "../authStack";
import CustomDrawer from "../../component/CustomDrawer";
import SigninScreen from "../../screens/SigninScreen";
import { ResetPassword, SettingScreen, SignupScreen } from "../../screens";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { color } from "react-native-reanimated";

const Drawer = createDrawerNavigator();

const DummyComp1 = () => (
  <View>
    <Text>Apple</Text>
  </View>
);
const DummyComp2 = () => (
  <View>
    <Text>Ball</Text>
  </View>
);
const DummyComp3 = () => (
  <View>
    <Text>Cat</Text>
  </View>
);

const DrawerStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      {/* <Drawer.Screen
        options={{ title: "Signin" }}
        name="Signin"
        component={SigninScreen}
      /> */}
      <Drawer.Screen
        options={{
          title: "Home",
          drawerIcon: ({ focused, size }) => (
            // <Ionicons name="md-home" size={size} color={focused ? "#7cc" : "#ccc"} />
            <AntDesign name="home" size={size} color={focused ? COLORS.dark3 : COLORS.primary} />
          ),
        }}
        name="homeStack"
        component={HomeStack}
      />
      <Drawer.Screen
        options={{
          title: "Settings",
          drawerIcon: ({ focused, size }) => (
            <AntDesign name="setting" size={size} color={focused ? COLORS.dark3 : COLORS.primary} />
          ),
        }}
        name="authStack"
        component={SettingScreen}
      />
      <Drawer.Screen
        options={{
          title: "Notificaitons",
          drawerIcon: ({ focused, size }) => (
            <AntDesign name="bells" size={size} color={focused ? COLORS.dark3 : COLORS.primary} />
          ),
        }}
        name="dummy1"
        component={DummyComp1}
      />
      <Drawer.Screen
        options={{
          title: "Logout",
          drawerIcon: ({ focused, size }) => (
            <AntDesign name="logout" size={size} color={focused ? COLORS.dark3 : COLORS.primary} />
          ),
        }}
        name="dummy2"
        component={DummyComp2}
      />
    </Drawer.Navigator>
  );
};
export default DrawerStack;
