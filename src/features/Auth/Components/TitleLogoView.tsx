import { StyleSheet, View } from "react-native";
import React from "react";
import { Spacer } from "@src/components/common/Spacer";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { colors } from "@src/globals/colors";

interface props {
  title?: string;
  desc?: string;
  titleSize?: any;
}

export default function TitleLogoView({
  title = "Login",
  desc = `Let's sign in and continue the journey to a greener tomorrow!`,
  titleSize = 32,
}: props) {
  return (
    <View style={{ alignItems: "center" }}>
      <Spacer spacing={15} />
      <TextBold style={[styles.title, { fontSize: titleSize }]}>
        {title}
      </TextBold>
      <Spacer spacing={5} />

      <TextField style={styles.subtitle}>{desc}</TextField>
      <Spacer spacing={15} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    lineHeight: 40,
    color: colors.dark,
  },
  subtitle: {
    color: colors.darkLight,
    textAlign: "center",
    lineHeight: 24,
  },
});
