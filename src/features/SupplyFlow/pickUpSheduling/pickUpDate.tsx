import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { Spacer } from "../../../components/common/Spacer";
import dayjs from "dayjs";
import { colors } from "../../../globals/colors";
import { TextField } from "../../../components/TextField/TextField";
import {
  BORDER_RADIUS_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
  LARGE_PADDING_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
} from "../../../globals/themes";
import Button from "../../../components/Button/Button";
import { globalStyle } from "../../../globals/globalStyles";
import CongratulationsModal from "../../../components/CongratulationsModal/CongratulationsModal";
import { useAppDispatch } from "../../../redux/store";
import {
  BottomModalActions,
  postOrderReturnActions,
} from "../../../redux/actions/combineAction";
import { useSelector } from "react-redux";
import {
  selectPostOrderReturnLoading,
  selectPostOrderReturnSuccess,
  selectPostOrderReturnSuccessData,
  selectUserId,
} from "../../../redux/selectors";
import { dateTOepoch } from "../../../utils/dateUtils";
import toast from "../../../services/toast";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { DropDown } from "../../../components/Dropdown/DropDown";
import { axiosInstance } from "../../../helpers/axiosHelper";
import CongratulationScreen from "../../CongratulationScreen/CongratulationScreen";
import {
  playPause,
  releaseAudio,
  initializeAudio,
} from "../../../utils/soundUtils";
import { ValidationInput } from "@src/components/Input/ValidationInput";
import { useForm } from "react-hook-form";
import { FileImagePicker } from "@src/components/ImagePicker/FileImagePicker";
import { uploadImage } from "@src/services/uploadImage";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import { FastImage } from "@src/components/image";
import { MultiImagePicker } from "@src/components/ImagePicker/MultiImagePicker";
import FactScreen from "@src/features/CongratulationScreen/FactScreen";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export const PickUpDate = ({ navigation, route }) => {
  useEffect(() => {
    initializeAudio();
    return () => {
      releaseAudio();
    };
  }, []);

  const { data } = route?.params;
  const dispatch = useAppDispatch();
  const [selectedDate, setselectedDate] = useState<Date>(null);
  const [selectedTime, setselectedTime] = useState({
    id: 0,
    isSelected: false,
    from: "",
    to: "",
  });
  const [isModalVisible, setisModalVisible] = useState(false);
  const isLoading = useSelector(selectPostOrderReturnLoading);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const customerId = useSelector(selectUserId);
  const [recyclerList, setRecyclerList] = useState();
  const [recyclerId, setRecyclerId] = useState();
  const { handleSubmit, ...formProps } = useForm();

  const [image, setImage] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);

  const _onConfirmPress = async (formData) => {
    if (!recyclerId) {
      toast.danger({
        message: "Please select the dispatch facility!",
      });
      return;
    }

    if (recyclerId === "Other") {
      if (!formData?.facilityDetails) {
        toast.danger({
          message: "Please enter facility details",
        });
        return;
      }
    }

    if (!image) {
      return toast.danger({ message: "Please add weight slip." });
    }

    if (!image2) {
      return toast.danger({ message: "Please add dispatch document." });
    }

    setLoading(true);

    const imageUrl = await uploadImage(image);
    if (!imageUrl) {
      return toast.danger({ message: "Something went wrong!" });
    }

    const imageUrl2 = await uploadImage(image2);
    if (!imageUrl2) {
      return toast.danger({ message: "Something went wrong!" });
    }

    const otherImagesPromises = otherImages.map(async (image: any) => {
      const imageURL = await uploadImage({ uri: image });
      if (!imageURL) {
        toast.danger({ message: "Image upload failed" });
        throw new Error("Image upload failed");
      }
      return imageURL;
    });

    const otherImagesUrl = await Promise.all(otherImagesPromises);

    const formatedData = [...data]?.map((item) => {
      return {
        itemId: item?.itemId,
        itemName: item?.itemName,
        quantity: item?.quantity,
        price: item?.sp,
        deduction: item?.deduction ?? 0.0,
      };
    });

    const recyclerInfo = recyclerList?.find(
      (item) => item?.value === recyclerId
    );

    const postData = {
      customerId: "",
      orderType: "RETURN",
      data: [
        {
          categoryId: data?.[0]?.categoryId,
          categoryName: data?.[0]?.categoryName,
          items: formatedData,
        },
      ],
      totalAmount: totalAmount,
      totalDeductionAmount: 2,
      note: "",
      userId: customerId,
      pickupDate: dateTOepoch(selectedDate),
      pickupSlot: `${selectedTime.from} to ${selectedTime.to}`,
      centerId: recyclerId,
      facilityDetails: formData?.facilityDetails,
      images: [imageUrl, imageUrl2, ...otherImagesUrl],
      recyclerInfo,
      vehicleNo: formData.vehicleNo,
      toPickupPointId: recyclerInfo?.id,
      toPickupPointName: recyclerInfo?.label,
    };
    setLoading(false);
    navigation.navigate("Summary", { postData });

    // axiosInstance
    //   .post("order", {
    //     customerId: "",
    //     orderType: "RETURN",
    //     data: [
    //       {
    //         categoryId: data?.[0]?.categoryId,
    //         items: formatedData,
    //       },
    //     ],
    //     totalAmount: totalAmount,
    //     totalDeductionAmount: 2,
    //     note: "",
    //     userId: customerId,
    //     pickupDate: dateTOepoch(selectedDate),
    //     pickupSlot: `${selectedTime.from} to ${selectedTime.to}`,
    //     centerId: recyclerId,
    //     facilityDetails: formData?.facilityDetails,
    //     images: [imageUrl, imageUrl2],
    //   })
    //   .then((res) => {
    //     if (res === 200) {
    //       setisModalVisible(true);
    //       playPause();
    //     } else {
    //       setisModalVisible(true);
    //       playPause();

    //       // toast.danger({ message: "Something went wrong" });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err, "ERRRRRRRRR");
    //   });
  };

  const _onRequestClose = () => {
    setisModalVisible(false);
    dispatch(
      postOrderReturnActions.update({ success: false, successData: {} })
    );
    navigation.navigate("LandingStack");
  };

  const getRecylers = async () => {
    const response = await axiosInstance.get(`users?type=PICKUP_POINT`);
    console.log(response, "----here----- -");
    const updatedList = response?.data?.map((obj) => {
      return {
        id: obj?.id,
        // label: obj?.companyDetails?.name,
        label: obj?.personalDetails?.name,
        value: obj?.id,
        address: obj?.address,
      };
    });
    setRecyclerList([
      ...updatedList,
      {
        id: "Other (Non EXN facility)",
        label: "Other (Non EXN facility)",
        value: "Other (Non EXN facility)",
      },
    ]);
  };
  useEffect(() => {
    getRecylers();
  }, []);

  const [otherImages, setOtherImages] = useState<any>([]);
  const removeImage = (imageArray, setImageArray, id) => {
    const newArray = [...imageArray];
    newArray.splice(id, 1);
    setImageArray(newArray);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: "white",
      }}
    >
      <View style={styles.mainContainer}>
        <View style={styles.dropDownView}>
          <DropDown
            tooltipChild={
              <TextField>
                {`Select the facility where you are dispatching the material. If you can not find the facility in the list please select Others`}
              </TextField>
            }
            lebel="Select Facility"
            placeholder="Select Facility"
            rightIconName="sort-down"
            setSelectedValue={setRecyclerId}
            combineOnPress={(rest) =>
              dispatch(
                BottomModalActions.toggleBottomModal({
                  title: "Select Facility",
                  showList: true,
                  data: recyclerList,
                  ...rest,
                })
              )
            }
          />

          {recyclerId === "Other (Non EXN facility)" && (
            <>
              <Spacer spacing={5} />
              <ValidationInput
                placeholder="Enter facility details"
                label="Facility Details"
                fieldName="facilityDetails"
                autoCapitalize={"none"}
                {...formProps}
              />
            </>
          )}
          <Spacer spacing={5} />

          <ValidationInput
            placeholder="Enter vehicle number"
            label="Vehicle No. (Optional)"
            fieldName="vehicleNo"
            autoCapitalize={"none"}
            {...formProps}
          />
        </View>
        <Spacer spacing={10} />

        <View style={styles.dropDownView}>
          <Spacer spacing={5} />

          <TextField
            style={{
              marginBottom: 15,
              color: colors.secondary,
              fontSize: 14,
            }}
          >
            Upload Weight & Dispatch Document
          </TextField>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "46%",
                alignSelf: "center",
              }}
            >
              <FileImagePicker
                setImage={setImage}
                title={"Upload Image"}
                mainTitle="Weight"
                tooltipChild={
                  <FastImage
                    source={require("../../../assets/tooltip/weightslip.jpg")}
                    style={{ width: 225, height: 220 }}
                    resizeMode="contain"
                  />
                }
              />
            </View>

            <View
              style={{
                width: "46%",
                alignSelf: "center",
              }}
            >
              <FileImagePicker
                setImage={setImage2}
                title={"Upload Image"}
                mainTitle={"Dispatch Document"}
                tooltipChild={
                  <FastImage
                    source={require("../../../assets/tooltip/deliveryrecepit.png")}
                    style={{ width: 225, height: 220 }}
                    resizeMode="contain"
                  />
                }
              />
            </View>
          </View>

          <Spacer spacing={10} />

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {!!otherImages &&
              otherImages?.length > 0 &&
              otherImages?.map((item, index) => {
                return (
                  <View
                    style={{
                      width: "47%",
                      aspectRatio: 1,
                      marginBottom: 20,
                    }}
                  >
                    <FastImage
                      source={{ uri: item }}
                      resizeMode="stretch"
                      style={styles.img}
                    />

                    <Pressable
                      style={{
                        alignItems: "center",
                        right: -5,
                        top: -5,
                        backgroundColor: colors.primary,
                        width: 24,
                        height: 24,
                        justifyContent: "center",
                        borderRadius: 20,
                        position: "absolute",
                      }}
                      onPress={() =>
                        removeImage(otherImages, setOtherImages, index)
                      }
                    >
                      <DynamicIcon
                        iconName="close"
                        iconSize={20}
                        iconColor={colors.white}
                        iconFamily="MaterialCommunityIcons"
                      />
                    </Pressable>
                  </View>
                );
              })}

            <View style={styles.pickContainer}>
              <MultiImagePicker setImages={setOtherImages} />
            </View>
          </View>

          {/* <Spacer spacing={10} /> */}
        </View>

        <Spacer spacing={10} />

        <Button
          title={loading ? <LoadingIndicator /> : "Confirm"}
          onPress={handleSubmit(_onConfirmPress)}
          disabled={loading || isModalVisible}
        />

        <Spacer spacing={15} />

        <CongratulationsModal
          modalVisible={isModalVisible}
          onRequestClose={_onRequestClose}
        >
          <CongratulationScreen
            onRequestClose={_onRequestClose}
            heading=""
            message={"The stock has been successfully dispatched."}
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

        <CongratulationsModal modalVisible={loading} onRequestClose={() => {}}>
          <FactScreen />
        </CongratulationsModal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pickContainer: {
    width: "47%",
    // height: "100%",
    // aspectRatio: 0.1,
    // marginVertical: 20,
  },

  img: { height: "100%", width: "100%", borderRadius: 6 },

  mainContainer: {
    flex: 1,
    alignContent: "center",
    backgroundColor: colors.backgroundColor,
    paddingTop: REGULAR_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  dayTitle: {
    fontSize: 12,
    lineHeight: 22,
    textTransform: "uppercase",
  },
  timeText: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.secondary,
  },
  marginTop: {
    marginTop: BORDER_RADIUS_SIZE,
  },
  marginLeft: {
    marginLeft: BORDER_RADIUS_SIZE,
  },
  dateText: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0.4,
  },
  selectedDateStyle: {
    color: colors.white,
  },
  checkBoxContainer: {
    flex: 0.1,
  },
  calendarView: {
    borderRadius: BORDER_RADIUS_SIZE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: colors.white,
    paddingVertical: LARGE_PADDING_SIZE,
  },
  Icon: {
    height: 80,
    width: 80,
  },
  headerTitle: {
    color: colors.primary,
  },
  stepTitle: {
    marginBottom: BORDER_RADIUS_SIZE,
  },
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: "center",
    backgroundColor: "white",
  },
  box: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryBG,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 14,
    width: 60,
    height: 70,
    marginHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBoxStyle: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 25,
    color: "red",
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },
  timeFlexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    paddingVertical: 6,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  lineSeparator: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: MEDIUM_PADDING_SIZE,
    marginHorizontal: MEDIUM_PADDING_SIZE,
  },
  leftButtonStyle: {
    width: "45%",
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    marginRight: MEDIUM_PADDING_SIZE,
  },
  textStyle: {
    color: colors.dark,
  },
  dropDownView: {
    borderRadius: BORDER_RADIUS_SIZE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: colors.white,
    padding: MEDIUM_PADDING_SIZE,
  },
});
