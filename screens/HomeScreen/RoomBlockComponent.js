import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants/theme";
import { blockStyle } from "./homeScreenFunc";
import { roomsBlock, blocks } from "../../dummyValues/roomsBlock";
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
    const { blockName } = item;
    return (
      <TouchableOpacity
        style={{
          height: 112,
          width: 70,
          // padding: SIZES.padding,
          // paddingBottom: SIZES.padding * 2,
          backgroundColor: selectedBlock?.id == item.id ? COLORS.primary : COLORS.white,
          borderRadius: SIZES.radius,
          alignItems: "center",
          justifyContent: "center",
          marginRight: SIZES.padding,
          ...styles.shadow,
        }}
        onPress={() => {
          const roomArray = blocks[blockName].map((roomNumber) => ({
            id: roomNumber,
            cleaningType: "",
          }));
          dispatch(loadRooms(blockName, roomArray));
          setSelectedBlock(item);
        }}
      >
        <View
          style={[
            homeStyles.blockStyle,
            {
              backgroundColor: selectedBlock?.id == item.id ? COLORS.white : COLORS.lightGray,
            },
          ]}
        >
          <View
            style={[
              blockStyle(item.blockName),
              {
                width: 30,
                height: 30,
                borderRadius: 15,
              },
            ]}
          />
        </View>
        <Text
          style={{
            marginTop: SIZES.padding,
            color: selectedBlock?.id == item.id ? COLORS.white : COLORS.dark1,
            ...FONTS.body5,
          }}
        >
          {blockNameFormatter(item.blockName)}
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
      contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
    />
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: COLORS.lightGray4,
  //   },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
