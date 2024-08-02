import React, { ReactNode, useRef, useState } from "react";
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Picker from "react-native-image-crop-picker";
import BottomSheet from "../AnimatedActionSheet/AnimatedButtomSheet";
import { colors } from "../../globals/colors";
import { DynamicIcon } from "../../utils/Dynamic/DynamicIcon";
import { Row } from "../common/Row";
import { TextField } from "../TextField/TextField";
import { SVGRenderer } from "../common/SVGRenderer/SvgRenderer";
import Marker, { ImageFormat, Position } from "react-native-image-marker";
import Geolocation from "@react-native-community/geolocation";
import {
  epochToHumanReadable,
  epochToHumanReadableTime,
} from "../../utils/dateUtils";
import { isAndroid } from "../../globals/globalStyles";
import ImagePicker from "react-native-image-crop-picker";
import { Image as ComImage } from "react-native-compressor";
import { FastImage } from "../image";

type ImagePickerProps = {
  setImages: Function;
  title?: string;
  children?: ReactNode;
};
export const screenWidth = Dimensions.get("window").width;

const requestCameraPermision = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Extended Resources App Camera Permission",
        message:
          "Extended Resources App needs access to your camera " +
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

export const MultiImagePicker = ({ setImages }: ImagePickerProps) => {
  const bottomSheetRef: any = useRef();

  const [loc, setLoc] = useState();
  Geolocation.getCurrentPosition((info) => {
    setLoc(info.coords.latitude + ", " + info.coords.longitude);
  });

  const date =
    epochToHumanReadable(new Date()) +
    " " +
    epochToHumanReadableTime(new Date());

  const pickFromGallery = () => {
    Picker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: "photo",
      compressImageQuality: 0.2,
    }).then(async (image) => {
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
              position: Position.bottomCenter,
            },
            style: {
              color: "#fff",
              fontName: "STSongti-SC-Regular",
              fontSize: 10,
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
        .then(async (res) => {
          if (Platform.OS === "ios") {
            const resulted = await ComImage.compress("file:///" + res);
            setImages((prev: any) => [...prev, resulted ?? ""]);

            bottomSheetRef.current.close();
          } else {
            setImages((prev: any) => [...prev, "file:///" + res ?? ""]);

            bottomSheetRef.current.close();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const pickFromCamera = async () => {
    try {
      isAndroid && (await requestCameraPermision());
      const res = await ImagePicker.openCamera({
        mediaType: "photo",
        multiple: false,
        cropping: true,
        width: 500,
        includeExif: true,
        height: 500,
        compressImageQuality: 0.2,
      });
      console.log(res.size);
      const options = {
        backgroundImage: {
          src: res?.path,
          scale: 1,
          alpha: 1,
        },
        watermarkTexts: [
          {
            text: date + "\n" + loc,
            positionOptions: {
              position: Position.bottomCenter,
            },
            style: {
              color: "#fff",
              fontSize: 10,
              fontName: "STSongti-SC-Regular",
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
        quality: 100,
      };
      await Marker.markText(options)
        .then(async (res) => {
          const resulted = "file:///" + res;
          if (Platform.OS === "ios") {
            const compressed = await ComImage.compress("file:///" + res);
            const response = await fetch(compressed);
            const blob = await response.blob();
            const fileSizeInBytes = blob.size;
            const fileSizeInKB = fileSizeInBytes / 1024;
            const fileSizeInMB = fileSizeInKB / 1024;

            console.log(`Image size: ${fileSizeInKB} KB (${fileSizeInMB} MB)`);
            setImages((prev: any) => [...prev, compressed]);
            bottomSheetRef.current.close();
          } else {
            setImages((prev: any) => [...prev, resulted]);
            bottomSheetRef.current.close();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("error ===", error);
    }
  };

  const renderBottomSheetContent = () => (
    <SafeAreaView style={styles.root}>
      <View style={styles.pin} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <TextField>Select an option to upload image</TextField>
        <Row
          style={{
            alignItems: "center",
            justifyContent: "space-evenly",
            width: screenWidth,
            padding: 20,
          }}
        >
          <View>
            <TouchableOpacity
              onPress={pickFromCamera}
              style={{
                ...styles.pickOptionContainer,
                backgroundColor: colors.borderColor,
              }}
            >
              <DynamicIcon
                iconName="add-a-photo"
                iconFamily="MaterialIcons"
                iconSize={40}
                iconColor={colors.primary}
              />
            </TouchableOpacity>
            <TextField
              style={{ textAlign: "center", marginTop: 5, fontSize: 14 }}
            >
              Camera
            </TextField>
          </View>

          <View>
            <TouchableOpacity
              onPress={pickFromGallery}
              style={{
                ...styles.pickOptionContainer,
                backgroundColor: colors.borderColor,
              }}
            >
              <DynamicIcon
                iconName="add-photo-alternate"
                iconFamily="MaterialIcons"
                iconSize={40}
                iconColor={colors.primary}
              />
            </TouchableOpacity>
            <TextField
              style={{ textAlign: "center", marginTop: 5, fontSize: 14 }}
            >
              Gallery
            </TextField>
          </View>
        </Row>
      </View>
    </SafeAreaView>
  );

  return (
    <View>
      <SVGRenderer
        // style={styles.pickContainer}
        onPress={() => bottomSheetRef.current.open()}
      >
        <View style={styles.nonSelectedView}>
          <View
            style={{
              backgroundColor: colors.primaryBG,
              padding: 12,
              borderRadius: 100,
            }}
          >
            <FastImage
              source={require("../../assets/img/camera.gif")}
              style={{ width: 20, height: 20, borderRadius: 6 }}
            />
          </View>
          <TextField style={{ fontSize: 12 }}>Add Image</TextField>
        </View>
      </SVGRenderer>

      <BottomSheet
        ref={bottomSheetRef}
        renderContent={renderBottomSheetContent}
        visibleHeight={250}
        onClose={() => console.log("bottomSheet closed!")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "white",
  },

  pin: {
    height: 4,
    width: 50,
    backgroundColor: colors.gray,
    marginTop: 12,
    borderRadius: 10,
  },
  nonSelectedView: {
    // height: 50,
    backgroundColor: colors.white,
    borderRadius: 6,
    alignItems: "center",
    // justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    gap: 10,
    padding: 20,
    // width: "200%",
  },
  pickContainer: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  pickOptionContainer: {
    padding: 25,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
