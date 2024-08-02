import React from "react";
import { View, StyleSheet, Pressable, BackHandler } from "react-native";
import { Spacer } from "../../../components/common/Spacer";
import { useFocusEffect } from "@react-navigation/native";

import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import LogoContainer from "../Components/LogoContainer";
import TopShadowView from "../Components/TopShadowView";
import { CardLayout } from "@src/components/Layouts/CardLayout";
import { colors } from "@src/globals/colors";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import { TextField } from "@src/components/TextField/TextField";
import { FastImage } from "@src/components/image";
import Button from "@src/components/Button/Button";
import { BORDER_RADIUS_SIZE, MEDIUM_PADDING_SIZE } from "@src/globals/themes";

export const ApplicationSubmitted = ({ navigation }: any) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("login");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const onSubmit = () => {
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
                alignItems: "center",
                paddingTop: 20,
                flex: 1,
              }}
            >
              <Pressable
                style={{ flex: 0.5 }}
                onPress={() => navigation.navigate("login")}
              >
                <DynamicIcon
                  iconFamily="MaterialCommunityIcons"
                  iconName="close"
                  iconSize={24}
                  iconColor={colors.dark}
                />
              </Pressable>
              <View style={{}}>
                <TextField
                  style={{ fontSize: 20, fontWeight: "bold", lineHeight: 22 }}
                >
                  Application Submitted
                </TextField>
              </View>
            </View>

            <Spacer spacing={20} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                flex: 1,
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
            <Spacer spacing={20} />
            <FastImage
              source={require("../../../assets/gifs/correct.gif")}
              resizeMode="contain"
              style={styles.imageStyle}
            />
            <Spacer spacing={20} />

            <View style={{ alignItems: "center", flex: 1 }}>
              <TextField
                style={{
                  fontWeight: "bold",
                  fontSize: 24,
                  lineHeight: 30,
                  color: colors.secondary,
                  textAlign: "center",
                }}
              >
                Thank you for registering the collection point.
              </TextField>
              <Spacer spacing={7} />
              <TextField style={{ color: colors.gray, textAlign: "center" }}>
                You can now access the app using your sign in information.
              </TextField>
              <Spacer spacing={7} />

              <TextField style={{ color: colors.gray }}>Mabuhay!</TextField>
              <Spacer spacing={10} />
            </View>
            <Spacer spacing={40} />

            <View style={{ flex: 1 }}>
              <Button
                onPress={() => onSubmit()}
                title={"Done"}
                style={{ backgroundColor: colors.primary }}
                rippleColor={colors.darkBlue}
              />
            </View>
            <Spacer spacing={20} />
          </View>
        </CardLayout>
      </View>
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 150,
    width: 200,
    alignSelf: "center",
  },
  mainContainer: {
    width: "100%",
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    flex: 1,
  },
});
