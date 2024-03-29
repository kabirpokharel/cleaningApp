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
  StyleSheet,
  Modal,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import commonStyle from '../style';
// import styles from './taskLogScreeStyle';
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
import CardComponent from '../../component/CardComponent';
import ExtraScreen from '../Extras/ExtrasScreen';

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
const TaskLogScreen = (props) => {
  const { navigation, route } = props;
  const [selectedBlockId, setSelectedBlockId] = useState('');
  const [overlay, setOverlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const cleaningDetail = useSelector((state) => state.cleaning);

  const { taskLog, cleaningTypeCount } = cleaningDetail;
  const { daily, thorough } = cleaningTypeCount;
  const cleanedRoomCount = daily + thorough;

  const navigationToSummaryPage = () => {
    if (cleanedRoomCount) {
      navigation.navigate('summaryScreen');
    } else {
      setShowModal(true);
    }
  };
  useEffect(() => {
    const { locationId } = route.params;
    console.log('see this locaiton id', locationId);
    axios({
      method: 'get',
      url: `${baseUrl}/location/${locationId}/roomStatus`,
    }).then((res) => {
      // console.log('see this is res.data.blocks ------->', res.data.data.blocks);
      // console.log('see this is dummyRoomStatus.blocks ------->', dummyRoomStatus.blocks);
      // dispatch(initilizeTaskLog(res.data.blocks));
      dispatch(initilizeTaskLog(res.data.data.blocks));
      setLoading(false);
    })
      .catch((err) => console.log('see this is an error from home screen***--------> ', err));
  }, []);
  return (
    <PageTemplate>
      <TitleWithDescription title="Block" description="Select block to access rooms" />
      {showModal && !cleanedRoomCount && (
        <Modal transparent isVisible={cleanedRoomCount > 0}>
          <View style={{
            flex: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          >
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{
                flex: 1, alignItems: 'center', justifyContent: 'center',
              }}
            >
              <View style={styles.popupModalWrapper}>
                <View style={{ marginBottom: 20 }}>
                  <MaterialIcons name="info" size={80} color="#4285f4" />
                </View>
                <Text style={[FONTS.body2, { color: COLORS.primary, marginBottom: 5 }]}>
                  Attention!!
                </Text>
                <Text style={[FONTS.body5, { color: COLORS.primary1, fontSize: 15, textAlign: 'center' }]}>No room selected, log your task before proceeding</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      {overlay && (
      <TouchableOpacity
        style={{
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
        onPress={() => setOverlay(false)}
      >
        {/* <TouchableOpacity style={{ backgroundColor: 'green', height: '100%', width: '100%' }} onPress={() => setOverlay(false)} /> */}
      </TouchableOpacity>
      )}
      {loading ? (
        <View style={{
          alignItems: 'center', justifyContent: 'center', height: SIZES.baseSize * 89,
        }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View style={{ marginHorizontal: 20 }}>
          <RoomBlockComponent {...{ taskLog, selectedBlockId, setSelectedBlockId }} />
        </View>

      )}
      {overlay && (
      <View style={{
        zIndex: 2,
        position: 'absolute',
        top: SIZES.baseSize * 190,
        right: 0,
      }}
      >
        <CardComponent cardStyle={{ borderRadius: 7 }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 8,
              paddingVertical: 5,
              justifyContent: 'center',
            }}
            onPress={() => {
              console.log('currentBlockid from Home screen', currentBlockId);
              // setOverlay(false);
              // dispatch(resetCurrentBlock(currentBlockId));
            }}
          >
            <Text
              style={[
                FONTS.body4,
                // {
                //   color: checkBlockStatus(currentBlockId, taskLog).isEmpty
                //     ? COLORS.light1
                //     : COLORS.primary,
                // },
              ]}
            >
              Reset current Block
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginHorizontal: SIZES.baseSize * 5,
              borderBottomColor: COLORS.light1,
              borderBottomWidth: 1,
            }}
          />
          <TouchableOpacity
            style={{
              paddingHorizontal: SIZES.baseSize * 8,
              paddingVertical: SIZES.baseSize * 5,
              justifyContent: 'center',
            }}
            onPress={() => {
              console.log('currentBlockid from Home screen', currentBlockId);
              setOverlay(false);
              // dispatch(resetCurrentBlock(currentBlockId));
            }}
          >
            <Text
              style={[
                FONTS.body4,
                // {
                //   color: checkBlockStatus(currentBlockId, taskLog).isEmpty
                //     ? COLORS.light1
                //     : COLORS.primary,
                // },
              ]}
            >
              Reset all
            </Text>
          </TouchableOpacity>
        </CardComponent>
      </View>
      )}
      <CleaningLog {...{
        // overlay,
        setOverlay, selectedBlockId,
        // taskLog,
      }}
      />
      <ExtraScreen {...{ selectedBlockId }} />
      <FooterButton
        onPress={navigationToSummaryPage}
        // onPress={showData}
        containerStyle
        textStyle
        btnText="Continue to summary"
      />
      {/* <SafeAreaView /> */}
    </PageTemplate>
  );
};

export default TaskLogScreen;
const styles = StyleSheet.create({
  popupModalWrapper: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    elevation: 20,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
    borderRadius: 25,
  },
});
