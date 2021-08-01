import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, View, Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

import { block } from 'react-native-reanimated';
import moment from 'moment';
import CardComponent from '../../component/CardComponent';
import FooterButton from '../../component/FooterButton';
import PageTemplate from '../../component/PageTemplate';
import TitleWithDescription from '../../component/TitleWithDescriptionComponent';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { baseUrl } from '../../constants/constants';

const isPlatformIos = Platform.OS === 'ios';

// const temp = {
//   location: 'gvr-QXU8c',
//   startAt: '2021-07-28T15:15:46.765Z',
//   tasks: [
//     {
//       name: 'block 1',
//       rooms: [
//         {
//           cleaningType: 'daily',
//           roomId: 1,
//         },
//         {
//           cleaningType: 'daily',
//           roomId: 2,
//         },
//         {
//           cleaningType: 'daily',
//           roomId: 3,
//         },
//       ],
//       shortid: 'XhkSOQwCX',
//     },
//     {
//       name: 'block 2',
//       rooms: [
//         {
//           cleaningType: 'daily',
//           roomId: 11,
//         },
//         {
//           cleaningType: 'daily',
//           roomId: 12,
//         },
//         {
//           cleaningType: 'thorough',
//           roomId: 13,
//         },
//       ],
//       shortid: 'Tq-T9MAnZ',
//     },
//     {
//       name: 'block 3',
//       rooms: [
//         {
//           cleaningType: 'daily',
//           roomId: 22,
//         },
//         {
//           cleaningType: 'thorough',
//           roomId: 23,
//         },
//       ],
//       shortid: '8ST2igVly',
//     },
//   ],
//   user: 'X4WQRHEvQ',
// };

const temp2 = {
  user: 'X4WQRHEvQ',
  tasks: [
    {
      block: 'XhkSOQwCX',
      rooms: [
        { roomId: 1, cleaningType: 'daily' },
        { roomId: 2, cleaningType: 'thorough' },
      ],
    },
    {
      block: 'Tq-T9MAnZ',
      rooms: [
        { roomId: 11, cleaningType: 'daily' },
        { roomId: 12, cleaningType: 'thorough' },
        { roomId: 13, cleaningType: 'thorough' },
      ],
    }],
  location: 'gvr-QXU8c',
  startAt: 'Tue Jul 20 2021 22:34:58 GMT+0930',
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
      height: 35,
      marginHorizontal: 20,
    }}
  >
    <SummaryText text={item} />
    <SummaryText
    // isQuantity
      text={measure}
    />
  </View>
);

const SummaryScreen = () => {
  const [viewMore, setViewMore] = useState(false);
  const [blockDetails, setblockDetails] = useState({});

  const cleaningDetail = useSelector((state) => state.cleaning);
  const authenticationDetail = useSelector((state) => state.auth);
  const {
    taskLog, cleaningTypeCount, location, startAt,
  } = cleaningDetail;
  const { currentUser } = authenticationDetail;
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
            height: 23,
            margin: 3,
          }}
        >
          <Entypo name="cross" size={20} color={COLORS.secondary1} />
        </View>
      )}
    </View>
  );

  const processBlockRoomStatus = (blockName, cleaningTypeObj) => {
    if (blockName in cleaningTypeObj) {
      return cleaningTypeObj[blockName];
    } return [];
  };
  const IndividualBlockDetails = (props) => {
    const {
      blockName, daily, thorough, unattended,
    } = props;
    return (
      <View
        style={{
          borderWidth: 4,
          marginTop: 30,
          marginVertical: 20,
          marginHorizontal: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderColor: COLORS.light3,
        }}
      >
        <View
          style={{
            position: 'absolute',
            backgroundColor: COLORS.white,
            paddingVertical: 10,
            paddingHorizontal: 5,
            top: -25,
            left: 7,
          }}
        >
          <Text style={[FONTS.body3, { color: COLORS.primary, textTransform: 'capitalize' }]}>{`${blockName}`}</Text>
        </View>
        <View>
          <View style={{ margin: 2 }}>
            <Text style={{ color: COLORS.dark3 }}>Daily Cleaned:</Text>
            <SummaryRoomComponent rooms={daily} />
          </View>
          <View style={{ margin: 2 }}>
            <Text style={{ color: COLORS.dark3 }}>Thorough Cleaned:</Text>
            <SummaryRoomComponent rooms={thorough} />
          </View>
          <View style={{ margin: 2 }}>
            <Text style={{ color: COLORS.dark3 }}>Unattended:</Text>
            <SummaryRoomComponent rooms={unattended} />
          </View>
        </View>
      </View>
    );
  };
  const submitTaskLog = () => {
    console.log('hey check for block id in this taskLog ^^^^^^^^>', taskLog);
    const refinedTasklog = taskLog.map((block) => { // data to send to server
      delete Object.assign(block, { block: block.shortid }).shortid; // jsut to change shortid to block in tasks array
      const filterdRooms = block.rooms.filter((room) => !('_id' in room) && ('cleaningType' in room));
      return { ...block, rooms: filterdRooms };
    }).filter((block) => !!block.rooms.length);
    axios({
      method: 'post',
      url: `${baseUrl}/tasklog/create`,
      data: {
        user: currentUser.shortid, startAt, location: location.shortid, tasks: refinedTasklog,
      },
    }).then((res) => {
      console.log('see this block and room data ------->', res.data);
    })
      .catch((err) => console.log('see this is an error***--------> ', err));
  };
  const dataFormatter = () => {
    const dailyCleaned = {};
    const thoroughCleaned = {};
    const unAttended = {};
    const blockNames = [];
    taskLog.forEach((block) => {
      blockNames.push(block.name);
      let dailyCleanedHolder = [];
      let thoroughCleanedHolder = [];
      let unAttendedArrayHolder = [];
      block.rooms.forEach((room) => {
        if (!('_id' in room)) {
          if ('cleaningType' in room) {
            if (room.cleaningType === 'daily') {
              console.log('watch out for cleaning type daily --- --> ', room.roomId);
              dailyCleanedHolder = [...dailyCleanedHolder, room.roomId];
              dailyCleaned[block.name] = dailyCleanedHolder;
            } else {
              thoroughCleanedHolder = [...thoroughCleanedHolder, room.roomId];
              thoroughCleaned[block.name] = thoroughCleanedHolder;
            }
          } else {
            unAttendedArrayHolder = [...unAttendedArrayHolder, room.roomId];
            unAttended[block.name] = unAttendedArrayHolder;
          }
        }
      });
    });
    // console.log(`blockNames - >${blockNames}`);
    // console.log(`dailyCleaned ${JSON.stringify(dailyCleaned)}`);
    // console.log(`thoroughCleaned ${JSON.stringify(thoroughCleaned)}`);
    // console.log(`unAttended ${JSON.stringify(unAttended)}`);
    setblockDetails({
      blockNames, dailyCleaned, thoroughCleaned, unAttended,
    });
  };

  return (
    <PageTemplate>
      <TitleWithDescription title="Summary" description="check your log before saving your log" />
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
              marginTop: 20,
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
                onPress={() => {
                  dataFormatter();
                  setViewMore((prevState) => !prevState);
                }}
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
            <SummaryElement item="Daily Cleaning" measure={cleaningTypeCount.daily} />
            <SummaryElement item="Thorough Cleaning" measure={cleaningTypeCount.thorough} />
            <SummaryElement item="Total rooms attended" measure={`${cleaningTypeCount.daily + cleaningTypeCount.thorough}`} />
            {/* <SummaryElement item="Start time" measure={startAt.format('h:mm a')} /> */}
            {viewMore && (
              blockDetails.blockNames.map((blockName) => (
                <IndividualBlockDetails
                  key={blockName}
                  blockName={blockName}
                  daily={processBlockRoomStatus(blockName, blockDetails.dailyCleaned)}
                  thorough={processBlockRoomStatus(blockName, blockDetails.thoroughCleaned)}
                  unattended={processBlockRoomStatus(blockName, blockDetails.unAttended)}
                />
              ))
            )}
          </CardComponent>
        </ScrollView>
      </View>
      <FooterButton
        onPress={submitTaskLog}
        btnText="Submit"
      />
    </PageTemplate>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({});
