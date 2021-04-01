import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
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

  // const customOnClick = (item) =>
  //   navigation.navigate("cleaningLog", {
  //     block: item,
  //   });

  return (
    <View style={[commonStyle.containerWrapper, { flex: 1, backgroundColor: COLORS.light3 }]}>
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
      <View style={commonStyle.titleContainer}>
        <Text style={[commonStyle.titleText, FONTS.body2]}>Block</Text>
        <Text style={[commonStyle.descriptionText, FONTS.body5]}>Slect block to access rooms</Text>
      </View>
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
      {selectedBlock ? (
        <CleaningLog {...{ selectedBlock, setOverlay }} />
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>No Block selected</Text>
        </View>
      )}

      {/* <SafeAreaView /> */}
      <TouchableOpacity
        onPress={() => navigation.navigate("timeLog")}
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: COLORS.primary,
          alignItems: "center",
          justifyContent: "center",
          height: 70,
          width: SIZES.width,
          // marginHorizontal: -20,
        }}
      >
        <Text style={[FONTS.h3, { color: COLORS.white }]}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;
