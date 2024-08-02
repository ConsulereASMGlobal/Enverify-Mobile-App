import { StyleSheet, View } from "react-native";
import React from "react";
import { TextField } from "../../components/TextField/TextField";

export const ProfileDetails = ({ profileData }: any) => {
  const details = [
    ["Name", profileData?.personalDetails?.name || "N/A"],
    ["Phone No", profileData?.personalDetails?.mobile || "N/A"],
    ["Email", profileData?.personalDetails?.email || "N/A"],
  ];

  return (
    <View>
      {details?.map((item, index) => (
        <View key={index} style={styles.info}>
          <TextField style={styles.leftText} key={index}>
            {item[0]} :{" "}
          </TextField>
          <TextField style={styles.rightText}>{item[1]}</TextField>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    textAlign: "right",
  },
  leftText: {
    fontSize: 16,
    marginVertical: 1,
  },
  rightText: {
    fontWeight: "bold",
    width: "65%",
    textAlign: "right",
  },
});
