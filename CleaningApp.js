import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
// import HomeScreen from "./screens/HomeScreen";
// import ProfileScreen from "./screens/ProfileScreen";
import HomeStack from './navigation/homeStack';
import DrawerStack from './navigation/drawerStack';
// import { SigninScreen, SignupScreen } from './screens';
// import { COLORS, SIZES, FONTS } from './constants/theme';
import AuthStack from './navigation/authStack';
// import ExtrasScreen from './screens/Extras/ExtrasScreen';

// const Stack = createStackNavigator();

const NavigatePage = () => {
  const authData = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      {!authData.isSignedIn ? <AuthStack /> : <DrawerStack />}
    </NavigationContainer>
  );
};

export default NavigatePage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
