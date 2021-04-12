import React, { useEffect, useState } from "react";
import { View, Platform, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { deleteTimeLog, initilizeTimeLog } from "../../redux/actions";
import TimePicker from "../../container/TimePicker";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import styles from "./timeLogStyle";
import commonStyle from "../style";
import { COLORS, SIZES, FONTS } from "../../constants/theme";
import FooterButton from "../../component/FooterButton";
import TitleWithDescriptionComponent, {
  TitleDescription,
} from "../../component/TitleWithDescriptionComponent";
import PageTemplate from "../../component/PageTemplate";

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
      } else return checkTimeLogHasError(time.status);
    }
  );
  if (!!emptyLog) {
    result = "incomplete";
  } else if (!!errorsArray.length) {
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
    <Text
      style={[hasError ? FONTS.body6 : FONTS.h6, { color: hasError ? errorColor : defaultColor }]}
    >
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
    <PageTemplate>
      <TitleWithDescriptionComponent title="Set time" description="Enter start and end time">
        {overlay && (
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              opacity: 0.3,
              backgroundColor: "#000",
              zIndex: 2,
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
      </TitleWithDescriptionComponent>
      <SafeAreaView style={[{ flex: 1, marginBottom: isPlatformIos ? 70 : 55 }]}>
        <ScrollView style={styles.scrollView}>
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
              <View
                key={inputId}
                style={{
                  borderRadius: 4,
                  margin: 10,
                  padding: 10,
                  width: "80%",
                  marginBottom: 20,
                  zIndex: 3,
                  backgroundColor: "white",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  elevation: 5,
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
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={[commonStyle.titleText, FONTS.h5, { color: COLORS.primary2 }]}>
                      Time log {inputId + 1}
                    </Text>
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
                          paddingVertical: 5,
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
                            {
                              color: reduxTimeArray.length == 1 ? COLORS.light1 : COLORS.primary,
                            },
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
                          paddingHorizontal: 8,
                          paddingVertical: 5,
                          justifyContent: "center",
                        }}
                        onPress={() => {
                          alert("watnt to Reset??");
                        }}
                      >
                        <Text
                          style={[
                            FONTS.body4,
                            {
                              color: reduxTimeArray.length == 1 ? COLORS.light1 : COLORS.primary,
                            },
                          ]}
                        >
                          Reset
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 40,
                    }}
                  >
                    <View>
                      <TimePicker {...{ inputId, timeType: "start" }} />
                    </View>
                    <View style={{ width: 25 }} />
                    <View>
                      <TimePicker {...{ inputId, timeType: "end" }} />
                    </View>
                  </View>
                  <View style={{ height: 20, marginTop: 10, alignItems: "center" }}>
                    {!!reduxTimeArray.length &&
                      reduxTimeArray[inputId] &&
                      Object.keys(reduxTimeArray[inputId]).length > 1 && (
                        <TimeLogFeedback
                          feedbackString={reduxTimeArray[inputId].status}
                          defaultColor={COLORS.primary1}
                          errorColor={COLORS.secondary}
                        />
                      )}
                  </View>
                </View>
              </View>
            </React.Fragment>
          ))}
          <AddCardButton
            disabled={!(timeLogErrorCheck(reduxTimeArray) === "no error")}
            onPress={() => {
              dispatch(initilizeTimeLog(reduxTimeArray.length));
            }}
            activeColor={COLORS.primary}
            disableColor={COLORS.light1}
          />
        </ScrollView>
      </SafeAreaView>
      <FooterButton
        onPress={() => continueButtonAction(reduxTimeArray, navigation)}
        btnText="Summary"
        disabled={overlay}
        // containerStyle
        // textStyle
      />
    </PageTemplate>
    // <View style={[styles.containerWrapper, { flex: 1, backgroundColor: COLORS.light3 }]}>
    // </View>
  );
};
export default TimeLog;
