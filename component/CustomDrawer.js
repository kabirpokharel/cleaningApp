import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, Image,
} from 'react-native';
// import { DrawerItems } from "react-navigation";
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { COLORS, FONTS, SIZES } from '../constants/theme';
import { signOut } from '../redux/actions';

// import colors from "../../assets/colors";

const IconComponent = ({ size, focused, name }) => (
  <View style={{
    flexDirection: 'row', alignItems: 'center',
  }}
  >
    <AntDesign
      name={name}
      size={size || 25}
      color={focused ? COLORS.dark3 : COLORS.primary}
    />
    <View style={{ marginLeft: 32 }}>
      <Text style={[FONTS.body4, {
        textTransform: 'capitalize', fontSize: 15, color: COLORS.primary,
      }]}
      >
        {name}
      </Text>
    </View>
  </View>
);

const Profile = ({ email, name, img }) => (
  <View
    style={{
      // flexDirection: "column",
      // alignItems: "center",
      paddingTop: Platform.OS !== 'ios' ? SIZES.baseSize * 50 : SIZES.baseSize * 20,
      paddingLeft: SIZES.baseSize * 20,
      paddingBottom: SIZES.baseSize * 35,
      marginBottom: SIZES.baseSize * 35,
      paddingHorizontal: SIZES.baseSize * 10,
      backgroundColor: COLORS.primary,
    }}
  >
    <View>
      <View
        style={{
          width: SIZES.baseSize * 90,
          height: SIZES.baseSize * 90,
          borderRadius: SIZES.baseSize * 45,
          borderWidth: SIZES.baseSize * 2,
          borderColor: COLORS.white,
          // alignItems: "center",
          // justifyContent: "center",
          overflow: 'hidden',
          marginBottom: SIZES.baseSize * 15,
          borderBottomLeftRadius: SIZES.baseSize * 45,
          borderBottomRightRadius: SIZES.baseSize * 45,
        }}
      >
        {img}
      </View>
    </View>
    <View>
      <Text style={[FONTS.body3, { fontSize: 24, color: COLORS.white, letterSpacing: 0.5 }]}>
        {name}
      </Text>
      <Text style={[FONTS.body5, { color: COLORS.white }]}>{email}</Text>
    </View>
  </View>
);

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView>
        <SafeAreaView style={{ backgroundColor: COLORS.primary }} />
        {/* <SafeAreaView
          style={{ backgroundColor: COLORS.white }}
          forceInset={{ top: "always", horizontal: "never" }}
        > */}
        {/* <View
        style={{
          height: 150,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: Platform.OS === "android" ? 20 : 0,
        }}
      >
        <Text style={{ fontSize: 10, color: "grey", fontWeight: "200" }}>*Logo Here</Text>
        <Text style={[FONTS.h3, { color: COLORS.secondary }]}>ACSS</Text>
      </View> */}
        {/* {Platform.OS !== 'ios' && <View style={{ height: 20 }} />} */}
        <Profile
          name="Kabir Pokharel"
          email="kabirpokharel12@gmail.com"
          // img={<AntDesign name="user" size={34} color={COLORS.light1} />}
          img={(
            <Image
              resizeMode="cover"
              style={{ width: '100%', height: undefined, aspectRatio: 1 }}
              source={require('../assets/images/profilePic.jpg')}
            />
          )}
        />
        <View
          style={{
            backgroundColor: COLORS.white,
            height: '100%',
            justifyContent: 'space-between',
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
          }}
        >
          <View>
            <DrawerItemList
              inactiveTintColor={COLORS.primary}
              activeTintColor={COLORS.dark3}
              activeBackgroundColor={COLORS.light3}
              {...props}
            />
          </View>
          <View style={{
            borderTopColor: COLORS.light4,
            borderTopWidth: 2,
            // marginTop: -20,
          }}
          >
            <DrawerItem
              // options={{
              //   title: 'Home',
              //   drawerIcon: ({ focused, size }) => <IconComponent {...{ size, focused, name: 'home' }} />,
              // }}
              label={({ focused, size }) => <IconComponent {...{ size, focused, name: 'logout' }} />}
              onPress={() => {
                props.navigation.closeDrawer();
                alert('drawer is closed');
                dispatch(signOut());
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerLogo: {
    width: 50,
    height: 50,
  },
});
