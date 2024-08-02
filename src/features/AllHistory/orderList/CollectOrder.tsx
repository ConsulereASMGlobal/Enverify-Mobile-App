import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Pressable,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "@src/redux/store";
import { orderActions } from "@src/redux/actions/combineAction";
import { selectOrderList } from "@src/redux/selectors";
import { Spacer } from "@src/components/common/Spacer";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import { NoDataView } from "@src/components/NoDataView";
import { colors } from "@src/globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "@src/globals/themes";
import { TextField } from "@src/components/TextField/TextField";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { sumQuantity, truncateToTwoDecimalPlaces } from "@src/utils/getSum";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import dayjs from "dayjs";
import MonthPicker from "react-native-month-year-picker";

export const CollectOrderList = ({ navigation }: any) => {
  const onPress = (data: any) => () => {
    navigation.navigate("OrderDetailsCard", {
      data,
      from: "CollectOrder",
      ...{ collect: true },
      ...{ showQR: false },
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

  useEffect(() => {
    dispatch(
      orderActions.getOrder({ month: dayjs(pickDate).format("MM/YYYY") })
    );
  }, []);
  useEffect(() => {
    dispatch(
      orderActions.getOrder({ month: dayjs(pickDate).format("MM/YYYY") })
    );
    setRefreshing(false);
  }, [refreshing, isFocused, pickDate]);

  const _onRefresh = () => {
    setRefreshing(true);
  };
  const orders = useSelector(selectOrderList);
  const isLoading = useSelector((state: RootState) => state.orderList.loading);

  const RenderItem = ({ item }: any) => (
    <Pressable style={styles.card} onPress={onPress(item)}>
      <View style={styles.listCont}>
        <View style={{ flex: 0.3 }}>
          <TextField style={styles.dateLoc}>
            {epochToHumanReadable(item?.collectionDate)}
          </TextField>
        </View>
        <View style={{ flex: 0.5 }}>
          <TextField style={styles.dateLoc}>
            {item?.customerName
              ? item?.customerName?.length > 13
                ? item?.customerName.substring(0, 12) + "..."
                : item?.customerName
              : "N/A"}
          </TextField>
        </View>
        <View style={{ flex: 0.2, alignItems: "flex-end" }}>
          <TextField style={styles.pointT}>
            {truncateToTwoDecimalPlaces(sumQuantity(item?.orderDetails))} KG
          </TextField>
        </View>
      </View>
      <View style={styles.horizontalLine} />
    </Pressable>
  );

  const onValueChange = useCallback(
    (event: any, newDate: Date) => {
      const selectedDate = newDate || pickDate;
      showPicker(false);
      setPickDate(selectedDate);
    },
    [pickDate, showPicker]
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
            <TextField style={styles.tableHeader}>Depositor</TextField>
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
            data={orders}
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
