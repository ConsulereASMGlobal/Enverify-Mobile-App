import { Platform, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FastImage } from "../../../components/image/index";
import {
  Fonts,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
  screenHeight,
  screenWidth,
} from "../../../globals/themes";
import { colors } from "../../../globals/colors";
import Button from "../../../components/Button/Button";
import CongratulationsModal from "../../../components/CongratulationsModal/CongratulationsModal";
import CongratulationScreen from "../../CongratulationScreen/CongratulationScreen";
import { globalStyle } from "../../../globals/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { PERMISSIONS, check, request } from "react-native-permissions";
import toast from "../../../services/toast";
import QRCodeScanner from "react-native-qrcode-scanner";
import { orderAPI } from "../../../services/api";
import {
  playPause,
  releaseAudio,
  initializeAudio,
} from "../../../utils/soundUtils";
import { TextField } from "@src/components/TextField/TextField";
import { Spacer } from "@src/components/common/Spacer";

export const DeliveryQRScan = ({ route }) => {
  useEffect(() => {
    initializeAudio();
    return () => {
      releaseAudio();
    };
  }, []);

  const [isModalVisible, setisModalVisible] = useState(false);
  const navigation = useNavigation();

  const { orderId } = route.params;

  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState("not-determined");
  const [doneScanning, setDoneScanning] = useState(false);

  const _onRequestClose = () => {
    setisModalVisible((prevState) => !prevState);
    navigation.goBack();
  };

  const onSuccess = async (e: any) => {
    try {
      const parseData = await JSON.parse(e.data);

      if (!parseData.orderId) {
        toast.danger({
          message: "Invalid QR code.",
        });
      }

      if (orderId !== parseData.orderId) {
        toast.danger({
          message: "Invalid Order.",
        });
      }

      if (orderId === parseData.orderId) {
        orderAPI
          .changeStatus({
            orderId,
            status: "COMPLETED",
            confirmationType: "QR",
          })
          .then((res) => {
            if (res.status === 200) {
              setDoneScanning(true);
              setisModalVisible((prevState) => !prevState);
              playPause();
            } else {
              toast.danger({ message: "Something went wrong!" });
              setDoneScanning(true);
            }
          });
      }
    } catch (error) {
      toast.danger({
        message: "unable to read from QR code.",
      });
    }
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

  return !doneScanning && cameraPermissionStatus === "authorized" ? (
    <View style={{ backgroundColor: colors.backgroundColor }}>
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
    <View style={styles.mainContainer}>
      <FastImage
        source={require("../../../assets/img/QR.png")}
        resizeMode="contain"
        style={{
          height: "40%",
          width: "100%",
        }}
      />
      <Button
        title="Scan QR Code"
        style={{ backgroundColor: colors.primary }}
        onPress={requestCameraPermission}
      />
      <Spacer spacing={20} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.gray,
            flex: 1,
          }}
        />
        <TextField>Or</TextField>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.gray,
            flex: 1,
          }}
        />
      </View>

      <Button
        title="Upload Delivery Receipt"
        onPress={() =>
          navigation.navigate("UploadDeliveryReceipt", {
            orderId,
          })
        }
        style={{
          backgroundColor: colors.secondary,
        }}
      />
      <CongratulationsModal
        modalVisible={isModalVisible}
        onRequestClose={_onRequestClose}
      >
        <CongratulationScreen
          onRequestClose={_onRequestClose}
          heading=""
          message={`The material has been received successfully.`}
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
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: MEDIUM_PADDING_SIZE,
    paddingHorizontal: REGULAR_PADDING_SIZE,
    backgroundColor: colors.backgroundColor,
    justifyContent: "center",
    alignItems: "center",
  },
});
