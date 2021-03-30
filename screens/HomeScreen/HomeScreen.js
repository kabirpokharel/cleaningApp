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

  // const customOnClick = (item) =>
  //   navigation.navigate("cleaningLog", {
  //     block: item,
  //   });

  return (
    <View style={[commonStyle.containerWrapper, { flex: 1, backgroundColor: COLORS.light3 }]}>
      <View style={{ marginTop: 30 }}>
        <Text style={[styles.titleText, FONTS.body2]}>Block</Text>
        <Text style={[styles.descriptionText, FONTS.body5]}>
          Slect Block below to access the rooms
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <RoomBlockComponent {...{ roomsBlock, selectedBlock, setSelectedBlock }} />
      </View>
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 90,
          height: 3,
          borderRadius: 2,
          backgroundColor: COLORS.light1,
        }}
      />
      {selectedBlock ? (
        <CleaningLog {...{ selectedBlock }} />
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
        <Text style={[FONTS.h2, { color: COLORS.white }]}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;
