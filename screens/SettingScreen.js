import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const SettingScreen = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text>This is setting Page!!!</Text>
      <Button
        title="Update Profile"
        onPress={() => navigation.navigate("homeStack", { screen: "Home" })}
      />
      <View style={{ flex: 1, backgroundColor: "blue" }}>
        <View style={{ height: 20 }}></View>
        <View style={{ backgroundColor: "yellow", flex: 1 }}>
          <ScrollView>
            <View style={styles.box1} />
            <View style={styles.box1} />
            <View style={styles.box1} />
            <View style={styles.box1} />
            <View style={styles.box1} />
            <View style={styles.box1} />
            <View style={styles.box1}>
              <Text>Last Item</Text>
            </View>
            <View style={{ marginBottom: 50 }}></View>
          </ScrollView>
        </View>
        <View
          style={{
            height: 60,
            // position: "absolute",
            // bottom: 0,
            // height: 150,
            width: width,
            // borderRadius: 25,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 25, fontWeight: "bold" }}>
            continue ={">"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  box1: {
    height: 150,
    // width: 150,
    color: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "purple",
  },
});

export default SettingScreen;
