import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const CardComponent = ({ children, cardStyle }) => {
  return (
    <View
      style={[
        {
          margin: 10,
          padding: 10,
          borderRadius: SIZES.radius / 4,
          backgroundColor: COLORS.white,
          shadowColor: COLORS.dark1,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

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
