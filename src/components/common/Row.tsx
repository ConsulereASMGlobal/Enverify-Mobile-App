import { StyleProps } from '../../static/type';
import React from 'react';
import { View } from 'react-native';
import { globalStyle } from '../../globals/globalStyles';

interface RowProps extends StyleProps {
  children?: React.ReactNode;
}

export const Row = ({ style, children, ...rest }: RowProps) => (
  <View style={[globalStyle.row, style]} {...rest}>
    {children}
  </View>
);
