import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { colors } from "@src/globals/colors";
import { BORDER_RADIUS_SIZE, MEDIUM_PADDING_SIZE } from "@src/globals/themes";
import { Spacer } from "@src/components/common/Spacer";
import { useDispatch, useSelector } from "react-redux";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { useIsFocused } from "@react-navigation/native";
import TooltipComp from "../../components/TooltipComp/TooltipComp";
import { returnActions } from "@src/redux/actions/combineAction";
import { selectReturnList } from "@src/redux/selectors";
import { FastImage } from "@src/components/image";

const ViewOrders = ({ refresh }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const order = useSelector(selectReturnList);

  useEffect(() => {
    if (isFocused) {
      dispatch(returnActions.getReturn({ status: "pending" }));
    }
  }, [isFocused, refresh]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 2,
          gap: 5,
        }}
      >
        <View style={{ flexDirection: "row", gap: 5 }}>
          <TextBold>Incoming shipments</TextBold>
          <TooltipComp
            children={
              <TextField>
                Shows the list of consignments which are shipped by the
                aggregator and are on the way to your facility
              </TextField>
            }
            tooltipPosition={"top"}
          />
        </View>

        <FastImage
          source={require("../../assets/gifs/truck.gif")}
          style={{ width: 22, height: 22 }}
        />
      </View>
      <Spacer spacing={5} />
      {order?.map((item) => (
        <View style={styles.card} key={item?.id}>
          <View style={styles.rowContainer}>
            <TextField style={{ fontWeight: "600" }}>Status :</TextField>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 3,
                marginBottom: 5,
                borderRadius: 92 / 2,
                backgroundColor:
                  item?.status === "Completed" ||
                  item?.status === "COMPLETED" ||
                  item?.status === "ACCEPTED" ||
                  item?.status === "Accepted"
                    ? colors.green
                    : item?.status === "Created" || item?.status === "CREATED"
                    ? colors.primaryLight
                    : colors.primary,
              }}
            >
              <TextField
                style={{
                  fontSize: 12,
                  color:
                    item?.status === "Completed" ||
                    item?.status === "COMPLETED" ||
                    item?.status === "ACCEPTED" ||
                    item?.status === "Accepted"
                      ? colors.white
                      : item?.status === "Created" || item?.status === "CREATED"
                      ? colors.dark
                      : colors.dark,
                }}
              >
                {item?.status === "CREATED" || item?.status === "Created"
                  ? "In transit"
                  : item?.status}
              </TextField>
            </View>
          </View>
          <Spacer spacing={5} />
          <View style={styles.rowContainer}>
            <TextField>Order ID :</TextField>
            <TextField>{item?.id}</TextField>
          </View>
          <Spacer spacing={5} />
          <View style={styles.rowContainer}>
            <TextField style={{ fontWeight: "600", fontSize: 14 }}>
              Dispatch Date :
            </TextField>
            <TextField>{epochToHumanReadable(item?.createdAt)}</TextField>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ViewOrders;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    borderRadius: BORDER_RADIUS_SIZE,
    marginBottom: MEDIUM_PADDING_SIZE,
    padding: MEDIUM_PADDING_SIZE,
    marginHorizontal: 2,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
