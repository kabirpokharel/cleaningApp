import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  View, Text, Button, StyleSheet, SafeAreaView, Styles, ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../../component/CustomButton';
import PageTemplate from '../../component/PageTemplate';
import TitleWithDescription from '../../component/TitleWithDescriptionComponent';
import { baseUrl } from '../../constants/constants';
import { setLocation } from '../../redux/actions';

const temp = {
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

const LocationScreen = (props) => {
  const { navigation } = props;
  const [allLocation, setAllLocation] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${baseUrl}/location/viewAll`).then((res) => {
      console.log('see this kabir--------> ', res.data);
      setAllLocation(res.data.locations);
    });

    // axios({
    //   method: 'post',
    //   url: `${baseUrl}/tasklog/create`,
    //   data: temp,
    // }).then((res) => console.log('see this --------------------->', res.data))
    //   .catch((err) => console.log('see this is an error--------> ', err));
  }, []);

  const LocationSelection = ({ locations }) => (
    <View>
      {locations.map((location) => (
        <CustomButton
          key={location.shortid}
          label={location.name}
          onPress={() => {
            dispatch(setLocation(location));
            navigation.navigate('home');
          }}
        />
      ))}
    </View>
  );

  return (
    <PageTemplate>
      <TitleWithDescription title="Location" description="Slect your site" />
      <View style={styles.containerWrapper}>
        {!allLocation ? <ActivityIndicator size="large" color="#00ff00" />
          : <LocationSelection locations={allLocation} dispatch={dispatch} />}
      </View>
    </PageTemplate>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  containerWrapper: {
    // marginHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
