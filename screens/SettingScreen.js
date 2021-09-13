import React from 'react';
import {
  View, Text, Button, StyleSheet, Dimensions, SafeAreaView,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window'); // full width
const { height } = Dimensions.get('window'); // full height

const SettingScreen = (props) =>
  // const { navigation } = props;
  (
    <View style={styles.containerWrapper}>
      <SafeAreaView />
      <Text>This is setting Page!!!</Text>
      <Button
        title="Update Profile"
      />
      <View style={{ flex: 1, backgroundColor: 'blue' }}>
        <View style={{ height: 20 }} />
        <View style={{ backgroundColor: 'yellow', flex: 1 }}>
          <View>
            <View style={styles.box1} />
            <View style={styles.box1} />
            <View style={styles.box1} />
            <View style={styles.box1} />
            <View style={styles.box1} />
            <View style={styles.box1} />
            <View style={styles.box1}>
              <Text>Last Itemmm</Text>
            </View>
            <View style={{ marginBottom: 50 }} />
          </View>
        </View>
        <View
          style={{
            height: 60,
            // position: "absolute",
            // bottom: 0,
            // height: 150,
            width,
            // borderRadius: 25,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 25, fontWeight: 'bold' }}>
            continue =
            {'>'}
          </Text>
        </View>
      </View>
    </View>
  );
const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    backgroundColor: 'pink',
  },
  box1: {
    height: 150,
    // width: 150,
    color: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'purple',
  },
});

export default SettingScreen;
