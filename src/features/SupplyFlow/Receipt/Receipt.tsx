import React, { useRef, useState, useEffect } from "react";
import {
  BackHandler,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Spacer } from "../../../components/common/Spacer";
import { colors } from "../../../globals/colors";

import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "../../../globals/themes";
import { useSelector } from "react-redux";
import {
  selectInfo,
  selectPostOrderSuccessData,
} from "../../../redux/selectors";
import { pdfGenerator } from "./pdfGenerator";
import { captureRef } from "react-native-view-shot";
import QRCode from "react-native-qrcode-svg";
import { orderAPI } from "../../../services/api";
import { routes } from "../../../navigation/routes";
import {
  TextBold,
  TextField,
  TextMedium,
} from "@src/components/TextField/TextField";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import store from "@src/redux/store";
import { totalPrice, truncateToTwoDecimalPlaces } from "@src/utils/getSum";

export const Receipt = ({ route }) => {
  const { postData, orderId } = route.params;
  const state = store.getState();

  const qrData = { orderId };

  const pickupPointName =
    state.franchisee.pickupPointDetails?.personalDetails?.name;
  const pickupPointAddress = state.franchisee.pickupPointDetails?.address;
  const navigation = useNavigation<any>();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(routes.bottomTabs.home);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
  const getId = useSelector(selectPostOrderSuccessData);
  const getInfo = useSelector(selectInfo);

  const [recieptData, setRecieptData] = useState();

  useEffect(() => {
    orderAPI.getReturnWithId({ id: orderId }).then((res) => {
      console.log(res?.data?.data, "error order with id");
      setRecieptData(res?.data?.data);
    });
  }, []);

  const qrRef = useRef<any>(null);
  const save = async () => {
    try {
      const localUri = await captureRef(qrRef, {
        height: 100,
        quality: 1,
      });
      console.log(localUri, "qr uri");
      pdfGenerator(
        navigation,
        localUri,
        recieptData?.[0],
        recieptData?.[0]?.customerInfo?.name,
        recieptData?.[0]?.customerInfo?.mobile
      );
    } catch (e) {
      console.log(e);
    }
  };

  const totalAmount = totalPrice(postData?.data[0].items);

  return (
    <View
      style={[
        { backgroundColor: colors.backgroundColor, paddingHorizontal: 16 },
      ]}
    >
      <Spacer spacing={5} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => save()}>
            <DynamicIcon
              iconFamily="MaterialCommunityIcons"
              iconName={
                Platform.OS === "ios" ? "share-variant-outline" : "download"
              }
              iconSize={25}
              iconColor={colors.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("LandingStack")}>
            <DynamicIcon
              iconFamily="MaterialCommunityIcons"
              iconName="home-outline"
              iconSize={30}
              iconColor={colors.secondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.sellerContainer}>
            <TextField style={styles.customerTitleText}>
              From Facility
            </TextField>
            <View
              style={{
                borderWidth: 0.5,
                borderBottomColor: colors.borderColor,
                marginVertical: 10,
              }}
            />
            <Spacer spacing={5} />

            <TextField style={styles.grayText}>
              Name : {pickupPointName}
            </TextField>
            <TextField style={styles.grayText}>
              Address : {pickupPointAddress?.street},{" "}
              {pickupPointAddress?.country}
            </TextField>
          </View>
          <Spacer spacing={15} />

          <TextField style={styles.customerTitleText}>Material Info</TextField>
          <View
            style={{
              borderWidth: 0.5,
              borderBottomColor: colors.borderColor,
              marginVertical: 10,
            }}
          />

          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextField>Category</TextField>
              <View
                style={{
                  backgroundColor: colors.primaryLight2,
                  paddingHorizontal: 12,
                  paddingVertical: 2,
                  borderRadius: 20,
                }}
              >
                <TextField style={{ fontSize: 14, color: colors.dark }}>
                  {postData?.data[0]?.categoryName}
                </TextField>
              </View>
            </View>
            <Spacer spacing={5} />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ width: "150%" }}
            >
              <View style={{ width: "67%" }}>
                <View style={[styles.headingContainer]}>
                  <View style={[styles.containerBox, { flex: 2 }]}>
                    <TextField style={styles.headingText}>Type</TextField>
                  </View>
                  <View style={[styles.containerBox, { flex: 1.5 }]}>
                    <TextField style={styles.headingText}>Quantity</TextField>
                  </View>
                  <View style={[styles.containerBox, { flex: 2.5 }]}>
                    <TextField style={styles.headingText}>Source</TextField>
                  </View>
                </View>
                {postData?.data[0].items?.map((ite, inde) => (
                  <View style={styles.contentContainer} key={inde}>
                    <View style={[styles.containerBox, { flex: 2 }]}>
                      <TextField
                        style={[styles.contentText, { textAlign: "center" }]}
                      >
                        {ite.itemName ?? "n/a"}
                      </TextField>
                    </View>
                    <View style={[styles.containerBox, { flex: 1.5 }]}>
                      <TextField style={styles.contentText}>
                        {ite?.quantity
                          ? truncateToTwoDecimalPlaces(ite?.quantity)
                          : "n/a"}
                      </TextField>
                    </View>
                    <View style={[styles.containerBox, { flex: 2.5 }]}>
                      <TextField
                        style={[styles.contentText, { textAlign: "center" }]}
                      >
                        Post Consumer
                      </TextField>
                    </View>
                  </View>
                ))}

                <Spacer spacing={10} />
              </View>
            </ScrollView>
          </View>

          <View style={styles.pointsContainer}>
            <TextField>
              Batch Weight :
              <TextMedium style={styles.pointsStyle}>
                {" "}
                {truncateToTwoDecimalPlaces(totalAmount)} Kgs
              </TextMedium>
            </TextField>
          </View>
          <Spacer spacing={3} />

          <TextField style={styles.noteTxt}>Note : Quantity in Kgs</TextField>

          <Spacer spacing={20} />

          <View style={styles.sellerContainer}>
            <TextField style={styles.customerTitleText}>To Facility</TextField>
            <View
              style={{
                borderWidth: 0.5,
                borderBottomColor: colors.borderColor,
                marginVertical: 10,
              }}
            />
            <Spacer spacing={5} />

            <TextField style={styles.grayText}>
              Name :{" "}
              {postData?.recyclerInfo?.label ||
                postData?.customerNew?.customerName}
            </TextField>
            <TextField style={styles.grayText}>
              Address :{" "}
              {postData?.recyclerInfo &&
                postData.recyclerInfo?.address?.street +
                  ", " +
                  postData.recyclerInfo?.address?.country}
            </TextField>
          </View>

          <Spacer spacing={15} />

          <>
            <TextBold style={styles.customerTitleText}>
              Chain of Custody
            </TextBold>
            <View
              style={{
                borderWidth: 0.5,
                borderBottomColor: colors.borderColor,
                marginVertical: 10,
              }}
            />
            <View>
              <TextField style={styles.grayText}>
                Methodology : Batch Traceability
              </TextField>

              <TextField style={styles.grayText}>
                {`Standard : ISO 22095 [Mass Balance]`}
              </TextField>
            </View>
          </>

          <Spacer spacing={20} />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View ref={qrRef} collapsable={false}>
              <QRCode
                value={JSON.stringify(qrData)}
                size={200}
                color={colors.secondary}
                logo={require("../../../assets/logo/appicon.png")}
                logoBackgroundColor={colors.white}
              />
            </View>
          </View>
          <TextField
            style={{
              color: colors.dark,
              textAlign: "center",
              marginVertical: 20,
            }}
          >
            {"Share this QR for delivery confirmation"}
          </TextField>
        </View>
        <Spacer spacing={20} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  iconRow: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
  },
  grayText: {
    fontSize: 16,
    // color: colors.gray,
    marginBottom: 5,
  },
  sellerContainer: {},
  buyerContainer: {},
  containerBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  shadowView: {
    paddingHorizontal: 12,
    flex: 1,
  },
  headingText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
  },
  headingContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: colors.secondary2,
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
    borderTopLeftRadius: BORDER_RADIUS_SIZE,
    borderTopRightRadius: BORDER_RADIUS_SIZE,
  },
  contentText: {
    fontSize: 16,
    fontWeight: "500",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },
  customerTitleText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.white,
    borderWidth: 0.2,
    borderColor: colors.darkGray,
    borderRadius: 16,
  },
  downloadBtn: {
    width: "90%",
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: 20,
  },
  pointsContainer: {
    borderRadius: BORDER_RADIUS_SIZE,
    paddingHorizontal: REGULAR_PADDING_SIZE,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shaded,
    borderColor: colors.secondary,
    borderWidth: 0.3,
  },
  pointsStyle: {
    fontSize: 20,
    lineHeight: 26,
  },
  signBg: {
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    marginBottom: 1,
    backgroundColor: colors.shaded,
    borderRadius: 16,
  },
  noteTxt: {
    fontSize: 14,
    marginHorizontal: MEDIUM_PADDING_SIZE,
    fontStyle: "italic",
    color: colors.secondary,
  },
});
