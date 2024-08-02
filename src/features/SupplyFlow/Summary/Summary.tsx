import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Spacer } from "../../../components/common/Spacer";
import dayjs from "dayjs";
import { colors } from "../../../globals/colors";
import { TextField } from "../../../components/TextField/TextField";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "../../../globals/themes";
import Button from "../../../components/Button/Button";
import { globalStyle } from "../../../globals/globalStyles";
import CongratulationsModal from "../../../components/CongratulationsModal/CongratulationsModal";
import store, { useAppDispatch } from "../../../redux/store";
import { postOrderReturnActions } from "../../../redux/actions/combineAction";
import { useSelector } from "react-redux";
import {
  selectPostOrderReturnSuccess,
  selectProfile,
} from "../../../redux/selectors";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import CongratulationScreen from "../../CongratulationScreen/CongratulationScreen";
import { FastImage } from "../../../components/image";
import { axiosInstance } from "../../../helpers/axiosHelper";
import toast from "../../../services/toast";
import {
  playPause,
  releaseAudio,
  initializeAudio,
} from "../../../utils/soundUtils";
import { routes } from "@src/navigation/routes";
import InfoScreen from "@src/features/CongratulationScreen/InfoScreen";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export const Summary = ({ navigation, route }) => {
  const postSuccess = useSelector(selectPostOrderReturnSuccess);

  const { postData } = route?.params;

  const state = store.getState();
  const pickupPointName =
    state.franchisee.pickupPointDetails?.personalDetails?.name;
  const pickupPointAddress = state.franchisee.pickupPointDetails?.address;

  const profileData = useSelector(selectProfile);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);

  const [orderId, setOrderId] = useState();
  const [isInfoModalVisible, setisInfoModalVisible] = useState(false);

  useEffect(() => {
    initializeAudio();
    return () => {
      releaseAudio();
    };
  }, []);

  useEffect(() => {
    console.log(postSuccess);
    postSuccess && setisModalVisible(true);
  }, [postSuccess]);

  const _onRequestClose = () => {
    setisInfoModalVisible(false);
    setisModalVisible(false);

    dispatch(
      postOrderReturnActions.update({ success: false, successData: {} })
    );
    navigation.navigate("Receipt", {
      postData,
      orderId,
    });
  };

  const _onRequestCloseInfo = () => {
    setisInfoModalVisible(false);
  };

  const _onConfirmPress = () => {
    setIsLoading(true);

    axiosInstance
      .post("order", postData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res, "SUPPLY_RES");
          setOrderId(res?.data?.data?.orderId);
          setisInfoModalVisible(false);
          setisModalVisible(true);
          setIsLoading(false);
          playPause();
        } else {
          setisInfoModalVisible(false);
          setIsLoading(false);
          playPause();

          // toast.danger({ message: "Something went wrong!" });
          // setIsLoading(false);
        }
      })
      .catch((err) => {
        setisModalVisible(true);
        setIsLoading(false);
        playPause();

        // console.log(err);
        // toast.danger({ message: "Something went wrong!" });
        // setIsLoading(false);
      });
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{ paddingVertical: MEDIUM_PADDING_SIZE }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainContainer}>
        <View style={styles.dropDownView}>
          <TextField
            style={{
              color: colors.primary,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            From Facility :
          </TextField>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#E0E0E0",
              marginVertical: HALF_MEDIUM_PADDING_SIZE / 2,
            }}
          />
          <View>
            <View style={styles.dataRow}>
              <TextField style={styles.dataLeft}>Name :</TextField>
              <TextField style={styles.dataRightBold}>
                {pickupPointName}
              </TextField>
            </View>
          </View>
          <View>
            {pickupPointAddress && (
              <View style={styles.dataRow}>
                <TextField style={styles.dataLeft}>Address :</TextField>
                <TextField style={styles.dataRightBold}>
                  {pickupPointAddress?.street}, {pickupPointAddress?.country}
                </TextField>
              </View>
            )}
          </View>
        </View>
        <Spacer spacing={10} />
        <View style={styles.dropDownView}>
          <TextField
            style={{
              color: colors.primary,
              fontWeight: "bold",
            }}
          >
            Material Info :
          </TextField>

          <View style={{ marginVertical: 15 }}>
            <View
              style={{
                paddingVertical: 10,
                backgroundColor: colors.primary,
                justifyContent: "center",
                paddingHorizontal: 15,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <TextField style={{ color: "white" }}>
                {postData?.data.length ? postData.data[0].categoryName : ""}
              </TextField>
            </View>
            <View
              style={[
                { flexDirection: "row", justifyContent: "space-between" },
                {
                  backgroundColor: colors.cardColor,
                  paddingVertical: 10,
                  paddingLeft: 20,
                },
              ]}
            >
              <TextField
                style={[styles.dataLeft, { flex: 0.6, fontWeight: "bold" }]}
              >
                Item
              </TextField>
              <TextField
                style={{ flex: 0.3, textAlign: "center", fontWeight: "bold" }}
              >
                Qty(kg)
              </TextField>
            </View>
            {postData?.data.length && postData?.data[0].items?.length ? (
              postData?.data[0].items.map((item) => (
                <View
                  style={[
                    { flexDirection: "row", justifyContent: "space-between" },
                    {
                      paddingVertical: 10,
                      paddingLeft: 20,
                    },
                  ]}
                >
                  <TextField style={[styles.dataLeft, { flex: 0.6 }]}>
                    {item.itemName}
                  </TextField>
                  <TextField style={{ flex: 0.3, textAlign: "center" }}>
                    {item.quantity}
                  </TextField>
                </View>
              ))
            ) : (
              <></>
            )}
          </View>
        </View>
        <Spacer spacing={10} />

        <View style={styles.dropDownView}>
          <TextField
            style={{
              color: colors.primary,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            To Facility :
          </TextField>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#E0E0E0",
              marginVertical: HALF_MEDIUM_PADDING_SIZE / 2,
            }}
          />
          <View>
            <View style={styles.dataRow}>
              <TextField style={styles.dataLeft}>Name :</TextField>
              <TextField style={styles.dataRightBold}>
                {postData?.recyclerInfo?.label ||
                  postData?.customerNew?.customerName}
              </TextField>
            </View>
          </View>
          {!postData?.customerId ? (
            <View>
              <View style={styles.dataRow}>
                <TextField style={styles.dataLeft}>Address :</TextField>
                <TextField style={styles.dataRightBold}>
                  {postData?.recyclerInfo &&
                    postData.recyclerInfo?.address?.street +
                      ", " +
                      postData.recyclerInfo?.address?.country}
                </TextField>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
        <Spacer spacing={15} />
        {postData?.images &&
          postData?.images.map((each) => (
            <>
              {/* <TextField style={{ color: colors.dark, marginBottom: 5 }}>
                Registration Plate Image
              </TextField>
              <View
                style={{
                  borderWidth: 0.5,
                  marginBottom: 5,
                  backgroundColor: colors.dark,
                }}
              /> */}
              <FastImage
                source={{ uri: each }}
                resizeMode="contain"
                style={{
                  height: 200,
                }}
              />
              <Spacer spacing={10} />
            </>
          ))}

        <Button
          title={"Save"}
          onPress={() => setisInfoModalVisible(true)}
          disabled={isLoading}
        >
          {isLoading && <LoadingIndicator activityColor="white" />}
        </Button>
      </View>
      <CongratulationsModal
        modalVisible={isModalVisible}
        onRequestClose={_onRequestClose}
      >
        <CongratulationScreen
          onRequestClose={_onRequestClose}
          heading=""
          message={"The material has been successfully dispatched."}
          bottomContent={
            <View style={{ ...globalStyle.container }}>
              <Button
                style={{
                  width: "80%",
                  backgroundColor: colors.white,
                  borderColor: colors.secondary,
                  borderWidth: 1,
                }}
                textStyle={{ color: colors.secondary }}
                title={"Ok"}
                onPress={_onRequestClose}
              />
            </View>
          }
        />
      </CongratulationsModal>

      <CongratulationsModal
        modalVisible={isInfoModalVisible}
        onRequestClose={_onRequestCloseInfo}
      >
        <InfoScreen
          onRequestClose={_onRequestCloseInfo}
          heading=""
          message={
            "The material will be marked in-transit. The inventory will reduce after the delivery is confirmed at the receiving facility"
          }
          bottomContent={
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "48%" }}>
                <Button
                  style={{
                    backgroundColor: colors.green,
                  }}
                  textStyle={{ color: colors.white }}
                  title={"Confirm"}
                  onPress={_onConfirmPress}
                >
                  {isLoading && <LoadingIndicator activityColor="white" />}
                </Button>
              </View>
              <View style={{ width: "48%" }}>
                <Button
                  style={{
                    backgroundColor: colors.error,
                  }}
                  textStyle={{ color: colors.white }}
                  title={"Abort"}
                  onPress={_onRequestCloseInfo}
                />
              </View>
            </View>
          }
        />
      </CongratulationsModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignContent: "center",
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },

  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  dataLeft: { width: "25%", textAlign: "left" },
  dataRightBold: {
    width: "70%",
    textAlign: "right",
    fontWeight: "bold",
  },
  dataRight: {
    width: "55%",
    textAlign: "right",
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
