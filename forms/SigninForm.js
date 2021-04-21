import React, { useRef } from "react";
import { Text, View, Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextInput from "../component/InputFieldAdaptor";
import Button from "../component/Button";
import { FONTS } from "../constants/theme";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(2, "Too Short!").max(10, "Too Long!").required("Required"),
});

const Login = () => {
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: "", password: "" },
    onSubmit: (values) => alert(`Email: ${values.email}, Password: ${values.password}`),
  });

  const password = useRef(null);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={[FONTS.body5, { color: "#223e4b", fontSize: 20, marginBottom: 16 }]}>Login</Text>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}>
        <TextInput
          icon="mail"
          placeholder="Enter your email"
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          error={errors.email}
          touched={touched.email}
          onSubmitEditing={() => password.current?.focus()}
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}>
        <TextInput
          ref={password}
          icon="key"
          placeholder="Enter your password"
          secureTextEntry
          autoCompleteType="password"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="go"
          returnKeyLabel="go"
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          error={errors.password}
          touched={touched.password}
          onSubmitEditing={() => handleSubmit()}
        />
      </View>
      <Button label="Login" onPress={handleSubmit} />
    </TouchableWithoutFeedback>
  );
};

export default Login;
