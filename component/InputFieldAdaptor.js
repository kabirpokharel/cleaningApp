import React, { forwardRef } from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";
import { Entypo as Icon } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants/theme";

const InputFieldAdaptor = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;
  const hasError = errors[name] && touched[name];
  const validationColor = hasError ? COLORS.secondary : COLORS.primary;
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 48,
          borderRadius: 8,
          borderColor: validationColor,
          borderWidth: StyleSheet.hairlineWidth,
          padding: 8,
        }}
      >
        {inputProps.icon && (
          <View style={{ padding: 8 }}>
            <Icon name={icon} color={validationColor} size={16} />
          </View>
        )}
        <View
          style={{
            flex: 1,
          }}
        >
          <TextInput
            style={{
              color: COLORS.dark3,
              height: "100%",
            }}
            underlineColorAndroid="transparent"
            placeholderTextColor={COLORS.primary2}
            value={value}
            onChangeText={(text) => onChange(name)(text)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            {...inputProps}
          />
        </View>
      </View>
      <View style={{ height: 20, marginTop: -3 }}>
        {hasError && <Text style={[FONTS.body6, { color: validationColor }]}>{errors[name]}</Text>}
      </View>
    </View>
  );
};

export default InputFieldAdaptor;


