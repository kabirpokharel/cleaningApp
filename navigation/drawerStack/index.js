import React from 'react';
import { View, Text } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';
import HomeStack from '../homeStack';
import AuthStack from '../authStack';
import CustomDrawer from '../../component/CustomDrawer';
import SigninScreen from '../../screens/Signin/SigninScreen';

import {
  ResetPassword, SettingScreen, SignupScreen, NotificationScreen,
} from '../../screens';
import { COLORS } from '../../constants/theme';
import LocationScreen from '../../screens/Location/LocationScreen';
import SettingStack from '../settingStack';

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
    <Text>
      Cat
    </Text>
  </View>
);

const IconComponent = ({ size, focused, name }) => (
  <AntDesign
    name={name}
    size={size}
    color={focused ? COLORS.dark3 : COLORS.primary}
  />
);
const DrawerStack = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
    <Drawer.Screen
      options={{
        title: 'Home',
        drawerIcon: ({ focused, size }) => <IconComponent {...{ size, focused, name: 'home' }} />,
      }}
      name="homeStack"
      component={HomeStack}
    />
    <Drawer.Screen
      options={{
        title: 'Settings',
        drawerIcon: ({ focused, size }) => (
          <IconComponent {...{ size, focused, name: 'setting' }} />
        ),
      }}
      name="settingStack"
      component={SettingStack}
    />
    <Drawer.Screen
      options={{
        title: 'Notificaitons',
        drawerIcon: ({ focused, size }) => (
          <IconComponent {...{ size, focused, name: 'bells' }} />
        ),
      }}
      name="notificaitonStack"
      component={NotificationScreen}
    />
    {/* <Drawer.Screen
      options={{
        title: 'Logout',
        drawerIcon: ({ focused, size }) => (
          <IconComponent {...{ size, focused, name: 'logout' }} />
        ),
      }}
      name="dummy2"
      component={DummyComp2}
    /> */}
  </Drawer.Navigator>
);
export default DrawerStack;
