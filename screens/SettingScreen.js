import React from "react";
import { View, Text, Button } from "react-native";

const SettingScreen = (props) => {
  const { navigation } = props;
  return (
    <View>
      <Text>This is setting Page!!!</Text>;
      <Button
        title="Update Profile"
        onPress={() => navigation.navigate("homeStack", { screen: "Home" })}
      />
      <Button
        title="Reset Password"
        onPress={() => navigation.navigate("homeStack", { screen: "Home" })}
      />
    </View>
  );
};

export default SettingScreen;
