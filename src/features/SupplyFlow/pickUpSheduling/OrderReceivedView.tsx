import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";

import { colors } from "../../../globals/colors";
import CloseIcon from "./../../assets/close-icon.svg";
import CongratsIcon from "./../../assets/congrats-icon.svg";
import {
  Fonts,
  REGULAR_PADDING_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  XLARGE_PADDING_SIZE,
} from "../../../globals/themes";
import { TextField } from "../../../components/TextField/TextField";
import { FastImage } from "../../../components/image/index";

interface OrderReceivedViewProps {
  onRequestClose: () => void;
  data: any;
}

export default function OrderReceivedView({
  onRequestClose,
  data,
}: OrderReceivedViewProps) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={styles.button}
            onPress={onRequestClose}
            hitSlop={styles.hitSlop}
          >
            <CloseIcon />
          </Pressable>
          {/* <CongratsIcon style={styles.alignCenter} /> */}
          <FastImage
            source={require("../../assets/gifs/correct.gif")}
            resizeMode="contain"
            style={{ height: 100, width: 100, alignSelf: "center" }}
          />
          <Text style={styles.modalText}>
            The stock has been successfully dispatched.
          </Text>
          {/* <TextField style={styles.messageStyle}>{'Thank you'}</TextField> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity here (0.5 means 50% transparency)
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    color: colors.secondary,
  },
  modalText: {
    fontSize: 20,
    lineHeight: 26,
    textAlign: "center",
    color: colors.secondary,
    paddingTop: REGULAR_PADDING_SIZE,
  },
});
