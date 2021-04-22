import React, { forwardRef } from "react";
import { TextInput as RNTextInput, Text, View, StyleSheet } from "react-native";
import { Entypo as Icon } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants/theme";

const TextInput = forwardRef(({ icon, error, touched, ...otherProps }, ref) => {
  const validationColor = !touched ? COLORS.primary : error ? COLORS.secondary : COLORS.primary;
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
        <View style={{ padding: 8 }}>
          <Icon name={icon} color={validationColor} size={16} />
        </View>
        <View style={{ flex: 1 }}>
          <RNTextInput
            style={{ color: COLORS.dark3 }}
            underlineColorAndroid="transparent"
            placeholderTextColor={COLORS.primary2}
            ref={ref}
            {...otherProps}
          />
        </View>
      </View>
      <View style={{ height: 15 }}>
        {validationColor === COLORS.secondary && (
          <Text style={[FONTS.body6, { color: COLORS.secondary }]}>Invalid input</Text>
        )}
      </View>
    </View>
  );
});

export default TextInput;
