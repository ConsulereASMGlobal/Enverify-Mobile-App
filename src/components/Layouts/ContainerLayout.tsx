import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MEDIUM_PADDING_SIZE } from '../../globals/themes';

interface Props {
  style?: any;
  children: React.ReactNode;
}

export const ContainerLayout = ({ children, style }: Props) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: MEDIUM_PADDING_SIZE
  }
});
