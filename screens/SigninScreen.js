import React from "react";
import { View } from "react-native";
import { COLORS } from "../constants/theme";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SigninForm from "../forms/SigninForm";

const SigninScreen = (props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <SigninForm />
    </View>
  );
};
export default SigninScreen;
