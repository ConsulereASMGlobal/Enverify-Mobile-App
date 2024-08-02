import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Pressable,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Spacer } from "../../../components/common/Spacer";
import { colors } from "../../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "../../../globals/themes";
import { useSelector } from "react-redux";
import { productionActions } from "../../../redux/actions/combineAction";
import { RootState, useAppDispatch } from "../../../redux/store";
import { selectProductionList } from "../../../redux/selectors";

import { NoDataView } from "../../../components/NoDataView";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ProductionReportCard from "./components/ProductionReportCard";
import MonthPicker from "react-native-month-year-picker";
import { TextField } from "@src/components/TextField/TextField";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import { sumQuantity, truncateToTwoDecimalPlaces } from "@src/utils/getSum";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import dayjs from "dayjs";

const renderItem =
  (onPress) =>
  ({ item }) =>
    (
      <Pressable onPress={onPress(item)}>
        <View style={styles.card}>
          <ProductionReportCard
            item={item}
            detail={false}
            history={true}
            flowfrom="Supply"
          />
        </View>
      </Pressable>
    );

export const ProductionReport = () => {
  const navigation = useNavigation<any>();
  const onPress = (data: any) => () => {
    navigation.navigate("ProductionDetailsScreen", {
      data: data,
    });
  };
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const currentDate = new Date();
  const millisecondsSinceEpoch = currentDate.getTime();
  const [pickDate, setPickDate] = useState<any>(millisecondsSinceEpoch);
  const [show, setShow] = useState(false);
  const showPicker = useCallback((value: any) => setShow(value), []);

  console.log(dayjs(pickDate).format("MM/YYYY")); //FORMATING HERE

  const onValueChange = useCallback(
    (event: any, newDate: Date) => {
      const selectedDate = newDate || pickDate;
      showPicker(false);
      setPickDate(selectedDate);
    },
    [pickDate, showPicker]
  );

  useEffect(() => {
    dispatch(
      productionActions.getProduction({
        month: dayjs(pickDate).format("MM/YYYY"),
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      productionActions.getProduction({
        month: dayjs(pickDate).format("MM/YYYY"),
      })
    );
    setRefreshing(false);
  }, [refreshing, isFocused, pickDate]);

  const _onRefresh = () => {
    setRefreshing(true);
  };
  const productions = useSelector(selectProductionList);
  const isLoading = useSelector((state: RootState) => state.orderList.loading);

  // return (
  //   <View style={styles.mainContainer}>
  //     <Spacer spacing={10} />
  //     {isLoading ? (
  //       <LoadingIndicator />
  //     ) : (
  //       <FlatList
  //         data={productions}
  //         renderItem={renderItem(onPress)}
  //         refreshControl={
  //           <RefreshControl
  //             refreshing={refreshing}
  //             onRefresh={_onRefresh}
  //             tintColor={colors.primary}
  //           />
  //         }
  //         style={styles.flatListStyle}
  //         keyExtractor={item => item.orderId}
  //         showsVerticalScrollIndicator={false}
  //         contentContainerStyle={styles.flatlistContainerStyle}
  //         ListEmptyComponent={NoDataView}
  //         ItemSeparatorComponent={() => <Spacer spacing={5} />}
  //       />
  //     )}
  //   </View>
  // );

  const RenderItem = ({ item }: any) => (
    <Pressable style={styles.card} onPress={onPress(item)}>
      <View style={styles.listCont}>
        <View style={{ flex: 0.3 }}>
          <TextField style={styles.dateLoc}>
            {epochToHumanReadable(item?.productionId)}
          </TextField>
        </View>
        <View style={{ flex: 0.5 }}>
          <TextField style={styles.dateLoc}>
            {item?.processName ? item?.processName : "N/A"}
            <Spacer spacing={5} />
            {item?.processType === "DIVERSION" && (
              <DynamicIcon
                iconName="check-square"
                iconFamily="FontAwesome"
                iconColor={colors.green}
                iconSize={14}
              />
            )}
          </TextField>
        </View>
        <View style={{ flex: 0.2, alignItems: "flex-end" }}>
          <TextField style={styles.pointT}>
            {truncateToTwoDecimalPlaces(item?.inputQuantity)} KG
          </TextField>
        </View>
      </View>
      <View style={styles.horizontalLine} />
    </Pressable>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Spacer spacing={10} />
        <View style={styles.headerArea}>
          <TextField style={{ lineHeight: 24 }}>Select Month</TextField>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => showPicker(true)}
          >
            <TextField style={{ fontSize: 14, marginRight: 5 }}>
              {dayjs(pickDate).format("MMM YYYY")}
            </TextField>
            <DynamicIcon iconName="down" iconFamily="AntDesign" iconSize={14} />
          </TouchableOpacity>
        </View>
        <Spacer spacing={5} />
      </View>
      <View style={{ flex: 1 }}>
        <Spacer spacing={5} />
        <View style={styles.listCont}>
          <View style={{ flex: 0.3 }}>
            <TextField style={styles.tableHeader}>Date</TextField>
          </View>
          <View style={{ flex: 0.5 }}>
            <TextField style={styles.tableHeader}>Process</TextField>
          </View>
          <View style={{ flex: 0.2, alignItems: "flex-end" }}>
            <TextField style={styles.tableHeader}>Qty</TextField>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            data={productions}
            renderItem={RenderItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
                tintColor={colors.primary}
              />
            }
            style={{ flex: 1 }}
            keyExtractor={(item) => item?.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatlistContainerStyle}
            ListEmptyComponent={NoDataView}
            ItemSeparatorComponent={() => <Spacer spacing={5} />}
          />
        )}
      </View>

      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={new Date()}
          minimumDate={new Date(2023, 0)}
          maximumDate={new Date()}
          locale="en"
        />
      )}
    </View>
  );
};

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: colors.backgroundColor
//   },
//   flatListStyle: {
//     flex: 1
//   },
//   flatlistContainerStyle: {
//     paddingBottom: MEDIUM_PADDING_SIZE,
//     paddingHorizontal: REGULAR_PADDING_SIZE,
//     paddingTop: 2
//   },
//   orderList: {
//     backgroundColor: colors.white,
//     paddingVertical: MEDIUM_PADDING_SIZE,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 0
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 4,
//     paddingHorizontal: MEDIUM_PADDING_SIZE,
//     borderRadius: BORDER_RADIUS_SIZE,
//     marginTop: 2
//   },
//   itemText: {
//     fontSize: 16,
//     color: colors.dark
//     // fontWeight: 'bold',
//   },
//   itemTextTitle: {
//     fontSize: 16,
//     color: colors.dark
//   },
//   itemStatusText: {
//     fontSize: 11,
//     color: colors.yellow,
//     textTransform: 'uppercase'
//   },
//   row: {
//     paddingTop: BORDER_RADIUS_SIZE,
//     flexDirection: 'row'
//   },

//   orderStatusView: {
//     borderRadius: 12,
//     paddingVertical: 2,
//     width: '40%',
//     marginBottom: 5,
//     justifyContent: 'center',
//     paddingHorizontal: MEDIUM_PADDING_SIZE,
//     backgroundColor: colors.cardColor
//   },
//   card: {
//     backgroundColor: colors.white,
//     shadowColor: colors.dark,
//     shadowOffset: {
//       width: 0,
//       height: 0
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     borderRadius: BORDER_RADIUS_SIZE,
//     elevation: 5,
//     padding: MEDIUM_PADDING_SIZE,
//     marginBottom: 5
//   }
// });

const styles = StyleSheet.create({
  listCont: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: REGULAR_PADDING_SIZE,
  },
  tableHeader: { fontWeight: "bold" },
  dateLoc: { color: colors.dark, fontSize: 14 },
  pointT: { color: colors.primary, fontSize: 14 },
  multiplier: { color: colors.orange, fontSize: 14 },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  innerContainer: {
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
  headerArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },
  headerText: { fontSize: 20, fontWeight: "700", lineHeight: 32 },
  mainContainer: {
    flex: 1,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.backgroundColor,
  },
  flatlistContainerStyle: {
    paddingVertical: MEDIUM_PADDING_SIZE,
  },
  card: {
    justifyContent: "space-between",
  },
  circleView: {
    width: 36,
    height: 36,
    borderRadius: 92 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8ECF2",
    padding: 16,
    marginRight: 15,
  },
  statusView: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: 5,
    borderRadius: 92 / 2,
  },
  datePicker: {
    borderWidth: 1,
    padding: HALF_MEDIUM_PADDING_SIZE,
    borderRadius: BORDER_RADIUS_SIZE,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
});
