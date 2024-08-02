import React, { FC } from "react";
import { TextProps } from "react-native";
import { Text, TextStyle, StyleProp, StyleSheet } from "react-native";

import { colors } from "@src/globals/colors";
import { Fonts } from "@src/globals/themes";
interface ITextProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export const TextField: FC<ITextProps> = ({ children, style, ...rest }) => {
  return (
    <Text style={StyleSheet.flatten([styles.baseStyle, style])} {...rest}>
      {children}
    </Text>
  );
};
export const TextSemiBold: FC<ITextProps> = ({ children, style, ...rest }) => {
  return (
    <Text style={StyleSheet.flatten([styles.semiBoldStyle, style])} {...rest}>
      {children}
    </Text>
  );
};
export const TextMedium: FC<ITextProps> = ({ children, style, ...rest }) => {
  return (
    <Text style={StyleSheet.flatten([styles.mediumStyle, style])} {...rest}>
      {children}
    </Text>
  );
};
export const TextBold: FC<ITextProps> = ({ children, style, ...rest }) => {
  return (
    <Text style={StyleSheet.flatten([styles.boldStyle, style])} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  baseStyle: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.neutral_dark,
    fontFamily: Fonts.Regular,
  },
  semiBoldStyle: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.neutral_dark,
    fontFamily: Fonts.SemiBold,
  },
  mediumStyle: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.neutral_dark,
    fontFamily: Fonts.Medium,
    fontWeight: "500",
  },
  boldStyle: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.neutral_dark,
    fontFamily: Fonts.Bold,
    fontWeight: "bold",
  },
});
