import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, View, Platform, Modal, ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';

import { block } from 'react-native-reanimated';
import moment from 'moment';
import CardComponent from '../../component/CardComponent';
import FooterButton from '../../component/FooterButton';
import PageTemplate from '../../component/PageTemplate';
import TitleWithDescription from '../../component/TitleWithDescriptionComponent';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { baseUrl } from '../../constants/constants';
import CustomButton from '../../component/CustomButton';

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

const SummaryScreen = () => {
  const [viewMore, setViewMore] = useState(false);
  const [blockDetails, setblockDetails] = useState({});
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState(false);
  const [popup, setPopup] = useState(false);

  const cleaningDetail = useSelector((state) => state.cleaning);
  const authenticationDetail = useSelector((state) => state.auth);
  const {
    taskLog, cleaningTypeCount, location, startAt,
  } = cleaningDetail;
  console.log('see this is cleaningDetail from redux -- -- > ', cleaningDetail);
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
            height: SIZES.baseSize * 23,
            margin: SIZES.baseSize * 3,
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
  const submitTaskLog = () => {
    setLoding(true);
    console.log('see this tasklog -- -- > ', taskLog.length);
    const refinedTasklog = taskLog.map((block) => { // data to send to server
      if ('shortid' in block) {
        // jsut to change shortid to block in tasks array
        delete Object.assign(block, { block: block.shortid }).shortid;
      }
      const filterdRooms = block.rooms.filter((room) => !('_id' in room) && ('cleaningType' in room));
      const filteredExtras = block.extras.filter((item) => !('_id' in item) && 'cleaningType' in item);
      // console.log('this is filtered extras --- --> ', filteredExtras);
      return { ...block, rooms: filterdRooms, extras: filteredExtras };
    });
    console.log('this is refined tasklog -- -- > ', refinedTasklog);
    console.log('888888888888888888888888888 > ', {
      user: currentUser.shortid, tasks: refinedTasklog, location: location.shortid, startAt,
    });
    axios({
      method: 'post',
      url: `${baseUrl}/tasklog/create`,
      data: {
        user: currentUser.shortid, tasks: refinedTasklog, location: location.shortid, startAt,
      },
      // data: temp,
    }).then((res) => {
      console.log('tasklog stored to database....success!!!------->', res.data);
      setLoding(false);
      setPopup(true);
    })
      .catch((err) => {
        console.log('see this is an error in tasklog create***--------> ', err);
        setLoding(false);
        setError(true);
        setPopup(true);
      });
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
      {(popup || loading) && (
      <Modal transparent isVisible={popup}>
        <View style={{
          flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        >
          {loading ? <ActivityIndicator size="large" color="#00ff00" />
            : (
              <TouchableOpacity
                onPress={() => setPopup(false)}
              >
                <View style={{
                  width: '90%',
                  // height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#ccc',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  backgroundColor: 'white',
                  elevation: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 30,
                  borderRadius: 4,
                }}
                >
                  <View style={{ marginBottom: 20 }}>
                    {error ? <MaterialIcons name="cancel" size={80} color={COLORS.primary} /> : <AntDesign name="checkcircle" size={80} color="#05c46b" />}
                  </View>
                  <Text style={[FONTS.body2, { color: COLORS.primary }]}>{error ? 'Error' : 'Success!!'}</Text>
                  <Text style={[FONTS.body5, { color: COLORS.primary1, textAlign: 'center' }]}>{error ? 'Error encountered try again' : 'Your tasklog has been recorded press OK to return to home menu'}</Text>
                  <CustomButton btnStyle={{ marginTop: 20, backgroundColor: COLORS.primary }} label="Ok" onPress={() => setPopup(false)} />
                </View>
              </TouchableOpacity>
            )}
        </View>
      </Modal>
      )}
      {/* <CustomButton label="Show modal" onPress={() => setPopup(true)} /> */}
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

const temp = {
  location: 'gvr-QXU8c',
  startAt: '2021-08-03T01:23:43.650Z',
  tasks: [
    {
      block: 'XhkSOQwCX',
      extras: [],
      name: 'block 1',
      rooms: [
        {
          cleaningType: 'thorough',
          roomId: 1,
        },
        {
          cleaningType: 'daily',
          roomId: 2,
        },
      ],
    },
    {
      block: 'Tq-T9MAnZ',
      extras: [],
      name: 'block 2',
      rooms: [
        {
          cleaningType: 'thorough',
          roomId: 11,
        },
        {
          cleaningType: 'daily',
          roomId: 12,
        },
      ],
    },
    {
      block: '8ST2igVly',
      extras: [],
      name: 'block 3',
      rooms: [
        {
          cleaningType: 'thorough',
          roomId: 21,
        },
        {
          cleaningType: 'daily',
          roomId: 22,
        },
      ],
    },
  ],
  user: 'DVGeKlbeD',
};
