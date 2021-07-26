import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, StyleSheet, SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import symmaryStyles from './summaryScreenStyle';

import { roomsBlock, blocks } from '../../dummyValues/roomsBlock';
import { loadRooms, roomCleaned } from '../../redux/actions';
import { roomButtonStyle } from './summaryScreenFunc';
import {
  blockColor, COLORS, FONTS, SIZES,
} from '../../constants/theme';
import TitleWithDescription from '../../component/TitleWithDescriptionComponent';
import FooterButton from '../../component/FooterButton';
import CardComponent from '../../component/CardComponent';
import PageTemplate from '../../component/PageTemplate';

const SummaryRoomComponent = ({ rooms }) =>
  // console.log("see rooms===================================>", rooms);
  (
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
        <View style={{ height: 25 }} />
      // <View
      //   style={{
      //     backgroundColor: "#d9ebe9",
      //     height: 25,
      //     paddingHorizontal: 10,
      //     justifyContent: "center",
      //     alignItems: "center",
      //     borderRadius: SIZES.radius * 2,
      //   }}
      // >
      //   <Text style={[FONTS.body6, { color: COLORS.primary, fontSize: 9 }]}>none</Text>
      // </View>
      )}
    </View>
  );
const isPlatformIos = Platform.OS === 'ios';
// const IndividualBlockDetails = ({ blockName, daily, thorough, unattended }) => {
const IndividualBlockDetails = ({ block }) => {
  const {
    blockName, daily, thorough, unattended,
  } = block;
  console.log('see this is props for indivigualBLockDetails--------------->', block);
  // console.log("see this is block Name--------------->", blockName);
  return (
    <View
      style={{
        borderWidth: 4,
        marginVertical: 20,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: blockColor(blockName),
      }}
    >
      <View
        style={{
          position: 'absolute',
          backgroundColor: COLORS.white,
          // backgroundColor: "pink",

          padding: 10,
          top: -25,
          left: 15,
        }}
      >
        <Text style={[FONTS.body3, { color: blockColor(blockName) }]}>{`${blockName} Block`}</Text>
      </View>
      <View>
        <View style={{ margin: 2 }}>
          <Text style={[FONTS.body5, {}]}>Daily Cleaned:</Text>
          <SummaryRoomComponent rooms={daily} />
        </View>
        <View style={{ margin: 2 }}>
          <Text>Thorough Cleaned:</Text>
          <SummaryRoomComponent rooms={thorough} />
        </View>
        <View style={{ margin: 2 }}>
          <Text>Unattended:</Text>
          <SummaryRoomComponent rooms={unattended} />
        </View>
      </View>
    </View>
  );
};
const timeFormatter = (totalHrs, totalMins) => {
  const newHrs = totalHrs + Math.floor(totalMins / 60);
  const newMins = totalMins % 60;
  return `${newHrs}h:${newMins}m`;
};
const calculateTotalTime = (time) => {
  let totalHrs = 0;
  let totalMins = 0;
  time.forEach((timeObj) => {
    const { status } = timeObj;
    totalHrs += parseInt(status.substring(0, status.indexOf(':')));
    totalMins += parseInt(status.substring(status.indexOf(':') + 1));
  });
  return timeFormatter(totalHrs, totalMins);
};

const SummaryElement = ({ item, measure }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 35,
      marginHorizontal: 20,
    }}
  >
    <SummaryText text={item} />
    <SummaryText isQuantity text={measure} />
  </View>
);

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

const SummaryScreen = (props) => {
  const [cleanedRoomsStatus, setCleanedRoomsStatus] = useState({});
  const [viewMore, setViewMore] = useState(false);
  const cleaningDetail = useSelector((state) => state.cleaning);
  const { commonAreaCleaned, time, taskLog } = cleaningDetail;

  const dispatch = useDispatch();

  return (
    <PageTemplate>
      <TitleWithDescription
        title="Summary"
        description="Check your entry before submitting"
        containerStyle={{ paddingBottom: 20 }}
      />

      <View
        style={{
          flex: 1,
          paddingBottom: isPlatformIos ? SIZES.baseSize * 70 : SIZES.baseSize * 55,
        }}
      >
        <ScrollView>
          <CardComponent
            cardStyle={{
              paddingHorizontal: 10,
              // paddingVertical: 20,
              width: SIZES.width - 20,
              borderRadius: SIZES.baseSize * 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={[FONTS.body3, { color: COLORS.primary }]}>Current Shift Details</Text>
              <TouchableOpacity
                onPress={() => setViewMore((prevState) => !prevState)}
                style={{
                  backgroundColor: '#d9ebe9',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: SIZES.baseSize * 32,
                }}
              >
                <Text style={[FONTS.body5, { color: COLORS.primary }]}>
                  {viewMore ? 'View Less' : 'View More'}
                </Text>
              </TouchableOpacity>
            </View>
          </CardComponent>
        </ScrollView>
      </View>
      {/* <View style={{ flex: 1 }}> */}
      {/* </View> */}
      <FooterButton
        onPress={() => alert('From summary screen')}
        btnText="Submit"
        // disabled={}
        // containerStyle
        // textStyle
      />
    </PageTemplate>
  );
};

export default SummaryScreen;
