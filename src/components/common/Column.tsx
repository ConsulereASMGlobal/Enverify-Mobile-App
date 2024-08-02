import React from 'react';
import { View } from 'react-native';
import { globalStyle } from '../../globals/globalStyles';

interface ColumnProps {}

export const Column: React.FC<ColumnProps> = ({ style, children, ...rest }) => (
  <View style={[globalStyle.column, style]} {...rest}>
    {children}
  </View>
);
