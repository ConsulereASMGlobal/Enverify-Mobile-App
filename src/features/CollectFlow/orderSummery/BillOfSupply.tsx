import React, { useRef, useState, useEffect } from "react";
import {
  BackHandler,
  FlatList,
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
import { epochToHumanReadable } from "../../../utils/dateUtils";
import { pdfGenerator } from "./pdfGenerator";
import { captureRef } from "react-native-view-shot";
import QRCode from "react-native-qrcode-svg";
import { totalPrice, truncateToTwoDecimalPlaces } from "../../../utils/getSum";
import { orderAPI } from "../../../services/api";
import { FastImage } from "../../../components/image/index";
import { routes } from "../../../navigation/routes";
import {
  TextBold,
  TextField,
  TextMedium,
} from "@src/components/TextField/TextField";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";

export const BillOfSupplyScreen = ({ route }) => {
  const { signUrl, orderID } = route.params;
  console.log(signUrl);
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
  console.log(orderID, "order with id");
  useEffect(() => {
    orderAPI.getOrdersWithId({ id: orderID }).then((res) => {
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
        recieptData?.[0]?.customerInfo?.mobile,
        signUrl
      );
    } catch (e) {
      console.log(e);
    }
  };
  const qrData = {
    orderId: recieptData?.[0]?.id,
    customerName: getInfo?.customerName,
  };

  const totalAmount = totalPrice(recieptData?.[0]?.orderDetails[0]?.items);
  // console.log(recieptData?.[0]?.orderDetails, 'dsfa');
  console.log(getInfo, "total");
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
              Depositor Information
            </TextField>
            <View
              style={{
                backgroundColor: colors.darkGray,
                height: 0.4,
                marginVertical: 10,
              }}
            />
            <Spacer spacing={5} />
            <TextField style={styles.grayText}>
              Collection Date :{" "}
              {epochToHumanReadable(recieptData?.[0]?.collectionDate)}
            </TextField>
            <TextField style={styles.grayText}>
              Batch ID. : {recieptData?.[0]?.id}
            </TextField>

            <TextField style={styles.grayText}>
              Name :{" "}
              {recieptData?.[0]?.customerInfo?.name ??
                getInfo?.customerName ??
                "n/a"}
            </TextField>
            <TextField style={styles.grayText}>
              Mobile :{" "}
              {recieptData?.[0]?.customerInfo?.mobile ??
                getInfo?.customerMobile ??
                "n/a"}
            </TextField>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <TextField style={styles.grayText}>
                Depositor Type : {recieptData?.[0]?.source ?? "n/a"}
              </TextField>
              {recieptData?.[0]?.source === "Corporate" && (
                <View style={{ marginTop: -5 }}>
                  <DynamicIcon
                    iconName="verified-user"
                    iconFamily="MaterialIcons"
                    iconColor={colors.green}
                    iconSize={16}
                  />
                </View>
              )}
            </View>
            <TextField style={styles.grayText}>
              Waste Source :{" "}
              {recieptData?.[0]?.orderDetails[0]?.items[0]?.remark}
            </TextField>
          </View>
          <Spacer spacing={10} />

          <>
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
                  {recieptData?.[0]?.orderDetails[0]?.categoryName}
                </TextField>
              </View>
            </View>
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextField>Waste Source</TextField>
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingTop: 10,
                  borderRadius: 20,
                }}
              >
                <TextField style={{ fontSize: 16, color: colors.dark }}>
                  {recieptData?.[0]?.orderDetails[0]?.items[0]?.remark}
                </TextField>
              </View>
            </View> */}
            <Spacer spacing={5} />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ width: "100%" }}
            >
              {recieptData?.[0]?.orderDetails?.map((item, index) => (
                <View key={index} style={{ width: "100%" }}>
                  <View style={[styles.headingContainer]}>
                    <View
                      style={[
                        styles.containerBox,
                        { flex: 1.5, alignItems: "flex-start" },
                      ]}
                    >
                      <TextField style={styles.headingText}>Type</TextField>
                    </View>
                    <View style={[styles.containerBox, { flex: 1 }]}>
                      <TextField style={styles.headingText}>Quantity</TextField>
                    </View>

                    {/* <View style={[styles.containerBox, { flex: 2.5 }]}>
                      <TextField style={styles.headingText}>Source</TextField>
                    </View> */}
                  </View>
                  {item?.items?.map((ite, inde) => (
                    <View style={styles.contentContainer} key={inde}>
                      <View
                        style={[
                          styles.containerBox,
                          { flex: 1.5, alignItems: "flex-start" },
                        ]}
                      >
                        <TextField
                          style={[styles.contentText, { textAlign: "center" }]}
                        >
                          {ite.itemName ?? "n/a"}
                        </TextField>
                      </View>
                      <View style={[styles.containerBox, { flex: 1 }]}>
                        <TextField style={styles.contentText}>
                          {ite?.quantity
                            ? truncateToTwoDecimalPlaces(ite?.quantity)
                            : "n/a"}
                        </TextField>
                      </View>
                      {/*                      
                      <View style={[styles.containerBox, { flex: 2.5 }]}>
                        <TextField
                          style={[styles.contentText, { textAlign: "center" }]}
                        >
                          {ite?.remark ?? "n/a"}
                        </TextField>
                      </View> */}
                    </View>
                  ))}

                  <Spacer spacing={10} />
                </View>
              ))}
            </ScrollView>
          </>

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

          <Spacer spacing={8} />
          <>
            <TextBold style={styles.customerTitleText}>
              Facility Information
            </TextBold>
            <View
              style={{
                backgroundColor: colors.darkGray,
                height: 0.4,
                marginVertical: 10,
              }}
            />
            <View style={{}}>
              <TextField style={styles.grayText}>
                Name : {recieptData?.[0]?.centerName}
              </TextField>
              {/* <TextField style={styles.grayText}>
              Id : {recieptData?.[0]?.center ?? 'n/a'}
            </TextField> */}
              <TextField style={styles.grayText}>
                Address :{" "}
                {recieptData?.[0]?.centreInfo?.address?.street +
                  ", " +
                  recieptData?.[0]?.centreInfo?.address?.country}
              </TextField>
              {/* <TextField style={styles.grayText}>
              Payment Mode : {recieptData?.[0]?.paymentMode ?? 'n/a'}
            </TextField> */}
            </View>
          </>
          <Spacer spacing={8} />

          <>
            <TextBold style={styles.customerTitleText}>
              Chain of Custody
            </TextBold>
            <View
              style={{
                backgroundColor: colors.darkGray,
                height: 0.4,
                marginVertical: 10,
              }}
            />
            <View style={{}}>
              <TextField style={styles.grayText}>
                Methodology : Batch Traceability
              </TextField>

              <TextField style={styles.grayText}>
                {`Standard : ISO 22095 [Mass Balance]`}
              </TextField>
            </View>
          </>

          {recieptData?.[0]?.sign && (
            <>
              <Spacer spacing={8} />
              <TextField
                style={[
                  styles.customerTitleText,
                  { marginHorizontal: MEDIUM_PADDING_SIZE },
                ]}
              >
                Receiver Signature
              </TextField>
              <Spacer spacing={5} />
              <View style={styles.signBg}>
                <FastImage
                  source={{ uri: recieptData?.[0]?.sign }}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
              </View>
            </>
          )}
          <Spacer spacing={10} />
          <View style={{ alignItems: "center" }}>
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
          <Spacer spacing={10} />
        </View>
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
    paddingHorizontal: MEDIUM_PADDING_SIZE,
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
    paddingHorizontal: MEDIUM_PADDING_SIZE,
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
