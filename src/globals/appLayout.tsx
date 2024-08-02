import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { colors } from './colors';
import { globalStyle } from './globalStyles';

interface Props extends React.ComponentProps<typeof SafeAreaView> {
  style?: any;
  children: React.ReactNode;
}

export const AppLayout = ({ children, style }: Props) => {
  return (
    <SafeAreaView style={[globalStyle.FullFlex, styles.container, style]}>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white
  }
});
