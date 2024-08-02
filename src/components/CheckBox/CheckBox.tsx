import { View, StyleSheet } from 'react-native';
import React from 'react';

import { colors } from '../../globals/colors';
import CheckedBox from './../../assets/others/checked-box.svg';

interface CheckBoxProps {
  isSelected: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({ isSelected }) => {
  return <View style={styles.outerCircle}>{isSelected && <CheckedBox />}</View>;
};

const styles = StyleSheet.create({
  outerCircle: {
    width: 18,
    height: 18,
    borderRadius: 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.primary,
    backgroundColor: colors.white
  },
  selectedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary
  }
});

export default CheckBox;
