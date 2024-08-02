import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { otpSchema } from "@src/static/schema/ValidationSchema";
import { validationAPI } from "@src/services/api";
import toast from "@src/services/toast";
import { colors } from "@src/globals/colors";
import { TextField } from "@src/components/TextField/TextField";
import { Spacer } from "@src/components/common/Spacer";
import { ValidationInput } from "@src/components/Input/ValidationInput";
import Button from "@src/components/Button/Button";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import CongratulationsModal from "@src/components/CongratulationsModal/CongratulationsModal";
import CongratulationScreen from "../../CongratulationScreen/CongratulationScreen";
import { globalStyle } from "@src/globals/globalStyles";
import InfoScreen from "../../CongratulationScreen/InfoScreen";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import TitleLogoView from "../Components/TitleLogoView";
import LogoContainer from "../Components/LogoContainer";
import { CardLayout } from "@src/components/Layouts/CardLayout";
import TopShadowView from "../Components/TopShadowView";

type InputProps = { otp: string };
export const VerifyOTP = ({ route }: any) => {
  const { routeFrom, mobile, prefix, country } = route.params;
  console.log(routeFrom, mobile);
  const formOptions = { resolver: yupResolver(otpSchema) };
  const navigation = useNavigation<any>();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [loadingResend, setLoadingResend] = useState(false);
  const [isInfoModalVisible, setisInfoModalVisible] = useState(false);

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    // if (routeFrom === "register") {
    //   setisModalVisible((prevState) => !prevState);
    // } else {
    //   navigation.navigate("forgotPassword", { mobile });
    // }
    // return;
    setLoading(true);
    validationAPI
      .verifyOTP({
        mobile: mobile,
        otp: data?.otp,
      })
      .then((res: any) => {
        setLoading(false);
        if (res?.data) {
          if (routeFrom === "register") {
            setisModalVisible((prevState) => !prevState);
          } else {
            navigation.navigate("forgotPassword", { mobile });
          }
        } else {
          toast.danger({ message: "Use valid OTP" });
        }
      });
  };
  const _onRequestClose = () => {
    setisModalVisible((prevState) => !prevState);
    navigation.navigate("register", { mobile, country, prefix });
  };
  const handleResendOTP = () => {
    setLoadingResend(true);
    validationAPI
      .sendOTP({
        mobile: mobile,
        prefix,
        from: routeFrom === "forgot" ? "forgotPassword" : "registration",
      })
      .then((res: any) => {
        setLoadingResend(false);
        console.log(res, "response");
        if (res?.status === 208) {
          if (routeFrom === "registration") {
            setMessage(
              `Your mobile number ${mobile} has already registered. Please login.`
            );
            setisInfoModalVisible((prevState) => !prevState);
          } else {
            setMessage(`Try again`);
            setisInfoModalVisible((prevState) => !prevState);
          }
        } else if (res === 404) {
          setMessage(
            `Your mobile number ${mobile} has not registered yet. Please register.`
          );
          setisInfoModalVisible((prevState) => !prevState);
        } else if (res === 500) {
          setMessage(`Please use Valid mobile number`);
          setisInfoModalVisible((prevState) => !prevState);
        } else {
          setTimer(60);
          setIsTimerRunning(true);
        }
      });
  };
  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Add leading zeros for single-digit minutes and seconds
    const formattedMinutes: any = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return `${formattedMinutes}:${formattedSeconds} ${
      formattedMinutes > 0 ? "Min" : "Sec"
    }`;
  };
  useEffect(() => {
    let interval: any;

    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer, isTimerRunning]);
  return (
    <ScrollContainerLayout topBgColor={colors.secondary}>
      <View style={{ backgroundColor: colors.secondary, height: 150 }} />

      <View>
        <TopShadowView topMar={-85} />
        <CardLayout>
          <LogoContainer
            bgColor={colors.white}
            logo={require("../../../assets/authIcons/verifyotp.png")}
            width={128}
            height={74}
          />
          <TitleLogoView
            title={"OTP Verification"}
            desc={
              "Help us secure your account. Enter the code we've sent to your mobile number."
            }
          />
          <ValidationInput
            placeholder="OTP"
            label="Enter OTP"
            fieldName="otp"
            autoCapitalize={"none"}
            keyboardType="phone-pad"
            {...formProps}
          />
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={!!loading}
            title={"Submit"}
          >
            {!!loading && <LoadingIndicator activityColor="white" />}
          </Button>
          <View style={{}}>
            {isTimerRunning ? (
              <View style={{ alignItems: "center" }}>
                <Spacer spacing={10} />
                <TextField>Resend OTP in</TextField>
                <TextField>{formatTime(timer)}</TextField>
              </View>
            ) : (
              <Button
                onPress={() => handleResendOTP()}
                title={"Resend OTP"}
                disabled={!!loadingResend}
                style={{ backgroundColor: colors.secondary }}
              >
                {!!loadingResend && <LoadingIndicator activityColor="white" />}
              </Button>
            )}
          </View>
          <Spacer spacing={10} />

          <CongratulationsModal
            modalVisible={isModalVisible}
            onRequestClose={_onRequestClose}
          >
            <CongratulationScreen
              onRequestClose={_onRequestClose}
              heading=""
              message={`Your mobile number has been verified successfully!`}
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
                    title={"Continue"}
                    onPress={_onRequestClose}
                  />
                </View>
              }
            />
          </CongratulationsModal>
          <CongratulationsModal
            modalVisible={isInfoModalVisible}
            onRequestClose={_onRequestClose}
          >
            <InfoScreen
              onRequestClose={_onRequestClose}
              heading=""
              message={message}
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

const styles = StyleSheet.create({});
