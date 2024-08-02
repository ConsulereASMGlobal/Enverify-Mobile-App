import React from "react";
import { View, StyleSheet } from "react-native";

import { Spacer } from "@src/components/common/Spacer";
import { FastImage } from "@src/components/image";
import { TextField, TextMedium } from "@src/components/TextField/TextField";
import { colors } from "@src/globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "@src/globals/themes";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { sumQuantity, truncateToTwoDecimalPlaces } from "@src/utils/getSum";
import ReceivedHistoryIcon from "@src/assets/MoreScreenIcons/ReceivedHistoryIcon";
import ReceiveSVG from "@src/assets/dashboardIcons/ReceiveSVG";
import SupplySVG from "@src/assets/dashboardIcons/SupplySVG";

const SupplyCard = ({ item, detail, history = false, flowFrom }: any) => {
  console.log(flowFrom, "from receive--------------");
  const allItemsWithCategory = item?.orderDetails?.flatMap((orderDetail: any) =>
    orderDetail.items.map((item: any) => ({
      categoryName: orderDetail.categoryName,
      ...item,
    }))
  );
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <TextField>Batch ID : {item.id}</TextField>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <View
            style={[
              styles.statusView,
              {
                backgroundColor:
                  item.status === "Completed"
                    ? colors.green
                    : item.status === "Created"
                    ? colors.primaryLight2
                    : colors.secondary2,
              },
            ]}
          >
            <TextField
              style={{
                color: item.status === "Created" ? colors.dark : colors.white,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              {item.status}
            </TextField>
          </View>
        </View>
      </View>
      <Spacer spacing={7} />
      <View
        style={{
          height: 0.4,
          backgroundColor: colors.darkGray,
          marginHorizontal: -10,
        }}
      />
      <Spacer spacing={7} />
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        {/* <View style={{ flex: 0.5 }}>
          <View style={styles.circleView}>
            {flowFrom === "ReceiveHistory" ? (
              <ReceivedHistoryIcon size={20} color={colors.secondary} />
            ) : flowFrom === "OrderConfirmation" ? (
              <ReceiveSVG size={20} color={colors.secondary} />
            ) : (
              <SupplySVG size={20} color={colors.secondary} />
            )}
          </View>
        </View> */}
        <View style={{ flex: 4 }}>
          <View style={styles.rowContainer}>
            <TextField>Facility Name :</TextField>
            <TextField style={{ width: "60%", textAlign: "right" }}>
              {item.pickupInfo?.name || "N/A"}
            </TextField>
          </View>
          <Spacer spacing={5} />
          <View style={styles.rowContainer}>
            <TextField>Quantity :</TextField>
            <TextField>
              {truncateToTwoDecimalPlaces(sumQuantity(item.orderDetails))} KG
            </TextField>
          </View>
          <Spacer spacing={5} />
          <View style={styles.rowContainer}>
            <TextField>Location :</TextField>
            <TextField
              style={{
                width: "60%",
                textAlign: "right",
              }}
            >
              {(() => {
                let address = item.pickupInfo?.address;
                return address?.street + ", " + address?.country;
              })()}
            </TextField>
          </View>
          <Spacer spacing={5} />
          <View style={styles.rowContainer}>
            <TextField>Delivery Date :</TextField>
            <TextField>{epochToHumanReadable(item?.createdAt)}</TextField>
          </View>
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
                <TextMedium
                  style={{
                    color: colors.primary,
                    fontSize: 14,
                  }}
                >
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
          <TextMedium>Material Details</TextMedium>
          <Spacer spacing={5} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField>Category</TextField>
            <View
              style={{
                backgroundColor: colors.primaryLight2,
                paddingHorizontal: 12,
                paddingVertical: 2,
                borderRadius: 40,
              }}
            >
              <TextField
                style={{
                  color: colors.dark,
                  fontSize: 12,
                }}
              >
                {allItemsWithCategory[0]?.categoryName}
              </TextField>
            </View>
          </View>
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
              Type
            </TextField>
            <TextField
              style={{
                color: colors.white,
              }}
            >
              Qty
            </TextField>
          </View>

          {allItemsWithCategory.map((item: any) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: HALF_MEDIUM_PADDING_SIZE,
                paddingHorizontal: MEDIUM_PADDING_SIZE,
              }}
            >
              <TextMedium style={{ textAlign: "center" }}>
                {item.itemName}
              </TextMedium>
              <TextMedium style={{ textAlign: "right" }}>
                {truncateToTwoDecimalPlaces(item.quantity)}
              </TextMedium>
            </View>
          ))}
          <Spacer spacing={10} />

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

export default SupplyCard;

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
});
