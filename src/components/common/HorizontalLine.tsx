import React from 'react';
import { View } from 'react-native';
import { colors } from '../../globals/colors';

export const HorizontalLine = () => (
  <View
    style={{
      borderBottomWidth: 1,
      borderColor: colors.borderColor,
      width: '100%'
    }}
  />
);
