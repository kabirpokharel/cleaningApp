import React, { useState } from "react";
import moment from "moment";
import { View, Platform, Text, Modal, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { addShiftTime } from "../redux/actions";

const isPlatformIos = Platform.OS === "ios";
const width = Dimensions.get("window").width;

const modalStyle = (width, gutter) => {
  return { width: gutter * 2 - width, left: gutter, right: gutter };
};

const TimePicker = ({ inputId, timeType }) => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const onChange = (event, selectedTime) => {
    const inputTime = selectedTime || time;
    setShow(isPlatformIos);
    setTime(inputTime);
    dispatch(addShiftTime({ [timeType]: inputTime, inputId: inputId }));
  };

  return (
    <View style={{ position: "relative" }}>
      <Button mode="outlined" onPress={() => setShow(true)}>
        {moment(time).format("h:mm a")}
      </Button>
      {show && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={[
              modalStyle(width, 40),
              {
                borderRadius: 4,
                backgroundColor: "#ffffff",
                position: "absolute",
                bottom: 150,
              },
            ]}
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
              <Button
                style={{ margin: 30 }}
                mode="contained"
                onPress={() => setShow(!true)}
              >
                OK
              </Button>
            )}
          </View>
        </Modal>
      )}
    </View>
  );
};
export default TimePicker;
