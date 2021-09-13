import React from 'react';
import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Platform,
  SafeAreaView,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SignupForm from '../../forms/SignupForm';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const SignupScreen = () => {
  console.log('from signup screen');
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
