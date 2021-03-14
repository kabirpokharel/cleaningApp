import React from "react";
import { Keyboard, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SigninForm from "../forms/SigninForm";

const SigninScreen = (props) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SigninForm />
      </TouchableWithoutFeedback>
    </View>
  );
};
export default SigninScreen;
