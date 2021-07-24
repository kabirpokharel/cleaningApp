import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, StyleSheet, SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import commonStyle from '../style';
import styles from './cleaningLogStyle';
import RowElements from '../../component/RowElements';
// import { roomsBlock, blocks } from '../../dummyValues/roomsBlock';
import {
  loadRooms, removeRoom, roomCleaned, resetRoom,
} from '../../redux/actions';
import roomStyle from './cleaningLogFunc';
import { SIZES, FONTS, COLORS } from '../../constants/theme';
import TitleWithDescription from '../../component/TitleWithDescriptionComponent';

const NUM_COL = SIZES.width > 480 ? 8 : 6;

const ElementChildren = ({ item, dynamicStyle }) => <Text style={dynamicStyle}>{item.roomId}</Text>;

const CleaningLog = (props) => {
  const { overlay, setOverlay, selectedBlockId } = props;

  const dispatch = useDispatch();
  const cleaningDetail = useSelector((state) => state.cleaning);
  const { taskLog } = cleaningDetail;

  const roomButtonStyle = (roomObj) => roomStyle(roomObj);

  const roomClickHandler = (roomObj, roomIndex, cleaningType) => {
    console.log('kabir see this --- --- >', roomObj);
    console.log("!('_id' in roomObj) --->", !('_id' in roomObj));
    if (!('_id' in roomObj)) {
      if ('cleaningType' in roomObj) {
        console.log('reached here  888888888888888888888888888888888888888888888');
        dispatch(resetRoom(selectedBlockId, roomIndex));
      } else {
        dispatch(roomCleaned(selectedBlockId, roomIndex, cleaningType));
      }
    }
  };

  const roomClicked = (roomObj, roomIndex) => {
    roomClickHandler(roomObj, roomIndex, 'daily');
  };
  const roomLongPress = (roomObj, roomIndex) => {
    roomClickHandler(roomObj, roomIndex, 'thorough');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <TitleWithDescription
        title="Rooms"
        description="Select cleaned rooms"
        containerStyle={{
          marginTop: SIZES.baseSize * -8,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {!overlay && (
        <TouchableOpacity
          onPress={() => {
            setOverlay(true);
          }}
          style={{
            height: SIZES.baseSize * 40,
            width: SIZES.baseSize * 40,
            alignItems: 'center',
          }}
        >
          <AntDesign name="ellipsis1" size={28} color={COLORS.primary1} />
        </TouchableOpacity>
        )}
      </TitleWithDescription> */}
      <View
        style={{
          flex: 1,
          marginHorizontal: SIZES.baseSize * 20,
          paddingTop: SIZES.baseSize * 32 - 6,
        }}
      >
        {/* {console.log('kabir kabir 0 ----> ', taskLog.find((block) => selectedBlockId === block.shortid).rooms)} */}

        <RowElements
          item={taskLog.find((block) => selectedBlockId === block.shortid).rooms}
          numColumns={NUM_COL}
          round
          ElementChildren={ElementChildren}
          onPress={roomClicked}
          onLongPress={roomLongPress}
          extraStyle={roomButtonStyle}

          // onPress={() => alert('yey')}
          // onLongPress={() => alert('yey')}
          // extraStyle={}
        />
        <View style={{ marginBottom: SIZES.baseSize * 50 }} />
      </View>
    </View>
  );
};

export default CleaningLog;
