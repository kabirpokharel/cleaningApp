import React from 'react';
import {
  StyleSheet, Platform, Text, TouchableOpacity,
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';

const TagComponent = ({
  onPress, tagText, containerStyle, textStyle, disabled,
}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[{
      flexDirection: 'row',
      paddingHorizontal: SIZES.baseSize * 20,
      paddingVertical: SIZES.baseSize * 12,
      backgroundColor: COLORS.white,
      borderRadius: SIZES.baseSize * 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 9,
      marginTop: 1,
      // marginRight: SIZES.baseSize * 16,
      marginRight: SIZES.baseSize * 16 - SIZES.baseSize * 4,
      marginLeft: SIZES.baseSize * 4,
      ...styles.shadow,

    }, containerStyle]}
  >
    <Text style={[FONTS.body4, styles.tagTextStyle, textStyle]}>{tagText}</Text>
  </TouchableOpacity>
);

export default TagComponent;

const styles = StyleSheet.create({
  tagContainerStyle: {

    //   borderWidth: 1.5,
    //   borderColor: COLORS.primary2,
    // borderRadius: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: SIZES.baseSize * 20,
    // paddingVertical: SIZES.baseSize * 9,
    // marginVertical: SIZES.baseSize * 5,
    // marginHorizontal: SIZES.baseSize * 5,
  },
  tagTextStyle: {
    color: COLORS.primary1,
    textTransform: 'capitalize',

  },
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
