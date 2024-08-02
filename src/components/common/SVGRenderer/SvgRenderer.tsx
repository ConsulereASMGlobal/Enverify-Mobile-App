import React from 'react';
import { Insets, TouchableOpacity, View } from 'react-native';
import { StyleProps } from '../../../static/type';
import { CONSTANT } from '../../../static/CONSTANT';

interface SVGRendererProps extends StyleProps {
  children?: React.ReactNode;
  onPress?: () => void;
  secondaryIcon?: React.ReactNode;
  showSecondary?: boolean;
  hitSlop?: Insets;
  hideOpacity?: boolean;
}

export const SVGRenderer: React.FC<SVGRendererProps> = ({
  children,
  secondaryIcon,
  showSecondary = false,
  hideOpacity = false,
  ...rest
}) => {
  if (hideOpacity) {
    return (
      <View {...rest}>
        {!!secondaryIcon && showSecondary ? secondaryIcon : children}
      </View>
    );
  }
  return (
    <TouchableOpacity activeOpacity={CONSTANT.ACTIVE_OPACITY} {...rest}>
      {!!secondaryIcon && showSecondary ? secondaryIcon : children}
    </TouchableOpacity>
  );
};
