import React, { useState, useEffect, useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { Spacer } from "../../../components/common/Spacer";
import { globalStyle } from "../../../globals/globalStyles";
import { TextBold, TextField } from "../../../components/TextField/TextField";
import Button from "../../../components/Button/Button";
import toast from "../../../services/toast";
import { useAppDispatch } from "../../../redux/store";
import { setInfoActions } from "../../../redux/actions/combineAction";
import { qrSchema } from "../../../static/schema/ValidationSchema";
import { colors } from "../../../globals/colors";
import { DynamicIcon } from "../../../utils/Dynamic/DynamicIcon";
import { ProfileAPI } from "../../../services/api";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { axiosInstance } from "../../../helpers/axiosHelper";
import { HorizontalLine } from "../../../components/HorizontalLine";
import { check, PERMISSIONS, request } from "react-native-permissions";
import QRCodeScanner from "react-native-qrcode-scanner";
import { FastImage } from "@src/components/image";
import { screenHeight, screenWidth } from "@src/globals/themes";
import { selectProfile } from "@src/redux/selectors";
import { useSelector } from "react-redux";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import RadioButtonOtpions from "../Components/RadioOptions";
import { useIsFocused } from "@react-navigation/native";
import FilterDropDown from "@src/components/FilterDropDown/FilterDropDown";
import TooltipComp from "../../../components/TooltipComp/TooltipComp";
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import DropShadow from "react-native-drop-shadow";

type InputProps = {
  mobile: string;
  name: string;
  org: string;
};
const formProItems = [
  { id: 1, label: "Individual", value: "Individual" },
  { id: 2, label: "Commercial", value: "Commercial" },
  { id: 3, label: "Institutional", value: "Institutional" },
];
const wasteSources = [
  { id: 1, label: "Post Consumer", value: "Post Consumer" },
  // { id: 2, label: "Post Commercial", value: "Post Commercial" },
  {
    id: 3,
    label: "Post Industrial",
    value: "Post Industrial",
  },
];
export const CollectScreen = ({ navigation }) => {
  const translateY = useSharedValue(0);
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const dispatch = useAppDispatch();
  const isScreenFocused = useIsFocused();
  const [mobile, setMobile] = useState();
  const [comment, setComment] = useState(wasteSources[0]?.value);
  const [selectedComment, setSelectedComment] = useState(wasteSources[0]);

  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState("not-determined");

  useEffect(() => {
    axiosInstance
      .get("/users?type=CUSTOMER&customerType=CORPORATE")
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (mobile) {
      setSelectedCompany(null);
    }
  }, [mobile]);
  const [doneScanning, setDoneScanning] = useState(false);
  const [fullName, setFullName] = useState();
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    if (selectedCompany || isScreenFocused) {
      setUserData(null);
      setMobile("");
      // setOrg(null);
    }
  }, [selectedCompany, isScreenFocused]);
  const [org, setOrg] = useState(formProItems[0]?.value);
  const [selectedItem, setSelectedItem] = useState(formProItems[0]);

  const [searchLoading, setSearchLoading] = useState(false);

  const [companies, setCompanies] = useState([]);
  const [depositorID, setDepositorID] = useState();
  const [openBottomView, setOpenBottomView] = useState(false);
  const companyList = companies?.map((each: any) => ({
    label: each?.personalDetails?.name,
    value: each.id,
    mobile: each.personalDetails?.mobile,
  }));

  const formOptions = { resolver: yupResolver(qrSchema) };

  const { handleSubmit } = useForm<InputProps>(formOptions);
  const [isFocused, setIsFocus] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const profileData = useSelector(selectProfile);

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    if (!selectedCompany) {
      if (!fullName) {
        return toast.danger({
          message: "Full Name is Required!",
        });
      }
      if (!org) {
        return toast.danger({
          message: "Source is Required!",
        });
      }
      dispatch(setInfoActions.setCustomerName(fullName));
      dispatch(setInfoActions.setCustomerMobile(mobile));
      dispatch(setInfoActions.setCustomerOrg(org));
      if (userData?.data || userData?.name) {
        // navigation.navigate("catalogue", {
        //   dataFields: { ...data, uid: userData?.data?.id || userData?.id },
        // });
        // navigation.navigate("SelectItems", {
        //   dataFields: {
        //     ...data,
        //     uid: userData?.data?.id || userData?.id,
        //     comment: comment,
        //   },
        // });
        setDepositorID(userData?.data?.id || userData?.id);
        setOpenBottomView(true);
      } else {
        setLoading(true);
        ProfileAPI.registerUser({
          firstName: fullName,
          lastName: "",
          email: "",
          mobile: mobile,
          userType: "CUSTOMER",
          companyDetails: {
            name: org,
          },
          address: {},
          password: mobile,
        }).then((res) => {
          setLoading(false);
          if (res?.data) {
            // navigation.navigate("SelectItems", {
            //   dataFields: {
            //     ...data,
            //     uid: res?.data?.data?.id,
            //     comment: comment,
            //   },
            // });
            setDepositorID(res?.data?.data?.id);
            setOpenBottomView(true);
            // navigation.navigate("catalogue", {
            //   dataFields: { ...data, uid: res?.data?.data?.id },
            // });
          } else if (res === 500) {
            return toast.danger({
              message: "Please try again!",
            });
          }
        });
      }
    } else {
      const company = companyList.find(
        (each) => (each.value = selectedCompany)
      );
      dispatch(setInfoActions.setCustomerName(company?.label));
      dispatch(setInfoActions.setCustomerMobile(company?.mobile));
      dispatch(setInfoActions.setCustomerOrg("Corporate"));
      // navigation.navigate("SelectItems", {
      //   dataFields: { ...data, uid: selectedCompany, comment: comment },
      // });
      setDepositorID(selectedCompany);
      setOpenBottomView(true);

      // navigation.navigate("catalogue", {
      //   dataFields: { ...data, uid: selectedCompany },
      // });
    }
  };
  const handleFocus = (e: any) => {
    setOpenBottomView(false);
    setIsFocus(true);
  };

  const handleBlur = (e: any) => {
    setOpenBottomView(false);
    setIsFocus(false);
  };
  const fieldColor = isFocused ? colors.primary : colors.gray;
  const inputFieldColor = colors.dark;
  const handleCommentSelection = (item: any) => {
    setSelectedComment(item);
    setComment(item?.value);
  };
  const getUserD = () => {
    setOpenBottomView(false);

    const phoneRegExp = /^\d{10}$/;

    if (!mobile) {
      return toast.danger({
        message: "Mobile Number is Required!",
      });
    }

    if (!phoneRegExp.test(mobile)) {
      return toast.danger({
        message: "Invalid Mobile Number!",
      });
    }

    setSearchLoading(true);
    ProfileAPI.getRegisteredUser({ mobile }).then((res) => {
      setSearchLoading(false);
      if (res === 500) {
        return toast.danger({
          message: "You are registered as plastic station or rider!",
        });
      } else {
        setUserData(res);
        setFullName(res?.data?.personalDetails?.name);
        setOrg(formProItems[0]?.value);
        setSelectedItem(formProItems[0]);
      }
    });
  };

  const _requestCameraPermission = async () => {
    try {
      const hasPermission = await check(
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA
      );
      if (hasPermission != "granted") {
        const requestPermission = await request(
          Platform.OS === "ios"
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA
        );
        requestPermission === "granted" &&
          setCameraPermissionStatus("authorized");
      } else {
        setCameraPermissionStatus("authorized");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestCameraPermission = useCallback(async () => {
    setDoneScanning(false);
    Platform.OS === "android" &&
      ToastAndroid.showWithGravity(
        "Requesting camera permission...",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    _requestCameraPermission();
  }, []);
  const onSuccess = async (e: any) => {
    try {
      const parseData = await JSON.parse(e.data);
      console.log(parseData, "scan data-------");
      if (parseData?.mobile === profileData?.personalDetails?.mobile) {
        return toast.danger({
          message: "This number is registered as a plastic station!",
        });
      }
      if (parseData?.userType === "CUSTOMER") {
        setUserData(parseData);
        setMobile(parseData?.mobile);
        setFullName(parseData?.name);
        setDoneScanning(true);
      } else {
        toast.danger({
          message:
            "unable to read from QR code. please scan with valid QR code",
        });
      }
    } catch (error) {
      toast.danger({
        message: "unable to read from QR code.",
      });
    }
  };

  const handleOptionSelection = (item: any) => {
    setSelectedItem(item);
    setOrg(item?.value);
  };
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (
        lastContentOffset.value > event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = 0;
        // console.log('scrolling up');
      } else if (
        lastContentOffset.value < event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = 200;
        // console.log('scrolling down');
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  });

  const actionBarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  return (
    <ScrollContainerLayout
      topBgColor={colors.secondary}
      contentStyle={{ flex: 1 }}
    >
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        // contentContainerStyle={styles.container}
      >
        {!doneScanning && cameraPermissionStatus === "authorized" ? (
          <View>
            <QRCodeScanner
              reactivate
              reactivateTimeout={3000}
              bottomViewStyle={{ flex: 1 }}
              onRead={onSuccess}
              fadeIn
              showMarker={true}
              customMarker={
                <FastImage
                  source={require("../../../assets/others/camera_frame.png")}
                  resizeMode="stretch"
                  style={{
                    height: screenWidth * 0.75,
                    width: screenWidth * 0.75,
                  }}
                />
              }
              containerStyle={{
                height: screenHeight,
                width: screenWidth,
              }}
              cameraStyle={{
                height: screenWidth * 0.75,
                width: screenWidth * 0.75,
                overflow: "hidden",
                borderRadius: 25,
              }}
              cameraContainerStyle={{
                height: screenHeight,
                width: screenWidth,
                alignItems: "center",
                paddingTop: screenHeight * 0.2,
                backgroundColor: "#7d7a7a9e",
              }}
            />
          </View>
        ) : (
          <>
            <View style={styles.mainContainer}>
              <View style={globalStyle.aliginCenter}>
                <Spacer spacing={10} />
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <TextBold style={{ color: colors.darkGray }}>
                    {"Search by company name"}
                  </TextBold>
                  <TooltipComp
                    tooltipPosition="bottom"
                    children={
                      <TextField>
                        Shows the list of institutional depositors which are pre
                        registered.
                      </TextField>
                    }
                  />
                </View>
                <Spacer spacing={10} />

                <FilterDropDown
                  title={""}
                  placeholder={"Select Company"}
                  value={selectedCompany}
                  // setValue={setSelectedCompany}
                  setValue={(value) => {
                    setOpenBottomView(false);
                    setSelectedCompany(value);
                    setIsFocus(false);
                  }}
                  setSelectedValue={(value) => {
                    setOpenBottomView(false);
                    setSelectedCompany(value);
                    setIsFocus(false);
                  }}
                  data={companyList}
                />

                <Spacer spacing={15} />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                    paddingHorizontal: 15,
                  }}
                >
                  <View style={{ width: "40%" }}>
                    <HorizontalLine color={colors.gray} />
                  </View>
                  <TextField>OR</TextField>
                  <View style={{ width: "40%" }}>
                    <HorizontalLine color={colors.gray} />
                  </View>
                </View>
              </View>

              <View style={{ width: "100%" }}>
                <Spacer spacing={15} />
                <TextBold
                  style={{ color: colors.darkGray, textAlign: "center" }}
                >
                  {"Search by mobile number"}
                </TextBold>
                <Spacer spacing={10} />
                <View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      flexDirection: "row",
                      paddingRight: 14,
                      alignItems: "center",
                      borderColor: fieldColor,
                    }}
                  >
                    <TextInput
                      placeholder="9XXXXXXXXX"
                      style={{
                        height: 50,
                        padding: 10,
                        borderBottomLeftRadius: 10,
                        borderTopLeftRadius: 10,
                        flex: 1,
                        fontSize: 16,
                        color: inputFieldColor,
                      }}
                      placeholderTextColor={colors.gray}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      onChangeText={(val) => {
                        setMobile(val);
                        setFullName();
                        setUserData();
                        setOpenBottomView(false);
                      }}
                      defaultValue={mobile}
                      autoCapitalize={"none"}
                      keyboardType="phone-pad"
                    />

                    <Pressable
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 50,
                        height: 50,
                        marginRight: -14,
                        paddingHorizontal: 12,
                        borderBottomRightRadius: 8,
                        borderTopRightRadius: 8,
                        elevation: 5,
                        backgroundColor: colors.primaryLight2,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                      }}
                      onPress={() => getUserD()}
                    >
                      {searchLoading ? (
                        <ActivityIndicator
                          size={"large"}
                          color={colors.white}
                        />
                      ) : (
                        <DynamicIcon
                          iconFamily="Ionicons"
                          iconName="search-sharp"
                          iconColor={colors.white}
                          iconSize={25}
                        />
                      )}
                    </Pressable>
                  </View>
                  <Spacer spacing={8} />
                  {/* <RadioButtonOtpions
                    tooltipChild={
                      <TextField>
                        {`Post consumer - collected from household, junk shops or MRF\nPost commercial - collected from shops, malls, offices\nPost industrial - waste generated during the manufacturing process of a product`}
                      </TextField>
                    }
                    title="Choose Source of Waste"
                    options={wasteSources}
                    selectedItem={selectedComment}
                    onSelect={handleCommentSelection}
                  />
                  <Spacer spacing={10} /> */}
                </View>
                {userData && (
                  <>
                    <View>
                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: 10,
                          flexDirection: "row",
                          paddingRight: 14,
                          alignItems: "center",
                          borderColor: colors.gray,
                        }}
                      >
                        <TextInput
                          placeholder="Full Name"
                          style={{
                            height: 50,
                            padding: 10,
                            borderBottomLeftRadius: 10,
                            borderTopLeftRadius: 10,
                            flex: 1,
                            fontSize: 16,
                            color: inputFieldColor,
                          }}
                          placeholderTextColor={colors.gray}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          onChangeText={(val) => setFullName(val)}
                          defaultValue={fullName}
                          autoCapitalize={"none"}
                          editable={
                            userData?.data?.personalDetails?.name ? false : true
                          }
                        />
                      </View>
                      <Spacer spacing={8} />
                    </View>
                    <View>
                      <RadioButtonOtpions
                        title="Select Depositor Type"
                        options={formProItems}
                        selectedItem={selectedItem}
                        onSelect={handleOptionSelection}
                      />
                    </View>
                  </>
                )}
              </View>
              <Spacer spacing={10} />
              {(userData || selectedCompany) && (
                <Button
                  textStyle={{ lineHeight: 18 }}
                  onPress={handleSubmit(onSubmit)}
                  title={"Confirm"}
                  disabled={openBottomView}
                >
                  {!!loading && <LoadingIndicator activityColor="white" />}
                </Button>
              )}
            </View>
          </>
        )}
      </Animated.ScrollView>
      {openBottomView && (
        <Animated.View
          style={[
            { position: "absolute", bottom: 0, width: "100%" },
            actionBarStyle,
          ]}
        >
          <DropShadow
            style={{
              shadowColor: "#555555",
              shadowOffset: { width: 0, height: -6 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}
          >
            <View
              style={{
                // height: "35%",
                backgroundColor: "white",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                marginTop: 5,
                paddingBottom: 20,
              }}
            >
              <View
                style={{
                  // backgroundColor: colors.grayTwo,
                  height: 4,
                  width: 60,
                  alignSelf: "center",
                  borderRadius: 8,
                  marginVertical: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 20,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "100%" }}>
                  <RadioButtonOtpions
                    tooltipChild={
                      <TextField>
                        {`Post consumer - collected from household, junk shops or MRF\nPost industrial - waste generated during the manufacturing process of a product`}
                      </TextField>
                    }
                    title="Choose Source of Waste"
                    options={wasteSources}
                    selectedItem={selectedComment}
                    onSelect={handleCommentSelection}
                  />
                  <Spacer spacing={3} />

                  <Spacer spacing={7} />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("SelectItems", {
                        dataFields: {
                          uid: depositorID,
                          comment: comment,
                        },
                      })
                    }
                  >
                    <TextField
                      style={{
                        color: colors.primary,
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      <DynamicIcon
                        iconName={"chevron-right"}
                        iconFamily={"FontAwesome"}
                        iconSize={18}
                        iconColor={colors.primary}
                      />
                      {"  "}
                      Next
                    </TextField>
                  </TouchableOpacity>
                </View>
                {/* <View style={{ width: "20%" }}>
                  <FastImage
                    source={require("../../../assets/gifs/direction.gif")}
                    style={{
                      height: 124,
                      width: 125,
                    }}
                  />
                </View> */}
              </View>
            </View>
          </DropShadow>
        </Animated.View>
      )}
    </ScrollContainerLayout>
  );
};
