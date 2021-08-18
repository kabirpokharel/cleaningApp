import React from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  SigninScreen,
  SignupScreen,
  ForgotPassword,
  ResetPassword,
  SettingScreen,
} from '../../screens';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const titleObj = (title, navigation) => ({
  headerStyle: {
    backgroundColor: COLORS.white,
  },
  screenOptions: { headerTitleAlign: 'center' },
  headerTitle: () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LogoTitle title={title} />
    </View>
  ),
  headerLeft: () => {
    if (title === 'Signin') return null;
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          paddingHorizontal: SIZES.baseSize * 10,
          marginBottom: SIZES.baseSize * 9,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AntDesign name="arrowleft" size={33} color={COLORS.primary2} />
      </TouchableOpacity>
    );
  },
});

const LogoTitle = ({ title }) => (
  <View
    style={{
      width: SIZES.baseSize * 190,
      paddingHorizontal: SIZES.baseSize * 10,
      paddingVertical: SIZES.baseSize * 5,
      marginBottom: SIZES.baseSize * 9,
      alignItems: 'center',
      backgroundColor: COLORS.light4,
      justifyContent: 'center',
      borderRadius: 25,
    }}
  >
    <Text style={[FONTS.body3, { color: COLORS.primary2, letterSpacing: 0.8 }]}>{title}</Text>
  </View>
);

const Stack = createStackNavigator();

const AuthStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Signin"
      component={SigninScreen}
      options={({ navigation }) => titleObj('Signin', navigation)}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={({ navigation }) => titleObj('Signup', navigation)}
    />

    {/* <Stack.Screen name="Signup" component={SignupScreen} options={{ title: "Signup" }} />
      <Stack.Screen name="setting" component={SettingScreen} />

      <Stack.Screen name="Reset Password" component={ResetPassword} />
      <Stack.Screen name="forgot password" component={ForgotPassword} /> */}
  </Stack.Navigator>
);

export default AuthStack;
