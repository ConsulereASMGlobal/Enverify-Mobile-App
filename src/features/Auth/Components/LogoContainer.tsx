import { StyleSheet, View } from "react-native";
import React from "react";
import { Spacer } from "@src/components/common/Spacer";
import { FastImage } from "@src/components/image";
import { colors } from "@src/globals/colors";

export default function LogoContainer({
  bgColor = colors.secondary,
  logo = require("../../../assets/logo/applogo.png"),
  width = 188,
  height = 56,
}: {
  bgColor?: any;
  logo?: any;
  width?: any;
  height?: any;
}) {
  return (
    <View style={[styles.header, { backgroundColor: bgColor }]}>
      <Spacer spacing={15} />
      <FastImage
        source={logo}
        resizeMode="contain"
        style={{
          height: height,
          width: width,
        }}
      />
      <Spacer spacing={15} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    height: 68,
    width: 67,
  },
});
