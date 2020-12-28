/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
// import { render } from "react-dom";
// import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import { View, Text, Input, Button } from "react-native";
import SignupScreen from "./SignupScreen";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmitFunc = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const SigninScreen = () => {
  return (
    <View>
      <Form onSubmit={(values) => console.log(values)}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <View>
              <Field component="input" />
            </View>
          </form>
        )}
      </Form>
    </View>
  );
};

export default SigninScreen;

// <Form
//   onSubmit={onSubmitFunc}
//   initialValues={{ stooge: "larry", employed: false }}
//   render={({ handleSubmit, form, submitting, pristine, values }) => {
//     return (
//       <form onSubmit={handleSubmit}>
//         <View>
//           <label>First Name</label>
//           <Field
//             name="firstName"
//             component="input"
//             type="text"
//             placeholder="First Name"
//           />
//         </View>
//         <View>
//           <label>Last Name</label>
//           <Field
//             name="lastName"
//             component="Input"
//             type="text"
//             placeholder="Last Name"
//           />
//         </View>
//         <View>
//           {/* <button type="submit" disabled={submitting || pristine}>
//           Submit
//         </button> */}
//           <Button
//             // onPress={handleSubmit}
//             title="Learn More"
//             color="#841584"
//             accessibilityLabel="Learn more about this purple button"
//           />
//           {/* <button
//           type="button"
//           onClick={form.reset}
//           disabled={submitting || pristine}
//         >
//           Reset
//         </button> */}
//         </View>
//         {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
//       </form>
//     );
//   }}
// />;
