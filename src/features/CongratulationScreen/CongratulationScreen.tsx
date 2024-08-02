import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";

import { colors } from "../../globals/colors";
import {
  REGULAR_PADDING_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  XLARGE_PADDING_SIZE,
} from "../../globals/themes";
import { TextField } from "../../components/TextField/TextField";
import { FastImage } from "../../components/image/index";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";

interface CongratulationScreenProps {
  onRequestClose: () => void;
  heading?: string;
  message?: string;
  bottomContent?: React.ReactNode;
}

export default function CongratulationScreen({
  onRequestClose,
  heading = "",
  message = "",
  bottomContent = <></>,
}: CongratulationScreenProps) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* <Pressable
            style={styles.button}
            onPress={onRequestClose}
            hitSlop={styles.hitSlop}>
            <CloseIcon />
          </Pressable> */}
          <Pressable
            style={styles.button}
            onPress={onRequestClose}
            hitSlop={styles.hitSlop}
          >
            <DynamicIcon
              iconName="close"
              iconSize={24}
              iconColor={colors.primary}
            />
          </Pressable>
          <FastImage
            source={require("../../assets/gifs/correct.gif")}
            resizeMode="contain"
            style={{ height: 100, width: 100, alignSelf: "center" }}
          />
          <Text style={styles.modalText}>{"Success!"}</Text>
          {!!heading && (
            <TextField
              style={{
                ...styles.messageStyle,
                marginTop: 4,
                marginBottom: 5,
                fontSize: 18,
              }}
            >
              {heading}
            </TextField>
          )}
          {message && (
            <TextField style={styles.messageStyle}>{message}</TextField>
          )}

          {bottomContent && bottomContent}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity here (0.5 means 50% transparency)
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  alignCenter: {
    alignSelf: "center",
  },
  modalView: {
    marginHorizontal: REGULAR_PADDING_SIZE,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 34,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: XLARGE_PADDING_SIZE,
  },
  hitSlop: {
    top: 10,
    bottom: 15,
    right: 30,
  },
  button: {
    alignItems: "flex-end",
    paddingBottom: REGULAR_PADDING_SIZE,
  },
  messageStyle: {
    textAlign: "center",
    lineHeight: 22,
    paddingTop: HALF_MEDIUM_PADDING_SIZE,
  },
  modalText: {
    fontSize: 22,
    lineHeight: 26,
    textAlign: "center",
    color: colors.primary,
    paddingTop: REGULAR_PADDING_SIZE,
  },
});
