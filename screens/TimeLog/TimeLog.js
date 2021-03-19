import React, { useEffect, useState } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Button, useTheme, Surface, Title, Subheading } from "react-native-paper";
import { deleteTimeLog } from "../../redux/actions";
import TimePicker from "../../container/TimePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import styles from "./timeLogStyle";

const isPlatformIos = Platform.OS === "ios";

// const timeError = (diff) => {
//   return diff.hours() >= 0 && diff.minutes() >= 0 ? false : true;
// };
// const getTimeDiff = (start, end) => {
//   return moment.duration(moment(end, "HH:mm:ss a").diff(moment(start, "HH:mm:ss a")));
// };
const checkTimeLogHasError = (feedbackString) => {
  return !feedbackString.includes(":");
};

const timeLogErrorCheck = (reduxTimeArray, timeSetCounter) => {
  let result = "";
  let errorsArray = reduxTimeArray.filter(
    (time) => checkTimeLogHasError(time.status) && !!time.status
  );
  if (!reduxTimeArray.length || timeSetCounter.length != reduxTimeArray.length) {
    result = "incomplete";
  } else if (!!errorsArray.length) {
    result = "other errors";
  } else {
    result = "no error";
  }
  return result;
};

const continueButtonAction = (reduxTimeArray, timeSetCounter, navigation) => {
  let errorCheckResult = timeLogErrorCheck(reduxTimeArray, timeSetCounter);
  switch (errorCheckResult) {
    case "incomplete":
      alert("Enter start and end time before proceeding");
      break;
    case "other error":
      alert("Fix above error before proceeding");
      break;
    default:
      navigation.navigate("summaryScreen");
      break;
  }
};
const TimeLogFeedback = ({ feedbackString, defaultColor, errorColor }) => {
  let hasError = checkTimeLogHasError(feedbackString);
  if (!hasError) {
    hasError = false;
    feedbackString =
      feedbackString.substring(0, feedbackString.indexOf(":")) +
      "hrs " +
      feedbackString.substring(feedbackString.indexOf(":") + 1) +
      "min";
  } else if (feedbackString == "diff error") {
    feedbackString = "*start time should be early than end time";
  } else if (feedbackString == "incomplete") {
    feedbackString = "*Enter both start and end time";
  }
  return (
    <Text style={{ fontSize: 10, color: hasError ? errorColor : defaultColor }}>
      {feedbackString}
    </Text>
  );
};
const TimeLog = (props) => {
  const [timeSetCounter, setTimeSetCounter] = useState([null]);
  const [overlay, setOverlay] = useState(false);
  const [timeEditPopup, setTimeEditpopup] = useState(null);
  const dispatch = useDispatch();
  const { colors, screenDimension } = useTheme();
  const { navigation } = props;
  console.log("see this props check if it has theme in it===>", props);

  const cleaningDetail = useSelector((state) => {
    console.log("this is state.cleaning====>", state.cleaning);
    return state.cleaning;
  });
  const { time: reduxTimeArray } = cleaningDetail;

  const AddCardButton = ({ disabled, activeColor, disableColor, onPress }) => {
    let variableStyle = disabled
      ? { backgroundColor: disableColor }
      : { backgroundColor: activeColor };
    return (
      <TouchableOpacity
        onPress={
          disabled
            ? () => alert("Please complete time set and resolve errors before adding new ")
            : onPress
        }
        disabled={overlay}
        style={[
          {
            height: 50,
            width: 50,
            margin: 10,
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "center",
          },
          variableStyle,
        ]}
      >
        <FontAwesome name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.containerWrapper, { flex: 1 }]}>
      <View style={{ flex: 1 }}>
        {overlay && (
          <View
            style={{
              position: "absolute",
              height: screenDimension.height,
              width: screenDimension.width,
              opacity: 0.3,
              backgroundColor: "#000",
              // backgroundColor: "blue", // covers all accept footer button and
              zIndex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => setOverlay(false)}
              style={{
                height: screenDimension.height,
                width: screenDimension.width,
              }}
            />
          </View>
        )}
        {timeSetCounter.map((val, inputId) => (
          <React.Fragment key={inputId}>
            <Surface
              key={inputId}
              style={{
                borderRadius: 4,
                margin: 10,
                padding: 10,
                width: "80%",
                shadowColor: "#000000",
                elevation: 6,
                marginBottom: 20,
                zIndex: 3,
              }}
            >
              <View>
                {overlay && (
                  <View
                    style={{
                      position: "absolute",
                      top: -10,
                      left: -10,
                      right: -10,
                      bottom: -10,
                      opacity: 0.3,
                      backgroundColor: "#000",
                      zIndex: 1,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setOverlay(false)}
                      style={{
                        height: screenDimension.height,
                        width: screenDimension.width,
                      }}
                    />
                  </View>
                )}
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Subheading style={{ color: "grey" }}>Time log no.{inputId + 1}</Subheading>
                  <TouchableOpacity
                    onPress={() => {
                      setOverlay(true);
                      setTimeEditpopup(inputId);
                    }}
                    style={{ height: 40, width: 40, alignItems: "center" }}
                    // onPress={() => setShow(!show)}
                  >
                    <AntDesign name="ellipsis1" size={24} color="#00000080" />
                  </TouchableOpacity>
                </View>
                {overlay && timeEditPopup == inputId && (
                  <View
                    style={{
                      width: 150,
                      position: "absolute",
                      backgroundColor: "#fff",
                      borderRadius: 4,
                      // padding: 5,
                      zIndex: 3,
                      right: -5,
                      top: -5,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,
                    }}
                  >
                    <TouchableOpacity
                      disabled={timeSetCounter.length == 1}
                      style={{
                        padding: 8,
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        setTimeSetCounter(timeSetCounter.filter((timeCount, id) => id !== inputId));
                        setOverlay(false);
                        dispatch(deleteTimeLog(inputId));
                      }}
                    >
                      <Text
                        style={{ color: timeSetCounter.length == 1 ? colors.disabled : "#000000" }}
                      >
                        Delete
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        marginHorizontal: 5,
                        borderBottomColor: "#00000010",
                        borderBottomWidth: 1,
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        padding: 8,
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        alert("watnt to Reset??");
                      }}
                    >
                      <Text>Reset</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={{ flexDirection: "row", height: 40 }}>
                  <View style={{ flex: 1 }}>
                    <TimePicker {...{ inputId, timeType: "start" }} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <TimePicker {...{ inputId, timeType: "end" }} />
                  </View>
                </View>
                <View style={{ height: 20 }}>
                  {!!reduxTimeArray.length && !!reduxTimeArray[inputId] && (
                    <TimeLogFeedback
                      feedbackString={reduxTimeArray[inputId].status}
                      defaultColor={"grey"}
                      errorColor={colors.error}
                    />
                  )}
                </View>
              </View>
            </Surface>
          </React.Fragment>
        ))}
        <AddCardButton
          disabled={!(timeLogErrorCheck(reduxTimeArray, timeSetCounter) === "no error")}
          onPress={() => {
            setTimeSetCounter([...timeSetCounter, null]);
          }}
          activeColor={colors.primary}
          disableColor="grey"
        />
      </View>
      <TouchableOpacity
        onPress={() => continueButtonAction(reduxTimeArray, timeSetCounter, navigation)}
        disabled={overlay}
        style={{
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          marginHorizontal: -20,
        }}
      >
        <Text>Summary</Text>
      </TouchableOpacity>
    </View>
  );
};
export default TimeLog;
