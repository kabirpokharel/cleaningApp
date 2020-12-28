import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
// import { DrawerItems } from "react-navigation";

import { DrawerItemList } from "@react-navigation/drawer";

// import colors from "../../assets/colors";

const CustomDrawer = (props) => {
  return (
    <ScrollView>
      <SafeAreaView style={{ backgroundColor: "pink" }} />
      <View
        style={{
          height: 150,
          backgroundColor: "lightyellow",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: Platform.OS === "android" ? 20 : 0,
        }}
      >
        <Image
          style={styles.drawerLogo}
          source={require("../assets/icons/favicon.png")}
        />
        <Text style={{ fontSize: 24, color: "grey", fontWeight: "200" }}>
          Nawaz
        </Text>
        <Text style={{ fontSize: 20, color: "blue", fontWeight: "100" }}>
          flavour of India
        </Text>
      </View>
      <DrawerItemList {...props} />
    </ScrollView>
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
