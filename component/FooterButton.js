import React from "react";
import { StyleSheet, Platform, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants/theme";

const isPlatformIos = Platform.OS === "ios";

const FooterButton = ({ onPress, btnText, containerStyle, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.btnContainerStyle, containerStyle]}
    >
      <Text style={[FONTS.body3, styles.btnTextStyle, textStyle]}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default FooterButton;

const styles = StyleSheet.create({
  btnContainerStyle: {
    position: "absolute",
    bottom: 0,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    // height: 70,
    height: isPlatformIos ? 70 : 55,
    paddingHorizontal: SIZES.baseSize * 10,
    width: SIZES.width,
  },
  btnTextStyle: {
    color: COLORS.white,
  },
});
