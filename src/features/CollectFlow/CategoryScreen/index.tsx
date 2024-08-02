import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { Spacer } from "../../../components/common/Spacer";
import { FastImage } from "../../../components/image";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { NoDataView } from "../../../components/NoDataView";
import { TextBold, TextMedium } from "../../../components/TextField/TextField";
import { colors } from "../../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
  screenWidth,
} from "../../../globals/themes";
import { routes } from "../../../navigation/routes";
import { getCategoryActions } from "../../../redux/actions/combineAction";
import { selectCategory, selectUserId } from "../../../redux/selectors";
import { RootState, useAppDispatch } from "../../../redux/store";

interface Props {
  route: any;
  navigation: any;
}

export const CatalogueScreen = ({ route }: Props) => {
  const { uid } = route?.params?.dataFields;
  const dispatch = useAppDispatch();

  const navigation = useNavigation();
  const categories = useSelector(selectCategory);
  const isLoading = useSelector(
    (state: RootState) => state.categoryList.loading
  );

  const customerId = useSelector(selectUserId);

  const scrapCategoryRender = ({ item, index }) => {
    const _handleCategoryRoute = () => {
      navigation.navigate(routes.quality.default, {
        customerId: uid, //uid,
        userId: customerId,
        data: [
          {
            // categoryId: 1 //item?.id
            categoryId: item?.id,
            icon: item?.icon,
            name: item?.name,
          },
        ],
      });
    };
    return (
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={_handleCategoryRoute}
        // disabled={item.title !== 'Plastic'}
      >
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
            source={{ uri: item?.icon }}
            style={styles.Icon}
            resizeMode={"contain"}
          />
        </View>
        <TextMedium style={styles.textTitle}>{item?.name}</TextMedium>
        <Spacer spacing={8} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(getCategoryActions.getCategory());
  }, []);

  return (
    <ScrollView style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
      <View style={styles.mainWrapper}>
        <TextBold style={styles.stepTitle}>
          {"Select the material category"}
        </TextBold>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            data={categories}
            renderItem={scrapCategoryRender}
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={NoDataView}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  mainContainer: {
    alignItems: "center",
    height: 170,
    width: screenWidth / 2.4,
    justifyContent: "center",
    borderRadius: BORDER_RADIUS_SIZE,
    marginVertical: HALF_MEDIUM_PADDING_SIZE,
    marginHorizontal: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.white,
    borderColor: "#EDEDED",
    borderWidth: 1,
  },
  contentContainerStyle: {
    flex: 1,
    marginTop: 16,
    backgroundColor: colors.backgroundColor,
    marginHorizontal: MEDIUM_PADDING_SIZE,
    paddingBottom: 20,
  },
  Icon: {
    height: 40,
    width: 40,
  },
  textTitle: {
    fontSize: 16,
    marginTop: MEDIUM_PADDING_SIZE,
  },
  stepTitle: {
    fontSize: 18,
    marginTop: REGULAR_PADDING_SIZE,
    marginHorizontal: REGULAR_PADDING_SIZE,
  },
});
