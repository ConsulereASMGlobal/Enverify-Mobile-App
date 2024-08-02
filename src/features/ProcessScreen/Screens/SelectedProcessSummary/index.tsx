import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import {
  initializeAudio,
  playPause,
  releaseAudio,
} from "@src/utils/soundUtils";
import { orderAPI } from "@src/services/api";
import toast from "@src/services/toast";
import { routes } from "@src/navigation/routes";
import { colors } from "@src/globals/colors";
import { TextField } from "@src/components/TextField/TextField";
import {
  BORDER_RADIUS_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "@src/globals/themes";
import { Spacer } from "@src/components/common/Spacer";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import Button from "@src/components/Button/Button";
import CongratulationsModal from "@src/components/CongratulationsModal/CongratulationsModal";
import CongratulationScreen from "@src/features/CongratulationScreen/CongratulationScreen";
import { removeUnderscoreAndTitle } from "@src/utils/stringUtils";
import { globalStyle } from "@src/globals/globalStyles";
import InfoScreen from "@src/features/CongratulationScreen/InfoScreen";

export const SelectedProcessSummary = ({ route }) => {
  const navigation = useNavigation<any>();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isInfoModalVisible, setisInfoModalVisible] = useState(false);

  const { preSortData, outputList, process } = route.params;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeAudio();
    return () => {
      releaseAudio();
    };
  }, []);
  console.log(preSortData, ":::");

  const onSubmit = () => {
    const postData = { ...preSortData };
    postData.inputMaterialTypeId = preSortData?.inputMaterialTypeId?.id;

    setLoading(true);

    orderAPI.postProduction(postData).then((res) => {
      setLoading(false);
      if (res?.data) {
        setisInfoModalVisible(false);
        setisModalVisible(true);
        playPause();
      } else {
        setisInfoModalVisible(false);
        toast.danger({ message: "Try again!" });
        return;
      }
    });

    // setLoading(false);
    // setisModalVisible(true);
    // playPause();
  };
  const _onRequestClose = () => {
    navigation.navigate(routes.bottomTabs.home);
    setisModalVisible((prevState) => !prevState);
  };

  const _onRequestCloseInfo = () => {
    setisInfoModalVisible((prevState) => !prevState);
  };

  return (
    <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.box}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextField
                style={[
                  {
                    color: colors.neutral_dark,
                    fontSize: 18,
                    fontWeight: "bold",
                  },
                ]}
              >
                Production
              </TextField>

              <View
                style={{
                  backgroundColor:
                    process?.processType === "DIVERSION"
                      ? colors.green
                      : colors.primaryLight2,
                  paddingHorizontal: 12,
                  paddingVertical: 3,
                  borderRadius: 92 / 2,
                  overflow: "hidden",
                }}
              >
                <TextField
                  style={[
                    {
                      color:
                        process?.processType === "DIVERSION"
                          ? colors.white
                          : colors.dark,
                      fontSize: 12,
                    },
                  ]}
                >
                  {removeUnderscoreAndTitle(process?.processType)}
                </TextField>
              </View>
            </View>
            <Spacer spacing={4} />
            <View style={styles.rowCont}>
              <TextField>Process</TextField>
              <TextField style={styles.rightText}>
                {preSortData?.processName}
              </TextField>
            </View>

            <View style={styles.rowCont}>
              <TextField>Date</TextField>
              <TextField style={styles.rightText}>
                {dayjs(Date.now()).format("DD/MM/YYYY")}
              </TextField>
            </View>
            {preSortData?.operatingHours && (
              <View style={styles.rowCont}>
                <TextField>Operating Hours</TextField>
                <TextField style={styles.rightText}>
                  {preSortData?.operatingHours}
                </TextField>
              </View>
            )}
            {preSortData?.teamSize && (
              <View style={styles.rowCont}>
                <TextField>Crew Size</TextField>
                <TextField style={styles.rightText}>
                  {preSortData?.teamSize}
                </TextField>
              </View>
            )}
          </View>
          <Spacer spacing={10} />

          <View style={styles.bottomBox}>
            <View>
              <View style={styles.headingBox}>
                <TextField style={styles.headingText}>Input Material</TextField>
                <TextField style={styles.headingText}>QTY</TextField>
              </View>
              <Spacer spacing={3} />
              {preSortData?.inputMaterial.map((res) => (
                <View style={styles.eachListBox}>
                  <TextField style={styles.listText}>
                    {res?.inputMaterialName}
                  </TextField>
                  <TextField style={styles.listText}>
                    {res?.inputQuantity}
                  </TextField>
                </View>
              ))}
            </View>

            <Spacer spacing={20} />

            {preSortData?.productionItem || preSortData.wastage ? (
              <View>
                <View style={styles.headingBox}>
                  <TextField style={styles.headingText}>
                    Output Material
                  </TextField>
                  <TextField style={styles.headingText}>QTY</TextField>
                </View>
                <Spacer spacing={3} />
                {Object.entries(preSortData?.productionItem).map(
                  ([key, value]) => (
                    <View style={styles.eachListBox} key={key}>
                      <TextField style={styles.listText}>
                        {outputList?.find((each) => each.id === key)?.name}
                      </TextField>
                      <TextField style={styles.listText}>
                        {value ?? value}
                      </TextField>
                    </View>
                  )
                )}
                {preSortData.wastage ? (
                  <View style={styles.eachListBox} key={"wastage"}>
                    <TextField style={styles.listText}>Wastage</TextField>
                    <TextField style={styles.listText}>
                      {preSortData.wastage}
                    </TextField>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            ) : (
              <></>
            )}
            <Spacer spacing={15} />

            <TextField
              style={{
                textAlign: "right",
                fontSize: 14,
                color: colors.primary,
              }}
            >
              Note: All quantity in Kgs
            </TextField>
          </View>
          <Spacer spacing={10} />

          {/* <Button onPress={() => } title={"Save"}> */}
          <Button
            onPress={() =>
              process?.processType === "DIVERSION"
                ? setisInfoModalVisible(true)
                : onSubmit()
            }
            title={"Save"}
          >
            {loading && <LoadingIndicator activityColor="white" />}
          </Button>
          <Spacer spacing={10} />
        </View>
      </ScrollView>

      <CongratulationsModal
        modalVisible={isModalVisible}
        onRequestClose={_onRequestClose}
      >
        <CongratulationScreen
          onRequestClose={_onRequestClose}
          heading=""
          message={`Production Record Updated.`}
          bottomContent={
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button title={"Done"} onPress={_onRequestClose} />
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
          message={`The material will be declared diverted as per RA 11898 and the inventory will be reduced instantly.`}
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
                  onPress={() => onSubmit()}
                >
                  {loading && <LoadingIndicator activityColor="white" />}
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
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: REGULAR_PADDING_SIZE,
    marginVertical: 15,
  },
  box: {
    borderRadius: BORDER_RADIUS_SIZE,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    marginTop: 15,
    width: "100%",
  },
  rowCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rightText: {
    marginVertical: 3,
    width: "55%",
    textAlign: "right",
  },

  bottomBox: {
    borderRadius: BORDER_RADIUS_SIZE,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    width: "100%",
  },
  headingBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  headingText: {
    color: colors.white,
    fontWeight: "bold",
  },
  eachListBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,

    borderColor: colors.borderColor,
  },
  listText: { color: colors.neutral_dark },
});
