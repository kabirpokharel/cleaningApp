import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

const fontSize = (fontObj) => {
  if (pixelRatio > 2) {
    const newObj = {};
    Object.keys(fontObj).forEach((key) => {
      newObj[key] = fontObj[key] * 0.9;
    });
    return newObj;
  } return fontObj;
};
//  height: pixelRatio > 2 ? 200 * 0.9 : 200,
// width: pixelRatio > 2 ? 200 * 0.9 : 200,
// fontSize: pixelRatio > 2 ? 30 * 0.85 : 30;

export const COLORS = {
  // base colors
  //   primary: "#FC6D3F", // orange
  //   secondary: "#CDCDD2", // gray

  primary: '#017968',
  // primary: "#034748",
  primary1: '#5d867a',
  primary2: '#9ab4ac',
  secondary: '#fd5523',
  secondary1: '#fd774f',
  secondary2: '#feaa91',
  // dark
  dark1: '#101f1b',
  dark2: '#152a24',
  dark3: '#1b342d',
  // light
  light1: '#c2d2cd',
  light2: '#cddada',
  light3: '#d7e1de',
  light4: '#e6eded',

  error: '#ff0033',
  white: '#ffffff',
};

const fontSizeFunc = fontSize({
  largeTitle: 40,
  h1: 30,
  h2: 28,
  h3: 22,
  h4: 20,
  h5: 18,
  h6: 16,
  h7: 14,
  body1: 30,
  body2: 28,
  body3: 20,
  body4: 16,
  body5: 14,
  body6: 12,
});

export const SIZES = {
  // global sizes
  baseSize: pixelRatio > 2 ? 1 * 0.88 : 1,
  // baseSize: 1,
  font: 14,
  radius: 10,
  padding: 10,

  // font sizes
  ...fontSizeFunc,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: { fontFamily: 'RobotoRegular', fontSize: SIZES.largeTitle, lineHeight: 40 },
  h1: { fontFamily: 'RobotoBlack', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'RobotoBold', fontSize: SIZES.h2, lineHeight: 33 },
  h3: { fontFamily: 'RobotoBold', fontSize: SIZES.h3, lineHeight: 25 },
  h4: { fontFamily: 'RobotoBold', fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontFamily: 'RobotoBold', fontSize: SIZES.h5, lineHeight: 20 },
  h6: { fontFamily: 'RobotoBold', fontSize: SIZES.h6, lineHeight: 18 },
  h7: { fontFamily: 'RobotoBold', fontSize: SIZES.h6, lineHeight: 18 },
  body1: { fontFamily: 'RobotoRegular', fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: 'RobotoRegular', fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: 'RobotoRegular', fontSize: SIZES.body3, lineHeight: 25 },
  body4: { fontFamily: 'RobotoRegular', fontSize: SIZES.body4, lineHeight: 22 },
  body5: { fontFamily: 'RobotoRegular', fontSize: SIZES.body5, lineHeight: 20 },
  body6: { fontFamily: 'RobotoRegular', fontSize: SIZES.body6, lineHeight: 18 },
};

export const blockColor = (blockName) => {
  switch (blockName) {
    case 'green':
      return '#05c46b';
      break;
    case 'yellow':
      return '#ffd32a';
      break;
    case 'gold':
      return '#ccae62';
      break;
    case 'blue':
      return '#99ccff';
      break;
    case 'pinkBlue':
      return '#fc8eac';
      break;
    default:
      return 'grey';
  }
};
