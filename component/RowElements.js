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

const ElementComponent = ({
  index,
  numColumns,
  round,
  onPress,
  onLongPress,
  ElementChildren,
  extraStyle,
  lastElement,
}) => {
  const PAGE_HORIZONTAL_MARGIN = 20;

  const gutterWidthRatio = 0.2 / numColumns;
  const totalGutterWidth = SIZES.width * (numColumns - 1) * gutterWidthRatio;
  const singleGutterWidth = totalGutterWidth / (numColumns - 1);
  const cardWidth = (SIZES.width - 2 * PAGE_HORIZONTAL_MARGIN - totalGutterWidth) / numColumns;

  const marginRight = (index + 1) % numColumns == 0 ? 0 : singleGutterWidth;

  console.log("see this is last element", lastElement);
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
          marginBottom: lastElement ? 40 : null,
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
  let itemLength = item.length;
  return (
    <View style={{ marginBottom: 70 }}>
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
              lastElement={itemLength === parseInt(index) + 1}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RowElements;
