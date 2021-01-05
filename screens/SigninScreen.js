import React from "react";
import { Keyboard, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { TextInput as TextInputAdaptor } from "react-native-paper";
import SigninForm from "../forms/SigninForm";

const SigninScreen = (props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "pink",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SigninForm />
      </TouchableWithoutFeedback>
    </View>
  );
};
export default SigninScreen;
