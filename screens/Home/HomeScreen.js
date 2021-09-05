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
// import commonStyle from '../style';
// import styles from './taskLogScreeStyle';
// import {
//   selectAllRooms, commonAreaCleanedAct, resetCurrentBlock, updateCurrentBlockId, initilizeTaskLog,
// } from '../../redux/actions';

import { SIZES, FONTS, COLORS } from '../../constants/theme';
import FooterButton from '../../component/FooterButton';
import TitleWithDescription from '../../component/TitleWithDescriptionComponent';
import PageTemplate from '../../component/PageTemplate';
import { baseUrl } from '../../constants/constants';

const isPlatformIos = Platform.OS === 'ios';

const HomeScreen = (props) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const cleaningDetail = useSelector((state) => state.cleaning);

  // console.log('this is cleaning detail==========>', cleaningDetail);
  const { taskLog } = cleaningDetail;

  //   useEffect(() => {
  //     const { locationId } = route.params;
  //     console.log('see this locaiton id', locationId);
  //     axios({
  //       method: 'get',
  //       url: `${baseUrl}/location/${locationId}/roomStatus`,
  //     }).then((res) => {
  //       // console.log('see this is res.data.blocks ------->', res.data.data.blocks);
  //       // console.log('see this is dummyRoomStatus.blocks ------->', dummyRoomStatus.blocks);
  //       // dispatch(initilizeTaskLog(res.data.blocks));
  //       dispatch(initilizeTaskLog(res.data.data.blocks));
  //       setLoading(false);
  //     })
  //       .catch((err) => console.log('see this is an error from home screen***--------> ', err));
  //   }, []);
  return (
    <PageTemplate>
      <TitleWithDescription title="Recent task log" description="This is the your last task log details" />
      <FooterButton
        onPress={() => navigation.navigate('location')}
        // onPress={showData}
        containerStyle
        textStyle
        btnText="Continue"
      />
    </PageTemplate>
  );
};
export default HomeScreen;
