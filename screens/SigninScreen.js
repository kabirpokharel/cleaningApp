import React from "react";
import { Keyboard, View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { TextInput as TextInputAdaptor } from "react-native-paper";
import SigninForm from "../forms/SigninForm";

const SigninScreen = (props) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ marginVertical: 50, padding: 20, backgroundColor: "lightgrey" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "grey", textAlign: "center" }}>
          Sprint 1: Team 4
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SigninForm />
      </TouchableWithoutFeedback>
    </View>
  );
};
export default SigninScreen;
