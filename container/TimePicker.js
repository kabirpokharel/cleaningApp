import React, { useState } from "react";
import moment from "moment";
import { View, Platform, Text } from "react-native";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const isPlatformIos = Platform.OS === "ios";
const TimePicker = () => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentDate = selectedTime || time;
    setShow(isPlatformIos);
    setTime(currentDate);
  };

  return (
    <>
      <Button mode="outlined" onPress={() => setShow(true)}>
        {moment(time).format("h:mm a")}
      </Button>
      {show && (
        <View
          style={{
            width: "100%",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode={"time"}
            is24Hour={!true}
            display={isPlatformIos ? "spinner" : "default"}
            onChange={onChange}
          />
          {isPlatformIos && (
            <Button mode="outlined" onPress={() => setShow(!true)}>
              OK
            </Button>
          )}
        </View>
      )}
    </>
  );
};
export default TimePicker;
