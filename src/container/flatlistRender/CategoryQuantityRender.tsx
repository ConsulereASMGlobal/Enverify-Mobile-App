import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FastImage } from "../../components/image";
import { colors } from "../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  screenWidth,
} from "../../globals/themes";
import { Spacer } from "../../components/common/Spacer";
import { TextMedium } from "@src/components/TextField/TextField";
import TooltipComp from "@src/components/TooltipComp/TooltipComp";

interface CategoryQuantityRenderProps {
  item: any;
  onPress: () => void;
  // index: number;
  // _onChangeNumber: (text: string, type: string, index: number) => void;
}

export const CategoryQuantityRender = ({
  item,
  onPress,
}: // index,
// _onChangeNumber,
CategoryQuantityRenderProps) => {
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={onPress}
      // disabled={item.title !== 'Plastic'}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            backgroundColor: colors.primaryBG,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FastImage
            source={{ uri: item?.icon }}
            style={styles.Icon}
            resizeMode={"contain"}
          />
        </View>
        <Spacer spacing={5} />

        <TextMedium style={styles.textTitle}>{item?.name}</TextMedium>
        {(item?.name === "PET" ||
          item?.name === "HDPE" ||
          item?.name === "PPE" ||
          item?.name === "LDPE" ||
          item?.name === "UBC") && (
          <View style={{ position: "absolute", top: -4, left: 30 }}>
            <TooltipComp
              children={
                <FastImage
                  source={
                    item?.name === "PET"
                      ? require("../../assets/tooltip/PET.png")
                      : item?.name === "HDPE"
                      ? require("../../assets/tooltip/HDPE.png")
                      : item?.name === "PPE"
                      ? require("../../assets/tooltip/PPE.png")
                      : item?.name === "LDPE"
                      ? require("../../assets/tooltip/LDPE.png")
                      : require("../../assets/tooltip/UBC.jpeg")
                  }
                  style={{ width: 225, height: 220 }}
                  resizeMode="contain"
                />
              }
              tooltipPosition={"top"}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    // height: 190,
    // width: screenWidth / 2.4,
    // justifyContent: "center",
    borderRadius: BORDER_RADIUS_SIZE,
    marginVertical: HALF_MEDIUM_PADDING_SIZE,
    marginHorizontal: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.white,
    borderColor: "#EDEDED",
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  Icon: {
    height: 30,
    width: 30,
  },
  textTitle: {
    // marginTop: MEDIUM_PADDING_SIZE,
  },
});
