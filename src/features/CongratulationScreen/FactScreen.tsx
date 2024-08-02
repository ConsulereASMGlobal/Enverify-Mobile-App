import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import {
  REGULAR_PADDING_SIZE,
  XLARGE_PADDING_SIZE,
} from "../../globals/themes";
import { TextField } from "../../components/TextField/TextField";
import { FastImage } from "../../components/image/index";
import { facts } from "../../static/facts";

export default function FactScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <FastImage
              source={facts[index]?.icon}
              resizeMode="contain"
              style={{ height: 48, width: 48, alignSelf: "center" }}
            />
          </View>

          <TextField
            style={{
              fontSize: 24,
              lineHeight: 28,
              fontWeight: "bold",
            }}
          >
            Did you know?
          </TextField>
          {facts[index]?.text}
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
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
    width: "85%",
  },

  container: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },

  iconContainer: {
    height: 88,
    width: 88,
    backgroundColor: "#E8F0F0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
