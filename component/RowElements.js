import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { SIZES } from "../constants/theme";
// let SIZES.width = Dimensions.get("window").width;
// let SCREEN_HEIGHT = Dimensions.get("window").height;

const ElementComponent = ({
  index,
  numColumns,
  round,
  onPress,
  onLongPress,
  ElementChildren,
  extraStyle,
}) => {
  const PAGE_HORIZONTAL_MARGIN = 20;

  const gutterWidthRatio = 0.2 / numColumns;
  const totalGutterWidth = SIZES.width * (numColumns - 1) * gutterWidthRatio;
  const singleGutterWidth = totalGutterWidth / (numColumns - 1);
  const cardWidth = (SIZES.width - 2 * PAGE_HORIZONTAL_MARGIN - totalGutterWidth) / numColumns;

  const marginRight = (index + 1) % numColumns == 0 ? 0 : singleGutterWidth;
  return (
    <TouchableOpacity
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          marginVertical: [singleGutterWidth] / 2,
          marginRight,
          height: cardWidth,
          width: cardWidth,
          borderRadius: round ? cardWidth * 0.5 : 4,
        },
        extraStyle,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <ElementChildren />
    </TouchableOpacity>
  );
};

const RowElements = ({
  item,
  numColumns,
  onPress,
  onLongPress,
  round,
  ElementChildren,
  extraStyle,
}) => {
  console.log("from rowElements extraStyle===>", extraStyle);
  return (
    <>
      <FlatList
        data={item}
        numColumns={numColumns}
        renderItem={({ item, index }) => {
          return (
            <ElementComponent
              numColumns={numColumns}
              index={index}
              round={round}
              extraStyle={extraStyle ? extraStyle(item) : {}}
              onPress={() => onPress(item)}
              onLongPress={() => onLongPress(item)}
              ElementChildren={() => <ElementChildren item={item} />}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default RowElements;
