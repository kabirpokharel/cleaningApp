import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const CardComponent = ({ children, cardStyle }) => (
  <View
    style={[
      styles.cardContainer,
      // {
      //   marginHorizontal: SIZES.baseSize,
      //   marginVertical: SIZES.baseSize,
      //   paddingHorizontal: SIZES.baseSize,
      //   paddingVertical: SIZES.baseSize,
      //   borderRadius: SIZES.baseSize * 0.4,
      //   backgroundColor: COLORS.white,
      //   shadowColor: COLORS.dark1,
      //   shadowOffset: {
      //     width: 0,
      //     height: 2,
      //   },
      //   shadowOpacity: 0.1,
      //   shadowRadius: SIZES.baseSize * 0.6,

      //   elevation: 5,
      // },
      cardStyle,
    ]}
  >
    {children}
  </View>
);

export default CardComponent;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: SIZES.baseSize * 10,
    marginVertical: SIZES.baseSize * 10,
    paddingHorizontal: SIZES.baseSize * 10,
    paddingVertical: SIZES.baseSize * 10,
    borderRadius: SIZES.baseSize * 0.4,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.dark1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: SIZES.baseSize * 6,

    elevation: 5,
  },
});
