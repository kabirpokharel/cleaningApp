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
import { SIZES } from '../../constants/theme';

export default function App(props) {
  const { navigation } = props;
  const [allLocation, setAllLocation] = useState(null);
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      axios.get(`${baseUrl}/location/viewAll`).then((res) => {
        // console.log('see this kabir--------> ', res.data);
        setAllLocation(res.data.locations);
      });
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const locationId = data;
    const locationDetail = allLocation.find((location) => location.shortid === locationId);
    dispatch(setLocation(locationDetail));
    navigation.navigate('home', { locationId });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <PageTemplate>
      <TitleWithDescription title="Location" description="Slect your site" />
      <View style={{ height: SIZES.baseSize * 500, marginTop: SIZES.baseSize * 40 }}>
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#000' }}
          />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              height: 180, width: 180, borderColor: 'white', borderWidth: 0.5,
            }}
            />
            <Text style={{ color: 'white', fontSize: 11, marginTop: SIZES.baseSize * 15 }}>Focus QR code inside the square</Text>
          </View>
          {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
        </View>
      </View>
    </PageTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  // barCodeView: {
  //   width: '100%',
  //   height: '50%',
  //   marginBottom: 40,
  // },
});
