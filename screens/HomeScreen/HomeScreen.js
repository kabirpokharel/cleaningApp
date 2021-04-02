import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import commonStyle from "../style";
import styles from "./homeScreeStyle";
import { blockStyle } from "./homeScreenFunc";

import { roomsBlock } from "../../dummyValues/roomsBlock";
import RowElements from "../../component/RowElements";
import RoomBlockComponent from "./RoomBlockComponent";
import CleaningLog from "../CleaningLog/CleaningLog";
import { SIZES, FONTS, COLORS } from "../../constants/theme";

const NUM_COLL = 3;

const ElementChildren = ({ item }) => <Text>{item.blockName}</Text>;

const HomeScreen = (props) => {
  const { navigation } = props;
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [overlay, setOverlay] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // const customOnClick = (item) =>
  //   navigation.navigate("cleaningLog", {
  //     block: item,
  //   });

  return (
    <View style={[commonStyle.containerWrapper, { flex: 1, backgroundColor: COLORS.light3 }]}>
      <View style={commonStyle.titleContainer}>
        <Text style={[commonStyle.titleText, FONTS.body2]}>Block</Text>
        <Text style={[commonStyle.descriptionText, FONTS.body5]}>Slect block to access rooms</Text>
      </View>
      {overlay && (
        <View
          style={{
            width: 150,
            position: "absolute",
            backgroundColor: "#ffffff",
            borderRadius: 4,
            // padding: 5,
            zIndex: 2,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            top: 250,
            right: 20,
          }}
        >
          <TouchableOpacity
            // disabled={reduxTimeArray.length == 1}
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
                // { color: reduxTimeArray.length == 1 ? COLORS.light1 : COLORS.dark1 },
                { color: COLORS.dark1 },
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
      <View style={{ marginHorizontal: 20 }}>
        <RoomBlockComponent {...{ roomsBlock, selectedBlock, setSelectedBlock }} />
      </View>
      {/* <View
        style={{
          marginVertical: 20,
          marginHorizontal: 90,
          height: 3,
          borderRadius: 2,
          backgroundColor: COLORS.light1,
        }}
      /> */}
      {overlay && (
        <View
          style={{
            position: "absolute",
            height: SIZES.height,
            width: SIZES.width,
            opacity: 0.4,
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
      {selectedBlock ? (
        <CleaningLog {...{ selectedBlock, overlay, setOverlay }} />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>No Block selected</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 70,
          height: 90,
          // paddingVertical: 10,
          marginHorizontal: 20,
        }}
      >
        <Switch
          trackColor={{ false: "#767577", true: "#05c46b" }}
          thumbColor={isEnabled ? COLORS.white : COLORS.white}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <View style={{ paddingLeft: 20, paddingRight: 25 }}>
          <Text style={[FONTS.body5, { color: COLORS.primary2, fontWeight: "700" }]}>
            {`Common area cleaning`}
            <Text
              style={[FONTS.body5, { color: COLORS.primary2, fontWeight: "normal" }]}
            >{` (eg. Door knobs, activity room surfaces, hand rails, toilets, staff rooms, dining rooms)`}</Text>
          </Text>
        </View>
      </View>

      {/* <SafeAreaView /> */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: COLORS.primary,
          alignItems: "center",
          justifyContent: "center",
          // justifyContent: "space-between",
          height: 70,
          paddingHorizontal: 10,
          width: SIZES.width,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("timeLog")}
          style={{
            // position: "absolute",
            // bottom: 0,
            // backgroundColor: COLORS.white,

            alignItems: "center",
            justifyContent: "center",
            height: 50,
            width: 150,
            borderRadius: 8,
            // width: SIZES.width,
            // marginHorizontal: -20,
          }}
        >
          <Text style={[FONTS.body3, { color: COLORS.white }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HomeScreen;
