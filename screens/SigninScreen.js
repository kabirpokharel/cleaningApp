import React from "react";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { TextInput as TextInputAdaptor } from "react-native-paper";
import SigninForm from "../forms/SigninForm";

const SigninScreen = (props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SigninForm />
    </TouchableWithoutFeedback>
  );
};
export default SigninScreen;
