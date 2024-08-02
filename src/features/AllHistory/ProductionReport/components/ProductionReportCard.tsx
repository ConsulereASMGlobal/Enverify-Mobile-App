import React from "react";
import { View, StyleSheet } from "react-native";

import { Spacer } from "@src/components/common/Spacer";
import { TextField, TextMedium } from "@src/components/TextField/TextField";
import { colors } from "@src/globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "@src/globals/themes";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { totalProdOut, truncateToTwoDecimalPlaces } from "@src/utils/getSum";
import ProductionReportIcon from "@src/assets/MoreScreenIcons/ProductionReportIcon";
import { removeUnderscoreAndTitle } from "@src/utils/stringUtils";

const ProductionReportCard = ({ item, detail }: any) => {
  return (
    <View>
      <View style={styles.rowContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField>Batch ID : {item?.productionId}</TextField>
          <View
            style={{
              backgroundColor:
                item?.processType === "Diversion" ||
                item?.processType === "DIVERSION"
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
                    item?.processType === "Diversion" ||
                    item?.processType === "DIVERSION"
                      ? colors.white
                      : colors.dark,
                  fontSize: 12,
                },
              ]}
            >
              {removeUnderscoreAndTitle(item?.processType)}
            </TextField>
          </View>
        </View>
      </View>
      <Spacer spacing={7} />
      <View style={styles.horizontalLine} />
      <Spacer spacing={7} />
      <View style={styles.boxInternalRow}>
        {/* <View style={{ flex: 0.5 }}>
          <View style={styles.circleView}>
            <ProductionReportIcon size={20} color={colors.secondary} />
          </View>
        </View> */}
        <View style={{ flex: 4 }}>
          <View style={styles.rowContainer}>
            <TextField style={{ fontSize: 12, color: colors.darkGray }}>
              {`${epochToHumanReadable(item?.createdAt)}`}
            </TextField>
          </View>
          <Spacer spacing={2} />

          <>
            <View style={styles.rowContainer}>
              <TextField>Production Date :</TextField>
              <TextField>{epochToHumanReadable(item?.productionId)}</TextField>
            </View>

            <Spacer spacing={5} />
            <View style={styles.rowContainer}>
              <TextField>Process :</TextField>
              <TextField>{item?.processName || "N/A"}</TextField>
            </View>
            <Spacer spacing={5} />
            <View style={styles.rowContainer}>
              <TextField>Input Quantity :</TextField>
              <TextField>
                {`${truncateToTwoDecimalPlaces(item?.inputQuantity)} KG`}
              </TextField>
            </View>
            <Spacer spacing={5} />
            <View style={styles.rowContainer}>
              <TextField>Output Quantity :</TextField>
              <TextField>
                {item?.productionItemDetails.length
                  ? truncateToTwoDecimalPlaces(
                      totalProdOut(item?.productionItemDetails)
                    )
                  : "N/A"}{" "}
                KG
              </TextField>
            </View>
            {detail && (
              <>
                <Spacer spacing={5} />
                <View style={styles.rowContainer}>
                  <TextField>Operation Hours :</TextField>
                  <TextField>{item?.operatingHours ?? "N/A"}</TextField>
                </View>
                <Spacer spacing={5} />

                <View style={styles.rowContainer}>
                  <TextField>Crew Size :</TextField>
                  <TextField>{item?.teamSize ?? "N/A"}</TextField>
                </View>
              </>
            )}
          </>

          {!detail && (
            <>
              <Spacer spacing={5} />
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  alignSelf: "flex-start",
                  borderRadius: 8,
                }}
              >
                <TextMedium style={{ color: colors.primary, fontSize: 14 }}>
                  View Details
                </TextMedium>
              </View>
            </>
          )}
        </View>
      </View>

      {detail && (
        <View>
          <Spacer spacing={10} />
          <View
            style={{
              height: 0.4,
              backgroundColor: colors.darkGray,
              marginHorizontal: -10,
            }}
          />
          <Spacer spacing={10} />

          <TextMedium>Input</TextMedium>
          <Spacer spacing={5} />

          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.secondary2,
              padding: HALF_MEDIUM_PADDING_SIZE,
              borderTopLeftRadius: BORDER_RADIUS_SIZE,
              borderTopRightRadius: BORDER_RADIUS_SIZE,
              paddingHorizontal: MEDIUM_PADDING_SIZE,
              justifyContent: "space-between",
            }}
          >
            <TextField
              style={{
                color: colors.white,
              }}
            >
              Material
            </TextField>
            <TextField
              style={{
                color: colors.white,
              }}
            >
              Qty
            </TextField>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: HALF_MEDIUM_PADDING_SIZE,
              paddingHorizontal: MEDIUM_PADDING_SIZE,
            }}
          >
            <TextMedium>{item?.inputMaterialName || "N/A"}</TextMedium>
            <TextMedium>
              {truncateToTwoDecimalPlaces(item?.inputQuantity)}
            </TextMedium>
          </View>
          <Spacer spacing={5} />
          <TextMedium>Output</TextMedium>
          <Spacer spacing={5} />
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.secondary2,
              padding: HALF_MEDIUM_PADDING_SIZE,
              borderTopLeftRadius: BORDER_RADIUS_SIZE,
              borderTopRightRadius: BORDER_RADIUS_SIZE,
              paddingHorizontal: MEDIUM_PADDING_SIZE,
              justifyContent: "space-between",
            }}
          >
            <TextField
              style={{
                color: colors.white,
              }}
            >
              Material
            </TextField>
            <TextField
              style={{
                color: colors.white,
              }}
            >
              Qty
            </TextField>
          </View>
          {item?.productionItemDetails.map((each: any) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: HALF_MEDIUM_PADDING_SIZE,
                paddingHorizontal: MEDIUM_PADDING_SIZE,
              }}
            >
              <TextMedium>{each?.itemName ?? "N/A"}</TextMedium>
              <TextMedium>
                {truncateToTwoDecimalPlaces(each?.quantity)}
              </TextMedium>
            </View>
          ))}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: HALF_MEDIUM_PADDING_SIZE,
              paddingHorizontal: MEDIUM_PADDING_SIZE,
            }}
          >
            <TextMedium>WASTAGE</TextMedium>
            <TextMedium>{truncateToTwoDecimalPlaces(item?.wastage)}</TextMedium>
          </View>

          <Spacer spacing={5} />

          <TextField
            style={{
              color: colors.secondary,
            }}
          >
            Note: All quantity in Kgs
          </TextField>
        </View>
      )}
    </View>
  );
};

export default ProductionReportCard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    backgroundColor: colors.backgroundColor,
  },
  flatlistContainerStyle: {
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },
  card: {
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: BORDER_RADIUS_SIZE,
    elevation: 5,
    padding: MEDIUM_PADDING_SIZE,
    marginBottom: 5,
  },
  circleView: {
    width: 36,
    height: 36,
    borderRadius: 92 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shaded,
    padding: 16,
    marginRight: 10,
  },
  statusView: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: 5,
    borderRadius: 92 / 2,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  horizontalLine: {
    height: 0.4,
    backgroundColor: colors.darkGray,
    marginHorizontal: -10,
  },
  boxInternalRow: {
    flexDirection: "row",
    gap: 10,
  },
});
