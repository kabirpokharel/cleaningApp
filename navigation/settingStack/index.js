import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { Entypo, AntDesign } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import {
  HomeScreen, TaskLogScreen, TimeLog, SummaryScreen, LocationScreen, SettingScreen,
} from '../../screens';

const Stack = createStackNavigator();

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

const title = 'Cleaning Log';

const SettingStack = ({ navigation }) => {
  const cleaningDetail = useSelector((state) => state.cleaning);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          screenOptions: { headerTitleAlign: 'center' },
          headerTitle: () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <LogoTitle title="Settings" />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{
                paddingHorizontal: SIZES.baseSize * 10,
                marginBottom: SIZES.baseSize * 9,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Entypo name="menu" size={33} color={COLORS.primary2} />
            </TouchableOpacity>
          ),
          headerRight: () => <View style={{ paddingHorizontal: SIZES.baseSize * 10 }} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
