import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const CardComponent = ({ children, cardStyle }) => {
  return (
    <View
      style={[
        {
          marginHorizontal: 10,
          marginVertical: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: SIZES.radius / 4,
          backgroundColor: COLORS.white,
          shadowColor: COLORS.dark1,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,

          elevation: 5,
        },
        cardStyle,
      ]}
    >
      {children}
    </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({});
