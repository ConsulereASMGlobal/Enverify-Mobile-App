import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors } from "../../../globals/colors";
import { Spacer } from "../../../components/common/Spacer";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "../../../globals/themes";
import { useDispatch, useSelector } from "react-redux";
import { selectReturnList } from "../../../redux/selectors";
import { returnActions } from "../../../redux/actions/combineAction";
import { RootState } from "../../../redux/store";
import { NoDataView } from "../../../components/NoDataView";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import MonthPicker from "react-native-month-year-picker";
import { TextField } from "@src/components/TextField/TextField";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import { sumQuantity, truncateToTwoDecimalPlaces } from "@src/utils/getSum";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import dayjs from "dayjs";

export const History = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const currentDate = new Date();
  const millisecondsSinceEpoch = currentDate.getTime();
  const [pickDate, setPickDate] = useState<any>(millisecondsSinceEpoch);
  const [show, setShow] = useState(false);
  const showPicker = useCallback((value: any) => setShow(value), []);

  useEffect(() => {
    dispatch(
      returnActions.getReturn({
        status: "completed",
        month: dayjs(pickDate).format("MM/YYYY"),
      })
    );
  }, [dispatch, isFocused, pickDate]);

  const returnOrders = useSelector(selectReturnList);
  const isLoading = useSelector((state: RootState) => state.returnList.loading);
  const [refreshing, setRefreshing] = useState(false);

  const _onRefresh = () => {
    setRefreshing(true);
    dispatch(returnActions.getReturn({ status: "completed" }));
    setRefreshing(false);
  };

  const RenderItem = ({ item }: any) => (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate("historyDetails", {
          item,
        })
      }
    >
      <View style={styles.listCont}>
        <View style={{ flex: 0.25 }}>
          <TextField style={styles.dateLoc}>
            {epochToHumanReadable(item?.createdAt)}
          </TextField>
        </View>
        <View style={{ flex: 0.35 }}>
          <TextField style={styles.dateLoc}>
            {item.pickupInfo?.name
              ? item.pickupInfo?.name?.length > 13
                ? item.pickupInfo?.name.substring(0, 12) + "..."
                : item.pickupInfo?.name
              : "N/A"}
          </TextField>
        </View>
        <View style={{ flex: 0.15 }}>
          <TextField style={styles.pointT}>
            {truncateToTwoDecimalPlaces(sumQuantity(item?.orderDetails))} KG
          </TextField>
        </View>
        <View style={{ flex: 0.25, alignItems: "flex-end" }}>
          <TextField
            style={[
              styles.pointT,
              {
                color:
                  item?.status === "Created"
                    ? colors.secondary
                    : item?.status === "Completed"
                    ? colors.green
                    : colors.red,
              },
            ]}
          >
            {item?.status}
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
          <View style={{ flex: 0.25 }}>
            <TextField style={styles.tableHeader}>Date</TextField>
          </View>
          <View style={{ flex: 0.35 }}>
            <TextField style={styles.tableHeader}>Facility</TextField>
          </View>
          <View style={{ flex: 0.15 }}>
            <TextField style={styles.tableHeader}>Qty</TextField>
          </View>
          <View style={{ flex: 0.25, alignItems: "flex-end" }}>
            <TextField style={styles.tableHeader}>Status</TextField>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            data={returnOrders}
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
