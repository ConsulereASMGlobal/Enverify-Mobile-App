import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import Geolocation from "@react-native-community/geolocation";

import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import LogoContainer from "../Components/LogoContainer";
import TopShadowView from "../Components/TopShadowView";
import { CardLayout } from "@src/components/Layouts/CardLayout";
import TitleLogoView from "../Components/TitleLogoView";
import toast from "@src/services/toast";
import { ProfileAPI } from "@src/services/api";
import { colors } from "@src/globals/colors";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { Spacer } from "@src/components/common/Spacer";
import CheckBox from "@src/components/CheckBox/CheckBox";
import Button from "@src/components/Button/Button";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import { BORDER_RADIUS_SIZE, MEDIUM_PADDING_SIZE } from "@src/globals/themes";
import CongratulationsModal from "@src/components/CongratulationsModal/CongratulationsModal";
import InfoScreen from "@src/features/CongratulationScreen/InfoScreen";
import { globalStyle } from "@src/globals/globalStyles";

export const LastStep = ({ navigation, route }: any) => {
  const { regdata } = route.params;
  console.log(regdata, "laststeps=====================");
  const [loading, setLoading] = useState(false);
  const [loc, setLoc] = useState<any>();

  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isAgreement, setIsAgreement] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      setLoc({ lat: info.coords.latitude, lng: info.coords.longitude });
    });
  }, []);
  const onSubmit = async () => {
    if (!isAgeVerified || !isAgreement) {
      toast.danger({
        message: "Please agree to the terms and conditions before proceeding.",
      });
      return;
    }

    setLoading(true);
    ProfileAPI.registerUser({
      firstName: regdata?.firstName,
      lastName: regdata?.lastName,
      email: regdata?.email,
      mobile: regdata?.mobile,
      userType: "PICKUP_POINT",
      countryCode: regdata?.prefix,
      companyDetails: {
        name: regdata?.storeName ?? "person",
        companyId: "",
      },
      address: {
        street: regdata?.lotNumber + ", " + regdata?.barangay,
        state: regdata?.province,
        city: regdata?.city,
        country: regdata?.country,
        latitute: loc?.lat,
        longitute: loc?.lng,
        zipCode: "",
        province: regdata?.province,
        barangay: regdata?.barangay,
        lotNumber: regdata?.lotNumber,
        countryCode: "",
      },
      person: regdata?.person,
      store: regdata?.store,
      storeName: regdata?.storeName,
      bankName: regdata?.bankName,
      notes: regdata?.notes,
      password: regdata?.password,
      status: "INACTIVE",
      franchiseeId: regdata?.franchiseeId,
      franchiseeName: regdata?.franchiseeName,
      kycDocument: regdata?.kycDocument,
      isoCertificate: regdata?.isoCertificate,
      pprsCertificate: regdata?.pprsCertificate,
    }).then((res) => {
      setLoading(false);
      console.log(res, "register response");
      if (res?.data) {
        navigation.navigate("applicationSubmitted");
      } else {
        setisModalVisible((prevState) => !prevState);

        // Alert.alert(
        //   'Info',
        //   `You are already registered with ${regdata?.mobile} mobile number`,
        //   [
        //     {
        //       text: 'Ok',
        //       onPress: () => navigation.navigate('login')
        //     },
        //     {
        //       text: 'Cancel',
        //       onPress: () => console.log('Cancel Pressed'),
        //       style: 'cancel'
        //     }
        //   ]
        // );
      }
    });
    // navigation.navigate('applicationSubmitted');
  };
  const [isModalVisible, setisModalVisible] = useState(false);

  const _onRequestClose = () => {
    setisModalVisible((prevState) => !prevState);
    navigation.navigate("login");
  };
  return (
    <ScrollContainerLayout topBgColor={colors.secondary}>
      <LogoContainer />
      <View
        style={{
          backgroundColor: colors.secondary,
          height: 75,
        }}
      />
      <View>
        <TopShadowView topMar={-85} />
        <CardLayout>
          <View style={styles.mainContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <View
                style={{
                  flex: 0.4,
                  marginHorizontal: 5,
                  height: 10,
                  borderRadius: BORDER_RADIUS_SIZE,
                  backgroundColor: colors.secondary,
                }}
              />
              <View
                style={{
                  flex: 0.4,
                  marginHorizontal: 5,
                  height: 10,
                  borderRadius: BORDER_RADIUS_SIZE,
                  backgroundColor: colors.secondary,
                }}
              />
            </View>

            <TitleLogoView
              title={"Collection Centre Application"}
              desc={" Join our community of collectors and start earning more."}
              titleSize={24}
            />

            <View>
              <TextField
                style={{
                  fontWeight: "bold",
                  color: colors.secondary,
                }}
              >
                One Last Step
              </TextField>
              <Spacer spacing={3} />
              <TextField style={{ color: colors.gray }}>
                Please check to confirm if all the details below are correct.
              </TextField>
              <Spacer spacing={10} />
            </View>
            <View
              style={{
                width: "100%",
              }}
            >
              <View>
                <View style={styles.titleBox}>
                  <TextBold>Personal Information</TextBold>
                </View>
                <View style={{ padding: 8 }}>
                  <TextField>
                    First Name : <TextField>{regdata?.firstName}</TextField>
                  </TextField>
                  <TextField>
                    Last Name : <TextField>{regdata?.lastName}</TextField>
                  </TextField>
                  <TextField>
                    Mobile : <TextField>{regdata?.mobile}</TextField>
                  </TextField>
                </View>
              </View>
              <Spacer spacing={10} />

              <View>
                <View style={styles.titleBox}>
                  <TextBold>Business Location</TextBold>
                </View>

                <TextField>
                  Address :{" "}
                  <TextField>
                    {regdata?.lotNumber && `${regdata?.lotNumber}`}
                    {regdata?.barangay && `, ${regdata?.barangay}`}
                    {regdata?.city && `, ${regdata?.city}`}
                    {regdata?.province && `, ${regdata?.province}`}
                  </TextField>
                </TextField>
                {regdata?.notes && (
                  <TextField>
                    Notes : <TextField>{regdata?.notes}</TextField>
                  </TextField>
                )}
              </View>
              <Spacer spacing={10} />

              <Pressable
                onPress={() => setIsAgeVerified((pre) => !pre)}
                style={styles.rowCheckBox}
              >
                <CheckBox isSelected={isAgeVerified} />
                <TextField style={styles.checkTextWidth}>
                  I certify that I am over 18 years old.
                </TextField>
              </Pressable>
              <Spacer spacing={5} />
              <Pressable
                onPress={() => setIsAgreement((pre) => !pre)}
                style={styles.rowCheckBox}
              >
                <CheckBox isSelected={isAgreement} />
                <TextField style={styles.checkTextWidth}>
                  I agree to the{" "}
                  <TextField
                    style={styles.termConditionTxt}
                    onPress={() => {
                      navigation.navigate("pdfViewer", {
                        title: "Terms & Conditions",
                        pdfUrl:
                          Platform.OS == "android"
                            ? "bundle-assets://pdf/termsER.pdf"
                            : require("../../../assets/PDF/termsER.pdf"),
                      });
                    }}
                  >
                    Terms and Conditions
                  </TextField>{" "}
                  as set out by the user agreement.
                </TextField>
              </Pressable>

              <Button
                textStyle={{ lineHeight: 18 }}
                onPress={() => onSubmit()}
                title={"Submit"}
                style={{ backgroundColor: colors.primary }}
                rippleColor={colors.ternary}
                disabled={loading}
              >
                {loading && <LoadingIndicator activityColor="white" />}
              </Button>
              <Button
                onPress={() => navigation.goBack()}
                title={"Back"}
                style={{
                  width: "100%",
                  backgroundColor: colors.white,
                  borderColor: colors.primary,
                  borderWidth: 1,
                  marginTop: MEDIUM_PADDING_SIZE,
                }}
                textStyle={{ color: colors.primary, lineHeight: 18 }}
              />
            </View>
            <Spacer spacing={10} />
          </View>

          <CongratulationsModal
            modalVisible={isModalVisible}
            onRequestClose={_onRequestClose}
          >
            <InfoScreen
              onRequestClose={_onRequestClose}
              heading=""
              message={`Try again.`}
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
                    title={"Login"}
                    onPress={_onRequestClose}
                  />
                </View>
              }
            />
          </CongratulationsModal>
        </CardLayout>
      </View>
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignItems: "center",
  },
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  titleBox: {
    backgroundColor: colors.shaded,
    padding: 8,
    marginBottom: 5,
  },
  rowCheckBox: {
    flexDirection: "row",
    gap: 10,
  },
  checkTextWidth: {
    maxWidth: "90%",
  },
  termConditionTxt: {
    color: colors.primary,
    fontWeight: "bold",
  },
});
