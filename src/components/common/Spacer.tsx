import React from 'react';
import { View } from 'react-native';
import { StyleProps } from 'react-native-reanimated';

interface SpacerProps extends StyleProps {
  spacing?: number;
}

export const Spacer = ({ spacing = 0, style }: SpacerProps) => (
  <View style={{ padding: spacing, ...style }} />
);
