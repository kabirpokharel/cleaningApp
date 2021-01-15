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

const NO_OF_COLUMNS = 3;
const PAGE_HORIZONTAL_MARGIN = 20;

const gutterWidthRatio = 0.1 / NO_OF_COLUMNS;
const totalGutterWidth = SCREEN_WIDTH * (NO_OF_COLUMNS - 1) * gutterWidthRatio;
const singleGutterWidth = totalGutterWidth / (NO_OF_COLUMNS - 1);
const cardWidth =
  (SCREEN_WIDTH - 2 * PAGE_HORIZONTAL_MARGIN - totalGutterWidth) /
  NO_OF_COLUMNS;

const ElementComponent = ({ index, onPress, elementChildren }) => {
  const marginRight = (index + 1) % NO_OF_COLUMNS == 0 ? 0 : singleGutterWidth;
  return (
    <TouchableOpacity
      style={[styles.blockWrapper, { marginRight }]}
      onPress={onPress}
    >
      {elementChildren}
      {/* <Text>{item.blockName}</Text> */}
    </TouchableOpacity>
  );
};

const RowElements = ({ item, onPress, ElementChildren }) => {
  console.log("this is elementCHildren===>", ElementChildren);
  return (
    <>
      <FlatList
        numColumns={NO_OF_COLUMNS}
        data={item}
        renderItem={({ item, index }) => {
          return (
            <ElementComponent
              // item={item}
              index={index}
              onPress={() => onPress(item)}
              elementChildren={() => <ElementChildren item={item} />}
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
    marginVertical: singleGutterWidth / 2, //margin doesn't collapse in react native
    marginRight: singleGutterWidth,
    height: cardWidth,
    width: cardWidth,
    backgroundColor: "pink",
    borderRadius: 4,
  },
});
