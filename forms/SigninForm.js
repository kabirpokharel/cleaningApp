import React from "react";
import { Button, View, StyleSheet, Text, Dimensions } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
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
  const { colors } = useTheme();
  return (
    <View style={styles.containerWrapper}>
      <Title style={styles.titleText}>Signin</Title>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          addReview(values);
        }}
      >
        {(props) => (
          <View>
            <TextInputAdaptor
              style={styles.input}
              underlineColorAndroid="transparent"
              mode="outlined"
              label="E-mail"
              onChangeText={props.handleChange("email")}
              onBlur={props.handleBlur("email")}
              value={props.values.email}
              error={!!(props.touched.email && props.errors.email)}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            {!!(props.touched.email && props.errors.email) && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {props.touched.email && props.errors.email}
              </Text>
            )}
            <TextInputAdaptor
              style={styles.input}
              mode="outlined"
              label="Password"
              onChangeText={props.handleChange("password")}
              onBlur={props.handleBlur("password")}
              value={props.values.password}
              error={!!(props.touched.password && props.errors.password)}
            />
            {!!(props.touched.password && props.errors.password) && (
              <Text style={styles.errorText}>
                {props.touched.password && props.errors.password}
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
