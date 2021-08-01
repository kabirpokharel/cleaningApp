import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  View, Text, Button, StyleSheet, SafeAreaView, Styles, ActivityIndicator,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../../component/CustomButton';
import PageTemplate from '../../component/PageTemplate';
import TitleWithDescription from '../../component/TitleWithDescriptionComponent';
import { baseUrl } from '../../constants/constants';
import { setLocation } from '../../redux/actions';

export default function App(props) {
  const { navigation } = props;
  const [allLocation, setAllLocation] = useState(null);
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      axios.get(`${baseUrl}/location/viewAll`).then((res) => {
        console.log('see this kabir--------> ', res.data);
        setAllLocation(res.data.locations);
      });
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log('see this is data^^^^^^^^ > ', data);
    const urlArray = data.split('/');
    const locationId = urlArray[urlArray.length - 2];
    console.log('see this is extractedLocation -- -- > ',locationId);
    dispatch(setLocation(locationId));
    navigation.navigate('home', { locationId });
    // alert(`${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  barCodeView: {
    width: '100%',
    height: '50%',
    marginBottom: 40,
  },
});
