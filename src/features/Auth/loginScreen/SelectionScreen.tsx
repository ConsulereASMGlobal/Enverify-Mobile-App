import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { Spacer } from "@src/components/common/Spacer";
import { SelectionForm } from "@src/container/formContainer/SelectionForm";
import { colors } from "@src/globals/colors";
import { REGULAR_PADDING_SIZE } from "@src/globals/themes";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import LogoContainer from "../Components/LogoContainer";
import TopShadowView from "../Components/TopShadowView";
import TitleLogoView from "../Components/TitleLogoView";
import { TextField } from "@src/components/TextField/TextField";
import { authActions, resetSelections } from "@src/redux/actions/combineAction";
import { persistor } from "@src/redux/store";
import { useDispatch } from "react-redux";

export const SelectionScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

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
            title="Select Facility"
            desc="Let's sign in and continue the journey to a greener tomorrow!"
          />
          <View style={{ width: "100%", flex: 1 }}>
            <SelectionForm />
            <Spacer spacing={25} />
            <Pressable
              style={{ alignSelf: "center" }}
              onPress={() => {
                dispatch(authActions.logout());
                persistor.purge();
                dispatch(resetSelections());
              }}
            >
              <TextField
                style={{
                  color: colors.secondary,
                  textDecorationLine: "underline",
                }}
              >
                Go back to login.
              </TextField>
            </Pressable>
          </View>
        </View>
      </ScrollContainerLayout>
    </>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: REGULAR_PADDING_SIZE,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
