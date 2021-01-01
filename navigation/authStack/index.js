import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  SigninScreen,
  SignupScreen,
  ForgotPassword,
  ResetPassword,
  SettingScreen,
} from "../../screens";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="signin" component={SigninScreen} />
      <Stack.Screen name="setting" component={SettingScreen} />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Signup" }}
      />

      <Stack.Screen name="Reset Password" component={ResetPassword} />
      <Stack.Screen name="forgot password" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
