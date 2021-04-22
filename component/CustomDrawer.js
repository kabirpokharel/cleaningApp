import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, Image } from "react-native";
// import { DrawerItems } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";

import { DrawerItemList } from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants/theme";

// import colors from "../../assets/colors";

const Profile = ({ email, name, img }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 10,
        // backgroundColor: "green",
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          borderWidth: 2,
          borderColor: COLORS.light1,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginRight: 10,
        }}
      >
        {img}
      </View>
      <View>
        <Text style={[FONTS.body3, { color: COLORS.primary, letterSpacing: 0.5 }]}>{name}</Text>
        <Text style={[FONTS.body5, { color: COLORS.primary1 }]}>{email}</Text>
      </View>
    </View>
  );
};

const CustomDrawer = (props) => {
  const [active, setActive] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
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
          <Profile
            name={"Kabir Pokharel"}
            email={"kabirpokharel12@gmail.com"}
            img={<AntDesign name="user" size={34} color={COLORS.light1} />}
          />
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.light4,
              marginHorizontal: 10,
              marginBottom: 20,
            }}
          />
          <DrawerItemList
            inactiveTintColor={COLORS.primary}
            activeTintColor={COLORS.dark3}
            activeBackgroundColor={COLORS.light3}
            {...props}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerLogo: {
    width: 50,
    height: 50,
  },
});
