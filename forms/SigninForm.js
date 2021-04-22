import React, { useRef } from "react";
import { Text, View, Keyboard } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import TextInput from "../component/InputFieldAdaptor";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import CustomButton from "../component/CustomButton";
import { Title } from "../component/TitleWithDescriptionComponent";
import CardComponent from "../component/CardComponent";
import { signinUser } from "../redux/actions";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(2, "Too Short!").max(10, "Too Long!").required("Required"),
});

const SigninButton = ({ label, onPress }) => (
  <TouchableOpacity
    style={[
      {
        borderRadius: 8,
        height: 50,
        marginTop: 15,
        marginHorizontal: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
      },
    ]}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <Text style={[FONTS.body3, { color: "white", textTransform: "uppercase" }]}>{label}</Text>
  </TouchableOpacity>
);

const onSubmitFunc = (dispatch, values) => {
  dispatch(signinUser({ ...values }));
};

const Login = () => {
  const dispatch = useDispatch();
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: "", password: "" },
    // onSubmit: (values) => alert(`Email: ${values.email}, Password: ${values.password}`),
    onSubmit: (values) => onSubmitFunc(dispatch, values),
  });

  const password = useRef(null);

  return (
    <TouchableWithoutFeedback
      style={{
        height: "100%",
        justifyContent: "center",
      }}
      onPress={Keyboard.dismiss}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={[FONTS.largeTitle, { marginBottom: 40, color: COLORS.primary1 }]}>ACSS</Text>
        <View style={{ paddingHorizontal: 32, width: "100%" }}>
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
        <View style={{ paddingHorizontal: 32, width: "100%" }}>
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
      </View>
      <SigninButton label={"login"} onPress={handleSubmit} />
      <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 15 }}>
        <TouchableOpacity
          onPress={() => alert("resetPassword")}
          style={{
            padding: 10,
          }}
        >
          <Text style={[FONTS.h6, { color: COLORS.primary }]}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert("create an account?")}
          style={{
            flexDirection: "row",
            padding: 10,
          }}
        >
          <Text style={[FONTS.body4, { color: COLORS.primary1, lineHeight: 18 }]}>
            Don't have an account?{" "}
          </Text>
          <Text style={[FONTS.h6, { color: COLORS.primary }]}>Sign up </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
