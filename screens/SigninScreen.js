/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
// import { render } from "react-dom";
// import Styles from "./Styles";
import { Form, Field } from "react-final-form";
// import createDecorator from "final-form-focus";
import { View, Text, Input, Button } from "react-native";
import SignupScreen from "./SignupScreen";

import { TextInput } from "react-native-paper";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmitFunc = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const SigninScreen = () => {
  const validate = (values) => {
    const errors = {};
    alert(JSON.stringify(values));
    return errors;
  };

  const handleSubmit = (values) => {
    alert(JSON.stringify(values));
  };
  return (
    <View>
      <Form
        onSubmit={handleSubmit}
        // decorators={[focusOnError]}
        // validate={(values) => {
        //   return validate(values);
        // }}
        render={({ handleSubmit, submitting, valid }) => (
          <View>
            <Field name="FieldName" placeholder="your placeholder">
              {/* {({ input, meta, placeholder }) => {
                let showToolTip = false;
                if (meta.error && meta.visited && !meta.active) {
                  showToolTip = true;
                } else {
                  showToolTip = false;
                }
                return (
                  <View>
                    <Input placeholder={placeholder} {...input} />
                    <Text size={8}>{meta.error}</Text>
                  </View>
                );
              }} */}
              <View>
                <Input placeholder={"placeholder"} />
                <Text size={8}>{"meta.error"}</Text>
              </View>
            </Field>
            <Button
              style={{ fontSize: 20, color: "green" }}
              styleDisabled={{ color: "red" }}
              onPress={handleSubmit}
              title="Press Me"
            >
              Press Me
            </Button>
            {/* <Button
              color="red"
              round={true}
              size="small"
              onPress={handleSubmit}
            >
              <Text>Submit</Text>
            </Button> */}
          </View>
        )}
      />
    </View>
  );
};

export default SigninScreen;
