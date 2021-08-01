import React, { useRef } from 'react';
import {
  Text, View, Keyboard, Button,
} from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useFormik, Formik, Field } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl } from '../constants/constants';
import InputFieldAdaptor from '../component/InputFieldAdaptor';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import CustomButton from '../component/CustomButton';
import { Title } from '../component/TitleWithDescriptionComponent';
import CardComponent from '../component/CardComponent';
import { signinUser } from '../redux/actions';

const signinValidationSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Required"),
//   password: Yup.string().min(2, "Too Short!").max(10, "Too Long!").required("Required"),
// });

const SigninButton = ({ label, onPress }) => (
  <TouchableOpacity
    style={[
      {
        borderRadius: 8,
        height: 50,
        marginTop: 15,
        marginHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
      },
    ]}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <Text style={[FONTS.body3, { color: 'white', textTransform: 'uppercase' }]}>{label}</Text>
  </TouchableOpacity>
);

const loginFunc = (dispatch, values) => {
  axios({
    method: 'post',
    url: `${baseUrl}/login`,
    data: values,
  }).then((res) => {
    console.log('see this is res.data from sinin form ------->', res.data);

    dispatch(signinUser(res.data));
  })
    .catch((err) => {
      console.log('see this is an error from signIn screen***--------> ', err);
    });
};

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <>
      <View style={{ paddingHorizontal: 32, width: '100%' }}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={signinValidationSchema}
          onSubmit={(values) => loginFunc(dispatch, values, navigation)}
        >
          {({ handleSubmit, isValid }) => (
            <>
              <Field
                component={InputFieldAdaptor}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
              />
              <Field
                component={InputFieldAdaptor}
                name="password"
                placeholder="Password"
                secureTextEntry
              />
              <SigninButton label="login" onPress={handleSubmit} disabled={!isValid} />
            </>
          )}
        </Formik>
      </View>
      {/* <SigninButton label={"login"} onPress={handleSubmit} /> */}
    </>
  );
};

export default Login;
