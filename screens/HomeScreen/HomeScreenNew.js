import React, { useState, useEffect } from 'react';
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
import {
  selectAllRooms, commonAreaCleanedAct, resetCurrentBlock, updateCurrentBlockId, initilizeTaskLog,
} from '../../redux/actions';
import RowElements from '../../component/RowElements';
import RoomBlockComponent from './RoomBlockComponent';
import CleaningLog from '../CleaningLog/CleaningLog';
import { SIZES, FONTS, COLORS } from '../../constants/theme';
import FooterButton from '../../component/FooterButton';
import TitleWithDescription from '../../component/TitleWithDescriptionComponent';
import PageTemplate from '../../component/PageTemplate';
import { baseUrl } from '../../constants/constants';
import CustomButton from '../../component/CustomButton';

const isPlatformIos = Platform.OS === 'ios';

const NUM_COLL = 3;

// const ElementChildren = ({ item }) => <Text>{item.blockName}</Text>;
const ElementChildren = ({ item }) => <Text>{item.roomId}</Text>;
const dummyRoomStatus = {
  name: 'new location',
  rate: 10,
  shortid: 'gvr-QXU8c',
  blocks: [
    {
      name: 'block 1',
      shortid: 'XhkSOQwCX',
      rooms: [
        {
          _id: '60f77b6dbd76a33a7b110fd4',
          roomId: 1,
          cleaningType: 'daily',
        },
        {
          _id: '60f77b6dbd76a33a7b110fd5',
          roomId: 2,
          cleaningType: 'thorough',
        },
        { roomId: 3 },
        { roomId: 4 },
      ],
    },
    {
      name: 'block 2',
      shortid: 'Tq-T9MAnZ',
      rooms: [
        {
          _id: '60f77b6dbd76a33a7b110fd7',
          roomId: 11,
          cleaningType: 'daily',
        },
        {
          _id: '60f77b6dbd76a33a7b110fd8',
          roomId: 12,
          cleaningType: 'thorough',
        },
        {
          _id: '60f77b6dbd76a33a7b110fd9',
          roomId: 13,
          cleaningType: 'thorough',
        },
        { roomId: 14 },
      ],
    },
    {
      name: 'block 3',
      shortid: '8ST2igVly',
      rooms: [
        { roomId: 21 },
        { roomId: 22 },
        { roomId: 23 },
        { roomId: 24 },
      ],
    },
  ],
};

const itemExtractor = (taskLog, currentBlockId) => {
  const currentBlock = taskLog.find((block) => currentBlockId === block.shortid);
  const rooms = currentBlock?.map((room) => room.roomId);
  return rooms;
};
const HomeScreen = (props) => {
  const { navigation } = props;
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const dispatch = useDispatch();
  const cleaningDetail = useSelector((state) => state.cleaning);

  // console.log('this is cleaning detail==========>', cleaningDetail);
  const { taskLog } = cleaningDetail;

  useEffect(() => {
    // const locationId = location.shortid;
    // axios({
    //   method: 'get',
    //   url: `${baseUrl}/location/${locationId}/roomStatus`,
    // }).then((res) => {
    //   console.log('see this block and room data ------->', res.data);
    // })
    //   .catch((err) => console.log('see this is an error***--------> ', err));

    // (S) working with dummy data dummyRoomStatus
    dispatch(initilizeTaskLog(dummyRoomStatus.blocks));
    // (E) working with dummy data dummyRoomStatus
  }, []);

  // const checkBlockStatus = (currentBlockId, taskLog) => {
  //   const roomInitilized = !!taskLog.length && taskLog.find((block) => block.id === currentBlockId);
  //   const selectedRoomsLength = !!roomInitilized && roomInitilized.rooms.length;
  //   const allRoomsLength = roomsBlock?.find((block) => block.id === currentBlockId).rooms.length;
  //   const isFull = selectedRoomsLength === allRoomsLength;
  //   const isEmpty = !selectedRoomsLength;
  //   return { isFull, isEmpty };
  // };

  // const customOnClick = (item) =>
  //   navigation.navigate("cleaningLog", {
  //     block: item,
  //   });

  return (
    <PageTemplate>
      <TitleWithDescription title="Block" description="Slect block to access rooms" />
      {overlay && (
      <View style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.4,
        zIndex: 1,
      }}
      />
      )}
      <View style={{ marginHorizontal: 20 }}>
        <RoomBlockComponent {...{ taskLog, selectedBlockId, setSelectedBlockId }} />
      </View>
      {selectedBlockId ? (
        <CleaningLog {...{
          overlay, setOverlay, selectedBlockId, taskLog,
        }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={[FONTS.h2, { color: COLORS.light1 }]}>Slect a block</Text>
        </View>
      )}
      <FooterButton
        onPress={() => navigation.navigate('timeLog')}
        // onPress={showData}
        containerStyle
        textStyle
        btnText="Continue"
      />
      {/* <SafeAreaView /> */}
    </PageTemplate>
  );
};
export default HomeScreen;
