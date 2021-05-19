import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants/theme";
import { blockStyle } from "./homeScreenFunc";
// import { roomsBlock } from "../../dummyValues/roomsBlock";
import { loadRooms, roomCleaned } from "../../redux/actions";
import { useDispatch } from "react-redux";
import homeStyles from "./homeScreeStyle";

const capitalizeEachWord = (text) => {
  return text.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

const camelCaseBreaker = (text) => {
  const regex = /([a-z])([A-Z])/g;
  const spaces = text.replace(regex, "$1 $2");
  const lowercase = spaces.toLowerCase();
  return lowercase;
};

const blockNameFormatter = (blockName) => {
  if (/[A-Z]/.test(blockName)) {
    const capatilizedSplitString = capitalizeEachWord(camelCaseBreaker(blockName));
    return capatilizedSplitString;
  } else {
    return capitalizeEachWord(blockName);
  }
};

export default ({ roomsBlock, selectedBlock, setSelectedBlock }) => {
  const dispatch = useDispatch();
  const renderItem = ({ item }) => {
    const { id, blockName, rooms } = item;
    return (
      <TouchableOpacity
        style={{
          // height: 70,
          // width: 112,
          flexDirection: "row",
          paddingHorizontal: SIZES.baseSize * 10,
          paddingVertical: SIZES.baseSize * 8,
          // height: 112,
          // width: 70,

          // padding: SIZES.padding,
          // paddingBottom: SIZES.baseSize * 2
          // borderWidth: 0.3,
          // borderColor: COLORS.light4,

          backgroundColor: selectedBlock === id ? COLORS.primary : COLORS.white,
          borderRadius: SIZES.baseSize * 33.6,
          alignItems: "center",
          justifyContent: "center",
          marginRight: SIZES.baseSize * 16,
          marginRight: SIZES.baseSize * 16 - SIZES.baseSize * 4,
          marginLeft: SIZES.baseSize * 4,
          ...styles.shadow,
        }}
        onPress={() => {
          // const roomArray = rooms.map((roomNumber) => ({
          //   id: roomNumber,
          //   // cleaningType: "",
          // }));
          dispatch(loadRooms(id, blockName, rooms));
          setSelectedBlock(id);
        }}
      >
        <View
          style={[
            homeStyles.blockStyle,
            {
              backgroundColor: selectedBlock === id ? COLORS.white : COLORS.lightGray,
            },
          ]}
        >
          <View
            style={{
              height: SIZES.baseSize * 30,
              width: SIZES.baseSize * 30,
              borderWidth: 0,
              borderColor: "transparent",
              borderRadius: SIZES.baseSize * 15,
              overflow: "hidden",
              flexDirection: "row",
            }}
          >
            <View
              style={[
                blockStyle(blockName),
                {
                  width: SIZES.baseSize * 15,
                  height: SIZES.baseSize * 30,
                  // borderRadius: 7.5,
                },
              ]}
            />
            <View
              style={[
                blockStyle(blockName === "pinkBlue" ? "blue" : blockName),
                {
                  width: SIZES.baseSize * 15,
                  height: SIZES.baseSize * 30,
                  // borderRadius: 15,
                },
              ]}
            />
          </View>
        </View>
        <Text
          style={{
            padding: SIZES.baseSize * 8,
            color: selectedBlock === id ? COLORS.white : COLORS.primary1,
            ...FONTS.body5,
          }}
        >
          {blockNameFormatter(blockName)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={roomsBlock}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingTop: SIZES.baseSize * 32,
        paddingBottom: SIZES.baseSize * 8,
      }}
    />
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: COLORS.lightGray4,
  //   },
  shadow: {
    shadowColor: COLORS.dark3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
});
