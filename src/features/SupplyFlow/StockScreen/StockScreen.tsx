import React, { useEffect, useState } from "react";
import { FlatList, TextInput, View, Text } from "react-native";
import Button from "../../../components/Button/Button";

import { Spacer } from "../../../components/common/Spacer";
import { TextField } from "../../../components/TextField/TextField";
import { styles } from "./styles";
import { colors } from "../../../globals/colors";
import { useSelector } from "react-redux";
import {
  selectCategory,
  stockCategory as stockCategorySelectoer,
} from "../../../redux/selectors";
import { RootState, useAppDispatch } from "../../../redux/store";
import {
  BottomModalActions,
  getCategoryActions,
  getCategoryStockActions,
} from "../../../redux/actions/combineAction";
import { NoDataView } from "../../../components/NoDataView";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import toast from "../../../services/toast";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "../../../globals/themes";
import { FastImage } from "../../../components/image/index";
import { ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { DropDown } from "../../../components/Dropdown/DropDown";
import {
  joinItemDetails,
  truncateToTwoDecimalPlaces,
} from "../../../utils/getSum";
import { routes } from "../../../navigation/routes";

const renderSummaryItem =
  (_onChangeQuantity: any) =>
  ({ item, index }) => {
    return (
      <View
        style={[
          {
            borderRadius: BORDER_RADIUS_SIZE,
            marginVertical: HALF_MEDIUM_PADDING_SIZE,
            marginHorizontal: HALF_MEDIUM_PADDING_SIZE,
            paddingVertical: MEDIUM_PADDING_SIZE,
            borderWidth: 0.2,
            borderColor: colors.darkGray,
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: item?.remainquantity >= 0 ? "#E8ECF2" : "#fff",
          },
        ]}
      >
        <View style={{ flexDirection: "row", gap: 10, width: "45%" }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              backgroundColor: colors.primaryBG,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FastImage
              source={{ uri: item?.itemImage }}
              style={{
                height: 20,
                width: 20,
              }}
              resizeMode={"contain"}
            />
          </View>
          <View style={{}}>
            <View style={{}}>
              <TextField style={[{ fontSize: 14 }]}>
                {joinItemDetails(item.itemName, item.color, item.grade)}
              </TextField>
            </View>
            <View style={{}}>
              <Text style={[{ color: colors.primary }]}>
                {truncateToTwoDecimalPlaces(item?.tqty)} {item?.unitType}
              </Text>
            </View>
          </View>
        </View>
        <Spacer spacing={7} />

        <View style={[styles.qtyRowContainer, { width: "35%" }]}>
          <TextInput
            style={styles.inputBox}
            value={item?.isItemsSelectedToReturn && item?.quantity?.toString()}
            editable={item?.tqty > 0 ? true : false}
            onChangeText={(text) => _onChangeQuantity(text, item.title, index)}
            placeholder={"Enter Quantity"}
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
          />
        </View>
      </View>
    );
  };

export const StockScreen = ({ navigation, route }: any) => {
  // const { t } = useTranslation();

  // const { dispatchData } = route.params;
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(getCategoryActions.getCategory());
  }, []);
  const summaryData = useSelector(stockCategorySelectoer);

  const isLoading = useSelector((state: RootState) => state.getStocks.loading);
  const [categoryList, setCategoryList] = useState<Array<any>>(summaryData);
  const dispatch = useAppDispatch();
  var disabledPress = false;
  let decimalError = false;
  const categories = useSelector(selectCategory);

  // console.log(summaryData);

  const [items, setItems] = useState(
    categories?.map(({ name: label, id: value }) => ({
      label,
      value,
    }))
  );

  const maxTwoDecimalRegExp = /^[0-9]*(\.[0-9]{0,2})?$/;

  useEffect(() => {
    setItems(
      categories?.map(({ name: label, id: value }) => ({
        label,
        value,
      }))
    );
  }, [categories]);

  const [catid, setCatId] = useState(categories && categories[0]?.id);

  const getItem = () => {
    categories &&
      dispatch(
        getCategoryStockActions.getStock(catid ? catid : categories[0]?.id)
      );
  };

  useEffect(() => {
    const filterCategoryList = summaryData?.map((item, index) => {
      return {
        ...item,
        isItemsSelectedToReturn: false,
        sp: item?.totalPrice / item?.quantity,
        tqty: item?.quantity,
      };
    });
    setCategoryList(filterCategoryList);
  }, [summaryData]);

  const _onChangeQuantity = (text: string, type: string, index: number) => {
    if (categoryList?.[index]?.tqty < text || Number(text) < 0) {
      disabledPress = true;
      toast.danger({
        message: `Quantity need to be greater than 0 and less then available qunatity i.e ${categoryList?.[index]?.tqty}`,
      });
      return;
    }

    if (!maxTwoDecimalRegExp.test(text)) {
      decimalError = true;
      toast.danger({
        message: `Quantity should have at most two decimal places`,
      });
      return;
    }

    if (!text || text === "0") {
      disabledPress = true;
    }
    if (disabledPress) {
      disabledPress = false;
    }

    let tempItem = [...categoryList];
    tempItem[index].remainquantity = (
      categoryList?.[index]?.tqty - text
    ).toFixed(2);
    tempItem[index].quantity = text;
    setCategoryList(tempItem);
  };

  const checkIfItemSelectedZero = () =>
    categoryList?.find(
      (item: { isItemsSelectedToReturn: any; quantity: number }) =>
        item?.quantity > 0 && item?.remainquantity >= 0
    );

  const onConfirm = () => {
    if (disabledPress) {
      return toast.danger({
        message:
          "Quantity need to be greater than 0 and less then available qunatity!",
      });
    }

    if (decimalError) {
      return toast.danger({
        message: "Quantity should have at most two decimal places",
      });
    }

    if (!!!checkIfItemSelectedZero()) {
      return toast.danger({ message: "Please enter quantity greater than 0!" });
    }

    navigation.navigate(routes.dateTimePicker.datePicker, {
      data: [...categoryList].filter(
        (item) => item?.remainquantity >= 0 && item?.quantity > 0
      ),
    });
  };

  useEffect(() => {
    if (isFocused || catid) {
      setCategoryList([]);
      getItem();
    }
  }, [isFocused, catid, categories]);

  return (
    <View style={[styles.mainContainer]}>
      <Spacer spacing={10} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
        }}
      >
        <View>
          <TextField style={{ color: colors.primary, marginBottom: 15 }}>
            {"Select Category"}
          </TextField>
        </View>
        <View style={{ zIndex: 9999, width: "50%" }}>
          <DropDown
            placeholder="Choose From"
            rightIconName="sort-down"
            setSelectedValue={setCatId}
            showVal={categories ? categories[0]?.name : ""}
            combineOnPress={(rest) =>
              dispatch(
                BottomModalActions.toggleBottomModal({
                  title: "Choose Category",
                  showList: true,
                  data: items,
                  ...rest,
                })
              )
            }
          />
        </View>
      </View>

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            ListEmptyComponent={NoDataView}
            data={categoryList}
            renderItem={renderSummaryItem(_onChangeQuantity)}
            // numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
          {categoryList?.length !== 0 && (
            <View style={{ marginBottom: 10, paddingHorizontal: 6 }}>
              <Button title={"Confirm"} onPress={onConfirm} />
              <Spacer spacing={10} />
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};
