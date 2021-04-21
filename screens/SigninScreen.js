import React from "react";
import { View } from "react-native";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SigninForm from "../forms/SigninForm";

const SigninScreen = (props) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SigninForm />
    </View>
  );
};
export default SigninScreen;
