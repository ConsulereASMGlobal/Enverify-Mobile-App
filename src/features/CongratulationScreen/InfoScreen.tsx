import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";

import { colors } from "../../globals/colors";
import {
  REGULAR_PADDING_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  XLARGE_PADDING_SIZE,
  Fonts,
} from "../../globals/themes";
import { TextField } from "../../components/TextField/TextField";
import { FastImage } from "../../components/image/index";

interface CongratulationScreenProps {
  onRequestClose: () => void;
  heading?: string;
  message?: string;
  bottomContent?: React.ReactNode;
}

export default function InfoScreen({
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
          {/* <CongratsIcon style={styles.alignCenter} /> */}
          {/* <FastImage
          source={require('../../assets/gifs/correct.gif')}
          resizeMode="contain"
          style={{ height: 100, width: 100, alignSelf: 'center' }}
        /> */}
          <FastImage
            source={require("../../assets/others/alerticon.png")}
            style={{ width: 40, height: 40, alignSelf: "center" }}
          />
          <Text style={styles.modalText}>{"Alert!"}</Text>
          {!!heading && (
            <TextField
              style={{ ...styles.messageStyle, marginTop: 4, marginBottom: 5 }}
            >
              {heading}
            </TextField>
          )}
          <TextField style={styles.messageStyle}>{message}</TextField>

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
    minWidth: "90%",
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
    paddingTop: HALF_MEDIUM_PADDING_SIZE,
  },
  modalText: {
    fontSize: 22,
    lineHeight: 26,
    textAlign: "center",
    color: colors.secondary,
    paddingTop: REGULAR_PADDING_SIZE,
  },
});
