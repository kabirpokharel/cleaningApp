import React from "react";
import { StyleSheet, Text, View } from "react-native";

const InputFieldAdaptor = ({ style, touched, error, ...rest }) => {
  console.log("rest==>", rest);
  return (
    <>
      <TextInputAdaptor
        style={styles.input}
        {...rest}
        underlineColorAndroid="transparent"
        mode={rest.mode ? rest.mode : "outlined"}
        error={!!(touched && error)}
      />
      {touched && error ? (
        <View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </>
  );
};

export default InputFieldAdaptor;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    height: 40,
  },
  errorText: {
    color: "red",
    marginTop: 2,
    marginBottom: 6,
  },
});
