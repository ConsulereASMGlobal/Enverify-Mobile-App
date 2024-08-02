import React from "react";

import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text,
} from "react-native";

import { Fragment, useEffect, useState } from "react";

import { DynamicIcon, DynamicIconProps } from "@src/utils/Dynamic/DynamicIcon";
import { Spacer } from "@src/components/common/Spacer";
import { colors } from "@src/globals/colors";
import { TextField } from "../TextField/TextField";
import TooltipComp from "../TooltipComp/TooltipComp";

type CombinePressProps = {
  onSelect?: any;
};

interface DropDownProps extends TextInputProps {
  lebel?: string;
  required?: boolean;
  leftIconName?: string;
  leftIconFamily?: Pick<DynamicIconProps, "iconFamily">;
  rightIconName?: string;
  rightIconFamily?: Pick<DynamicIconProps, "iconFamily">;
  placeholder: string;
  leftIconColor?: string;
  rightIconColor?: string;
  secureTextEntry?: boolean;
  onRightIconPress?: any;
  onError?: string;
  combineOnPress?: ({ onSelect }: CombinePressProps) => void;
  spacerEnd?: boolean;
  unit?: string;
  datePicker?: boolean;
  setSelectedValue?: React.Dispatch<React.SetStateAction<undefined>>;
  showVal?: string;
  tooltipChild?: React.ReactNode;
}

export const DropDown = ({
  lebel,
  required,
  leftIconName,
  leftIconFamily,
  rightIconName,
  rightIconFamily,
  placeholder,
  leftIconColor,
  rightIconColor,
  secureTextEntry,
  onError,
  onRightIconPress,
  combineOnPress,
  onFocus,
  value,
  spacerEnd = false,
  unit = "",
  editable = true,
  keyboardType = "default",
  datePicker = true,
  setSelectedValue,
  showVal = "",
  fontSize,
  tooltipChild,
  ...rest
}: DropDownProps) => {
  const ItemView = !!combineOnPress ? Pressable : Fragment;
  const ItemProps = !!combineOnPress
    ? {
        onPress: () =>
          combineOnPress &&
          combineOnPress({
            onSelect: ({ item, ...rest }: any) => {
              setValue(item?.label);
              setSelectedValue(item?.value);
            },
          }),
      }
    : null;

  const [v, setValue] = useState<any>(undefined);

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <>
      {lebel && (
        <View style={{ flexDirection: "row", gap: 5, marginBottom: 5 }}>
          <TextField
            style={{
              color: colors.dark,
              paddingBottom: 5,
              fontSize: 14,
            }}
          >
            {lebel}
          </TextField>
          {tooltipChild && (
            <TooltipComp tooltipPosition="bottom" children={tooltipChild} />
          )}
        </View>
      )}

      <ItemView {...ItemProps}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            {!!leftIconName && (
              <>
                <Spacer spacing={6} />
                <DynamicIcon
                  iconName={leftIconName}
                  iconFamily={leftIconFamily}
                  iconColor={leftIconColor}
                />
                <Spacer spacing={5} />
              </>
            )}
            <TextInput
              autoCapitalize="none"
              placeholder={placeholder}
              placeholderTextColor={colors.gray}
              style={[
                styles.inputField,
                { color: colors.placholderColor, fontSize: fontSize || 16 },
              ]}
              secureTextEntry={secureTextEntry}
              onFocus={!!!editable ? () => {} : () => onFocus}
              value={v ?? showVal}
              editable={editable && !!!combineOnPress}
              keyboardType={keyboardType}
              {...rest}
            />

            {!!!rightIconName && !!unit && (
              <View style={styles.unit}>
                <Text style={styles.unitValue}>{unit}</Text>
              </View>
            )}

            {!!rightIconName && (
              <View
                style={
                  {
                    // paddingHorizontal: 5,
                    // paddingBottom: 10
                  }
                }
              >
                <DynamicIcon
                  iconName={"down"}
                  iconFamily={"AntDesign"}
                  iconColor={rightIconColor}
                  iconSize={20}
                />
              </View>
            )}
          </View>
        </View>
        {spacerEnd && <Spacer spacing={6} />}
        <Spacer spacing={8} />
      </ItemView>
    </>
  );
};

const styles = StyleSheet.create({
  errorMsg: {
    color: colors.red,
    fontSize: 12,
    fontWeight: "500",
  },
  mainContainer: {
    maxHeight: 68,
    overflow: "hidden",
    // elevation: 5,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 14,
    borderColor: colors.gray,
    backgroundColor: colors.white,
  },
  container: {
    flexDirection: "row",
    paddingVertical: Platform.OS == "ios" ? 15 : 0,
    paddingLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 50,

    // flex: 1,
  },
  inputField: { flex: 1, fontSize: 16, lineHeight: 20 },
  unit: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: 50,
    height: "200%",
    marginTop: -4,
    marginRight: -8,
    paddingHorizontal: 12,
  },
  unitValue: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.white,
    textTransform: "capitalize",
  },
});
