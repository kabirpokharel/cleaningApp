import React, { useEffect, useState } from "react";
import moment from "moment";
import { View, Platform, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import TimePicker from "../../container/TimePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const isPlatformIos = Platform.OS === "ios";

const TimeLog = () => {
  const [timeSetCounter, setTimeSetCounter] = useState([1]);
  return (
    <View style={styles.container}>
      {timeSetCounter.map((elemNum) => (
        <React.Fragment key={elemNum}>
          <View style={{ flex: 1 }}>
            <TimePicker {...{ elemNum }} type={"start"} />
          </View>
          <View style={{ flex: 1 }}>
            <TimePicker {...{ elemNum }} type={"end"} />
          </View>
        </React.Fragment>
      ))}
      <View style={{ flex: 1 }}>
        <TimePicker />
      </View>
      <View style={{ flex: 1 }}>
        <TimePicker />
      </View>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Press me
      </Button>
    </View>
  );
};
export default TimeLog;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
});
