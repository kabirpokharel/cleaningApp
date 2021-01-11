import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const CleaningLog = (props) => {
  const { navigation, route } = props;
  console.log("this is route.params==>", route.params.roomName);
  return (
    <View style={styles.containerWrapper}>
      <Text>{route.params.roomName}</Text>
    </View>
  );
};

export default CleaningLog;
const styles = StyleSheet.create({
  containerWrapper: {
    marginHorizontal: 20,
  },
  titleText: {
    marginBottom: 15,
    fontSize: 25,
  },
});
