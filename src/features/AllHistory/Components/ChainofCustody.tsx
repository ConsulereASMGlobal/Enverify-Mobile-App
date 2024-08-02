import { StyleSheet, View } from "react-native";
import React from "react";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { colors } from "@src/globals/colors";
import { BORDER_RADIUS_SIZE, MEDIUM_PADDING_SIZE } from "@src/globals/themes";
import { Spacer } from "@src/components/common/Spacer";

const ChainofCustody = () => {
  return (
    <View style={styles.card}>
      <TextBold style={{}}>Chain of Custody</TextBold>
      <View
        style={{
          backgroundColor: colors.darkGray,
          height: 0.4,
          marginVertical: 10,
        }}
      />
      <View style={{}}>
        <View style={styles.rowContainer}>
          <TextField>Methodology</TextField>
          <TextField>Batch Traceability</TextField>
        </View>

        <Spacer spacing={5} />
        <View style={styles.rowContainer}>
          <TextField>Standard</TextField>
          <TextField>ISO 22095 [Mass Balance]</TextField>
        </View>
      </View>
    </View>
  );
};

export default ChainofCustody;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    borderRadius: BORDER_RADIUS_SIZE,
    marginBottom: MEDIUM_PADDING_SIZE,
    padding: MEDIUM_PADDING_SIZE,
    margin: 4,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
