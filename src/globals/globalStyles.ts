import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colors } from './colors';
import { REGULAR_PADDING_SIZE } from './themes';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const parentHeight = '100%';
export const parentWidth = '100%';

export const globalStyle = StyleSheet.create({
  FullFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: REGULAR_PADDING_SIZE
  },
  Row: {
    flexDirection: 'row'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  aliginCenter: {
    alignItems: 'center'
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  flexRow: { flexDirection: 'row' },
  verticalAlign: {
    justifyContent: 'center'
  },
  horizentalAlign: {
    alignItems: 'center'
  },
  containerCenterStretch: {
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  containerRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  containerStart: {
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  containerStartRow: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  containerItemStart: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  containerItemRowStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  containerCenterStart: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  containerEnd: {
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },

  containerCenterEnd: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  containerRowCenterEnd: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  containerRowStart: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 5
  },
  containerRowEnd: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  containerSpace: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  containerSpaceEvenly: {
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },

  containerSpaceAround: {
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  containerRowSpace: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  contentRowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containercolumnSpace: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  selfStretch: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  parentWidth: {
    width: '100%'
  },
  parentHeight: {
    height: '100%'
  },
  parentSize: {
    width: '100%',
    height: '100%'
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },

  //text
  capitalize: {
    textTransform: 'capitalize'
  },
  uppercase: {
    textTransform: 'uppercase'
  },
  textAlignLeft: {
    textAlign: 'left'
  },
  textAlignRight: {
    textAlign: 'right'
  },
  textCenter: {
    textAlign: 'center'
  },

  alignCenter: {
    alignItems: 'center'
  },

  //justify
  justifyStart: {
    justifyContent: 'flex-start'
  },
  justifyEnd: {
    justifyContent: 'flex-end'
  },
  justifySpaceBetween: {
    justifyContent: 'space-between'
  },
  fullWidth: {
    width: screenWidth
  },
  fullHeight: {
    height: screenHeight,
    maxHeight: screenHeight
  },
  fullFlex: {
    flex: 1
  },
  margin0: {
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
    marginVertical: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginTop: 0
  },

  //radius
  roundedRadius: {
    borderRadius: screenWidth
  },

  //fontWeight
  bold: {
    fontWeight: '700'
  },

  //position

  relative: {
    position: 'relative'
  },
  absolute: {
    position: 'absolute'
  },

  positionTop: {
    top: 0,
    left: 0,
    right: 0
  },

  top: {
    top: 0
  },

  left: {
    left: 0
  },
  left3: {
    left: 3
  },

  right: {
    right: 0
  },
  right7: {
    right: 7
  },
  positionAuto: {
    left: 'auto',
    right: 'auto'
  },
  positionZero: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },

  //zindex
  index4: {
    zIndex: 4
  },

  formHeight: {
    height: screenHeight - 200
  },

  //borderColor
  scroll: {
    overflow: 'scroll'
  },

  rounded: {
    borderRadius: screenHeight * screenWidth
  },

  fontWeightBold: {
    fontWeight: 'bold'
  },
  fontWeight600: {
    fontWeight: '600'
  },
  fontWeight500: {
    fontWeight: '500'
  },

  //fontFamily
  fontBold: {
    // fontFamily: 'bold',
    fontWeight: 'bold'
  },
  medium: {
    fontWeight: '500'
  },
  fontSemiBold: {
    fontWeight: '600'
  },
  fontItalic: {
    fontFamily: 'italic'
  },
  fontNormal: {
    fontWeight: '400'
  },

  //overflow
  overflowHidden: {
    overflow: 'hidden'
  },

  //size
  screenWidth: {
    width: screenWidth
  },
  screenHeight: {
    height: screenHeight
  },

  //border Radius
  radiusDense: {
    borderRadius: 4
  },
  radius: {
    borderRadius: 8
  },
  radiusDouble: {
    borderRadius: 15
  }
});
