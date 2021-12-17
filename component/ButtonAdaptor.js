import React from "react";
import { Text, View, StyleSheet } from "react-native-web";
import { TouchableOpacity } from "react-native-gesture-handler";

const ButtonAdaptor = ({ title, onPress, propStyle }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.button, propStyle]}>
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
);

export default ButtonAdaptor;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
