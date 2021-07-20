import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Entypo, AntDesign } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import {
  HomeScreen, CleaningLog, TimeLog, SummaryScreen, LocationScreen,
} from '../../screens';

const Stack = createStackNavigator();

const LogoTitle = ({ title }) => (
  <View
    style={{
      width: 190,
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignItems: 'center',
      backgroundColor: COLORS.light4,
      justifyContent: 'center',
      borderRadius: 25,
      marginBottom: 9,
    }}
  >
    <Text style={[FONTS.body3, { color: COLORS.primary2, letterSpacing: 0.8 }]}>{title}</Text>
  </View>
);

const title = 'Cleaning Log';

const HomeStack = ({ navigation }) => {
  console.log('see this is navigation from HomeStack=========>', navigation);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="location"
        component={LocationScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          screenOptions: { headerTitleAlign: 'center' },
          headerTitle: () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <LogoTitle title="Location" />
            </View>
          ),
          // headerLeft: () => (
          //   <TouchableOpacity
          //     onPress={() => navigation.openDrawer()}
          //     style={{
          //       paddingHorizontal: 10,
          //       marginBottom: 9,
          //       alignItems: "center",
          //       justifyContent: "center",
          //     }}
          //   >
          //     <Entypo name="menu" size={33} color={COLORS.primary2} />
          //   </TouchableOpacity>
          // ),

          // headerRight: () => <View style={{ paddingHorizontal: 10 }} />,
        }}
      />
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          screenOptions: { headerTitleAlign: 'center' },
          headerTitle: () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <LogoTitle title={title} />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{
                paddingHorizontal: 10,
                marginBottom: 9,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Entypo name="menu" size={33} color={COLORS.primary2} />
            </TouchableOpacity>
          ),
          headerRight: () => <View style={{ paddingHorizontal: 10 }} />,
        }}
      />
      <Stack.Screen
        name="timeLog"
        component={TimeLog}
        options={{
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          screenOptions: { headerTitleAlign: 'center' },
          headerTitle: () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <LogoTitle title="Time Log" />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                paddingHorizontal: 10,
                marginBottom: 9,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AntDesign name="arrowleft" size={33} color={COLORS.primary2} />
            </TouchableOpacity>
          ),
          headerRight: () => <View style={{ paddingHorizontal: 10 }} />,
        }}
      />
      <Stack.Screen
        name="summaryScreen"
        component={SummaryScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          screenOptions: { headerTitleAlign: 'center' },
          headerTitle: () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <LogoTitle title="Summary" />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                paddingHorizontal: 10,
                marginBottom: 9,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AntDesign name="arrowleft" size={33} color={COLORS.primary2} />
            </TouchableOpacity>
          ),
          headerRight: () => <View style={{ paddingHorizontal: 10 }} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
