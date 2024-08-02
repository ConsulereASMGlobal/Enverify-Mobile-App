import React from "react";
import { TextField } from "@src/components/TextField/TextField";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  greenText: {
    color: "#135B5E",
    fontWeight: "bold",
  },
});

export const facts = [
  {
    id: 1,
    icon: require("../assets/facts/open_box.png"),
    text: (
      <TextField style={{ textAlign: "center", lineHeight: 24 }}>
        Recycling <TextField style={styles.greenText}>a tonne</TextField> of
        cardboard saves
        <TextField style={styles.greenText}> 9 cubic yards</TextField> of
        landfill space.
      </TextField>
    ),
  },
  {
    id: 2,
    icon: require("../assets/facts/plastic_waste.png"),
    text: (
      <TextField style={{ textAlign: "center", lineHeight: 24 }}>
        <TextField style={styles.greenText}>400 million tonnes</TextField> of
        plastic waste are generated annually enough to encircle the
        <TextField style={styles.greenText}> earth four times.</TextField>
      </TextField>
    ),
  },
  {
    id: 3,
    icon: require("../assets/facts/gasoline.png"),
    text: (
      <TextField style={{ textAlign: "center", lineHeight: 24 }}>
        Recycling one tonne of plastic saves
        <TextField style={styles.greenText}>
          {" "}
          1,000 - 2,000 gallons
        </TextField>{" "}
        of gasoline.
      </TextField>
    ),
  },
  {
    id: 4,
    icon: require("../assets/facts/broken_glass.png"),
    text: (
      <TextField style={{ textAlign: "center", lineHeight: 24 }}>
        Glass can take over
        <TextField style={styles.greenText}> a million years</TextField> to
        break down.
      </TextField>
    ),
  },
  {
    id: 5,
    icon: require("../assets/facts/bottle_waste.png"),
    text: (
      <TextField style={{ textAlign: "center", lineHeight: 24 }}>
        <TextField style={styles.greenText}>28 billion</TextField> glass bottles
        yearly fill landfills.
      </TextField>
    ),
  },
  {
    id: 6,
    icon: require("../assets/facts/paper.png"),
    text: (
      <TextField style={{ textAlign: "center", lineHeight: 24 }}>
        Recycling
        <TextField style={styles.greenText}> a tonne</TextField> of paper saves
        <TextField style={styles.greenText}> 7,000 gallons</TextField> of water.
      </TextField>
    ),
  },
  {
    id: 7,
    icon: require("../assets/facts/wine_bottles.png"),
    text: (
      <TextField style={{ textAlign: "center", lineHeight: 24 }}>
        Glass is
        <TextField style={styles.greenText}> 100%</TextField> and infinitely
        recyclable without any quality degradation.
      </TextField>
    ),
  },
  {
    id: 8,
    icon: require("../assets/facts/newspaper.png"),
    text: (
      <TextField style={{ textAlign: "center", lineHeight: 24 }}>
        Recycling
        <TextField style={styles.greenText}> one tonne</TextField> of newspaper{" "}
        <TextField style={styles.greenText}>saves 15 trees.</TextField>
      </TextField>
    ),
  },
  {
    id: 1,
    icon: require("../assets/facts/aluminium_paper.png"),
    text: (
      <TextField style={{ textAlign: "center", lineHeight: 24 }}>
        <TextField style={styles.greenText}>Aluminium</TextField> recycling
        needs just
        <TextField style={styles.greenText}> 5% of the energy </TextField>
        used for production from new materials.
      </TextField>
    ),
  },
];
