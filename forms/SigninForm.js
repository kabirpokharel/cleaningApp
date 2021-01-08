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

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const reviewSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SigninForm = (props) => {
  const auth = useSelector((state) => state.auth);
  console.log("see for the counter===>", auth);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  return (
    <View style={styles.containerWrapper}>
      <Title style={styles.titleText}>Signin</Title>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          dispatch(signinUser(values));
          actions.resetForm();
          addReview(values);
        }}
      >
        {(formikProps) => (
          <View>
            <TextInputAdaptor
              style={styles.input}
              underlineColorAndroid="transparent"
              mode="outlined"
              label="E-mail"
              onChangeText={formikProps.handleChange("email")}
              onBlur={formikProps.handleBlur("email")}
              value={formikProps.values.email}
              error={!!(formikProps.touched.email && formikProps.errors.email)}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            {!!(formikProps.touched.email && formikProps.errors.email) && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {formikProps.touched.email && formikProps.errors.email}
              </Text>
            )}
            <TextInputAdaptor
              style={styles.input}
              mode="outlined"
              label="Password"
              onChangeText={formikProps.handleChange("password")}
              onBlur={formikProps.handleBlur("password")}
              value={formikProps.values.password}
              error={
                !!(formikProps.touched.password && formikProps.errors.password)
              }
            />
            {!!(
              formikProps.touched.password && formikProps.errors.password
            ) && (
              <Text style={styles.errorText}>
                {formikProps.touched.password && formikProps.errors.password}
              </Text>
            )}
            <ButtonAdaptor mode="contained" onPress={props.handleSubmit}>
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
    // marginTop: 150,
    // flex: "1",
  },
  titleText: {
    marginBottom: 15,
    fontSize: 25,
  },
  input: {
    borderWidth: 0,
    height: 40,
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    // marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
});
