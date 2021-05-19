import React from "react";
import SignupForm from "../../forms/SignupForm";
import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Platform,
  SafeAreaView,
} from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const SignupScreen = () => {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback
        style={{
          height: "100%",
          justifyContent: "center",
        }}
        onPress={Keyboard.dismiss}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            resizeMode={"cover"}
            style={{
              width: 160,
              height: undefined,
              aspectRatio: 1.8,
              marginTop: 30,
              marginBottom: 40,
            }}
            source={require("../../assets/images/acssLogo.png")}
          />
          <View style={{ width: "100%" }}>
            <Text style={[FONTS.h3, { paddingLeft: 30, paddingBottom: 15, color: COLORS.light2 }]}>
              Hello mate!
            </Text>
          </View>
          <SignupForm />
        </View>
        <View style={{ height: 100 }} />
        <SafeAreaView />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default SignupScreen;

// const SignupScreen = (props) => {
//   const { navigation } = props;
//   return (
//     <View>
//       <SignupForm />
//     </View>
//   );
// };

// export default SignupScreen;
