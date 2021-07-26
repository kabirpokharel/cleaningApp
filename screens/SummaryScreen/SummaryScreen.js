import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Platform,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
import CardComponent from '../../component/CardComponent';
import FooterButton from '../../component/FooterButton';
import PageTemplate from '../../component/PageTemplate';
import TitleWithDescription from '../../component/TitleWithDescriptionComponent';
import {
  blockColor, COLORS, FONTS, SIZES,
} from '../../constants/theme';

const reduxState = {
  error: null,
  location: {
    name: 'new location',
    noOfBlocks: 3,
    shortid: 'gvr-QXU8c',
  },
  roomsLoading: true,
  taskLog: [
    {
      name: 'block 1',
      rooms: [
        {
          _id: '60f77b6dbd76a33a7b110fd4',
          cleaningType: 'daily',
          roomId: 1,
        },
        {
          _id: '60f77b6dbd76a33a7b110fd5',
          cleaningType: 'thorough',
          roomId: 2,
        },
        {
          cleaningType: 'daily',
          roomId: 3,
        },
        {
          cleaningType: 'thorough',
          roomId: 4,
        },
      ],
      shortid: 'XhkSOQwCX',
    },
    {
      name: 'block 2',
      rooms: [
        {
          _id: '60f77b6dbd76a33a7b110fd7',
          cleaningType: 'daily',
          roomId: 11,
        },
        {
          _id: '60f77b6dbd76a33a7b110fd8',
          cleaningType: 'thorough',
          roomId: 12,
        },
        {
          _id: '60f77b6dbd76a33a7b110fd9',
          cleaningType: 'thorough',
          roomId: 13,
        },
        {
          roomId: 14,
        },
      ],
      shortid: 'Tq-T9MAnZ',
    },
    {
      name: 'block 3',
      rooms: [
        {
          roomId: 21,
        },
        {
          cleaningType: 'thorough',
          roomId: 22,
        },
        {
          cleaningType: 'daily',
          roomId: 23,
        },
        {
          roomId: 24,
        },
      ],
      shortid: '8ST2igVly',
    },
  ],
  time: [],
};

const isPlatformIos = Platform.OS === 'ios';

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
    <SummaryText isQuantity text={measure} />
  </View>
);

const SummaryItems = ({
  blockName, dailyCleaned, thoroughCleaned, unAttended,
}) => {

};

const SummaryScreen = () => {
  const [viewMore, setViewMore] = useState(false);

  const dataFormatter = () => {
    const dailyCleaned = {};
    const thoroughCleaned = {};
    const unAttended = {};
    const blockNames = [];
    reduxState.taskLog.forEach((block) => {
      blockNames.push(block.name);
      const dailyCleanedHolder = [];
      const thoroughCleanedHolder = [];
      const unAttendedArrayHolder = [];
      block.rooms.forEach((room) => {
        if (!('_id' in room)) {
          if ('cleaningType' in room) {
            if (room.cleaningType === 'daily') {
              dailyCleaned[block.name] = dailyCleanedHolder.push(room.roomId);
            } else {
              thoroughCleaned[block.name] = thoroughCleanedHolder.push(room.roomId);
            }
          } else {
            unAttended[block.name] = unAttendedArrayHolder.push(room.roomId);
          }
        }
      });
    });
    const dailyCleanedCount = Object.keys(dailyCleaned).reduce((blockId, counter) => counter + dailyCleaned[blockId].length, 0);
    const thoroughCleanedCount = Object.keys(thoroughCleaned).reduce((blockId, counter) => counter + thoroughCleaned[blockId].length, 0);
    return {
      blockNames, dailyCleaned, thoroughCleaned, unAttended,
    };
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
                // onPress={() => setViewMore((prevState) => !prevState)}
                onPress={() => dataFormatter()}
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
            <SummaryElement item="attended" measure="12" />
            {/* <SummaryItems data={dataFormatter()} /> */}
          </CardComponent>
        </ScrollView>
      </View>
      <FooterButton
        onPress={() => alert('From summary screen')}
        btnText="Submit"
      />
    </PageTemplate>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({});
