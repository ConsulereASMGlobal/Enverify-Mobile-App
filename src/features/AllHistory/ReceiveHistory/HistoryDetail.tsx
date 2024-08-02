import { StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "../../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "../../../globals/themes";
import SupplyCard from "../../ReceiveSection/components/SupplyCard";
import ChainofCustody from "../Components/ChainofCustody";

export const HistoryDetails = ({ route }) => {
  const { item } = route.params;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.card}>
        <SupplyCard item={item} detail={true} history={true} />
      </View>
      <ChainofCustody />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: MEDIUM_PADDING_SIZE,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.backgroundColor,
  },
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
});
