import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "../../screens/SignupScreen";
import SigninScreen from "../../screens/SigninScreen";
import ForgotPassword from "../../screens/ForgotPasswordScreen";
import ResetPassword from "../../screens/ResetPassword";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Signup" }}
      />
      <Stack.Screen name="signin" component={SigninScreen} />
      <Stack.Screen name="Reset Password" component={ResetPassword} />
      <Stack.Screen name="forgot password" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
