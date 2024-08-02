import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../globals/colors';

interface LoadingIndicatorProps {
  activityColor?: string;
}

export const LoadingIndicator = ({ activityColor }: LoadingIndicatorProps) => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator
        size={'large'}
        color={activityColor ? activityColor : colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(52, 52, 52, 0.2)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
