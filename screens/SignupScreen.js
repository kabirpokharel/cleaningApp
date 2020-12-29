import React from "react";
import { View, Text, Button } from "react-native";

const SignupScreen = (props) => {
  const { navigation } = props;
  return (
    <View>
      {/* <Text>This is sign up Page!!!</Text>; */}
      <Button
        title="Signin Done..let's go to home screen"
        onPress={() => navigation.navigate("homeStack", { screen: "Home" })}
      />
    </View>
  );
};

export default SignupScreen;
