import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../globals/colors";
import { Spacer } from "../../../components/common/Spacer";
import Button from "../../../components/Button/Button";
import {
  BORDER_RADIUS_SIZE,
  Fonts,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "../../../globals/themes";
import { styles as GlobalStyles } from "../../SupplyFlow/StockScreen/styles";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectReturnList } from "../../../redux/selectors";
import { RootState } from "../../../redux/store";
import { returnActions } from "../../../redux/actions/combineAction";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { NoDataView } from "../../../components/NoDataView";
import SupplyCard from "../components/SupplyCard";
import { orderAPI } from "@src/services/api";
import {
  initializeAudio,
  playPause,
  releaseAudio,
} from "@src/utils/soundUtils";
import CongratulationsModal from "@src/components/CongratulationsModal/CongratulationsModal";
import CongratulationScreen from "@src/features/CongratulationScreen/CongratulationScreen";
import { globalStyle } from "@src/globals/globalStyles";
import toast from "@src/services/toast";
import { routes } from "@src/navigation/routes";

export const DeliveryConfirmation = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(returnActions.getReturn({ status: "pending" }));
  }, [dispatch, isFocused]);

  useEffect(() => {
    initializeAudio();
    return () => {
      releaseAudio();
    };
  }, []);

  const [isModalVisible, setisModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const returnOrders = useSelector(selectReturnList);
  const isLoading = useSelector((state: RootState) => state.returnList.loading);
  const [refreshing, setRefreshing] = useState(false);

  const _onRefresh = () => {
    setRefreshing(true);
    dispatch(returnActions.getReturn({ status: "pending" }));
    setRefreshing(false);
  };

  const _onRequestClose = () => {
    setisModalVisible((prevState) => !prevState);
    navigation.navigate(routes.bottomTabs.home);
  };

  const handleReject = (orderId) => {
    setSubmitting(true);
    orderAPI
      .changeStatus({
        orderId,
        status: "REJECTED",
      })
      .then((res) => {
        if (res.status === 200) {
          setSubmitting(false);
          setisModalVisible((prevState) => !prevState);
          playPause();
        } else {
          toast.danger({ message: "Something went wrong!" });
          setSubmitting(false);
        }
      });
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <SupplyCard item={item} detail={true} />

      <View style={[GlobalStyles.flexRow, { justifyContent: "space-between" }]}>
        <View style={{ width: "48%" }}>
          <Button
            title="Confirm Delivery"
            style={{ backgroundColor: colors.secondary }}
            onPress={() =>
              navigation.navigate("deliveryQRScan", {
                orderId: item.id,
              })
            }
          />
        </View>
        <View style={{ width: "48%" }}>
          <Button
            title="Reject"
            style={{ backgroundColor: colors.primary }}
            onPress={() => handleReject(item.id)}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <FlatList
            data={returnOrders}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
                tintColor={colors.primary}
              />
            }
            style={{ flex: 1 }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatlistContainerStyle}
            ListEmptyComponent={NoDataView}
            ItemSeparatorComponent={() => <Spacer spacing={5} />}
          />
          <CongratulationsModal
            modalVisible={isModalVisible}
            onRequestClose={_onRequestClose}
          >
            <CongratulationScreen
              onRequestClose={_onRequestClose}
              heading=""
              message={`The material has been rejected.`}
              bottomContent={
                <View style={{ ...globalStyle.container }}>
                  <Button
                    style={{
                      width: "80%",
                      backgroundColor: colors.white,
                      borderColor: colors.primary,
                      borderWidth: 1,
                    }}
                    textStyle={{ color: colors.primary }}
                    title={"Ok"}
                    onPress={_onRequestClose}
                  />
                </View>
              }
            />
          </CongratulationsModal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.backgroundColor,
  },
  flatlistContainerStyle: {
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },
  card: {
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: BORDER_RADIUS_SIZE,
    elevation: 5,
    padding: MEDIUM_PADDING_SIZE,
    marginBottom: 5,
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
});
