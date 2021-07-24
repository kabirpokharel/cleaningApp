import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, FlatList,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { SIZES, COLORS } from '../constants/theme';

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

  return (
    <TouchableOpacity
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
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
  const itemLength = item.length;
  return (
    <View style={{ marginBottom: 0 }}>
      <FlatList
        data={item}
        numColumns={numColumns}
        renderItem={({ item, index }) => (
          <ElementComponent
            numColumns={numColumns}
            index={index}
            round={round}
            extraStyle={extraStyle ? extraStyle(item) : {}}
            onPress={() => onPress(item, index)}
            onLongPress={() => onLongPress(item, index)}
            ElementChildren={() => (
              <ElementChildren
                dynamicStyle={{
                  color: extraStyle ? extraStyle(item).color : COLORS.dark1,
                }}
                item={item}
              />
            )}
            lastElement={itemLength === parseInt(index) + 1}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default RowElements;
