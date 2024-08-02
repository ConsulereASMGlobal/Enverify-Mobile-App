import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { colors } from "../../globals/colors";
import { TextField } from "../TextField/TextField";

const RadioGroup = ({ options, control, name }: any) => {
  return (
    <View style={styles.container}>
      {options.map((option: any, index: number) => (
        <View key={index}>
          <Controller
            control={control}
            render={({ field }) => (
              <TouchableOpacity
                style={styles.radioContainer}
                onPress={() => field.onChange(option.value)}
              >
                <View
                  style={[
                    styles.radio,
                    field.value === option.value && styles.selectedRadio,
                  ]}
                >
                  {field.value === option.value && (
                    <View style={styles.radioDot} />
                  )}
                </View>
                <TextField style={styles.radioLabel}>{option.label}</TextField>
              </TouchableOpacity>
            )}
            name={name}
            defaultValue={options[0].value}
          />
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: 'space-around',
    alignItems: "center",
    marginVertical: 10,
    gap: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  selectedRadio: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  radioDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default RadioGroup;
