import React, { useState, useRef } from 'react';
import {
  Text, View, Alert, Keyboard, ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useFormik, Formik, Field } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import InputFieldAdaptor from '../component/InputFieldAdaptor';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { baseUrl } from '../constants/constants';
import CustomButton from '../component/CustomButton';
import { Title } from '../component/TitleWithDescriptionComponent';
import CardComponent from '../component/CardComponent';
import { signinUser } from '../redux/actions';

const signUpValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid first name')
    .max(40)
    .required('Please nter first name'),
  surname: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid last name')
    .max(40)
    .required('Please enter last name'),
  // phoneNumber: yup
  //   .string()
  //   .matches(/(04)(\d){8}\b/, "Enter a valid phone number (hint: 04 followed by 8 digits)")
  //   .required("Phone number is required"),
  email: yup.string().email('Please enter valid email').required('Email is required'),
  password: yup
    .string()
    // .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    // .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    // .matches(/\d/, "Password must have a number")
    // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Required"),
//   password: Yup.string().min(2, "Too Short!").max(10, "Too Long!").required("Required"),
// });

const SignUpButton = ({ label, onPress, loading }) => (
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
    {loading ? (
      <ActivityIndicator size="large" color="#00ff00" />
    ) : (
      <Text style={[FONTS.body3, { color: 'white', textTransform: 'uppercase' }]}>{label}</Text>
    )}
  </TouchableOpacity>
);

const createTwoButtonAlert = () => Alert.alert(
  'Great !!',
  'Signup is successful',
  [
    { text: 'OK', onPress: () => console.log('OK Pressed') },
  ],
  { cancelable: false },
);

const onSubmitFunc = (navigation, dispatch, values, setLoading) => {
  const {
    firstName, surname, email, password,
  } = values;
  setLoading(true);
  const signupCredentials = {
    firstName, surname, role: 'user', dob: '2000-02-02', email, password,
  };

  axios({
    method: 'post',
    url: `${baseUrl}/signup`,
    data: signupCredentials,
  }).then((res) => {
    console.log('see this is res.data.blocks ------->', res.data);
    // dispatch(signinUser({
    //   firstName, surname, email, password,
    // }));
    createTwoButtonAlert();
    navigation.navigate('Signin');
  })
    .catch((err) => {
      console.log('see this is an error from signupForm screen***--------> ', err);
    });
};

const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const authDetail = useSelector((state) => state.auth);
  // const { currentUser } = authDetail;
  // const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
  //   validationSchema: SignupSchema,
  //   initialValues: { name: "", surname: "", email: "", password: "", rePassword: "" },
  //   // onSubmit: (values) => alert(`Email: ${values.email}, Password: ${values.password}`),
  //   onSubmit: (values) => onSubmitFunc(dispatch, values),
  // });

  // const password = useRef(null);

  return (
    <View style={{ paddingHorizontal: 32, width: '100%' }}>
      <Formik
        initialValues={{
          firstName: 'Hari',
          surname: 'Pokharel',
          email: 'damberpokharel233@gmail.com',
          password: 'admin123',
          confirmPassword: 'admin123',
          // firstName: currentUser.firstName || '',
          // surname: currentUser.lastName || '',
          // email: currentUser.email || '',
          // password: currentUser.password 54|| '',
          // confirmPassword: currentUser.confirmPassword || '',
        }}
        validationSchema={signUpValidationSchema}
        onSubmit={(values) => onSubmitFunc(navigation, dispatch, values, setLoading)}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Field component={InputFieldAdaptor} name="firstName" placeholder="First Name" />
              </View>
              <View style={{ width: 15 }} />
              <View style={{ flex: 1 }}>
                <Field component={InputFieldAdaptor} name="surname" placeholder="Surname" />
              </View>
            </View>

            <Field
              component={InputFieldAdaptor}
              name="email"
              placeholder="Email Address"
              keyboardType="email-address"
            />
            {/* <Field
              component={InputFieldAdaptor}
              name="phoneNumber"
              placeholder="Phone Number"
              keyboardType="numeric"
            /> */}
            <Field
              component={InputFieldAdaptor}
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <Field
              component={InputFieldAdaptor}
              name="confirmPassword"
              placeholder="Confirm Password"
              secureTextEntry
            />

            <SignUpButton loading={loading} label="Signup" onPress={handleSubmit} disabled={!isValid || loading} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default Signup;
