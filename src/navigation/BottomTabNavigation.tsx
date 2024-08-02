import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { routes } from "./routes";
import { colors } from "../globals/colors";
import { Alert, Text } from "react-native";
import HomeSvgIcon from "../assets/tabIcons/HomeSvgIcon";
import { styles } from "../features/SupplyFlow/StockScreen/styles";
import StocksSvgIcon from "../assets/tabIcons/StocksSvgIcon";
import { isIOS } from "../globals/globalStyles";
import { Stocks } from "../features/Stock/Stocks";
import { headerRight, headerTitleStyle } from "./RootNavigation";
import { MEDIUM_PADDING_SIZE } from "../globals/themes";
import { useSelector } from "react-redux";
import { selectProfile } from "../redux/selectors";
import HomeScreen from "../features/HomeScreen/HomeScreen";
import MoreSvgIcon from "@src/assets/tabIcons/MoreSvgIcon";
import Dashboard from "@src/features/MoreScreens/Dashboard/Dashboard";
import DashboardSvg from "@src/assets/MoreScreenIcons/DashboardSvg";
import AllHistory from "@src/features/AllHistory/AllHistory";
import HistorySvgIcon from "@src/assets/tabIcons/HistorySvgIcon";
import { MoreStack } from "./MoreStack";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const profileData = useSelector(selectProfile);

  const userType = profileData?.userType;
  return (
    <Tab.Navigator
      // initialRouteName={'Home'}
      screenOptions={({ route, navigation }) => ({
        tabBarLabel: ({ focused, color }) => {
          return (
            <Text style={styles.tabBarLevelStyle({ focused, color })}>
              {route.name}
            </Text>
          );
        },
        headerTransparent: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.dark,
        tabBarStyle: {
          height: isIOS ? 70 : 56,
          paddingTop: 6,
          paddingBottom: isIOS ? 20 : 5,
        },
        headerTitleAlign: "center",
        headerTintColor: colors.dark,
        headerTitleStyle,
        headerShadowVisible: false,
        // headerLeft: () => (
        //   <View style={{ paddingTop: MEDIUM_PADDING_SIZE }}>
        //     <HeaderLeft navigation={navigation} />
        //   </View>
        // ),
        headerRightContainerStyle: {
          paddingRight: 20,
          justifyContent: "center",
          paddingBottom: 10,
          paddingTop: MEDIUM_PADDING_SIZE,
        },
        headerLeftContainerStyle: {
          paddingLeft: 20,
          justifyContent: "center",
          paddingBottom: 12,
        },
        headerStyle: {
          backgroundColor: colors.backgroundColor,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={"Home"}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeSvgIcon color={focused ? colors.primary : colors.dark} />
          ),
          title: "Home",
          headerShown: false,
          headerRight,
        }}
      />
      {/* <Tab.Screen
        name={routes.bottomTabs.allHistory}
        component={AllHistory}
        options={{
          tabBarIcon: ({ focused }) => (
            <HistorySvgIcon color={focused ? colors.primary : colors.dark} />
          ),
          title: "History",
        }}
      /> */}
      {/* <Tab.Screen
        name={routes.bottomTabs.entry}
        component={Stocks}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (userType === "PICKUP_POINT") {
              navigation.navigate(routes.bottomTabs.entry);
            } else {
              Alert.alert(
                "Info",
                "This functionality is not applicable for your user type!",
                [{ text: "ok", onPress: () => navigation.navigate("Home") }]
              );
            }
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <StocksSvgIcon color={focused ? colors.primary : colors.dark} />
          ),
          title: "Stocks",
        }}
      /> */}
      <Tab.Screen
        name={routes.bottomTabs.dashboard}
        component={Dashboard}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <DashboardSvg color={focused ? colors.primary : colors.dark} />
          ),
          title: "Dashboard",
          // headerStyle: {
          //   backgroundColor: colors.secondary
          // },
          // headerTitleStyle: {
          //   color: colors.white
          // }
          // headerLeft: () => (
          //   <View style={{ paddingTop: MEDIUM_PADDING_SIZE }}>
          //     <HeaderLeft navigation={navigation} iconColor={colors.white} />
          //   </View>
          // )
        })}
      />
      <Tab.Screen
        name={routes.bottomTabs.more}
        component={MoreStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <MoreSvgIcon color={focused ? colors.primary : colors.dark} />
          ),
          title: "More",
        }}
      />
    </Tab.Navigator>
  );
};
