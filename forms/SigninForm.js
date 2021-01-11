import React from "react";
import { Button, View, StyleSheet, Text, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { signinUser } from "../redux/actions";
import {
  TextInput as TextInputAdaptor,
  Button as ButtonAdaptor,
  Title,
  useTheme,
} from "react-native-paper";
import InputFieldAdaptor from "../component/InputFieldAdaptor";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

var screenWidth = Dimensions.get("window").width; //full width
var screenHeight = Dimensions.get("window").height; //full height

const reviewSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SigninForm = (props) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const authData = useSelector((state) => {
    console.log("this is auth state in reudx==> ", state);
    return state.auth;
  });

  return (
    <View style={styles.containerWrapper}>
      <Title style={styles.titleText}>Signin</Title>
      {!!authData.error && (
        <View>
          <Text
            style={{ color: colors.error }}
          >{`this is error -> ${authData.error}`}</Text>
        </View>
      )}
      <Formik
        initialValues={{ email: "", password: "" }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          dispatch(signinUser(values));
          actions.resetForm();
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          touched,
          errors,
          values,
        }) => (
          <View>
            <InputFieldAdaptor
              style={styles.input}
              label="E-mail"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              touched={touched.email}
              error={errors.email}
            />
            <InputFieldAdaptor
              style={styles.input}
              label="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              touched={touched.password}
              error={errors.password}
            />
            <ButtonAdaptor mode="contained" onPress={handleSubmit}>
              Submit
            </ButtonAdaptor>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SigninForm;

const styles = StyleSheet.create({
  containerWrapper: {
    marginHorizontal: 20,
  },
  titleText: {
    marginBottom: 15,
    fontSize: 25,
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});
