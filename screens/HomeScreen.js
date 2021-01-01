import React from "react";
import { View, Text, Button } from "react-native";
import { useTheme } from "react-native-paper";

import AwesomeIcon from "react-native-vector-icons/FontAwesome";
const HomeScreen = (props) => {
  const { colors, dark } = useTheme();
  const { navigation } = props;
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
      <View>
        <Text style={{ color: colors.error }}>
          This is dummy text in welcome screen
        </Text>
      </View>
    </View>
  );
};
export default HomeScreen;