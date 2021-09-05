import React from 'react';
import {
  StyleSheet, Text, View, Platform, Modal, ActivityIndicator,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const SummaryRoomComponent = ({ rooms }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
    {rooms.length ? (
      rooms.map((room) => (
        <View
          key={room}
          style={{
            height: 23,
            width: 23,
            margin: 3,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12.5,
            backgroundColor: '#d9ebe9',
          }}
        >
          <Text style={[FONTS.body6, { color: COLORS.primary, fontSize: 9 }]}>{room}</Text>
        </View>
      ))
    ) : (
      <View
        style={{
          height: SIZES.baseSize * 23,
          margin: SIZES.baseSize * 3,
        }}
      >
        <Entypo name="cross" size={20} color={COLORS.secondary1} />
      </View>
    )}
  </View>
);

const IndividualBlockDetails = (props) => {
  const {
    blockName, daily, thorough, unattended,
  } = props;
  return (
    <View
      style={{
        borderWidth: 4,
        marginTop: SIZES.baseSize * 30,
        marginVertical: SIZES.baseSize * 20,
        marginHorizontal: SIZES.baseSize * 10,
        paddingHorizontal: SIZES.baseSize * 10,
        paddingVertical: SIZES.baseSize * 10,
        borderColor: COLORS.light3,
      }}
    >
      <View
        style={{
          position: 'absolute',
          backgroundColor: COLORS.white,
          paddingVertical: SIZES.baseSize * 10,
          paddingHorizontal: SIZES.baseSize * 5,
          top: SIZES.baseSize * -25,
          left: SIZES.baseSize * 7,
        }}
      >
        <Text style={[FONTS.body3, { color: COLORS.primary, textTransform: 'capitalize' }]}>{`${blockName}`}</Text>
      </View>
      <View>
        <View style={{ margin: SIZES.baseSize * 2 }}>
          <Text style={{ color: COLORS.dark3 }}>Daily Cleaned:</Text>
          <SummaryRoomComponent rooms={daily} />
        </View>
        <View style={{ margin: SIZES.baseSize * 2 }}>
          <Text style={{ color: COLORS.dark3 }}>Thorough Cleaned:</Text>
          <SummaryRoomComponent rooms={thorough} />
        </View>
        <View style={{ margin: SIZES.baseSize * 2 }}>
          <Text style={{ color: COLORS.dark3 }}>Unattended:</Text>
          <SummaryRoomComponent rooms={unattended} />
        </View>
      </View>
    </View>
  );
};

const SummaryText = ({ text, isQuantity }) => {
  const textStyle = isQuantity ? { ...FONTS.h5, color: COLORS.primary } : FONTS.body4;
  return (
    <Text
      style={[
        {
          color: COLORS.primary1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        textStyle,
      ]}
    >
      {text}
    </Text>
  );
};

const SummaryElement = ({ item, measure }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: SIZES.baseSize * 35,
      marginHorizontal: SIZES.baseSize * 20,
    }}
  >
    <SummaryText text={item} />
    <SummaryText
      // isQuantity
      text={measure}
    />
  </View>
);

export {
  IndividualBlockDetails,
  SummaryElement,
};
