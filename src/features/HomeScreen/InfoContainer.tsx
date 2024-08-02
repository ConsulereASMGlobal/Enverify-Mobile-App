import { StyleSheet, View } from "react-native";
import React from "react";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import InfoSVG from "@src/assets/dashboardIcons/InfoSVG";
import { colors } from "@src/globals/colors";
import { Spacer } from "@src/components/common/Spacer";
import { FastImage } from "@src/components/image";

const InfoContainer = () => {
  return (
    <View
      style={{
        // backgroundColor: colors.shaded,
        backgroundColor: colors.secondary,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 4,
        gap: 2,
      }}
    >
      <View style={{ flex: 1 }}>
        <TextBold style={{ color: colors.white }}>Make an Impact</TextBold>
        <Spacer spacing={4} />
        <TextField
          style={{ fontSize: 14, lineHeight: 15, color: colors.white }}
        >
          Let us collaborate to improve collection and recycling rates for a
          greener, cleaner Phillipines and sustainable future.
        </TextField>
      </View>
      <View>
        {/* <InfoSVG /> */}
        <FastImage
          source={require("../../assets/dashboardIcons/volunteers.png")}
          style={{ height: 130, width: 130 }}
        />
      </View>
    </View>
  );
};

export default InfoContainer;
