import React from "react";
import { Text, Button } from "react-native";

const ProfileScreen = (props) => {
  const { navigation, route } = props;
  console.log("this is props ==>", props);
  return <Text>This is {route.params.name}'s profile</Text>;
};

export default ProfileScreen;
