import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { Spacer } from "@src/components/common/Spacer";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { RegisterFormContainer } from "@src/container/formContainer/RegisterFormContainer";
import { colors } from "@src/globals/colors";
import { BORDER_RADIUS_SIZE } from "@src/globals/themes";
import TopShadowView from "../Components/TopShadowView";
import { CardLayout } from "@src/components/Layouts/CardLayout";
import LogoContainer from "../Components/LogoContainer";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import TitleLogoView from "../Components/TitleLogoView";

interface Props {
  navigation?: any;
  route?: any;
}

export const RegisterScreen = ({ navigation, route }: Props) => {
  const { mobile, prefix, country } = route.params;
  console.log(mobile, "mobile");
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
          <View style={styles.rootContainer}>
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
                    backgroundColor: colors.primary,
                  }}
                />
                <View
                  style={{
                    flex: 0.4,
                    marginHorizontal: 5,
                    height: 10,
                    borderRadius: BORDER_RADIUS_SIZE,
                    backgroundColor: colors.grayTwo,
                  }}
                />
              </View>
              <TitleLogoView
                title={"Collection Centre Application"}
                desc={"Join our community of collectors."}
                titleSize={24}
              />

              <View style={{ alignSelf: "flex-start" }}>
                <TextBold>Personal Information</TextBold>
                <Spacer spacing={3} />
                <TextField style={{ color: colors.gray }}>
                  Tell us more about yourself.
                </TextField>
                <Spacer spacing={15} />
              </View>

              <RegisterFormContainer
                mobile={mobile}
                country={country}
                prefix={prefix}
              />
              <Spacer spacing={10} />
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <TextField>Back to </TextField>
                <Pressable
                  style={{ justifyContent: "center", alignItems: "center" }}
                  onPress={() => navigation.navigate("login")}
                >
                  <TextField
                    style={{
                      textDecorationLine: "underline",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </TextField>
                </Pressable>
              </View>
              <Spacer spacing={10} />
            </View>
          </View>
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
});
