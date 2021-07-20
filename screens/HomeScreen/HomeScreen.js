import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Platform,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import commonStyle from '../style';
import styles from './homeScreeStyle';
import { blockStyle } from './homeScreenFunc';
import { selectAllRooms, commonAreaCleanedAct, resetCurrentBlock } from '../../redux/actions';
import { roomsBlock } from '../../dummyValues/roomsBlock';
import RowElements from '../../component/RowElements';
import RoomBlockComponent from './RoomBlockComponent';
import CleaningLog from '../CleaningLog/CleaningLog';
import { SIZES, FONTS, COLORS } from '../../constants/theme';
import FooterButton from '../../component/FooterButton';
import TitleWithDescription from '../../component/TitleWithDescriptionComponent';
import PageTemplate from '../../component/PageTemplate';
import { baseUrl } from '../../constants/constants';

const isPlatformIos = Platform.OS === 'ios';

const NUM_COLL = 3;

const ElementChildren = ({ item }) => <Text>{item.blockName}</Text>;

const HomeScreen = (props) => {
  const { navigation } = props;
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [commonAreaCleaned, setCommonAreaCleaned] = useState(false);
  const dispatch = useDispatch();
  const cleaningDetail = useSelector((state) => state.cleaning);
  console.log('this is cleaning detail==========>', cleaningDetail);
  const { currentBlockId, taskLog } = cleaningDetail;

  const toggleSwitch = () => {
    dispatch(commonAreaCleanedAct(!commonAreaCleaned));
    setCommonAreaCleaned((previousState) => !previousState);
  };

  const checkBlockStatus = (currentBlockId, taskLog) => {
    const roomInitilized = !!taskLog.length && taskLog.find((block) => block.id === currentBlockId);
    const selectedRoomsLength = !!roomInitilized && roomInitilized.rooms.length;
    const allRoomsLength = roomsBlock?.find((block) => block.id === currentBlockId).rooms.length;
    const isFull = selectedRoomsLength === allRoomsLength;
    const isEmpty = !selectedRoomsLength;
    return { isFull, isEmpty };
  };

  

  // const customOnClick = (item) =>
  //   navigation.navigate("cleaningLog", {
  //     block: item,
  //   });

  return (
    <PageTemplate>
      <TitleWithDescription title="Block" description="Slect block to access rooms" />
      {overlay && (
        <View
          style={{
            width: 150,
            position: 'absolute',
            backgroundColor: '#ffffff',
            borderRadius: 4,
            zIndex: 2,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            top: 205,
            right: 20,
          }}
        >
          <TouchableOpacity
            // disabled={reduxTimeArray.length == 1}
            style={{
              paddingHorizontal: 8,
              paddingVertical: 5,
              justifyContent: 'center',
            }}
            onPress={() => {
              setOverlay(false);
              const choosenBlock = roomsBlock.find((block) => block.id === currentBlockId);
              dispatch(selectAllRooms(currentBlockId, choosenBlock.blockName, choosenBlock.rooms));
            }}
          >
            <Text
              style={[
                FONTS.body4,
                {
                  color: checkBlockStatus(currentBlockId, taskLog).isFull
                    ? COLORS.light1
                    : COLORS.primary,
                },
              ]}
            >
              Select all
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginHorizontal: 5,
              borderBottomColor: COLORS.light1,
              borderBottomWidth: 1,
            }}
          />
          <TouchableOpacity
            style={{
              paddingHorizontal: 8,
              paddingVertical: 5,
              justifyContent: 'center',
            }}
            onPress={() => {
              console.log('currentBlockid from Home screen', currentBlockId);
              setOverlay(false);
              dispatch(resetCurrentBlock(currentBlockId));
            }}
          >
            <Text
              style={[
                FONTS.body4,
                {
                  color: checkBlockStatus(currentBlockId, taskLog).isEmpty
                    ? COLORS.light1
                    : COLORS.primary,
                },
              ]}
            >
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ marginHorizontal: 20 }}>
        <RoomBlockComponent {...{ roomsBlock, selectedBlock, setSelectedBlock }} />
      </View>
      {overlay && (
        <View
          style={{
            position: 'absolute',
            height: SIZES.height,
            width: SIZES.width,
            opacity: 0.4,
            backgroundColor: '#000',
            zIndex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => setOverlay(false)}
            style={{
              height: SIZES.height,
              width: SIZES.width,
            }}
          />
        </View>
      )}
      {selectedBlock ? (
        <CleaningLog {...{ selectedBlock, overlay, setOverlay }} />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={[FONTS.h1, { color: COLORS.light1 }]}>No Block Selected</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: isPlatformIos ? 70 : 55,
          height: 90,
          borderTopWidth: 0.5,
          borderTopColor: COLORS.light1,
          // paddingVertical: 10,
          marginHorizontal: 20,
        }}
      >
        <View style={{ paddingRight: 20, flex: 1 }}>
          <Text style={[FONTS.h6, { color: COLORS.primary1 }]}>Common area cleaning</Text>
          <Text
            style={[FONTS.body5, { color: COLORS.primary2, lineHeight: 16 }]}
          >
            (eg. Door knobs, activity room surfaces, hand rails, toilets, staff rooms, dining rooms)

          </Text>
        </View>
        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
          <Switch
            trackColor={{ false: '#767577', true: '#05c46b' }}
            thumbColor={commonAreaCleaned ? COLORS.white : COLORS.white}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={commonAreaCleaned}
          />
        </View>
      </View>

      <FooterButton
        onPress={() => navigation.navigate('timeLog')}
        // onPress={showData}
        // containerStyle
        // textStyle
      />
      {/* <SafeAreaView /> */}
    </PageTemplate>
  );
};
export default HomeScreen;
