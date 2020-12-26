import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = (props) => {
  const { navigation } = props;
  console.log("this is props from homeScreen====>", props);
  return (
    <View>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate("profile", { name: "Jane" })}
      />
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button
        title="Reset Password"
        onPress={() =>
          navigation.navigate("authStack", { screen: "Reset Password" })
        }
      />
    </View>
  );
};
export default HomeScreen;
