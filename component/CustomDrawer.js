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
        // flexDirection: "column",
        // alignItems: "center",
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 35,
        marginBottom: 35,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary,
      }}
    >
      <View
      // style={{ alignItems: "center" }}
      >
        <View
          style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            borderWidth: 2,
            borderColor: COLORS.white,
            // alignItems: "center",
            // justifyContent: "center",
            overflow: "hidden",
            marginBottom: 15,
            borderBottomLeftRadius: 45,
            borderBottomRightRadius: 45,
          }}
        >
          {img}
        </View>
      </View>
      <View
      // style={{ alignItems: "center" }}
      >
        <Text style={[FONTS.body3, { fontSize: 24, color: COLORS.white, letterSpacing: 0.5 }]}>
          {name}
        </Text>
        <Text style={[FONTS.body5, { color: COLORS.white }]}>{email}</Text>
      </View>
    </View>
  );
};

const CustomDrawer = (props) => {
  const [active, setActive] = useState("");
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
        <Profile
          name={"Kabir Pokharel"}
          email={"kabirpokharel12@gmail.com"}
          // img={<AntDesign name="user" size={34} color={COLORS.light1} />}
          img={
            <Image
              resizeMode={"cover"}
              style={{ width: "100%", height: undefined, aspectRatio: 1 }}
              source={require("../assets/images/profilePic.jpg")}
            />
          }
        />
        <View
          style={{
            backgroundColor: COLORS.white,
            height: "100%",
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
          }}
        >
          <DrawerItemList
            inactiveTintColor={COLORS.primary}
            activeTintColor={COLORS.dark3}
            activeBackgroundColor={COLORS.light3}
            {...props}
          />
        </View>
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
