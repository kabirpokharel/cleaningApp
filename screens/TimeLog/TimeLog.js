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
  return moment.duration(moment(end, "HH:mm:ss a").diff(moment(start, "HH:mm:ss a")));
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
  // const displayTime = (start, end) => {
  //   let diff = getTimeDiff(start, end);
  //   if (!timeError(diff)) {
  //     console.log("see this ===>timeError(diff)", timeError(diff));
  //     return <Text>{`${diff.hours()}:${diff.minutes()}`}</Text>;
  //     return <Text>success</Text>;
  //   } else
  //     return <Text style={{ color: colors.error }}>Start time must be early than end time</Text>;
  // };
  const isTimeSetComplete = (inputId) => {
    return !!time.length && time[inputId] && Object.keys(time[inputId]).length === 3 ? true : false;
  };
  const disableAddTimeSet = () => {
    const currentTimeSetId = timeSetCounter.length - 1;
    return (
      isTimeSetComplete(currentTimeSetId) &&
      timeError(getTimeDiff(time[currentTimeSetId].start, time[currentTimeSetId].end))
    );
  };
  return (
    <View style={styles.container}>
      {console.log("this is data for cleaningDetail==>", cleaningDetail)}

      <View style={{ marginHorizontal: 10 }}>
        {timeSetCounter.map((val, inputId) => (
          <View key={inputId} style={styles.timeInputContainer}>
            <View style={{ flexDirection: "row" }}>
              <View style={{}}>
                <TimePicker {...{ inputId, timeType: "start" }} />
              </View>
              <View style={{}}>
                <TimePicker {...{ inputId, timeType: "end" }} />
              </View>
            </View>
            <View style={{ backgroundColor: "green" }}>
              {!!time.length && !!time[inputId] && <Text>{time[inputId].status}</Text>}
            </View>
          </View>
          // <View style={styles.timeInputContainer} key={inputId}>
          //   <View style={styles.timeCard}>
          //     <View style={{ flex: 1 }}>
          //       <TimePicker {...{ inputId, timeType: "start" }} />
          //     </View>
          //     <View style={{ flex: 1 }}>
          //       <TimePicker {...{ inputId, timeType: "end" }} />
          //     </View>
          //     <View style={{ flex: 0.25 }}>
          //       {!!time.length && !!time[inputId] && <Text>{time[inputId].status}</Text>}
          //     </View>
          //   </View>
          // </View>
        ))}
      </View>
      <Button disabled={disableAddTimeSet()} mode="contained" onPress={nextTimeLogSet}>
        +
      </Button>
      <Button icon="camera" mode="contained" onPress={() => console.log("Pressed")}>
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
    backgroundColor: "white",
  },
  timeInputContainer: {
    // flexDirection: "row",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 4,
    width: "80%",
  },
  timeCard: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 20,
    margin: 10,
    backgroundColor: "#ffffff",
  },
});
