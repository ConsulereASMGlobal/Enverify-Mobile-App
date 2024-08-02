import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Keyboard } from "react-native";

import { Spacer } from "@src/components/common/Spacer";
import { TextMedium } from "@src/components/TextField/TextField";
import { LoginFormContainer } from "@src/container/formContainer/LoginFormContainer";
import { colors } from "@src/globals/colors";
import { REGULAR_PADDING_SIZE } from "@src/globals/themes";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import LogoContainer from "../Components/LogoContainer";
import TopShadowView from "../Components/TopShadowView";
import TitleLogoView from "../Components/TitleLogoView";

export const LoginScreen = ({ navigation, route }: any) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  // const { recycler } = route.params;
  // console.log(recycler, "recycler");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <ScrollContainerLayout
        topBgColor={colors.secondary}
        btmBgColor={colors.white}
        contentStyle={{ flex: 1 }}
        scrollBgColor={colors.secondary}
      >
        <LogoContainer />
        <TopShadowView />
        <View style={styles.rootContainer}>
          <TitleLogoView
            title="Login"
            desc="Let's sign in and continue the journey to a greener tomorrow!"
          />
          <View style={{ width: "100%", flex: 1 }}>
            {/* <LoginFormContainer recycler={recycler} /> */}
            <LoginFormContainer />
            <Spacer spacing={15} />

            {/* <View style={styles.registerRow}>
              <TextMedium>Don't have an account? </TextMedium>

              <Pressable
                style={styles.registerBtn}
                onPress={() =>
                  navigation.navigate("sendOtp", {
                    heading: "Create an account",
                    subheading:
                      "Create an account to get started on your journey.",
                    routeFrom: "register",
                  })
                }
              >
                <TextMedium
                  style={{
                    color: colors.primary,
                  }}
                >
                  Register
                </TextMedium>
              </Pressable>
            </View> */}
            {/* {!keyboardOpen && (
              <View style={styles.row}>
                <FastImage
                  source={require('../../../assets/others/poweredbyasm.png')}
                  resizeMode="contain"
                  style={styles.poweredbyImage}
                />
              </View>
            )} */}
          </View>
        </View>
      </ScrollContainerLayout>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 1,
  },

  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: REGULAR_PADDING_SIZE,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  poweredbyImage: {
    height: 30,
    width: 160,
  },

  row: {
    alignItems: "center",
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
  },

  registerRow: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  registerBtn: { justifyContent: "center", alignItems: "center" },
});
