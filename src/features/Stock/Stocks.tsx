import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet, View, Pressable } from "react-native";
import { FastImage } from "../../components/image";
import {
  TextBold,
  TextField,
  TextMedium,
} from "../../components/TextField/TextField";
import { colors } from "../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
  XLARGE_PADDING_SIZE,
} from "../../globals/themes";

import {
  getCategoryActions,
  getCategoryStockActions,
} from "../../redux/actions/combineAction";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  selectCategory,
  selectCategoryLoading,
  stockCategory,
  totalStock,
} from "../../redux/selectors";
import { NoDataView } from "../../components/NoDataView";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { Spacer } from "../../components/common/Spacer";
import { useIsFocused } from "@react-navigation/native";
import { truncateToTwoDecimalPlaces } from "../../utils/getSum";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import CustomHeader from "@src/components/CustomHeader";

const renderSummaryItem = ({ item }) => {
  return (
    <View>
      <View
        style={[
          styles.mainListContainer,
          {
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            width: "70%",
          }}
        >
          <View style={styles.itemcircleView}>
            <FastImage
              source={{ uri: item?.itemImage }}
              style={{
                height: 24,
                width: 24,
              }}
              resizeMode={"contain"}
            />
          </View>
          <View style={{ width: "80%" }}>
            <TextBold>{item?.itemName ?? "n/a"}</TextBold>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.primaryBG,
            paddingVertical: 6,
            paddingHorizontal: 8,
            borderRadius: 4,
          }}
        >
          <TextMedium style={[styles.qtyText, { flexShrink: 1 }]}>
            {truncateToTwoDecimalPlaces(item?.quantity)} {item?.unitType}
          </TextMedium>
        </View>
      </View>
    </View>
  );
};

export const Stocks = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(getCategoryActions.getCategory());
  }, []);
  const stockCategoryData = useSelector(stockCategory);
  const stockLoading = useSelector(
    (state: RootState) => state.getStocks.loading
  );
  const [categoryList, setCategoryList] =
    useState<Array<any>>(stockCategoryData);

  const categories = useSelector(selectCategory);
  const totalStocks = useSelector(totalStock);
  const categoryLoading = useSelector(selectCategoryLoading);

  const [items, setItems] = useState([
    categories?.map(
      ({ name: label, id: value, name: name, id: id, icon: image }) => ({
        label,
        value,
        name,
        id,
        image,
      })
    ),
  ]);
  useEffect(() => {
    setItems(
      categories?.map(
        ({ name: label, id: value, name: name, id: id, icon: image }) => ({
          label,
          value,
          name,
          id,
          image,
        })
      )
    );
  }, [categories]);

  const [open, setOpen] = useState(false);

  const [catid, setCatId] = useState(categories && categories[0]?.id);
  const [isDropFocus, setIsDropFocus] = useState(false);

  const getItem = () => {
    categories &&
      dispatch(
        getCategoryStockActions.getStock(catid ? catid : categories[0]?.id)
      );
  };
  useEffect(() => {
    setCategoryList(stockCategoryData?.filter((item) => item.quantity > 0));
  }, [stockCategoryData]);

  const dispatch = useAppDispatch();

  // const getItems = () => {
  //   dispatch(getCategoryStockActions.getStock('64030413fb330f79375b13f4'));
  // };

  // useEffect(() => {
  //   getItems();
  // }, []);
  useEffect(() => {
    if (isFocused || catid) {
      setCategoryList([]);
      getItem();
    }
  }, [isFocused, catid, categories]);
  console.log(categoryList, "--------hhhhhh--------");
  return (
    <ScrollContainerLayout
      style={styles.mainContainer}
      contentStyle={{ paddingBottom: 25 }}
      topBgColor={colors.secondary}
    >
      <Spacer spacing={10} />
      <View
        style={{
          backgroundColor: colors.secondary,
          borderWidth: 1,
          borderColor: colors.secondary,
          borderStyle: "dotted",
          padding: MEDIUM_PADDING_SIZE,
          flexDirection: "row",
          // alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
        }}
      >
        <TextBold style={{ color: colors.white, fontSize: 20, lineHeight: 26 }}>
          Available stock:{" "}
        </TextBold>
        <TextField
          style={{ color: colors.white, fontSize: 22, lineHeight: 26 }}
        >
          {totalStocks} kgs
        </TextField>
      </View>
      <Spacer spacing={10} />
      {categoryLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingIndicator />
        </View>
      ) : (
        <View>
          <FlatList
            // onRefresh={getItem}
            // refreshing={isLoading}
            data={categories}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    borderWidth: 1,
                    borderColor: colors.borderColor,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    backgroundColor:
                      catid === item?.id ? colors.shaded : colors.white,
                  }}
                  onPress={() => setCatId(item?.id)}
                >
                  <View
                    style={[
                      styles.circleView,
                      {
                        backgroundColor:
                          catid === item?.id ? colors.white : colors.shaded,
                      },
                    ]}
                  >
                    <FastImage
                      source={{ uri: item?.icon }}
                      style={{
                        height: 18,
                        width: 18,
                      }}
                      resizeMode={"contain"}
                    />
                  </View>
                  <TextMedium style={{ fontSize: 14 }}>{item?.name}</TextMedium>
                </Pressable>
              );
            }}
            keyExtractor={(item) => item.itemId}
            contentContainerStyle={{ paddingRight: MEDIUM_PADDING_SIZE }}
            ListEmptyComponent={NoDataView}
            style={{ gap: 5 }}
            ItemSeparatorComponent={() => <Spacer spacing={5} />}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      )}

      {!categoryLoading &&
        (stockLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spacer spacing={30} />

            <LoadingIndicator />
          </View>
        ) : (
          <View>
            <Spacer spacing={10} />

            <FlatList
              // onRefresh={getItem}
              // refreshing={isLoading}
              data={categoryList}
              renderItem={renderSummaryItem}
              keyExtractor={(item) => item.itemId}
              contentContainerStyle={{ paddingBottom: MEDIUM_PADDING_SIZE }}
              ListEmptyComponent={NoDataView}
              // numColumns={2}
            />
          </View>
        ))}
    </ScrollContainerLayout>
  );
};

export const styles = StyleSheet.create({
  drawerLabel: { fontSize: 18, fontWeight: "500", color: "#000" },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
  textValueStyle: {
    fontSize: 16,
    textAlign: "center",
    paddingTop: MEDIUM_PADDING_SIZE,
  },
  headerStyle: {
    textAlign: "center",
  },
  pointsStyle: {
    fontSize: 22,
    lineHeight: 26,
  },
  buttonStyle: {
    width: "90%",
    alignSelf: "center",
  },
  pointsContainer: {
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: BORDER_RADIUS_SIZE,
    paddingHorizontal: XLARGE_PADDING_SIZE,
    paddingVertical: REGULAR_PADDING_SIZE,
    marginHorizontal: MEDIUM_PADDING_SIZE,
  },
  leftContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 0.5,
    // alignItems: 'center',
    justifyContent: "center",
  },
  labelStyle: {
    fontSize: 16,
    color: colors.primary,
  },
  leftHeaderContainer: {
    flex: 0.2,
    alignItems: "center",
    backgroundColor: "colors.backgroundColor",
  },
  centerHeaderContainer: {
    // flex: 0.5
    // alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: "row",
    // alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: colors.backgroundColor,
  },
  dataContainer: {
    flexDirection: "row",
    // alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingVertical: HALF_MEDIUM_PADDING_SIZE,
  },
  flatlistContainerStyle: {},
  flatlistStyle: {
    flexGrow: 0,
  },
  listHeaderComponentStyle: {
    backgroundColor: colors.backgroundColor,
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    borderTopLeftRadius: BORDER_RADIUS_SIZE,
    borderTopRightRadius: BORDER_RADIUS_SIZE,
  },
  itemSeparator: {
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  poweredByLogo: {
    height: 70,
    width: 300,
    top: -20,
  },
  drawerViewStyle: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoutStyle: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    marginLeft: 20,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  mainListContainer: {
    borderRadius: BORDER_RADIUS_SIZE,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: HALF_MEDIUM_PADDING_SIZE,
    marginHorizontal: HALF_MEDIUM_PADDING_SIZE,
    elevation: 4,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  textIconRow: { flexDirection: "row", alignItems: "center" },
  labelTextStyle: {
    color: colors.primary,
    textAlign: "center",
    marginBottom: MEDIUM_PADDING_SIZE,
    fontSize: MEDIUM_PADDING_SIZE,
  },
  qtyRowContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: "center",
  },
  qtyContainer: {
    alignItems: "center",
  },
  qtyText: {
    fontSize: 18,
    lineHeight: 20,
  },
  circleView: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shaded,
  },
  itemcircleView: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shaded,
  },
});
