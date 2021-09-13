import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './redux/store';
import CleaningApp from './CleaningApp';

export default () => {
  const [fontsLoaded] = useFonts({
    RobotoBlack: require('./assets/fonts/Roboto-Black.ttf'),
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
    RobotoCondensedBold: require('./assets/fonts/RobotoCondensed-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <CleaningApp />
    </Provider>
  );
};
