import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { TextField, TextMedium } from "../../../components/TextField/TextField";
import { colors } from "../../../globals/colors";
import { FastImage } from "../../../components/image";
import {
  BORDER_RADIUS_SIZE,
  Fonts,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "../../../globals/themes";
import { useDispatch, useSelector } from "react-redux";
import { selectAnalytics, selectProfile } from "../../../redux/selectors";
import BarChart from "../../../components/Charts/BarGraph";
import { Spacer } from "../../../components/common/Spacer";
import { analyticsActions } from "../../../redux/actions/combineAction";
import dayjs from "dayjs";
import { useFocusEffect } from "@react-navigation/native";
import store, { RootState } from "../../../redux/store";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { SquircleView } from "react-native-figma-squircle";
import { useIsFocused } from "@react-navigation/native";
import { truncateToTwoDecimalPlaces } from "../../../utils/getSum";
import { NoDataView } from "../../../components/NoDataView";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import CustomHeader from "@src/components/CustomHeader";
import { CustomIcon } from "@src/components/CustomSvg/CustomSVGIcon";
import ProgressDoughnutChart from "@src/components/Charts/ProgressDoughnutChart";
import { removeUnderscoreAndTitle } from "@src/utils/stringUtils";
const Dashboard = () => {
  const dispatch = useDispatch();
  const profileData = useSelector(selectProfile);

  const state = store.getState();
  const pickupPointDetails = state.franchisee.pickupPointDetails;

  const isLoading = useSelector(
    (state: RootState) => state.getAnalytics.loading
  );

  const [refreshing, setRefreshing] = useState(false);
  const _onRefresh = () => {
    dispatch(analyticsActions.getAnalytics());
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && dispatch(analyticsActions.getAnalytics());
  }, [isFocused]);

  const analytics = useSelector(selectAnalytics);
  const data = analytics?.data;

  const [shouldAnimate, setShouldAnimate] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setShouldAnimate(true);
      return () => {
        setShouldAnimate(false);
      };
    }, [])
  );

  const diversionCapacity =
    state.franchisee.pickupPointDetails?.diversionCapacity;

  const total = diversionCapacity?.reduce(
    (accumulator, current) => accumulator + current?.capacity,
    0
  );

  const rigid =
    diversionCapacity && (diversionCapacity[0]?.capacity / total) * 100;

  const dashCards = [
    {
      id: "1",
      name: "Collected",
      weight: truncateToTwoDecimalPlaces(data?.collected).toString() || "N/A",
      unit: "Kgs",
      icon: "collected",
    },
    {
      id: "4",
      name: "Received",
      weight: truncateToTwoDecimalPlaces(data?.received).toString() || "N/A",
      unit: "Kgs",
      icon: "received",
    },
    // {
    //   id: "100",
    //   user: true,
    //   name: "Username",
    //   weight: profileData?.personalDetails?.name ?? "N/A",
    //   unit: "",
    //   // icon: require("../../../assets/dashboardStat/User.png"),
    //   icon: "userName",
    // },
    {
      id: "2",
      name: "Processed",
      weight: truncateToTwoDecimalPlaces(data?.processed).toString() || "N/A",
      unit: "Kgs",
      icon: "processed",
    },
    {
      id: "3",
      name: "Supplied",
      weight: truncateToTwoDecimalPlaces(data?.completed).toString() || "N/A",
      unit: "Kgs",
      icon: "supplied",
    },
    {
      id: "5",
      name: "Diversion Type",
      value: pickupPointDetails?.diversionType,
      value2: pickupPointDetails?.personalDetails?.name,
      value3:
        pickupPointDetails?.address?.street +
        ", " +
        pickupPointDetails?.address?.country,
      icon: "diversion",
    },
    {
      id: "6",
      name: "Diversion Capacity",
      type: "chart",
      icon: "receive",
      value: rigid,
      total: total,
    },
  ];

  const today = dayjs();
  const labels = [...Array(7)]
    .map((_, i) => today.subtract(i, "day").format("YYYY-MM-DD"))
    .reverse();

  const barData = labels?.map((label: any) => ({
    label: dayjs(label).format("ddd"),
    value: (data?.collectionDetails && data?.collectionDetails[label]) ?? 0,
  }));

  const productionDetailsData = labels?.map((label: any) => ({
    label: dayjs(label).format("ddd"),
    value: (data?.productionDetails && data?.productionDetails[label]) ?? 0,
  }));

  const returnDetailsData = labels?.map((label: any) => ({
    label: dayjs(label).format("ddd"),
    value: (data?.returnDetails && data?.returnDetails[label]) ?? 0,
  }));

  const renderItem = ({ item }: any) => (
    <View
      key={item.id}
      style={[
        styles.box,
        { backgroundColor: item?.user ? colors.primary : "white" },
      ]}
    >
      {item.type !== "chart" ? (
        <View>
          <View
            style={{
              backgroundColor: item?.user ? colors.primaryBG : colors.primaryBG,
              height: 55,
              width: 55,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {CustomIcon(item?.icon, 30)}
          </View>
          <Spacer spacing={5} />

          <View style={{ alignItems: "flex-start" }}>
            <TextField
              style={{
                textAlign: "center",
                color: item?.user ? "white" : "#626262",
                fontSize: 12,
                lineHeight: 16,
              }}
            >
              {item.name}
            </TextField>
            <Spacer spacing={2} />
            <TextField
              style={{
                textAlign: "start",
                color: item?.user ? "white" : colors.neutral_dark,
                fontWeight: "bold",
                fontSize: item?.user ? 16 : 20,
                lineHeight: item?.user ? 18 : 25,
              }}
            >
              {(item.weight || removeUnderscoreAndTitle(item.value)) +
                " " +
                (item.unit || "")}
            </TextField>
            {item?.value2 && (
              <>
                <Spacer spacing={10} />

                <TextField
                  style={{
                    textAlign: "left",
                    color: "#626262",
                    fontSize: 12,
                    lineHeight: 16,
                  }}
                  numberOfLines={1}
                >
                  {item?.value2}
                </TextField>
              </>
            )}
            {item?.value2 && (
              <>
                <Spacer spacing={5} />

                <TextField
                  style={{
                    textAlign: "left",
                    color: "#626262",
                    fontSize: 12,
                    lineHeight: 16,
                  }}
                  numberOfLines={1}
                >
                  {item?.value3}
                </TextField>
              </>
            )}
          </View>
        </View>
      ) : (
        <>
          <View style={{ backgroundColor: colors.white }}>
            <TextField style={{ fontFamily: Fonts.SemiBold, fontSize: 14 }}>
              {item?.name}
            </TextField>

            <ProgressDoughnutChart
              percentage={item?.value || 0}
              animate={shouldAnimate}
              animationDuration={750}
              label={`${item?.total || 0} Kgs`}
              size={125}
              showValue={false}
            />
            <Spacer spacing={5} />
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                justifyContent: "center",
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: colors.chartActive,
                  }}
                />
                <TextField style={{ fontSize: 12 }}>Rigid</TextField>
              </View>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: colors.chartInactive,
                  }}
                />
                <TextField style={{ fontSize: 12 }}>Flexible</TextField>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );

  const FirstRoute = () => (
    <View style={{ flex: 1 }}>
      {barData && (
        <BarChart
          data={barData}
          height={180}
          barWidth={20}
          animate={shouldAnimate}
        />
      )}
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1 }}>
      {productionDetailsData && (
        <BarChart
          data={productionDetailsData}
          height={180}
          barWidth={20}
          animate={shouldAnimate}
        />
      )}
    </View>
  );

  const ThirdRoute = () => (
    <View style={{ flex: 1 }}>
      {returnDetailsData && (
        <BarChart
          data={returnDetailsData}
          height={180}
          barWidth={20}
          animate={shouldAnimate}
        />
      )}
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Collected" },
    { key: "second", title: "Processed" },
    { key: "third", title: "Supplied" },
  ]);

  if (!data) {
    return <NoDataView />;
  }
  return (
    <ScrollContainerLayout topBgColor={colors.secondary}>
      <Spacer spacing={10} />
      <CustomHeader title={"Dashboard"} />
      <Spacer spacing={10} />
      {!isLoading ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
          nestedScrollEnabled
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
        >
          <View style={styles.mainContainer}>
            <FlatList
              data={dashCards}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              contentContainerStyle={{
                paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
              }}
              scrollEnabled={true}
              bounces={true}
              showsVerticalScrollIndicator={false}
            />
            <Spacer spacing={10} />
            {/* <View style={{ paddingHorizontal: HALF_MEDIUM_PADDING_SIZE }}>
                <TextField
                  style={{
                    fontWeight: 'bold'
                  }}>
                  Last 7 Days Collection
                </TextField>
                <Spacer spacing={10} />

                {barData && (
                  <BarChart
                    data={barData}
                    height={180}
                    barWidth={20}
                    animate={shouldAnimate}
                  />
                )}
                <TextField
                  style={{
                    fontWeight: 'bold'
                  }}>
                  Last 7 Days Production
                </TextField>
                <Spacer spacing={10} />

                {productionDetailsData && (
                  <BarChart
                    data={productionDetailsData}
                    height={180}
                    barWidth={20}
                    animate={shouldAnimate}
                  />
                )}
                <TextField
                  style={{
                    fontWeight: 'bold'
                  }}>
                  Last 7 Days Production
                </TextField>
                <Spacer spacing={10} />

                {returnDetailsData && (
                  <BarChart
                    data={returnDetailsData}
                    height={180}
                    barWidth={20}
                    animate={shouldAnimate}
                  />
                )}

                <Spacer spacing={10} />

                <SquircleView
                  style={styles.card}
                  squircleParams={{
                    cornerSmoothing: 1,
                    fillColor: colors.secondary,
                    cornerRadius: BORDER_RADIUS_SIZE
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10
                    }}>
                    <View style={styles.circleView}>
                      <FastImage
                        source={require('../../../assets/img/wastage.png')}
                        resizeMode="contain"
                        style={{
                          width: 24,
                          height: 24
                        }}
                      />
                    </View>
                    <View>
                      <TextField style={styles.textStyle}>Wastage</TextField>
                    </View>
                  </View>
                  <View>
                    <TextField style={styles.textStyle}>
                      {truncateToTwoDecimalPlaces(data?.wastage).toString() ||
                        'N/A'}{' '}
                      Kgs
                    </TextField>
                  </View>
                </SquircleView>
              </View> */}
            <View
              style={{
                flex: 1,
                height: 300,
                paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
              }}
            >
              <TabView
                style={{
                  backgroundColor: colors.shaded,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={(props) => (
                  <TabBar
                    {...props}
                    style={{ backgroundColor: colors.secondary }}
                    indicatorStyle={{ backgroundColor: colors.primary }}
                    renderLabel={({ route, color, focused }) => (
                      <TextMedium
                        style={{
                          color: focused ? colors.white : colors.secondary2,
                          margin: 8,
                          fontSize: 14,
                        }}
                      >
                        {route.title}
                      </TextMedium>
                    )}
                  />
                )}
              />
            </View>

            <Spacer spacing={15} />
            <SquircleView
              style={styles.card}
              squircleParams={{
                cornerSmoothing: 1,
                fillColor: colors.secondary,
                cornerRadius: BORDER_RADIUS_SIZE,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <View style={styles.circleView}>
                  <FastImage
                    source={require("../../../assets/img/intransit.png")}
                    resizeMode="contain"
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </View>
                <View>
                  <TextField style={styles.textStyle}>In Transit</TextField>
                </View>
              </View>
              <View>
                <TextField style={styles.textStyle}>
                  {truncateToTwoDecimalPlaces(data?.notConfirmed).toString() ||
                    "N/A"}{" "}
                  Kgs
                </TextField>
              </View>
            </SquircleView>
            <Spacer spacing={5} />
            <SquircleView
              style={styles.card}
              squircleParams={{
                cornerSmoothing: 1,
                fillColor: colors.secondary,
                cornerRadius: BORDER_RADIUS_SIZE,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <View style={styles.circleView}>
                  <FastImage
                    source={require("../../../assets/img/wastage.png")}
                    resizeMode="contain"
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </View>
                <View>
                  <TextField style={styles.textStyle}>Wastage</TextField>
                </View>
              </View>
              <View>
                <TextField style={styles.textStyle}>
                  {truncateToTwoDecimalPlaces(data?.wastage).toString() ||
                    "N/A"}{" "}
                  Kgs
                </TextField>
              </View>
            </SquircleView>
          </View>
        </ScrollView>
      ) : (
        <LoadingIndicator activityColor={colors.secondary} />
      )}
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    padding: HALF_MEDIUM_PADDING_SIZE,
  },

  box: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    backgroundColor: colors.white,
    width: "48%",
    minHeight: 150,
    borderRadius: 16,
    marginVertical: HALF_MEDIUM_PADDING_SIZE,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  imageStyle: {
    width: 30,
    height: 30,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    paddingVertical: 10,
    marginHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },

  textStyle: {
    fontSize: 18,
    lineHeight: 27,
    color: colors.white,
  },

  circleView: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
});

export default Dashboard;
