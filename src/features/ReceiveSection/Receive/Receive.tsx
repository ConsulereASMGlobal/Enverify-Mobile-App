import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { TextMedium } from "@src/components/TextField/TextField";
import { MEDIUM_PADDING_SIZE, REGULAR_PADDING_SIZE } from "@src/globals/themes";
import { colors } from "@src/globals/colors";
import ProcessSVG from "@src/assets/dashboardIcons/ProcessSVG";
import SupplySVG from "@src/assets/dashboardIcons/SupplySVG";
import ReceiveSVG from "@src/assets/dashboardIcons/ReceiveSVG";

const list = [
  // {
  //   id: 1,
  //   title: 'Order Confirmation',
  //   icon: 'receive',
  //   route: 'orderConfirmation'
  // },
  {
    id: 2,
    title: "Delivery Confirmation",
    icon: "supply",
    route: "deliveryConfirmation",
  },
  // {
  //   id: 3,
  //   title: 'History',
  //   icon: 'process',
  //   route: 'history'
  // }
];

const components: any = {
  process: ProcessSVG,
  supply: SupplySVG,
  receive: ReceiveSVG,
};
const CustomIcon = (iconName: any) => {
  const IconComponent = components[iconName];
  return <IconComponent size={30} color={colors.primary} />;
};
const Receive = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{ paddingBottom: 25 }}
        showsVerticalScrollIndicator={false}
      >
        {list?.map((item) => (
          <Pressable
            onPress={() => navigation.navigate(item?.route)}
            style={{ marginHorizontal: 1, marginTop: 2 }}
            key={item?.id}
          >
            <View style={styles.card}>
              <View style={styles.circleView}>
                {item?.icon && CustomIcon(item?.icon)}
              </View>
              <View>
                <TextMedium style={styles.textStyle}>{item?.title}</TextMedium>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: REGULAR_PADDING_SIZE,
    paddingHorizontal: REGULAR_PADDING_SIZE / 2,
    backgroundColor: colors.backgroundColor,
  },
  card: {
    height: 100,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius: 12,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
  textStyle: {
    fontSize: 20,
    lineHeight: 27,
  },
  circleView: {
    width: 62,
    height: 62,
    borderRadius: 62 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryBG,
  },
});

export default Receive;
