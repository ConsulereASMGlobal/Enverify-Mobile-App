import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Spacer } from "../../../components/common/Spacer";
import { FastImage } from "../../../components/image";
import { TextField, TextMedium } from "../../../components/TextField/TextField";
import { CategoryQuantityRender } from "../../../container/flatlistRender/CategoryQuantityRender";

import { colors } from "../../../globals/colors";
import { screenWidth } from "../../../globals/globalStyles";
import { styles as GlobalStyles } from "../../SupplyFlow/StockScreen/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryActions,
  getCategoryPriceActions,
} from "../../../redux/actions/combineAction";
import { categoriesPrice, selectSubCategory } from "../../../redux/selectors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "../../../globals/themes";
import { mergeArrays } from "../../../utils/arraryUtils";

import RoundCheckIcon from "../../../assets/svgIcon/icon_tick_round.svg";
import { NoDataView } from "../../../components/NoDataView";
import toast from "../../../services/toast";
import { ScrollView } from "react-native";
import { routes } from "../../../navigation/routes";

export const QualitySelection = ({ navigation, route }) => {
  const payload = route?.params;
  const dispatch = useDispatch();
  const subCategories = useSelector(selectSubCategory);
  const subCategoryPrice = useSelector(categoriesPrice);
  const [categoryList, setCategoryList] = useState<Array<any>>([]);
  useEffect(() => {
    if (!!!subCategories && !!!subCategoryPrice) {
      return;
    }
    const filterCategoryList = mergeArrays(
      subCategoryPrice,

      subCategories,
      "itemId",
      "id"
    )?.map((item, index) => {
      return {
        quantity: 0,
        isAdded: false,
        ...item,
      };
    });
    setCategoryList(filterCategoryList);
  }, [subCategories, subCategoryPrice]);

  // console.log(subCategoryPrice, "sub");

  useEffect(() => {
    dispatch(getCategoryActions.getSubCategory(payload?.data?.[0]?.categoryId));
    dispatch(
      getCategoryPriceActions.getCategoryPrice(payload?.data?.[0]?.categoryId)
    );
  }, []);

  // const _onChangeNumber = (text: string, type: string, index: number) => {
  //   let tempItem = [...categoryList];
  //   tempItem[index].quantity = text as any;
  //   setCategoryList(tempItem as any);
  // };

  const onQuentityChange = async (item: any, index: number) => {
    // let tempItem = [...categoryList];

    // if (task == 'Increase') {
    //   tempItem[index].quantity = parseInt(item.quantity) + 1;
    //   setCategoryList(tempItem);
    // } else if (task == 'Decrease') {
    //   item?.quantity > 0 && (tempItem[index].quantity = item.quantity - 1);
    //   setCategoryList(tempItem);
    // }
    // return;
    navigation.navigate(routes.quality.selection, {
      item,
      payload,
      categoryList,
      index,
    });
  };

  // const checkIfCategorySelected = () =>
  //   categoryList?.find((item) => item?.quantity > 0);

  // const onSubmit = () => {
  //   if (!!!checkIfCategorySelected()) {
  //     return toast.danger({ message: "Please select the quantity" });
  //   }
  //   navigation.navigate("OrderSummery", {
  //     routeFlowFrom: "COLLECT_SCREEN",
  //     payload: {
  //       ...payload,
  //       data: [
  //         {
  //           categoryId: payload?.data?.[0]?.categoryId,
  //           items: categoryList,
  //         },
  //       ],
  //     },
  //   });
  // };
  return (
    <ScrollView style={GlobalStyles.mainContainer}>
      <View style={styles.imagecontainer}>
        <RoundCheckIcon style={styles.tick} />
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 100,
            backgroundColor: colors.primaryBG,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FastImage
            source={{ uri: payload?.data?.[0]?.icon }}
            style={{ height: 40, width: 40 }}
            resizeMode={"contain"}
          />
        </View>
        <TextMedium style={styles.textTitle}>
          {payload?.data?.[0]?.name}
        </TextMedium>
      </View>
      <TextField style={GlobalStyles.headerTitle}>
        Select the Material Type
      </TextField>
      <Spacer spacing={5} />

      <FlatList
        data={categoryList}
        ListEmptyComponent={NoDataView}
        contentContainerStyle={{
          paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
        }}
        keyExtractor={(item) => item?.id}
        scrollEnabled={false}
        numColumns={1}
        renderItem={({ item, index }) => (
          <CategoryQuantityRender
            key={index}
            item={item}
            onPress={() => onQuentityChange(item, index)}
            // index={index}
            // _onChangeNumber={_onChangeNumber}
          />
        )}
        ListFooterComponent={<Spacer spacing={10} />}
      />

      <Spacer spacing={10} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagecontainer: {
    padding: 10,
    alignItems: "center",
    width: screenWidth / 3,
    justifyContent: "center",
    borderRadius: BORDER_RADIUS_SIZE,
    margin: MEDIUM_PADDING_SIZE,
    marginBottom: 0,
    marginTop: REGULAR_PADDING_SIZE,
    backgroundColor: colors.backgroundColor,
    position: "relative",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textTitle: {
    fontSize: 14,
    marginVertical: HALF_MEDIUM_PADDING_SIZE,
  },

  tick: {
    position: "absolute",
    top: -7,
    right: -7,
  },
});
