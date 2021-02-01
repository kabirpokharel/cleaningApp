import React, { useState } from "react";
import moment from "moment";
import { View, Platform, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import TimePicker from "../../container/TimePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const isPlatformIos = Platform.OS === "ios";
const TimeLog = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TimePicker />
      </View>
      <View style={{ flex: 1 }}>
        <TimePicker />
      </View>
    </View>
  );
};
export default TimeLog;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    display: "flex",
    flex: 1,
    position: "relative",
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
  },
});
