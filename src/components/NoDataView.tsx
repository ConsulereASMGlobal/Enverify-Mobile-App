import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../globals/colors';

export const NoDataView = ({ message = 'No Data To Display' }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colors.gray, fontSize: 14 }}>{message}</Text>
    </View>
  );
};
