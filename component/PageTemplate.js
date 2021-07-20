import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const PageTemplate = ({ children }) => (
  <View style={[styles.containerWrapper, { flex: 1, backgroundColor: COLORS.white }]}>
    {children}
  </View>
);

export default PageTemplate;

const styles = StyleSheet.create({
  containerWrapper: {
    // marginHorizontal: 20,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  titleText: {
    color: COLORS.primary1,
  },
  descriptionText: {
    color: COLORS.primary2,
  },
  blockContainerWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
