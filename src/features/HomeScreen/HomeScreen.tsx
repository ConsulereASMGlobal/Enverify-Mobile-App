import {
  View,
  StyleSheet,
  Pressable,
  RefreshControl,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import CollectSVG from "@src/assets/dashboardIcons/CollectSVG";
import ProcessSVG from "@src/assets/dashboardIcons/ProcessSVG";
import SupplySVG from "@src/assets/dashboardIcons/SupplySVG";
import ReceiveSVG from "@src/assets/dashboardIcons/ReceiveSVG";
import { selectProfile, selectUserId } from "@src/redux/selectors";
import { ProfileAPI } from "@src/services/api";
import { TextField } from "@src/components/TextField/TextField";
import {
  BORDER_RADIUS_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "@src/globals/themes";
import { colors } from "@src/globals/colors";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import { Spacer } from "@src/components/common/Spacer";
import InfoContainer from "./InfoContainer";
import ViewOrders from "./ViewOrders";
import ProfileBox from "./ProfileBox";
import HistorySvgIcon from "@src/assets/tabIcons/HistorySvgIcon";
import StocksSvgIcon from "@src/assets/tabIcons/StocksSvgIcon";
import { routes } from "@src/navigation/routes";
import store, { persistor } from "@src/redux/store";
import { resetSelections } from "@src/redux/actions/combineAction";
import SwitchSVG from "@src/assets/MoreScreenIcons/SwitchSVG";

const components: any = {
  collect: CollectSVG,
  process: ProcessSVG,
  supply: SupplySVG,
  receive: ReceiveSVG,
  history: HistorySvgIcon,
  stocks: StocksSvgIcon,
  switch: SwitchSVG,
};

const CustomIcon = (iconName: any, size = 35, color = colors.primary) => {
  const IconComponent = components[iconName];
  return <IconComponent size={size} color={color} />;
};

const HomeScreen = ({ navigation }: any) => {
  const userId = useSelector(selectUserId);
  const soreFcmToServer = async () => {
    let fcmToken = await AsyncStorage.getItem("@fcmToken");
    ProfileAPI.setFirebaseToken({
      firebaseToken: fcmToken,
      userId,
    }).then(() => console.log("Setting Fcm Token"));
  };

  const profileData = useSelector(selectProfile);

  useEffect(() => {
    soreFcmToServer();
  }, []);

  const functionalities = [
    {
      id: 1,
      title: "Collect",
      description: "Collect recyclables from depositors",
      icon: "collect",
      navigateTo: "CollectScreen",
      permission: "RECYCLER",
    },
    {
      id: 2,
      title: "Receive",
      description: "Receive recyclables from facilities",
      icon: "receive",
      navigateTo: "receiveStack",
      permission: "RECYCLER",
    },
    {
      id: 3,
      title: "Process",
      description: "Process the recyclables",
      icon: "process",
      navigateTo: "ProcessScreen",
      permission: "RECYCLER",
    },
    {
      id: 4,
      title: "Supply",
      description: "Supply recyclables to diverters",
      icon: "supply",
      navigateTo: "StockScreen",
      permission: "RECYCLER",
    },
    {
      id: 5,
      title: "History",
      description: "Supply recyclables to diverters",
      icon: "history",
      navigateTo: routes.bottomTabs.allHistory,
      permission: "RECYCLER",
    },
    {
      id: 6,
      title: "Stocks",
      description: "Supply recyclables to diverters",
      icon: "stocks",
      navigateTo: routes.bottomTabs.entry,
      permission: "RECYCLER",
    },
  ];

  const authNavigate = (screen: string, permission: string) => {
    const userType = profileData?.userType;
    // if (userType !== permission) {
    //   toast.danger({
    //     message: "This functionality is not applicable for your user type!",
    //   });
    //   return;
    // }
    navigation.navigate(screen);
  };

  const [refresh, setRefresh] = useState();
  const dispatch = useDispatch();

  const state = store.getState();
  const franchiseeName = state.franchisee.franchiseeName;
  const pickupPointName =
    state.franchisee.pickupPointDetails?.personalDetails?.name;

  return (
    <>
      {profileData && <ProfileBox />}
      <ScrollContainerLayout
        contentStyle={{ paddingBottom: 25 }}
        topBgColor={colors.secondary}
        style={styles.mainContainer}
        refresh={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              setRefresh((pre) => !pre);
            }}
            tintColor={colors.primary}
          />
        }
      >
        <InfoContainer />
        <Spacer spacing={10} />

        <View>
          <FlatList
            data={functionalities}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: "31%",
                  }}
                >
                  <View
                    key={index}
                    style={{
                      width: "100%",
                      aspectRatio: 1,
                    }}
                  >
                    <Pressable
                      style={styles.card}
                      onPress={() =>
                        authNavigate(item.navigateTo, item.permission)
                      }
                      disabled={item?.navigateTo ? false : true}
                    >
                      {item?.icon ? (
                        CustomIcon(item?.icon, 40)
                      ) : (
                        <View style={{ width: 40, height: 40 }} />
                      )}
                    </Pressable>
                  </View>
                  <Spacer spacing={3} />
                  {item?.title && (
                    <TextField style={styles.textStyle}>{item.title}</TextField>
                  )}
                </View>
              );
            }}
            keyExtractor={(item) => item?.id}
            ItemSeparatorComponent={() => <Spacer spacing={2} />}
            showsHorizontalScrollIndicator={false}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "space-between",
              padding: 5,
            }}
          />
        </View>

        <Spacer spacing={15} />

        <View
          style={{
            backgroundColor: colors.secondaryAlpha(0.15),
            padding: 15,
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <TextField
              style={{ color: colors.secondary, marginBottom: 5, fontSize: 14 }}
            >
              Member Name :{" "}
              <TextField style={{ fontSize: 14 }}>{franchiseeName}</TextField>
            </TextField>
            <TextField style={{ color: colors.secondary, fontSize: 14 }}>
              Facility Name :{" "}
              <TextField style={{ fontSize: 14 }}>{pickupPointName}</TextField>
            </TextField>
          </View>
          <Pressable
            onPress={() => {
              Alert.alert(
                "Switch Facility",
                "Do you wish to switch facility?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      dispatch(resetSelections());
                      persistor.purge();
                    },
                    style: "destructive",
                  },
                ]
              );
            }}
          >
            <View style={{ gap: 2, alignItems: "center" }}>
              {CustomIcon("switch", 26, colors.secondary)}
              {/* <TextField style={{ fontSize: 12 }}>Switch</TextField> */}
            </View>
          </Pressable>
        </View>

        <Spacer spacing={15} />
        <ViewOrders refresh={refresh} />
      </ScrollContainerLayout>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: REGULAR_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    backgroundColor: colors.backgroundColor,
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 14,
    color: colors.dark,
    fontWeight: "600",
    textAlign: "center",
  },
  circleView: {
    width: 62,
    height: 62,
    borderRadius: 62 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  descTxt: {
    fontSize: 11,
    color: colors.primary,
  },
});

export default HomeScreen;
