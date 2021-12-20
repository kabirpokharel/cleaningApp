import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ButtonAdaptor = (props) => {
  const { title, onPress, propStyle } = props;
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, propStyle]}>
          <Text>{title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ButtonAdaptor;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#5eba7d",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
