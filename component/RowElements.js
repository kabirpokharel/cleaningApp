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

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;

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
  const totalGutterWidth = SCREEN_WIDTH * (numColumns - 1) * gutterWidthRatio;
  const singleGutterWidth = totalGutterWidth / (numColumns - 1);
  const cardWidth = (SCREEN_WIDTH - 2 * PAGE_HORIZONTAL_MARGIN - totalGutterWidth) / numColumns;

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

const styles = StyleSheet.create({
  titleText: {
    marginBottom: 15,
    fontSize: 25,
  },
  blockContainerWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  blockWrapper: {
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: singleGutterWidth / 2, //margin doesn't collapse in react native
    // marginRight: singleGutterWidth,
    // height: cardWidth,
    // width: cardWidth,
    backgroundColor: "pink",
    borderRadius: 4,
  },
});
