import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";

import { TextField, TextMedium } from "@src/components/TextField/TextField";
import {
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
  screenWidth,
} from "@src/globals/themes";
import { colors } from "@src/globals/colors";
import { routes } from "@src/navigation/routes";
import { selectProfile } from "@src/redux/selectors";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";

import CollectSVG from "@src/assets/dashboardIcons/CollectSVG";
import ProcessSVG from "@src/assets/dashboardIcons/ProcessSVG";
import SupplySVG from "@src/assets/dashboardIcons/SupplySVG";
import ReceiveSVG from "@src/assets/dashboardIcons/ReceiveSVG";
import FastImage from "react-native-fast-image";

const components: any = {
  collect: CollectSVG,
  process: ProcessSVG,
  supply: SupplySVG,
  receive: ReceiveSVG,
};
const CustomIcon = (iconName: any) => {
  const IconComponent = components[iconName];
  return <IconComponent size={30} color={colors.primary} />;
};

const PICKUP_POINT_List = [
  {
    id: 1,
    title: "Collect",
    description: "View collection records",
    icon: "collect",
    route: routes.history.collectHistory,
  },
  {
    id: 4,
    title: "Receive",
    description: "View received history",
    icon: "receive",
    route: routes.history.receiveHistory,
  },
  {
    id: 2,
    title: "Process",
    description: "View processing records",
    icon: "process",
    route: routes.history.productionHistory,
  },
  {
    id: 3,
    title: "Supply",
    description: "View supplied records",
    icon: "supply",
    route: routes.history.supplyHistory,
  },
];
const SMART_CENTRE_List = [
  {
    id: 4,
    title: "Receive",
    description: "View received history",
    icon: "receive",
    route: routes.history.receiveHistory,
  },
];

const AllHistory = ({ navigation }: any) => {
  const profileData = useSelector(selectProfile);
  const userType = profileData?.userType;
  const [options, setOptions] = useState(
    userType === "PICKUP_POINT_STAFF" ? PICKUP_POINT_List : SMART_CENTRE_List
  );

  return (
    <ScrollContainerLayout
      style={styles.mainContainer}
      contentStyle={{ height: "100%" }}
      topBgColor={colors.secondary}
    >
      <View style={{}}>
        {options?.map((item) => (
          <Pressable
            onPress={() =>
              navigation.navigate("HistoryStack", { screen: item?.route })
            }
            style={{ marginHorizontal: REGULAR_PADDING_SIZE / 2, marginTop: 2 }}
            key={item?.id}
          >
            <View style={styles.card}>
              <View>
                <TextMedium style={styles.textStyle}>{item?.title}</TextMedium>
                <TextField style={styles.descTxt}>
                  {item?.description}
                </TextField>
              </View>
              <View style={styles.circleView}>
                {item?.icon && CustomIcon(item?.icon)}
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      <FastImage
        source={require("../../assets/others/historybottom.png")}
        style={{
          width: screenWidth,
          height: screenWidth,
          position: "absolute",
          bottom: 0,
          zIndex: -999,
        }}
      />
    </ScrollContainerLayout>
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
    // gap: 20,
    justifyContent: "space-between",
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
  descTxt: {
    fontSize: 14,
  },
});

export default AllHistory;
