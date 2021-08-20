import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = ({ label, onPress, btnStyle }) => (
  <TouchableOpacity
    style={[
      {
        borderRadius: 8,
        height: 50,
        width: 245,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e94832',
      }, btnStyle,
    ]}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <Text style={{ fontSize: 18, color: 'white', textTransform: 'uppercase' }}>{label}</Text>
  </TouchableOpacity>
);

export default CustomButton;
