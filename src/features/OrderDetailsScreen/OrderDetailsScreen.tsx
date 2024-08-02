import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { TextField } from "../../components/TextField/TextField";
import { colors } from "../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
  XLARGE_PADDING_SIZE,
  screenWidth,
} from "../../globals/themes";
import { SquircleView } from "react-native-figma-squircle";
import {
  sumQuantity,
  totalSalesPrice,
  truncateToTwoDecimalPlaces,
} from "../../utils/getSum";
import {
  epochToHumanReadable,
  epochToHumanReadableTime,
} from "../../utils/dateUtils";
import { Spacer } from "../../components/common/Spacer";
import QRCode from "react-native-qrcode-svg";
import DotSvgIcon from "../../assets/svgIcon/dotSvg";
import { FastImage } from "../../components/image";

const OrderDetailsScreen = ({ route }) => {
  const { data, collect, showQR } = route.params;

  const qrData = {
    agentId: data?.pickupInfo?.agentId,
    orderId: data?.id,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.backgroundColor,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <View style={styles.mainContainer}>
          <SquircleView
            style={styles.orderList}
            squircleParams={{
              cornerSmoothing: 1,
              fillColor: colors.white,
              cornerRadius: BORDER_RADIUS_SIZE,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TextField
                  style={{
                    fontSize: 12,
                  }}
                >
                  {`${epochToHumanReadable(data?.createdAt)}`}
                </TextField>
                <TextField
                  style={{
                    fontSize: 12,
                  }}
                >
                  {" "}
                  {`${epochToHumanReadableTime(data?.createdAt)}`}
                </TextField>
              </View>
              <SquircleView
                style={{
                  ...styles.orderStatusView,
                  width: data?.status?.length * 10,
                  minWidth: "30%",
                  alignItems: "center",
                }}
                squircleParams={{
                  cornerSmoothing: 0.7,
                  fillColor: colors.cardColor,
                  cornerRadius: 12,
                }}
              >
                <TextField
                  style={[
                    styles.itemStatusText,
                    {
                      color:
                        data?.status === "COMPLETED" ||
                        data?.status === "Accepted"
                          ? colors.green
                          : data?.status === "Completed"
                          ? colors.secondary
                          : colors.primary,
                    },
                  ]}
                >
                  {data?.status}
                </TextField>
              </SquircleView>
            </View>
            <Spacer spacing={5} />

            <View style={styles.row}>
              <TextField style={styles.itemTextTitle}>Order IDs : </TextField>
              <TextField style={styles.itemText}>{data?.id}</TextField>
            </View>
            {collect && (
              <View style={styles.row}>
                <TextField style={styles.itemTextTitle}>
                  Actual Collection Date :{" "}
                </TextField>
                <TextField style={styles.itemText}>
                  {epochToHumanReadable(data?.collectionDate)}
                </TextField>
              </View>
            )}
            <View style={styles.row}>
              <TextField style={styles.itemTextTitle}>
                {collect ? "Depositor" : "Recycler"} Name :{" "}
              </TextField>
              <TextField style={styles.itemText}>
                {collect ? data?.customerName : data?.centreInfo?.name}
              </TextField>
            </View>
            <View style={styles.row}>
              <TextField style={styles.itemTextTitle}>Quantity : </TextField>
              <TextField style={styles.itemText}>
                {truncateToTwoDecimalPlaces(sumQuantity(data?.orderDetails))}
              </TextField>
            </View>
            {!!!collect ? (
              <>
                <View style={styles.row}>
                  <TextField style={styles.itemTextTitle}>
                    {!!collect ? "Created Date" : "Delivery Date"} :{" "}
                  </TextField>
                  <TextField style={styles.itemText}>
                    {!!collect
                      ? `${epochToHumanReadable(data?.createdAt)}`
                      : `${epochToHumanReadable(data?.pickupInfo?.pickupDate)}`}
                  </TextField>
                </View>
              </>
            ) : null}

            {!!collect ? (
              <View style={styles.row}>
                <TextField style={styles.itemTextTitle}>
                  Order Value :{" "}
                </TextField>
                <TextField style={styles.itemText}>
                  {truncateToTwoDecimalPlaces(
                    totalSalesPrice(data?.orderDetails)
                  )}{" "}
                  {data?.orderDetails[0]?.items[0]?.currency}
                </TextField>
              </View>
            ) : null}

            {!!data?.note && !!collect && (
              <View style={styles.row}>
                <TextField style={styles.itemTextTitle}>Note : </TextField>
                <TextField style={styles.itemText}>{data?.note}</TextField>
              </View>
            )}

            {data?.orderDetails?.map((items: any) => {
              return (
                <>
                  <View style={{ height: 20 }} />
                  {!collect && (
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <DotSvgIcon size={20} color={colors.primary} />
                        <TextField
                          style={{
                            color: colors.primary,
                            fontSize: 14,
                            flexShrink: 1,
                          }}
                        >
                          OQty - Offered Quantity(KG)
                        </TextField>
                      </View>
                      {/* <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}>
                        <DotSvgIcon size={20} color={colors.primary} />
                        <TextField
                          style={{
                            color: colors.primary,
                            fontSize: 14,
                            flexShrink: 1
                          }}>
                          AQty - Actual received Quantity(KG)
                        </TextField>
                      </View> */}
                      <Spacer spacing={10} />
                    </View>
                  )}

                  <Spacer spacing={10} />

                  <TextField style={{ color: colors.secondary }}>
                    Material Information :
                  </TextField>
                  <View style={styles.headerViewStyle}>
                    <TextField
                      style={[styles.itemTextTitle, { color: "#fff" }]}
                    >
                      {items?.categoryName}
                    </TextField>
                  </View>
                  <View
                    style={{
                      borderRadius: BORDER_RADIUS_SIZE,

                      overflow: "hidden",
                      paddingVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "#f8f8f4",
                        paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
                        paddingVertical: HALF_MEDIUM_PADDING_SIZE,
                      }}
                    >
                      <View
                        style={[
                          styles.centerHeaderContainer,
                          { flex: !!collect ? 0.5 : 0.7 },
                        ]}
                      >
                        <TextField style={styles.labelStyle}>
                          Category
                        </TextField>
                      </View>
                      <View style={styles.leftHeaderContainer}>
                        <TextField
                          style={{
                            color: colors.secondary,
                          }}
                        >
                          {collect ? "Qty" : "OQty"}
                        </TextField>
                      </View>
                      {!collect && data?.status === "Pickup Completed" && (
                        <View style={styles.leftHeaderContainer}>
                          <TextField
                            style={{
                              color: colors.secondary,
                            }}
                          >
                            AQty
                          </TextField>
                        </View>
                      )}
                      {/* {!!collect ? (
                        <View style={styles.leftHeaderContainer}>
                          <TextField
                            style={{
                              ...styles.labelStyle,
                              textAlign: 'center'
                            }}>
                            Unit Price
                          </TextField>
                        </View>
                      ) : null} */}
                    </View>
                    {items?.items?.map((item, index) => {
                      return (
                        <>
                          <View style={styles.dataContainer}>
                            <View
                              style={[styles.centerContainer, { flex: 0.7 }]}
                            >
                              <TextField
                                style={{
                                  ...styles.textValueStyle,
                                  textTransform: "uppercase",
                                }}
                              >
                                {item?.itemName}
                              </TextField>
                            </View>
                            <View style={styles.leftContainer}>
                              <TextField style={styles.textValueStyle}>
                                {item?.quantity}
                              </TextField>
                            </View>
                            {!collect &&
                              data?.status === "Pickup Completed" && (
                                <View style={styles.leftContainer}>
                                  <TextField style={styles.textValueStyle}>
                                    {Number(item?.quantity) -
                                      Number(item?.deduction) ?? item?.quantity}
                                  </TextField>
                                </View>
                              )}
                            {/* {!!collect ? (
                              <View style={styles.leftContainer}>
                                <TextField style={styles.textValueStyle}>
                                  {item?.price ?? 'n/a'}
                                </TextField>
                              </View>
                            ) : null} */}
                          </View>
                        </>
                      );
                    })}
                  </View>
                </>
              );
            })}
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

            {collect && (
              <View style={{ alignSelf: "center" }}>
                <Spacer spacing={25} />

                <FastImage
                  source={{ uri: data.images[0] }}
                  style={{
                    height: 200,
                    width: 200,
                  }}
                />
                <TextField style={{ marginTop: 10, textAlign: "center" }}>
                  Proof of Collection
                </TextField>
                <Spacer spacing={20} />
              </View>
            )}
          </SquircleView>
          <Spacer spacing={15} />

          {data?.status === "Pickup Completed" ||
          data?.status !== "Accepted" ? null : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {showQR && (
                <>
                  <TextField
                    style={[styles.headerTitle, { color: colors.primary }]}
                  >
                    {"Share this QR Code to confirm the reciept"}
                  </TextField>
                  <Spacer spacing={10} />
                  <QRCode
                    value={JSON.stringify(qrData)}
                    size={screenWidth / 2.2}
                    logoSize={30}
                  />
                </>
              )}
            </View>
          )}
          <Spacer spacing={10} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectedNetrial: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  headerViewStyle: {
    marginVertical: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.secondary,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    borderRadius: BORDER_RADIUS_SIZE,
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingTop: REGULAR_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
  buttonStyle: {
    width: "90%",
    alignSelf: "center",
  },

  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  hitSlop: {
    top: 10,
    bottom: 15,
    right: 30,
  },
  button: {
    alignItems: "flex-end",
    paddingHorizontal: REGULAR_PADDING_SIZE,
    paddingBottom: REGULAR_PADDING_SIZE,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: BORDER_RADIUS_SIZE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    backgroundColor: colors.white,
    marginTop: XLARGE_PADDING_SIZE + XLARGE_PADDING_SIZE,
    paddingVertical: REGULAR_PADDING_SIZE,
  },
  headerTitle: {
    fontSize: 14,
    lineHeight: 17,
    textAlign: "center",
    marginTop: BORDER_RADIUS_SIZE,
  },
  centerContainer: {
    alignSelf: "center",
    flex: 0.4,
  },

  orderList: {
    backgroundColor: colors.white,
    paddingVertical: MEDIUM_PADDING_SIZE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    borderRadius: BORDER_RADIUS_SIZE,
    marginTop: 2,
  },
  itemText: {
    maxWidth: "45%",
    textAlign: "right",
    fontWeight: "bold",
  },
  itemTextTitle: {
    color: colors.dark,
    maxWidth: "45%",
  },
  itemStatusText: {
    color: colors.yellow,
    textTransform: "uppercase",
    fontSize: 10,
  },
  row: {
    paddingTop: BORDER_RADIUS_SIZE,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderStatusView: {
    borderRadius: 12,
    paddingVertical: 2,
    marginBottom: 5,
    justifyContent: "center",
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.cardColor,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    // paddingVertical: HALF_MEDIUM_PADDING_SIZE,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },
  textValueStyle: {
    paddingTop: MEDIUM_PADDING_SIZE,
  },
  leftContainer: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  centerHeaderContainer: {
    flex: 0.4,
  },
  labelStyle: {
    fontSize: 16,
    color: colors.secondary,
  },
  leftHeaderContainer: {
    flex: 0.3,
    alignItems: "center",
    // backgroundColor: colors.backgroundColor
  },
});
export default OrderDetailsScreen;
