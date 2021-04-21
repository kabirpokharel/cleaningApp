import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  SigninScreen,
  SignupScreen,
  ForgotPassword,
  ResetPassword,
  SettingScreen,
} from "../../screens";
import { COLORS, FONTS } from "../../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

const LogoTitle = ({ title }) => {
  return (
    <View
      style={{
        width: 190,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: "center",
        backgroundColor: COLORS.light4,
        justifyContent: "center",
        borderRadius: 25,
        marginBottom: 9,
      }}
    >
      <Text style={[FONTS.body3, { color: COLORS.primary2, letterSpacing: 0.8 }]}>{title}</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="summaryScreen"
        component={SigninScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          screenOptions: { headerTitleAlign: "center" },
          headerTitle: () => (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <LogoTitle title={"Signin"} />
            </View>
          ),
        }}
      />

      {/* <Stack.Screen name="Signup" component={SignupScreen} options={{ title: "Signup" }} />
      <Stack.Screen name="setting" component={SettingScreen} />

      <Stack.Screen name="Reset Password" component={ResetPassword} />
      <Stack.Screen name="forgot password" component={ForgotPassword} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
