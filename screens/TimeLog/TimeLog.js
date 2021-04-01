import React, { useEffect, useState } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Button, useTheme, Surface, Title, Subheading } from "react-native-paper";
import { deleteTimeLog, initilizeTimeLog } from "../../redux/actions";
import TimePicker from "../../container/TimePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import styles from "./timeLogStyle";
import commonStyle from "../style";
import { COLORS, SIZES, FONTS } from "../../constants/theme";

const isPlatformIos = Platform.OS === "ios";

const checkTimeLogHasError = (feedbackString) => {
  return !feedbackString.includes(":");
};

const timeLogErrorCheck = (reduxTimeArray) => {
  let result = "";
  const emptyLog = reduxTimeArray.find((time) => !time.status); //only one time log can have empty status at a time, it's after initilization and creating new log
  let errorsArray = reduxTimeArray.filter(
    // filter out all the array with error (first check it status is undefined or empty) if not than check for status string
    (time) => {
      if (!time.status) {
        return false;
      } else checkTimeLogHasError(time.status);
    }
  );
  // ............................................s*******************start here onward
  if (!!emptyLog) {
    result = "incomplete";
  }
  // if (!reduxTimeArray.length || timeSetCounter.length != reduxTimeArray.length) {
  //   result = "incomplete";
  // }
  else if (!!errorsArray.length) {
    result = "other errors";
  } else {
    result = "no error";
  }
  return result;
};

// const continueButtonAction = (reduxTimeArray, timeSetCounter, navigation) => {
const continueButtonAction = (reduxTimeArray, navigation) => {
  let errorCheckResult = timeLogErrorCheck(reduxTimeArray);
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
  const [overlay, setOverlay] = useState(false);
  const [showTimeEditPopup, setShowTimeEditpopup] = useState(null);

  const dispatch = useDispatch();
  const { navigation } = props;

  useEffect(() => {
    dispatch(initilizeTimeLog(0));
  }, []);

  const cleaningDetail = useSelector((state) => state.cleaning);

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
      <View style={commonStyle.titleContainer}>
        <Text style={[commonStyle.titleText, FONTS.body2]}>Set time</Text>
        <Text style={[commonStyle.descriptionText, FONTS.body5]}>Enter start and end time</Text>
      </View>
      <View style={{ flex: 1 }}>
        {overlay && (
          <View
            style={{
              position: "absolute",
              height: SIZES.height,
              width: SIZES.width,
              opacity: 0.3,
              backgroundColor: "#000",
              zIndex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => setOverlay(false)}
              style={{
                height: SIZES.height,
                width: SIZES.width,
              }}
            />
          </View>
        )}

        {reduxTimeArray.map((val, inputId) => (
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
                        height: SIZES.height,
                        width: SIZES.width,
                      }}
                    />
                  </View>
                )}
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Subheading style={{ color: "grey" }}>Time log no.{inputId + 1}</Subheading>
                  <TouchableOpacity
                    onPress={() => {
                      setOverlay(true);
                      setShowTimeEditpopup(inputId);
                    }}
                    style={{ height: 40, width: 40, alignItems: "center" }}
                  >
                    <AntDesign name="ellipsis1" size={24} color="#00000080" />
                  </TouchableOpacity>
                </View>
                {overlay && showTimeEditPopup == inputId && (
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
                      disabled={reduxTimeArray.length == 1}
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        setOverlay(false);
                        dispatch(deleteTimeLog(inputId));
                      }}
                    >
                      <Text
                        style={[
                          FONTS.body4,
                          { color: reduxTimeArray.length == 1 ? COLORS.light1 : COLORS.dark1 },
                        ]}
                      >
                        Delete
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        marginHorizontal: 5,
                        borderBottomColor: COLORS.light1,
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
                  {!!reduxTimeArray.length &&
                    reduxTimeArray[inputId] &&
                    Object.keys(reduxTimeArray[inputId]).length > 1 && (
                      <TimeLogFeedback
                        feedbackString={reduxTimeArray[inputId].status}
                        defaultColor={"grey"}
                        errorColor={COLORS.error}
                      />
                    )}
                </View>
              </View>
            </Surface>
          </React.Fragment>
        ))}
        <AddCardButton
          // disabled={!(timeLogErrorCheck(reduxTimeArray, timeSetCounter) === "no error")}
          disabled={!(timeLogErrorCheck(reduxTimeArray) === "no error")}
          onPress={() => {
            dispatch(initilizeTimeLog(reduxTimeArray.length));
            // setTimeSetCounter([...timeSetCounter, null]);
          }}
          activeColor={COLORS.primary}
          disableColor={COLORS.light1}
        />
      </View>
      <TouchableOpacity
        onPress={() => continueButtonAction(reduxTimeArray, navigation)}
        disabled={overlay}
        style={{
          backgroundColor: COLORS.primary,
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
