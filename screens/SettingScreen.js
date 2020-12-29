import React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const SettingScreen = (props) => {
  const { navigation } = props;
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is setting Page!!!</Text>

      <Button
        title="Update Profile"
        onPress={() => navigation.navigate("homeStack", { screen: "Home" })}
      />

      <View>
        <ScrollView>
          <View style={styles.box1} />
          <View style={styles.box1} />
          <View style={styles.box1} />
          <View style={styles.box1} />
          <View style={styles.box1} />
          <View style={styles.box1} />
        </ScrollView>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            width: 70,
            height: 70,
            position: "absolute",
            bottom: 60,
            right: 30,
            backgroundColor: "#fff",
            borderRadius: 100,
          }}
        >
          <Text style={{ fontSize: 28 }}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    marginBottom: 20,
    backgroundColor: "purple",
  },
});

export default SettingScreen;
