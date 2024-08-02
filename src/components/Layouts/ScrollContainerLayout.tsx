import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { colors } from "../../globals/colors";

interface Props {
  style?: any;
  contentStyle?: any;
  children: React.ReactNode;
  topBgColor?: any;
  btmBgColor?: any;
  scrollBgColor?: any;
}

export const ScrollContainerLayout = ({
  children,
  style,
  contentStyle,
  topBgColor = colors.backgroundColor,
  btmBgColor = colors.backgroundColor,
  scrollBgColor = colors.backgroundColor,
}: Props) => {
  return (
    <>
      <StatusBar backgroundColor={colors.secondary} barStyle={"default"} />
      <SafeAreaView style={{ flex: 0, backgroundColor: topBgColor }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: btmBgColor }}>
        <ScrollView
          style={[styles.container, { backgroundColor: scrollBgColor }, style]}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={contentStyle}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
