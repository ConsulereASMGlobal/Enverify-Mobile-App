import { StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '@src/globals/colors';

export default function TopShadowView({ topMar = 117 }: { topMar?: number }) {
  return <View style={[styles.shadow, { top: topMar }]} />;
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: colors.secondaryLight,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 10,
    padding: 100,
    marginHorizontal: 15,
    borderRadius: 20
  }
});
