import React from "react";
import { Button, View, StyleSheet, Text, Dimensions } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import {
  TextInput as TextInputAdaptor,
  Button as ButtonAdaptor,
  Title,
} from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const reviewSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(8),
  rating: yup
    .string()
    .required()
    .test("is-num-1-5", "Rating must be a number 1 - 5", (val) => {
      return parseInt(val) < 6 && parseInt(val) > 0;
    }),
});

const SigninForm = () => {
  return (
    <View style={styles.containerWrapper}>
      <Title style={styles.titleText}>Signin</Title>
      <Formik
        initialValues={{ title: "", body: "", rating: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          addReview(values);
        }}
      >
        {(props) => (
          <View>
            <TextInputAdaptor
              mode="outlined"
              style={styles.input}
              label="Review title"
              onChangeText={props.handleChange("title")}
              onBlur={props.handleBlur("title")}
              value={props.values.title}
              underlineColor="green"
              error={!!(props.touched.title && props.errors.title)}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={styles.errorText}>
              {props.touched.title && props.errors.title}
            </Text>
            <TextInputAdaptor
              style={styles.input}
              mode="outlined"
              // multiline
              // minHeight={60}
              label="Review details"
              onChangeText={props.handleChange("body")}
              onBlur={props.handleBlur("body")}
              value={props.values.body}
              error={!!(props.touched.body && props.errors.body)}
            />
            <Text style={styles.errorText}>
              {props.touched.body && props.errors.body}
            </Text>
            <TextInputAdaptor
              mode="outlined"
              style={styles.input}
              label="Rating (1 - 5)"
              onChangeText={props.handleChange("rating")}
              onBlur={props.handleBlur("rating")}
              value={props.values.rating}
              keyboardType="numeric"
              error={!!(props.touched.rating && props.errors.rating)}
            />
            <Text style={styles.errorText}>
              {props.touched.rating && props.errors.rating}
            </Text>
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
    // fontWeight: "bold",
    // color: "#333",
  },
  input: {
    borderColor: "red",
    padding: 0,
    margin: 0,
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
});
