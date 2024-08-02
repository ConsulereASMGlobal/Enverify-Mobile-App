import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import {
  Controller,
  UseFormReturn,
  RegisterOptions,
  FieldPathValue,
} from "react-hook-form";
import { colors } from "../../globals/colors";
import { Spacer } from "../common/Spacer";
import { DynamicIcon, DynamicIconProps } from "../../utils/Dynamic/DynamicIcon";
import { TextField } from "../TextField/TextField";
import DatePicker, { DatePickerProps } from "react-native-date-picker";
import TooltipComp from "../TooltipComp/TooltipComp";

type ValidationInputProps = UseFormReturn &
  TextInputProps &
  DynamicIconProps & {
    label?: string;
    subLabel?: string;
    fieldName?: string;
    rules?: Omit<
      RegisterOptions<any, any>,
      "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    defaultValue?: FieldPathValue<any, any>;
    isInvalid?: boolean;
    isRequired?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    inputType?: "text" | "password";
    handleSubmit?: any;
    prefix?: React.ReactNode;
    mode?: "datePicker" | "normal";
    toggleIcon?: boolean;
    styleFromPros?: ViewStyle;
    autoCapitalize?: string;
    maxToday?: boolean;
    datePicker?: Omit<
      DatePickerProps,
      "onConfirm" | "date" | "onCancel" | "modal"
    >;
    setPickDate?: React.Dispatch<React.SetStateAction<any>>;
    tooltipChild?: React.ReactNode;
    tooltipPosition?: any;
  };

export const ValidationInput = ({
  styleFromPros,
  fieldName,
  register,
  control,
  formState: { errors },
  defaultValue = "",
  isRequired = false,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  label,
  subLabel,
  onFocus,
  onBlur,
  prefix,
  mode = "normal",
  toggleIcon = false,
  secureTextEntry = false,
  autoCapitalize,
  iconName,
  iconSize,
  iconColor,
  iconFamily,
  iconOnPress,
  datePicker,
  setPickDate,
  maxToday = false,
  tooltipChild,
  tooltipPosition = "top",
  ...rest
}: ValidationInputProps) => {
  const maxDate = new Date();

  const hasError = Boolean(errors[fieldName]);
  const [isFocused, setIsFocus] = useState(false);

  const [secureEntry, setSecureEntry] = useState(false);

  const [date, setDate] = useState<any | Date>(new Date());
  const [openCalender, setOpenCalender] = useState(false);

  const fieldColor = hasError
    ? colors.error
    : isFocused
    ? colors.secondary
    : colors.gray;

  const inputFieldColor = hasError
    ? colors.error
    : isFocused
    ? colors.secondary
    : colors.placholderColor;

  const inputRef: any = useRef(null);

  const handleFocus = (e: any) => {
    onFocus && onFocus(e);
    setIsFocus(true);
  };

  const handleBlur = (e: any) => {
    onBlur && onBlur(e);
    setIsFocus(false);
  };

  useEffect(() => {
    setSecureEntry(!!secureTextEntry);
  }, [secureTextEntry]);

  const icName =
    secureTextEntry && iconName === "eye"
      ? secureEntry
        ? "eye"
        : "eye-off"
      : iconName;

  const iconProps = {
    iconName: icName,
    iconSize,
    iconColor: iconColor ?? fieldColor,
    iconFamily,
    iconOnPress:
      mode === "datePicker"
        ? () => setOpenCalender(!openCalender)
        : !!iconOnPress
        ? () => iconOnPress()
        : secureTextEntry && iconName === "eye"
        ? () => setSecureEntry(!secureEntry)
        : () => console.log("Toggeling"),
  };

  const formatDate = (date: Date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  return (
    <>
      <View style={styles.root}>
        {label && (
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 5 }}>
            <TextField style={styles.label}>{label}</TextField>

            {tooltipChild && (
              <>
                <TooltipComp
                  children={tooltipChild}
                  tooltipPosition={tooltipPosition}
                />
              </>
            )}
          </View>
        )}
        {subLabel && <TextField style={styles.subLabel}>{subLabel}</TextField>}

        <View
          style={{
            ...styles.container,
            ...{
              borderColor: fieldColor,
            },
          }}
        >
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                {prefix && (
                  <View style={[styles.prefix]}>
                    <TextField style={{ color: colors.placholderColor }}>
                      {prefix}
                    </TextField>
                  </View>
                )}
                <TextInput
                  {...rest}
                  {...(register(fieldName), { required: isRequired })}
                  autoCapitalize={autoCapitalize}
                  onChangeText={(val) => mode !== "datePicker" && onChange(val)}
                  value={value}
                  style={{
                    color: inputFieldColor,
                    ...styles.input,
                    ...styleFromPros,
                  }}
                  placeholderTextColor={colors.placholderColor}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  ref={inputRef}
                  secureTextEntry={secureEntry}
                  onPressIn={
                    mode === "datePicker"
                      ? () => setOpenCalender(true)
                      : undefined
                  }
                />

                {mode === "datePicker" && openCalender && (
                  <DatePicker
                    modal
                    open={openCalender}
                    date={date}
                    // minimumDate={new Date()}
                    maximumDate={maxToday ? maxDate : undefined}
                    mode="date"
                    disabled={(date) => {
                      return date < new Date() || date > maxDate;
                    }}
                    onConfirm={(date) => {
                      setOpenCalender(false);
                      setDate(date);
                      setPickDate(date);
                      onChange(`${formatDate(date)}`);
                    }}
                    onCancel={() => {
                      setOpenCalender(false);
                    }}
                    {...datePicker}
                  />
                )}
              </>
            )}
            name={fieldName}
            defaultValue={defaultValue}
            {...rest}
          />
          {!!iconName && <DynamicIcon {...iconProps} />}
        </View>

        {hasError && (
          <TextField style={styles.error}>
            {errors[fieldName]?.message?.toString()}
          </TextField>
        )}
        <Spacer spacing={8} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  prefix: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 30,
    borderRightWidth: 1,
    borderColor: colors.placholderColor,
  },
  root: {
    flex: -1,
    justifyContent: "center",
  },
  container: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    paddingRight: 14,
    alignItems: "center",
  },
  label: {
    color: colors.darkLight,
    paddingBottom: 5,
    fontSize: 14,
  },
  subLabel: {
    color: colors.gray,
    paddingBottom: 5,
    fontSize: 12,
  },

  input: {
    height: 50,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    flex: 1,
    fontSize: 16,
  },
  errorContainer: {
    height: 25,
  },
  error: {
    color: colors.error,
    paddingTop: 5,
    fontSize: 13,
  },
});
