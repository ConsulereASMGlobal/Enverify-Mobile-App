import {
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  Platform,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { colors } from "@src/globals/colors";
import { TextMedium } from "@src/components/TextField/TextField";
import QrCodeIcon from "@src/assets/others/QRIcon";
import {
  BORDER_RADIUS_SIZE,
  LARGE_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "@src/globals/themes";

interface IButtonProps {
  onPress: () => void;
  title?: string | React.ReactNode;
  disabled?: boolean;
  hasIcon?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  rippleColor?: string;
}

const Button = ({
  onPress,
  title,
  disabled = false,
  style,
  textStyle,
  hasIcon = false,
  children,
  rippleColor = colors.primary,
}: IButtonProps) => {
  const android_ripple = {
    color: rippleColor,
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
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      // android_ripple={android_ripple}
      style={[
        // Platform.select({
        //   ios: {
        //     backgroundColor: pressed ? colors.primary : colors.backgroundColor
        //   }
        // }),
        styles.buttonStyle,
        {
          backgroundColor: disabled ? colors.gray : colors.primary,
        },
        style,
      ]}
    >
      {!!!children ? (
        <TextMedium style={[styles.loginText, textStyle]}>
          {title ?? ""}
        </TextMedium>
      ) : (
        children
      )}
      {hasIcon && <QrCodeIcon color={colors.white} />}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    height: 56,
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: LARGE_PADDING_SIZE,
    backgroundColor: colors.secondary,
    borderRadius: BORDER_RADIUS_SIZE,
    paddingVertical: MEDIUM_PADDING_SIZE,
  },
  loginText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.white,
    marginRight: BORDER_RADIUS_SIZE,
  },
});
