import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../globals/colors';
import { BORDER_RADIUS_SIZE } from '../../globals/themes';

interface Props {
  style?: any;
  children: React.ReactNode;
}

export const CardLayout = ({ children, style }: Props) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderRadius: BORDER_RADIUS_SIZE * 2,
    top: -75,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
  }
});
