import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TimeLog = () => {
  const [time, setTime] = useState(new Date());
  //    const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    // setShow(Platform.OS === "ios");
    console.log(
      "this is current time from the clock ui===>",
      typeof currentTime
    );
    setTime(currentTime);
  };

  const showTimepicker = () => {
    setShow("time");
  };

  return (
    <View>
      <Text>Time log</Text>
      <View>
        <View>
          <Button onPress={showTimepicker} title="Show time picker!" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
};

export default TimeLog;

const styles = StyleSheet.create({});
