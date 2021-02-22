import React, { useEffect, useState } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Button, useTheme } from "react-native-paper";
import TimePicker from "../../container/TimePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const isPlatformIos = Platform.OS === "ios";

const timeError = (diff) => {
  return diff.hours() >= 0 && diff.minutes() >= 0 ? false : true;
};
const getTimeDiff = (start, end) => {
  return moment.duration(
    moment(end, "HH:mm:ss a").diff(moment(start, "HH:mm:ss a"))
  );
};

const TimeLog = (props) => {
  const [timeSetCounter, setTimeSetCounter] = useState([null]);
  const { colors } = useTheme();
  console.log("see this props check if it has theme in it===>", props);

  const cleaningDetail = useSelector((state) => {
    return state.cleaning;
  });
  const { time } = cleaningDetail;
  const nextTimeLogSet = () => {
    setTimeSetCounter([...timeSetCounter, null]);
  };
  const displayTime = (start, end) => {
    let diff = getTimeDiff(start, end);
    if (!timeError(diff)) {
      console.log("see this ===>timeError(diff)", timeError(diff));
      return <Text>{`${diff.hours()}:${diff.minutes()}`}</Text>;
    } else
      return (
        <Text style={{ color: colors.error }}>
          Start time must be early than end time
        </Text>
      );
  };
  const isTimeSetComplete = (inputId) => {
    return !!time.length &&
      time[inputId] &&
      Object.keys(time[inputId]).length === 3
      ? true
      : false;
  };
  const disableAddTimeSet = () => {
    const currentTimeSetId = timeSetCounter.length - 1;
    return (
      isTimeSetComplete(currentTimeSetId) &&
      timeError(
        getTimeDiff(time[currentTimeSetId].start, time[currentTimeSetId].end)
      )
    );
  };
  return (
    <View style={styles.container}>
      {console.log("this is data for cleaningDetail==>", cleaningDetail)}
      <View>
        {timeSetCounter.map((val, inputId) => (
          <View style={styles.timeInputContainer} key={inputId}>
            <View style={{ flex: 1 }}>
              <TimePicker {...{ inputId, timeType: "start" }} />
            </View>
            <View style={{ flex: 1 }}>
              <TimePicker {...{ inputId }} timeType={"end"} />
            </View>
            <View style={{ flex: 0.5 }}>
              {isTimeSetComplete(inputId) &&
                displayTime(time[inputId].start, time[inputId].end)}
            </View>
          </View>
        ))}
      </View>
      <Button
        disabled={disableAddTimeSet()}
        mode="contained"
        onPress={nextTimeLogSet}
      >
        +
      </Button>
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
  },
  timeInputContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
});
