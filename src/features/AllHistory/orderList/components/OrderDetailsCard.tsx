import { StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "../../../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "../../../../globals/themes";
import OrderCard from "./OrderCard";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import ChainofCustody from "../../Components/ChainofCustody";

export const OrderDetailsCard = ({ route }) => {
  const { data, from } = route.params;
  return (
    <ScrollContainerLayout
      style={styles.mainContainer}
      contentStyle={{ paddingBottom: MEDIUM_PADDING_SIZE }}
    >
      <View style={styles.card}>
        <OrderCard item={data} detail={true} history={true} flowfrom={from} />
      </View>
      <ChainofCustody />
    </ScrollContainerLayout>
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
