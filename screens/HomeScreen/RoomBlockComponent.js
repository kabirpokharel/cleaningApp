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
          height: 112,
          width: 70,
          // padding: SIZES.padding,
          // paddingBottom: SIZES.padding * 2,
          // borderWidth: 0.3,
          // borderColor: COLORS.light4,
          backgroundColor: selectedBlock === id ? COLORS.primary : COLORS.white,
          borderRadius: SIZES.radius * 2.1,
          alignItems: "center",
          justifyContent: "center",
          marginRight: SIZES.padding,
          marginRight: SIZES.padding - SIZES.padding / 4,
          marginLeft: SIZES.padding / 4,
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
              height: 30,
              width: 30,
              borderWidth: 0,
              borderColor: "transparent",
              borderRadius: 15,
              overflow: "hidden",
              flexDirection: "row",
            }}
          >
            <View
              style={[
                blockStyle(blockName),
                {
                  width: 15,
                  height: 30,
                  // borderRadius: 7.5,
                },
              ]}
            />
            <View
              style={[
                blockStyle(blockName === "pinkBlue" ? "blue" : blockName),
                {
                  width: 15,
                  height: 30,
                  // borderRadius: 15,
                },
              ]}
            />
          </View>
        </View>
        <Text
          style={{
            marginTop: SIZES.padding,
            color: selectedBlock === id ? COLORS.white : COLORS.primary1,
            ...FONTS.body6,
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
      contentContainerStyle={{ paddingTop: SIZES.padding * 2, paddingBottom: 8 }}
    />
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: COLORS.lightGray4,
  //   },
  shadow: {
    shadowColor: COLORS.dark1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
});
