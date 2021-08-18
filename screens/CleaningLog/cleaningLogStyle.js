import { StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS } from '../../constants/theme';

export default StyleSheet.create({
  titleText: {
    // marginBottom: 15,
    paddingHorizontal: SIZES.baseSize * 20,
    // letterSpacing: 1,
    color: COLORS.primary1,
  },
  blockContainerWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
