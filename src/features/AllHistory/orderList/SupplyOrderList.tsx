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

import OrderCard from "./components/OrderCard";
import { RootState, useAppDispatch } from "@src/redux/store";
import { returnActions } from "@src/redux/actions/combineAction";
import { selectReturnList } from "@src/redux/selectors";
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
import MonthPicker from "react-native-month-year-picker";
import { TextField } from "@src/components/TextField/TextField";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import { sumQuantity, truncateToTwoDecimalPlaces } from "@src/utils/getSum";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import dayjs from "dayjs";

const renderItem =
  (onPress) =>
  ({ item }) => {
    return (
      <Pressable onPress={onPress(item)}>
        <View style={styles.card}>
          <OrderCard
            item={item}
            detail={false}
            history={true}
            flowfrom="Supply"
          />
        </View>
        {/* <SquircleView
          style={styles.orderList}
          squircleParams={{
            cornerSmoothing: 1,
            fillColor: colors.white,
            cornerRadius: BORDER_RADIUS_SIZE
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <View style={{ flexDirection: 'row' }}>
              <TextField style={{ ...styles.itemText, fontSize: 12 }}>
                {`${epochToHumanReadable(item?.createdAt)}`}
              </TextField>
              <TextField style={{ ...styles.itemText, fontSize: 12 }}>
                {' '}
                {`${epochToHumanReadableTime(item?.createdAt)}`}
              </TextField>
            </View>
            <SquircleView
              style={{
                ...styles.orderStatusView,
                width: item?.status?.length * 10,
                minWidth: '33%',
                alignItems: 'center'
              }}
              squircleParams={{
                cornerSmoothing: 0.7,
                fillColor: colors.cardColor,
                cornerRadius: 12
              }}>
              <TextField
                style={[
                  styles.itemStatusText,
                  {
                    color:
                      item?.status === 'Accepted'
                        ? colors.green
                        : item?.status === 'Completed'
                        ? colors.secondary
                        : colors.primary
                  }
                ]}>
                {item?.status}
              </TextField>
            </SquircleView>
          </View>

          <View style={styles.row}>
            <TextField style={styles.itemTextTitle}>Order ID : </TextField>
            <TextField
              numberOfLines={1}
              ellipsizeMode="middle"
              style={{ ...styles.itemText, width: '70%' }}>
              {item?.id}
            </TextField>
          </View>
          <View style={styles.row}>
            <TextField style={styles.itemTextTitle}>
              {`Recycler Name : `}
            </TextField>
            <TextField
              style={[
                styles.itemText,
                {
                  width: '55%'
                }
              ]}>
              {item?.centreInfo?.name}
            </TextField>
          </View>
          <View style={styles.row}>
            <TextField style={styles.itemTextTitle}>Quantity : </TextField>
            <TextField style={styles.itemText}>
              {truncateToTwoDecimalPlaces(sumQuantity(item?.orderDetails))} KG
            </TextField>
          </View>
          <View style={styles.row}>
            <TextField style={styles.itemTextTitle}>Delivery Date : </TextField>
            <TextField style={styles.itemText}>
              {epochToHumanReadable(item?.pickupInfo?.pickupDate)}
            </TextField>
          </View>
          <View
            style={{
              paddingTop: BORDER_RADIUS_SIZE,
              alignItems: 'flex-end'
            }}>
            <TextField
              style={{
                fontSize: 14,
                color: colors.primary,
                marginTop: 5
              }}>
              View More {'>'}
            </TextField>
          </View>
        </SquircleView> */}
      </Pressable>
    );
  };

export const SupplyOrderList = ({ navigation }: any) => {
  const onPress = (data: any) => () => {
    navigation.navigate("OrderDetailsCard", {
      data,
      from: "Supply",
    });
  };
  const dispatch = useAppDispatch();

  const currentDate = new Date();
  const millisecondsSinceEpoch = currentDate.getTime();
  const [pickDate, setPickDate] = useState<any>(millisecondsSinceEpoch);
  const [show, setShow] = useState(false);
  const showPicker = useCallback((value: any) => setShow(value), []);

  useEffect(() => {
    dispatch(
      returnActions.getReturn({ month: dayjs(pickDate).format("MM/YYYY") })
    );
  }, []);
  const isFocused = useIsFocused();

  const orders = useSelector(selectReturnList);
  const isLoading = useSelector((state: RootState) => state.returnList.loading);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    isFocused &&
      dispatch(
        returnActions.getReturn({ month: dayjs(pickDate).format("MM/YYYY") })
      );
    setRefreshing(false);
  }, [refreshing, isFocused, pickDate]);

  const _onRefresh = () => {
    setRefreshing(true);
  };

  const RenderItem = ({ item }: any) => (
    <Pressable style={styles.card} onPress={onPress(item)}>
      <View style={styles.listCont}>
        <View style={{ flex: 0.25 }}>
          <TextField style={styles.dateLoc}>
            {epochToHumanReadable(item?.createdAt)}
          </TextField>
        </View>
        <View style={{ flex: 0.3 }}>
          <TextField style={styles.dateLoc}>
            {/* {item?.centreInfo?.name ? item?.centreInfo?.name : "N/A"} */}
            {item?.centreInfo?.name
              ? item?.centreInfo?.name?.length > 12
                ? item?.centreInfo?.name.substring(0, 12) + "..."
                : item?.centreInfo?.name
              : "N/A"}
          </TextField>
        </View>
        <View style={{ flex: 0.2 }}>
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
          <View style={{ flex: 0.3 }}>
            <TextField style={styles.tableHeader}>Facility</TextField>
          </View>
          <View style={{ flex: 0.2 }}>
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

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: colors.backgroundColor
//   },
//   flatListStyle: {
//     flex: 1
//   },
//   flatlistContainerStyle: {
//     paddingHorizontal: MEDIUM_PADDING_SIZE,
//     paddingTop: 10,
//     paddingBottom: 10
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
//     color: colors.dark
//   },
//   itemTextTitle: {
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
//   rowSpaceBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   orderStatusView: {
//     borderRadius: 12,
//     paddingVertical: 2,
//     marginBottom: 5,
//     justifyContent: 'center',
//     paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
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
