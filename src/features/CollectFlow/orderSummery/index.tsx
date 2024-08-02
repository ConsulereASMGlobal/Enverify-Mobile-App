import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Button from "../../../components/Button/Button";
import CongratulationsModal from "../../../components/CongratulationsModal/CongratulationsModal";
import { TextField, TextMedium } from "../../../components/TextField/TextField";
import { colors } from "../../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "../../../globals/themes";
import CongratulationScreen from "../../CongratulationScreen/CongratulationScreen";
import { getCategoryStockActions } from "../../../redux/actions/combineAction";
import { RootState, useAppDispatch } from "../../../redux/store";
import {
  categoriesPrice,
  selectInfo,
  selectPostOrderReturnLoading,
  selectPostOrderSuccessData,
} from "../../../redux/selectors";
import { totalPrice, truncateToTwoDecimalPlaces } from "../../../utils/getSum";
import { NoDataView } from "../../../components/NoDataView";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { ImagePickerView } from "../../../components/ImagePicker/ImagePicker";
import toast from "../../../services/toast";
import { uploadImage } from "../../../services/uploadImage";
import PaymentOption from "../../Payment/PaymentOptions";
import { globalStyle } from "../../../globals/globalStyles";
import { routes } from "../../../navigation/routes";
import { SignatureCanvas } from "../../SignPad/SignatureCanvas";
import { Spacer } from "../../../components/common/Spacer";
import { orderAPI } from "../../../services/api";
import InfoScreen from "../../CongratulationScreen/InfoScreen";
import { ValidationInput } from "../../../components/Input/ValidationInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { receivingDateSchema } from "../../../static/schema/ValidationSchema";
import dayjs from "dayjs";
import Geolocation from "@react-native-community/geolocation";
import {
  playPause,
  releaseAudio,
  initializeAudio,
} from "../../../utils/soundUtils";
import { FileImagePicker } from "../../../components/ImagePicker/FileImagePicker";
import { CaptureImage } from "@src/components/ImagePicker/CaptureImage";
import TooltipComp from "../../../components/TooltipComp/TooltipComp";
import { FastImage } from "../../../components/image/index";

const renderHeader = () => {
  return (
    <View style={styles.row}>
      <View style={styles.leftHeaderContainer}>
        <TextField style={styles.labelStyle}>Type</TextField>
      </View>
      <View style={styles.leftHeaderContainer}>
        <TextField style={styles.labelStyle}>Qty</TextField>
      </View>
    </View>
  );
};

type InputProps = {
  date: string;
};

const renderSummaryItem = ({ item, index }) => {
  return (
    <View style={styles.dataContainer}>
      <View style={styles.leftContainer}>
        <TextField style={{ ...styles.textValueStyle }}>{item?.name}</TextField>
      </View>
      <View style={styles.leftContainer}>
        <TextField style={styles.textValueStyle}>
          {truncateToTwoDecimalPlaces(item.quantity)}
        </TextField>
      </View>
    </View>
  );
};

export const OrderSummery = ({ navigation, route }) => {
  useEffect(() => {
    initializeAudio();
    return () => {
      releaseAudio();
    };
  }, []);

  const { routeFlowFrom, payload } = route?.params || {};
  const [isModalVisible, setisModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [signPadModalVisible, setSignPadModalVisible] = useState(false);
  const isLoading = useSelector((state: RootState) => state.getStocks.loading);

  const isSubmiting = useSelector(selectPostOrderReturnLoading);

  const [image, setImage] = useState<any>(null);

  const [submitted, setSubmitted] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const [note, setNote] = useState<any>("");
  const { customerName, customerMobile, customerOrg } = useSelector(selectInfo);
  const [sign, setSign] = useState();
  const [signUrl, setSignUrl] = useState();
  const [payment, setPayment] = useState("CASH");
  const [infoModal, setInfoModal] = useState(false);
  const [orderID, setOrderID] = useState();
  const getId = useSelector(selectPostOrderSuccessData);
  const formOptions = { resolver: yupResolver(receivingDateSchema) };
  const [pickDate, setPickDate] = useState<any>(new Date());

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      setLocation({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
    });
  }, []);

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);

  const _onPaymentModaClose = async () => {
    console.log(sign, "signURL");

    setSubmiting(true);
    const signURL = await uploadImage(sign);
    if (!signURL) {
      return toast.danger({ message: "Please try again" });
    }
    setSignUrl(signURL);
    const sendData = {
      ...{
        ...payload,
        data: [{ categoryId: items[0]?.categoryId, items }],
      },
      totalAmount: totalAmount,
      note,
      images: [imgUrl],
      orderType: "COLLECT",
      customerId: payload?.customerId,
      sign: signURL,
      paymentMode: payment,
      source: customerOrg,
    };
    console.log(sendData, "sendData");
    orderAPI.postOrders(sendData).then((res) => {
      console.log(res, "response");
      setSubmiting(false);

      if (res?.data) {
        setOrderID(res?.data?.data?.orderId);
        setPaymentModalVisible((prevState) => !prevState);
        setisModalVisible((prevState) => !prevState);
      } else {
        setPaymentModalVisible((prevState) => !prevState);
        setInfoModal((prevState) => !prevState);
      }
    });
  };
  const _onRequestClose = () => {
    setisModalVisible((prevState) => !prevState);
    navigation.navigate(routes.bill.default, {
      signUrl: sign,
      orderID: orderID,
    });
  };
  const _onRequestInfoClose = () => {
    setInfoModal((prevState) => !prevState);
  };
  const _onSignPadModalClose = () => {
    setSignPadModalVisible((prevState) => !prevState);
    // setisModalVisible(prevState => !prevState);
  };
  const _onSignPadModalConfirm = async (val) => {
    console.log(val, "this is val");

    setSubmiting(true);
    const signURL = await uploadImage(val);
    if (!signURL) {
      setSubmiting(false);
      setSignPadModalVisible((prevState) => !prevState);

      return toast.danger({ message: "Please try again" });
    }
    setSignUrl(signURL);
    const sendData = {
      ...{
        ...payload,
        data: [{ categoryId: items[0]?.categoryId, items }],
      },
      totalAmount: totalAmount,
      note,
      images: [imgUrl],
      orderType: "COLLECT",
      customerId: payload?.customerId,
      sign: signURL,
      paymentMode: payment,
      source: customerOrg,
      collectionDate: pickDate.getTime(),
      latitude: location?.latitude,
      longitude: location?.longitude,
    };
    console.log(sendData, "sendData");
    // setSignPadModalVisible(prevState => !prevState);
    // setSubmiting(false);
    // return;

    orderAPI.postOrders(sendData).then((res) => {
      console.log(res, "response");
      setSubmiting(false);

      if (res?.data) {
        setOrderID(res?.data?.data?.orderId);
        setSignPadModalVisible((prevState) => !prevState);
        setisModalVisible((prevState) => !prevState);
        playPause();
      } else {
        setSignPadModalVisible((prevState) => !prevState);

        setInfoModal((prevState) => !prevState);
      }
    });
  };
  const dispatch = useAppDispatch();

  const items = payload?.data?.[0]?.items?.filter(
    (item: any) => item?.quantity > 0
  );
  useEffect(() => {
    dispatch(getCategoryStockActions.getStock());
  }, []);

  const itemPrice = useSelector(categoriesPrice);
  const filterItem: any = useMemo(
    () => payload?.data[0]?.items?.filter((item: any) => !!item?.quantity),
    [payload?.data[0]?.items, itemPrice]
  );

  const totalAmount = totalPrice(filterItem);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    setSubmitted(true);
    if (!image) {
      return toast.danger({ message: "Please add the image" });
    }
    setLoading(true);
    const imageUrl = await uploadImage(image);
    if (!imageUrl) {
      return toast.danger({ message: "Something went wrong!" });
    }
    setImgUrl(imageUrl);
    // setSignPadModalVisible(true);

    const sendData = {
      ...{
        ...payload,
        data: [{ categoryId: items[0]?.categoryId, items }],
      },
      totalAmount: totalAmount,
      note,
      images: [imageUrl],
      orderType: "COLLECT",
      customerId: payload?.customerId,
      sign: "",
      paymentMode: payment,
      source: customerOrg,
      collectionDate: pickDate.getTime(),
      latitude: location?.latitude,
      longitude: location?.longitude,
    };
    console.log(sendData, "sendData");
    // setSignPadModalVisible(prevState => !prevState);
    // setSubmiting(false);
    // return;

    orderAPI.postOrders(sendData).then((res) => {
      setLoading(false);
      if (res?.data) {
        setOrderID(res?.data?.data?.orderId);
        // setSignPadModalVisible(prevState => !prevState);
        setisModalVisible((prevState) => !prevState);
        playPause();
      } else {
        // setSignPadModalVisible(prevState => !prevState);

        setInfoModal((prevState) => !prevState);
      }
    });
  };
  console.log(filterItem[0].categoryName, "item");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
      >
        <Spacer spacing={10} />
        {isLoading || submiting || isSubmiting ? (
          <LoadingIndicator />
        ) : (
          <View
            style={{
              borderWidth: 0.2,
              backgroundColor: colors.white,
              borderColor: colors.darkGray,
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 20,
              margin: 1,
            }}
          >
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
                  {filterItem[0].categoryName}
                </TextField>
              </View>
            </View>
            <Spacer spacing={5} />
            <FlatList
              data={filterItem}
              renderItem={renderSummaryItem}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={renderHeader}
              style={styles.flatlistStyle}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator} />
              )}
              ListHeaderComponentStyle={styles.listHeaderComponentStyle}
              contentContainerStyle={styles.flatlistContainerStyle}
              ListEmptyComponent={NoDataView}
            />
            <TextField
              style={{
                fontSize: 14,
                marginHorizontal: MEDIUM_PADDING_SIZE,
                fontStyle: "italic",
                color: colors.secondary,
              }}
            >
              Note : Quantity in Kgs
            </TextField>
            <Spacer spacing={10} />
            <View style={styles.pointsContainer}>
              <TextField style={[styles.textValueStyle]}>
                Total Quantity :
                <TextMedium style={styles.pointsStyle}>
                  {" "}
                  {totalAmount}
                </TextMedium>
              </TextField>
            </View>
          </View>
        )}
        <Spacer spacing={10} />

        {!!routeFlowFrom && routeFlowFrom === "COLLECT_SCREEN" && (
          <>
            <View
              style={{
                borderWidth: 0.2,
                backgroundColor: colors.white,
                borderColor: colors.darkGray,
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 20,
                margin: 2,
              }}
            >
              <View
                style={{
                  width: "50%",
                  alignSelf: "center",
                }}
              >
                {/* <CaptureImage
                  setImage={setImage}
                  title={"Proof of Collection"}
                /> */}
                <FileImagePicker setImage={setImage} title={"Upload Image"} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 15,
                  gap: 5,
                }}
              >
                <TextField style={{ textAlign: "center", fontSize: 14 }}>
                  Proof of Collection
                </TextField>
                <TooltipComp
                  tooltipPosition="top"
                  children={
                    <FastImage
                      source={require("../../../assets/tooltip/weighmentscale.jpeg")}
                      style={{ width: 225, height: 220 }}
                      resizeMode="contain"
                    />
                  }
                />
              </View>

              <Spacer spacing={10} />

              <View style={{ marginHorizontal: MEDIUM_PADDING_SIZE }}>
                <TextField>Actual Collection Date:</TextField>
                <Spacer spacing={5} />

                <ValidationInput
                  placeholder="Select Date"
                  fieldName="date"
                  autoCapitalize={"none"}
                  mode="datePicker"
                  maxToday
                  iconName={""}
                  leftIconName={"calendar-month-outline"}
                  leftIconFamily="MaterialCommunityIcons"
                  leftIconColor={colors.gray}
                  defaultValue={dayjs(new Date()).format("DD/MM/YYYY")}
                  setPickDate={setPickDate}
                  {...formProps}
                />
              </View>
            </View>
            <Button
              style={styles.buttonStyle}
              title={isLoading || submiting ? "Loading..." : "Confirm"}
              onPress={handleSubmit(onConfirm)}
              disabled={isLoading || submiting}
            >
              {loading && <LoadingIndicator activityColor="white" />}
            </Button>
          </>
        )}

        <CongratulationsModal
          modalVisible={isModalVisible}
          onRequestClose={_onRequestClose}
        >
          <CongratulationScreen
            onRequestClose={_onRequestClose}
            heading="Material collection completed"
            message={""}
            bottomContent={
              <View style={{ ...globalStyle.container }}>
                <Button
                  style={{
                    backgroundColor: colors.white,
                    borderColor: colors.primary,
                    borderWidth: 1,
                  }}
                  textStyle={{ color: colors.primary }}
                  title={"View Receipt"}
                  onPress={_onRequestClose}
                />
                <Button
                  title={"Make another transaction"}
                  textStyle={{ marginRight: -8 }}
                  onPress={() => navigation.navigate("CollectScreen")}
                />
              </View>
            }
          />
        </CongratulationsModal>

        <CongratulationsModal
          modalVisible={paymentModalVisible}
          onRequestClose={_onPaymentModaClose}
        >
          <PaymentOption
            onRequestClose={_onPaymentModaClose}
            setPayment={setPayment}
            bottomContent={
              <View style={{ alignItems: "center" }}>
                <Button
                  style={{ width: "100%" }}
                  textStyle={{
                    textAlign: "center",
                    width: "100%",
                    marginLeft: 25,
                  }}
                  onPress={_onPaymentModaClose}
                  title={
                    isLoading || submiting
                      ? "Loading..."
                      : payment === "DONATION"
                      ? "Accept Donation"
                      : "Make Payment"
                  }
                  disabled={isLoading || submiting}
                />
              </View>
            }
          />
        </CongratulationsModal>
        <CongratulationsModal
          modalVisible={signPadModalVisible}
          onRequestClose={() => setSignPadModalVisible(false)}
        >
          <SignatureCanvas
            onRequestConfirm={(val) => _onSignPadModalConfirm(val)}
            onRequestClose={_onSignPadModalClose}
            submiting={submiting}
            setSign={setSign}
          />
        </CongratulationsModal>

        <CongratulationsModal
          modalVisible={infoModal}
          onRequestClose={_onRequestInfoClose}
        >
          <InfoScreen
            onRequestClose={_onRequestInfoClose}
            heading=""
            message={"Please try to resend the collection data."}
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
                  title={"Done"}
                  onPress={_onRequestInfoClose}
                />
              </View>
            }
          />
        </CongratulationsModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  drawerLabel: { fontSize: 18, fontWeight: "400", color: "#000" },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  textValueStyle: {},
  headerStyle: {
    textAlign: "center",
  },
  pointsStyle: {
    fontSize: 20,
    lineHeight: 26,
  },
  buttonStyle: {
    width: "95%",
    alignSelf: "center",
    marginBottom: 10,
  },
  pointsContainer: {
    borderRadius: BORDER_RADIUS_SIZE,
    paddingHorizontal: REGULAR_PADDING_SIZE,
    paddingVertical: 20,
    marginHorizontal: MEDIUM_PADDING_SIZE + 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shaded,
    borderColor: colors.secondary,
    borderWidth: 0.3,
  },
  leftContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 0.3,
  },
  labelStyle: {
    fontSize: 16,
    color: colors.white,
  },
  leftHeaderContainer: {
    alignItems: "center",
  },
  centerHeaderContainer: {
    flex: 0.3,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: HALF_MEDIUM_PADDING_SIZE,
    paddingHorizontal: 20,
  },
  flatlistContainerStyle: {
    borderRadius: BORDER_RADIUS_SIZE,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    overflow: "hidden",
    backgroundColor: colors.white,
    marginBottom: 10,
    marginHorizontal: 1,
  },
  flatlistStyle: {
    flexGrow: 0,
  },
  listHeaderComponentStyle: {
    backgroundColor: colors.secondary2,
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
    borderTopLeftRadius: BORDER_RADIUS_SIZE,
    borderTopRightRadius: BORDER_RADIUS_SIZE,
  },
  itemSeparator: {
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  poweredByLogo: {
    height: 40,
    width: 80,
    top: -14,
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

  note: {
    paddingTop: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    marginHorizontal: 10,
    fontSize: 16,
    color: colors.dark,
  },
});
