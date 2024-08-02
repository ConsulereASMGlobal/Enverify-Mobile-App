import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  SafeAreaView,
} from "react-native";
import { styles as GlobalStyles } from "../../SupplyFlow/StockScreen/styles";
import {
  TextBold,
  TextField,
  TextMedium,
} from "../../../components/TextField/TextField";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Spacer } from "../../../components/common/Spacer";
import { FastImage } from "../../../components/image";
import { colors } from "../../../globals/colors";
import { globalStyle, screenWidth } from "../../../globals/globalStyles";
import RoundCheckIcon from "../../../assets/svgIcon/icon_tick_round.svg";

import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "../../../globals/themes";
import { yupResolver } from "@hookform/resolvers/yup";
import { quantityPickchema } from "../../../static/schema/ValidationSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import toast from "../../../services/toast/index";
import RadioButtonOtpions from "../Components/RadioOptions";
import TooltipComp from "@src/components/TooltipComp/TooltipComp";
import { ValidationInput } from "@src/components/Input/ValidationInput";
import dayjs from "dayjs";
import { FileImagePicker } from "@src/components/ImagePicker/FileImagePicker";
import { uploadImage } from "@src/services/uploadImage";
import { orderAPI } from "@src/services/api";
import {
  initializeAudio,
  playPause,
  releaseAudio,
} from "@src/utils/soundUtils";
import { selectInfo } from "@src/redux/selectors";
import Geolocation from "@react-native-community/geolocation";
import { routes } from "@src/navigation/routes";
import CongratulationsModal from "@src/components/CongratulationsModal/CongratulationsModal";
import FactScreen from "@src/features/CongratulationScreen/FactScreen";
import { totalPrice, truncateToTwoDecimalPlaces } from "@src/utils/getSum";
import CongratulationScreen from "@src/features/CongratulationScreen/CongratulationScreen";

type QuantitySubmitProps = {
  name?: string;
};

type InputProps = {
  quantity: string;
};

export const CaptureCollectImage = ({ route }: any) => {
  //   console.log(route?.params, "PPPPPPPPPP");
  const { finalData } = route?.params;
  const dispatch = useDispatch();
  useEffect(() => {
    initializeAudio();
    return () => {
      releaseAudio();
    };
  }, []);

  const wasteSources = [
    { id: 1, label: "Post Consumer", value: "Post Consumer" },
    { id: 2, label: "Post Commercial", value: "Post Commercial" },
    {
      id: 3,
      label: "Post Industrial",
      value: "Post Industrial",
    },
  ];
  const [comment, setComment] = useState(wasteSources[0]?.value);
  const [quantity, setQuantity] = useState();

  //   const route = useRoute();
  const { item, payload, categoryList, index }: any = route?.params;
  const [image, setImage] = useState<any>(null);
  const [image1, setImage1] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const [pickDate, setPickDate] = useState<any>(new Date());
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const { customerOrg } = useSelector(selectInfo);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [orderID, setOrderID] = useState();

  const formOptions = { resolver: yupResolver(quantityPickchema) };

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);

  const maxTwoDecimalRegExp = /^[0-9]*(\.[0-9]{0,2})?$/;
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
  const totalAmount = totalPrice(finalData?.data[0]?.items);

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    // if (!quantity) {
    //   toast.danger({ message: "Quantity is required" });
    //   return;
    // }

    // if (!maxTwoDecimalRegExp.test(quantity)) {
    //   toast.danger({
    //     message: "Quantity should have at most two decimal places",
    //   });
    //   return;
    // }
    setLoading(true);

    const imageUrl = await uploadImage(image);
    let image1Url, image2Url;
    if (image1) {
      image1Url = await uploadImage(image1);
    }
    if (image2) {
      image2Url = await uploadImage(image2);
    }

    if (!imageUrl) {
      setLoading(false);
      return toast.danger({ message: "Add image, upload failed!" });
    }
    const imageArr = [imageUrl];

    if (image1Url) {
      imageArr.push(image1Url);
    }

    if (image2Url) {
      imageArr.push(image2Url);
    }
    const sendData = {
      ...{
        ...finalData,
        totalAmount: totalAmount,
        images: imageArr,
        collectionDate: pickDate.getTime(),
        latitude: location?.latitude,
        longitude: location?.longitude,
      },
    };
    // console.log(sendData, "finalllllllll::::::::");
    // return;
    setLoading(true);

    orderAPI.postOrders(sendData).then((res) => {
      if (res?.data) {
        playPause();
        // navigation.navigate(routes.bill.default, {
        //   orderID: res?.data?.data?.orderId,
        // });
        setisModalVisible((prevState) => !prevState);
        setOrderID(res?.data?.data?.orderId);
        setLoading(false);
      } else {
        setLoading(false);
        return toast.danger({ message: "Something went wrong!" });
      }
    });
  };

  const [isFocused, setIsFocus] = useState(false);
  console.log(finalData?.data[0]?.items, ":LLLLLL");
  const _onRequestClose = () => {
    setisModalVisible((prevState) => !prevState);
    navigation.navigate(routes.bill.default, {
      orderID: orderID,
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView
        style={GlobalStyles.mainContainer}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 12 }}>
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
                {finalData?.data[0]?.items[0]?.categoryName}
              </TextField>
            </View>
          </View>
          <View
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
                {finalData?.data[0]?.items[0]?.remark}
              </TextField>
            </View>
          </View>
          <Spacer spacing={7} />
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width: "100%" }}
          >
            <View style={{ width: "100%" }}>
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
                  <TextField style={styles.headingText}>
                    Quantity ({finalData?.data[0]?.items[0]?.unit})
                  </TextField>
                </View>
              </View>
              {finalData?.data[0]?.items?.map((item, index) => (
                <>
                  <View style={styles.contentContainer} key={index}>
                    <View
                      style={[
                        styles.containerBox,
                        { flex: 1.5, alignItems: "flex-start" },
                      ]}
                    >
                      <TextField style={[styles.contentText, {}]}>
                        {item?.itemName ?? "n/a"}
                      </TextField>
                    </View>
                    <View style={[styles.containerBox, { flex: 1 }]}>
                      <TextField style={styles.contentText}>
                        {item?.quantity
                          ? truncateToTwoDecimalPlaces(item?.quantity)
                          : "n/a"}
                      </TextField>
                    </View>
                  </View>
                  <View style={{ borderWidth: 1, borderColor: "#E0E0E0" }} />
                </>
              ))}
              <Spacer spacing={5} />
            </View>
          </ScrollView>
        </View>

        <View style={{ width: "100%", padding: 12 }}>
          <View style={{}}>
            <TextBold style={{ color: colors.primary, fontSize: 18 }}>
              Chain of Custody
            </TextBold>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#E0E0E0",
                marginVertical: 3,
              }}
            />
            <Spacer spacing={5} />
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 15,
            }}
          >
            <View style={{ width: image ? "46%" : "100%" }}>
              <FileImagePicker
                setImage={setImage}
                title={image ? "" : "Upload Image"}
              />
            </View>

            <View style={{ width: image1 ? "46%" : "100%" }}>
              {image && (
                <FileImagePicker
                  setImage={setImage1}
                  title={image1 ? "" : "Add More Image"}
                />
              )}
            </View>
            <View style={{ width: image2 ? "46%" : "100%" }}>
              {image1 && (
                <FileImagePicker
                  setImage={setImage2}
                  title={image2 ? "" : "Add More Image"}
                />
              )}
            </View>
          </View>

          <Spacer spacing={5} />

          <TextField style={{ textAlign: "center", fontSize: 14 }}>
            Proof of Collection{" "}
            <TooltipComp
              children={
                <FastImage
                  source={require("../../../assets/tooltip/weighmentscale.jpeg")}
                  style={{ width: 225, height: 220 }}
                  resizeMode="cover"
                />
              }
              tooltipPosition={"top"}
            />
          </TextField>
          <Spacer spacing={2} />
          <TextField style={{ marginTop: 15, fontSize: 12 }}>
            Note: Please ensure photos capture the weight details of the
            materials
          </TextField>
          <Spacer spacing={10} />

          <View>
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
          <View style={GlobalStyles.flexRow}>
            <Button
              disabled={loading}
              title={loading ? "Loading..." : "Confirm"}
              onPress={handleSubmit(onSubmit)}
            />

            <CongratulationsModal
              modalVisible={loading}
              onRequestClose={() => {}}
            >
              <FactScreen />
            </CongratulationsModal>
          </View>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  imagecontainer: {
    padding: 10,
    alignItems: "center",
    // height: 120,
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

  line: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: MEDIUM_PADDING_SIZE,
    marginHorizontal: MEDIUM_PADDING_SIZE,
  },
  tick: {
    position: "absolute",
    top: -7,
    right: -7,
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
  containerBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
  },
  noteTxt: {
    fontSize: 14,
    marginHorizontal: MEDIUM_PADDING_SIZE,
    fontStyle: "italic",
    color: colors.secondary,
  },
});
