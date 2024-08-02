import {
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  Platform,
  TextStyle,
  View
} from 'react-native';
import React, { useState } from 'react';

import { TextField } from '../TextField/TextField';
import { colors } from '../../globals/colors';
import { BORDER_RADIUS_SIZE, LARGE_PADDING_SIZE } from '../../globals/themes';
import QrCodeIcon from '@src/assets/others/QRIcon';

interface IRippleButtonProps {
  onPress: () => void;
  title?: string | React.ReactNode;
  disabled?: boolean;
  hasIcon?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  rippleColor?: string;
}

const RippleButton = ({
  onPress,
  title,
  disabled = false,
  style,
  textStyle,
  hasIcon = false,
  children,
  rippleColor = colors.primary
}: IRippleButtonProps) => {
  const android_ripple = {
    color: rippleColor
  };
  const multiTapDelay = 1000;
  const [lastPress, setLastPress] = useState(Date.now());

  const handlePress = () => {
    const now = Date.now();

    setLastPress(now);
    if (now - lastPress <= multiTapDelay || disabled) {
      () => {};
    } else {
      onPress();
    }
  };
  return (
    <View
      style={{
        borderRadius: style?.borderRadius ?? BORDER_RADIUS_SIZE,
        marginTop: LARGE_PADDING_SIZE,
        overflow: 'hidden',
        alignSelf: 'stretch'
      }}>
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        android_ripple={android_ripple}
        style={({ pressed }) => [
          Platform.select({
            ios: {
              backgroundColor: pressed ? colors.primary : colors.backgroundColor
            }
          }),
          styles.buttonStyle,

          {
            backgroundColor: disabled ? colors.gray : colors.secondary
          },
          style
        ]}>
        {!!!children ? (
          <TextField style={[styles.loginText, textStyle]}>
            {title ?? 'Login'}
          </TextField>
        ) : (
          children
        )}
        {hasIcon && <QrCodeIcon color={colors.white} />}
      </Pressable>
    </View>
  );
};

export default RippleButton;

const styles = StyleSheet.create({
  buttonStyle: {
    height: 56,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderRadius: BORDER_RADIUS_SIZE
  },
  loginText: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.white,
    marginRight: BORDER_RADIUS_SIZE
  }
});
