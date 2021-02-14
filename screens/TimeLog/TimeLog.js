import React, { useEffect, useState } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Button } from "react-native-paper";
import TimePicker from "../../container/TimePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const isPlatformIos = Platform.OS === "ios";

const TimeLog = () => {
  const [timeData, setTimeData] = useState([null]);
  //temp s.1
  const cleaningDetail = useSelector((state) => {
    return state.cleaning;
  });
  //temp e.1
  const nextTimeLogSet = () => {
    setTimeData([...timeData, null]);
  };
  const getTimeDiff = (start, end) => {
    const diff = moment.duration(
      moment(end, "HH:mm:ss a").diff(moment(start, "HH:mm:ss a"))
    );
    if (diff.hours() >= 0 && diff.minutes() >= 0) {
      return <Text>{`${diff.hours()}:${diff.minutes()}`}</Text>;
    } else return <Text style={{ color: "red" }}>Error</Text>;
  };

  return (
    <View style={styles.container}>
      {console.log("this is data for cleaningDetail==>", cleaningDetail)}
      {/* {
        !!cleaningDetail.time.length &&
          Object.keys(cleaningDetail.time[0]).length === 3 &&
          // console.log("this is start time", cleaningDetail.time[0].end)
          console.log(
            "heyyyyyyyyyy->>>>>",
            moment.duration(
              moment(cleaningDetail.time[0].end, "HH:mm:ss a").diff(
                moment(cleaningDetail.time[0].start, "HH:mm:ss a")
              )
            )
          )
        // moment.duration(
        //   cleaningDetail.time[0].end.diff(cleaningDetail.time[0].start)
        // )
      } */}
      <View>
        {timeData.map((val, inputId) => (
          <View style={styles.timeInputContainer} key={inputId}>
            <View style={{ flex: 1 }}>
              <TimePicker {...{ inputId }} timeType={"start"} />
            </View>
            <View style={{ flex: 1 }}>
              <TimePicker {...{ inputId }} timeType={"end"} />
            </View>
            <View style={{ flex: 0.5 }}>
              {!!cleaningDetail.time.length &&
                cleaningDetail.time[inputId] &&
                Object.keys(cleaningDetail.time[inputId]).length === 3 && (
                  <Text>
                    {getTimeDiff(
                      cleaningDetail.time[inputId].start,
                      cleaningDetail.time[inputId].end
                    )}
                  </Text>
                )}
            </View>
          </View>
        ))}
      </View>
      <Button mode="contained" onPress={nextTimeLogSet}>
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
