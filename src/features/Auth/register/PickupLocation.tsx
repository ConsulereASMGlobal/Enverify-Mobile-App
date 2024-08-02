import React from "react";
import { View, StyleSheet } from "react-native";

import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import LogoContainer from "../Components/LogoContainer";
import TopShadowView from "../Components/TopShadowView";
import { CardLayout } from "@src/components/Layouts/CardLayout";
import TitleLogoView from "../Components/TitleLogoView";
import { colors } from "@src/globals/colors";
import { BORDER_RADIUS_SIZE, MEDIUM_PADDING_SIZE } from "@src/globals/themes";
import { TextField } from "@src/components/TextField/TextField";
import { Spacer } from "@src/components/common/Spacer";
import { PickupFormContainer } from "@src/container/formContainer/PickupFormContainer";
import Button from "@src/components/Button/Button";

interface Props {
  navigation?: any;
  route?: any;
}

export const PickupLocation = ({ navigation, route }: Props) => {
  const { regdata } = route.params;
  console.log(regdata, "nextstep");
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
                    backgroundColor: colors.primary,
                  }}
                />
              </View>

              <TitleLogoView
                title={"Collection Centre Application"}
                desc={
                  " Join our community of collectors and start earning more."
                }
                titleSize={24}
              />
              <View style={{ alignSelf: "flex-start" }}>
                <TextField
                  style={{
                    fontWeight: "bold",
                    color: colors.secondary,
                  }}
                >
                  Collection point address
                </TextField>
                <Spacer spacing={3} />
                <TextField style={{ color: colors.gray }}>
                  This is where we will pick-up the plastics
                </TextField>
                <Spacer spacing={10} />
              </View>

              <PickupFormContainer regdata={regdata} />
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
  },
});
