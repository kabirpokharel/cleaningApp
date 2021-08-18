import React, { useState } from 'react';
import moment from 'moment';
import {
  View, Platform, Text, StyleSheet, Modal, Alert, Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { addShiftTime } from '../redux/actions';
import { COLORS, SIZES, FONTS } from '../constants/theme';

const isPlatformIos = Platform.OS === 'ios';
const { width } = Dimensions.get('window');

const modalStyle = (width, gutter) => ({ width: gutter * 2 - width, left: gutter, right: gutter });

const TimePicker = ({ inputId, timeType }) => {
  const [time, setTime] = useState(new Date().setHours(0, 0, 0, 0));
  const [isInputDirty, setIsInputDirty] = useState(false);
  const [show, setShow] = useState(false);
  const cleaningDetail = useSelector((state) =>
    //  console.log("this is state.cleaning====>", state.cleaning);
    state.cleaning);
  const { time: reduxTimeArray } = cleaningDetail;
  const dispatch = useDispatch();

  const onChange = (event, selectedTime) => {
    const inputTime = selectedTime || time;
    setShow(isPlatformIos);
    dispatch(addShiftTime({ [timeType]: inputTime, inputId }));
    setTime(inputTime);
    setIsInputDirty(true);
  };

  return (
    <View style={{ position: 'relative' }}>
      {show && !isPlatformIos && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          is24Hour={!true}
          display={isPlatformIos ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
      {/* <TouchableOpacity onPress={() => setShow(!show)}>
        <Text>CLick</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.timeInput, { borderColor: COLORS.primary }]}
        onPress={() => setShow(true)}
      >
        {isInputDirty
        || (!!reduxTimeArray[inputId].status && reduxTimeArray[inputId].status.includes(':')) ? (
          <Text style={styles.displayTime}>
            {moment(reduxTimeArray[inputId][timeType] || time).format('h:mm a')}
            {/* {moment(time).format("h:mm a")} */}
          </Text>
          ) : (
            <Text style={styles.displayTime}>
              {`${
                timeType.charAt(0).toUpperCase() + timeType.slice(1)
              } time`}

            </Text>
          )}
      </TouchableOpacity>

      {show && isPlatformIos && (
        <Modal
          animationType="slide"
          transparent
          visible={show}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View
            style={[
              modalStyle(width, 40),
              {
                borderRadius: 4,
                backgroundColor: COLORS.white,
                position: 'absolute',
                bottom: 150,
              },
            ]}
          >
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode="time"
              is24Hour={!true}
              display={isPlatformIos ? 'spinner' : 'default'}
              onChange={onChange}
            />
            {isPlatformIos && (
              <TouchableOpacity
                style={{
                  margin: SIZES.baseSize * 30,
                  padding: SIZES.baseSize * 10,
                  borderRadius: 4,
                  alignItems: 'center',
                  backgroundColor: COLORS.primary,
                }}
                mode="contained"
                onPress={() => setShow(!true)}
              >
                <Text style={{ color: COLORS.white }}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      )}
    </View>
  );
};
export default TimePicker;

const styles = StyleSheet.create({
  timeInput: {
    height: 35,
    width: 110,
    borderRadius: 17,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.primary,
  },
  displayTime: {
    color: 'grey',
  },
});
