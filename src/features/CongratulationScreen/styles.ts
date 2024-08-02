import { StyleSheet } from 'react-native';
import { colors } from '../../globals/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 62,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boldHeaderText: {
    marginBottom: 24,
    fontWeight: '700'
  },
  button: {
    height: 40,
    width: '30%',
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: colors.primary
  },
  confirmText: {
    fontSize: 16,
    color: colors.white
  },
  labelText: {
    fontWeight: '700'
  }
});
