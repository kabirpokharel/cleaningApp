import React, { useState } from "react";

// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

//import TimePicker from the package we installed
import TimePicker from "react-native-simple-time-picker";
import PickerComponent from "../../TEMPFolder/PickerComponent";

const TimeLog = () => {
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>
          React Native Time Picker – To Pick the Time using Native Time Picker
        </Text>
        <PickerComponent />
        {/* <Text>
          Selected Time: {JSON.stringify(selectedHours)}:
          {JSON.stringify(selectedMinutes)}
        </Text>
        <TimePicker
          onChange={(time) => {
            setSelectedHours(time);
          }}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default TimeLog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
});
