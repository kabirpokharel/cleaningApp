import React from "react";
import { Text, View, Keyboard } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SigninForm from "../../forms/SigninForm";
import SignupScreen from "../Signup/SignupScreen";
import Signup from "../../forms/SignupForm";

const OtherLinks = ({ navigation }) => (
  <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 15 }}>
    <TouchableOpacity
      onPress={() => alert("resetPassword")}
      style={{
        padding: 10,
      }}
    >
      <Text style={[FONTS.h6, { color: COLORS.primary }]}>Forgot Password?</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate("Signup")}
      style={{
        flexDirection: "row",
        padding: 10,
      }}
    >
      <Text style={[FONTS.body4, { color: COLORS.primary1, lineHeight: 18 }]}>
        Don't have an account?{" "}
      </Text>
      <Text style={[FONTS.h6, { color: COLORS.primary }]}>Sign up </Text>
    </TouchableOpacity>
  </View>
);

const SigninScreen = (props) => {
  const { navigation } = props;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <TouchableWithoutFeedback
        style={{
          height: "100%",
          justifyContent: "center",
        }}
        onPress={Keyboard.dismiss}
      >
        <SigninForm {...{ navigation }} />
        <OtherLinks {...{ navigation }} />
      </TouchableWithoutFeedback>
    </View>
  );
};
export default SigninScreen;
