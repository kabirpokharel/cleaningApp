import React from 'react';
import {
  Text, View, Keyboard, Image, KeyboardAvoidingView, SafeAreaView, Platform,
} from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SigninForm from '../../forms/SigninForm';
import SignupScreen from '../Signup/SignupScreen';
import Signup from '../../forms/SignupForm';

const OtherLinks = ({ navigation }) => (
  <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
    <TouchableOpacity
      onPress={() => alert('resetPassword')}
      style={{
        padding: 10,
      }}
    >
      <Text style={[FONTS.h6, { color: COLORS.primary }]}>Forgot Password?</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate('Signup')}
      style={{
        flexDirection: 'row',
        padding: 10,
      }}
    >
      <Text style={[FONTS.body4, { color: COLORS.primary1, lineHeight: 18 }]}>
        Don't have an account?
        {' '}
      </Text>
      <Text style={[FONTS.h6, { color: COLORS.primary }]}>Sign up </Text>
    </TouchableOpacity>
  </View>
);

const SigninScreen = (props) => {
  const { navigation } = props;
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback
        style={{
          height: '100%',
          justifyContent: 'center',
        }}
        onPress={Keyboard.dismiss}
      >
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Image
            resizeMode="cover"
            style={{
              width: SIZES.baseSize * 200,
              height: undefined,
              aspectRatio: 1,
              marginTop: SIZES.baseSize * 30,
            }}
            source={require('../../assets/icons/newLogo.png')}

          />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: (SIZES.baseSize * 40) }}>
            <Text style={[FONTS.body6,
              {
                paddingLeft: 30, textAlign: 'center', paddingBottom: 15, lineHeight: 15, color: COLORS.primary2,
              }]}
            >
              We clean corners, we do not cut them!
            </Text>
          </View>
          <SigninForm {...{ navigation }} />
          <OtherLinks {...{ navigation }} />
        </View>
        <View style={{ height: 100 }} />
        <SafeAreaView />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    // <View
    //   style={{
    //     flex: 1,
    //     backgroundColor: COLORS.white,
    //   }}
    // >
    //   <TouchableWithoutFeedback
    //     style={{
    //       height: "100%",
    //       justifyContent: "center",
    //     }}
    //     onPress={Keyboard.dismiss}
    //   >
    //     <View style={{ alignItems: "center", width: "100%" }}>
    //       <Image
    //         resizeMode={"cover"}
    //         style={{
    //           width: 160,
    //           height: undefined,
    //           aspectRatio: 1.8,
    //           marginTop: 30,
    //           marginBottom: 40,
    //         }}
    //         source={require("../../assets/images/acssLogo.png")}
    //       />
    //     </View>
    //     <SigninForm {...{ navigation }} />
    //     <OtherLinks {...{ navigation }} />
    //   </TouchableWithoutFeedback>
    // </View>
  );
};
export default SigninScreen;
