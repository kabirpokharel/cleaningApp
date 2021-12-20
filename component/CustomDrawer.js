import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, Image } from "react-native";
// import { DrawerItems } from "react-navigation";

import { DrawerItemList } from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

import { Drawer } from "react-native-paper";

// import colors from "../../assets/colors";

const CustomDrawer = (props) => {
  const [active, setActive] = React.useState("");
  return (
    //React native papaer example s****************
    // <ScrollView>
    //   <SafeAreaView>
    //     <Drawer.Section title="Some title">
    //       <Drawer.Item
    //         label="First Item"
    //         active={active === "first"}
    //         onPress={() => setActive("first")}
    //       />
    //       <Drawer.Item
    //         label="Second Item"
    //         active={active === "second"}
    //         onPress={() => setActive("second")}
    //       />
    //     </Drawer.Section>
    //   </SafeAreaView>
    // </ScrollView>
    //React native papaer example e****************
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
        <Image style={styles.drawerLogo} source={require("../assets/icons/favicon.png")} />
        <Text style={{ fontSize: 24, color: "grey", fontWeight: "200" }}>TaskLogger</Text>
        <Text style={{ fontSize: 20, color: "blue", fontWeight: "100" }}>By team 4</Text>
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
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
