import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import DrawerStack from './navigation/drawerStack';
import AuthStack from './navigation/authStack';

const NavigatePage = () => {
  const authData = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      {!authData.isSignedIn ? <AuthStack /> : <DrawerStack />}
    </NavigationContainer>
  );
};

export default NavigatePage;
