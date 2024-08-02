import React, { useState } from "react";
import ImagePicker from "react-native-image-crop-picker";
import {
  Alert,
  StyleSheet,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
} from "react-native";
import { FastImage } from "../image";
import { Row } from "../common/Row";
import { Spacer } from "../common/Spacer";
import { colors } from "../../globals/colors";
import { globalStyle } from "../../globals/globalStyles";

import CrossIcon from "../../assets/svgIcon/icon_cross_round.svg";
import { Fonts, screenWidth } from "../../globals/themes";
import { TextField } from "../TextField/TextField";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import toast from "../../services/toast/index";
import {
  epochToHumanReadable,
  epochToHumanReadableTime,
} from "../../utils/dateUtils";
import Marker, { ImageFormat, Position } from "react-native-image-marker";
import Geolocation from "@react-native-community/geolocation";

type ImagePickerViewProps = {
  image: any;
  setImage: (image: any) => void;
  hasError?: boolean;
};

const requestPermision = () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  );
};
const requestCameraPermision = async () => {
  // console.log(check(PERMISSIONS.ANDROID.CAMERA));
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Enverify App Camera Permission",
        message:
          "Enverify App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
export const ImagePickerView = ({
  image,
  setImage,
  hasError = false,
}: ImagePickerViewProps) => {
  const [loc, setLoc] = useState();
  Geolocation.getCurrentPosition((info) => {
    // console.log(info.coords.latitude, 'lat');
    // console.log(info.coords.longitude, 'lng');
    setLoc(info.coords.latitude + ", " + info.coords.longitude);
  });
  const pickSingleWithCamera = async (
    cropping = false,
    mediaType: "video" | "photo" = "photo"
  ) => {
    const date =
      epochToHumanReadable(new Date()) +
      " " +
      epochToHumanReadableTime(new Date());
    await requestCameraPermision();
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
      compressImageQuality: 0.2,
      cameraType: "back",
    })
      .then(async (image) => {
        console.log("received image", image);
        if (image?.size > 125000) {
          return toast.danger({ message: "Please use image less than 1Mb" });
        }
        // setImage({
        //   uri: image?.path,
        //   width: image.width,
        //   height: image.height,
        //   mime: image.mime,
        // });
        const options = {
          backgroundImage: {
            src: image?.path,
            scale: 1,
            rotate: 0,
            alpha: 1,
          },
          watermarkTexts: [
            {
              text: date + "\n" + loc,
              positionOptions: {
                position: Position.bottomRight,
              },
              style: {
                color: "#fff",
                fontName: "STSongti-SC-Regular",
                fontSize: 12,
                underline: false,
                bold: false,
                italic: false,
                strikeThrough: false,
                textAlign: "left",
                rotate: 0,
                shadowStyle: null,
                textBackgroundStyle: null,
              },
            },
          ],
          saveFormat: ImageFormat.png,
          filename: `${new Date().toString()}`,
          quality: 10,
        };

        await Marker.markText(options)
          .then((res) => {
            console.log(res);
            setImage({
              uri: "file:///" + res,
              width: image.width,
              height: image.height,
              mime: image.mime,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch();
  };

  const cleanupImages = () => {
    setImage(null);
    ImagePicker.clean()
      .then(() => {
        console.log("removed tmp images from tmp directory");
      })
      .catch((e) => {});
  };

  const renderImage = (image: any) => {
    return (
      <Image
        style={{
          width: image?.width,
          height: image?.height,
          maxHeight: "100%",
          maxWidth: "100%",
          borderRadius: 8,
        }}
        source={{
          uri: image?.uri,
        }}
        resizeMode="contain"
      />
    );
  };
  return (
    <View style={{ ...globalStyle.centerContainer, paddingTop: 30 }}>
      <View
        style={{
          ...styles.root,
          // borderWidth: 1,
          borderColor:
            hasError && !!!image ? colors.error : colors.neutral_grey,
        }}
      >
        {!!image ? (
          <View
            style={{
              // position: 'relative',
              borderRadius: 10,
              elevation: 5,
              backgroundColor: colors.white,
              flex: 1,
            }}
          >
            {renderImage(image)}
            <TouchableOpacity
              style={{ position: "absolute", right: 0 }}
              onPress={cleanupImages}
            >
              <CrossIcon fill={colors.neutral_dark} height={25} width={25} />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-around",
              borderRadius: 10,
              // borderWidth: 1,
              elevation: 5,
              backgroundColor: colors.white,
            }}
          >
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => pickSingleWithCamera(true)}
            >
              <FastImage
                source={require("../../assets/others/camera.gif")}
                style={{ width: screenWidth / 8, height: screenWidth / 8 }}
              />
              <Spacer spacing={10} />
              <TextField style={styles.text}>Capture Picture</TextField>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: screenWidth / 2.75,
    width: screenWidth / 2,
    // borderRadius: 10,
    // elevation: 5
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    marginBottom: 10,
  },
  text: {
    color: colors.gray,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconButton: {
    // borderRadius: 8,
    alignItems: "center",
  },
});
