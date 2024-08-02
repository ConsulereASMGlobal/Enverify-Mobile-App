import { StyleSheet } from 'react-native';
import { colors } from '../../../globals/colors';
import { Fonts, REGULAR_PADDING_SIZE } from '../../../globals/themes';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: REGULAR_PADDING_SIZE
  },
  boldHeaderText: {
    marginBottom: 24,
    fontWeight: '700'
  },
  button: {
    height: 40,
    width: '40%',
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: colors.primary
  },
  confirmText: {
    fontSize: 16,
    color: colors.white
  },
  labelText: {
    lineHeight: 19
  },
  container: {
    flexDirection: 'row',
    marginVertical: 4
  },
  saveButton: {
    height: 40,
    width: '25%',
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: colors.primary
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  captureButton: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20
  }
});
