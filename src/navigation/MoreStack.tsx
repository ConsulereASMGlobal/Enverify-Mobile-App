import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "./routes";
import { colors } from "../globals/colors";
import Dashboard from "@src/features/MoreScreens/Dashboard/Dashboard";
import { HeaderBackBtn } from "./AuthStack";
import { useNavigation } from "@react-navigation/native";
import { OrderStack } from "./OrderStack";
import { ProductionStack } from "./ProductionStack";
import ContactUs from "@src/features/MoreScreens/contactUs/ContactUs";
import { PrivacyPolicy } from "@src/features/MoreScreens/PrivacyPolicy/PrivacyPolicy";
import { FaqScreen } from "@src/features/MoreScreens/FAQ";
import { ChangePasword } from "@src/features/MoreScreens/ChangePasword";
import { MyProfile } from "@src/features/MyProfile/MyProfile";
import { MoreScreen } from "@src/features/MoreScreens/MoreScreen";

const StackNavigation = createNativeStackNavigator();

export function MoreStack() {
  const navigation = useNavigation();
  return (
    <StackNavigation.Navigator
      initialRouteName={routes.more.default}
      screenOptions={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.backgroundColor,
        },
        headerLeft: () => <HeaderBackBtn navigation={navigation} />,
      })}
    >
      <StackNavigation.Screen
        name={routes.more.default}
        component={MoreScreen}
        options={{ headerShown: false }}
      />
      <StackNavigation.Screen
        name={routes.more.dashboard}
        component={Dashboard}
      />
      <StackNavigation.Screen
        name={routes.more.profile}
        component={MyProfile}
        options={{
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerLeft: () => (
            <HeaderBackBtn
              navigation={navigation}
              backbtnColor={colors.white}
            />
          ),
          headerTintColor: colors.white,
        }}
      />
      <StackNavigation.Screen
        name={routes.more.collectOrder}
        component={OrderStack}
        options={{ headerShown: false }}
      />
      <StackNavigation.Screen
        name={routes.more.production}
        component={ProductionStack}
        options={{ headerShown: false }}
      />
      <StackNavigation.Screen
        name={routes.more.contactUs}
        component={ContactUs}
      />
      <StackNavigation.Screen
        name={routes.more.privacyPolicy}
        component={PrivacyPolicy}
      />
      <StackNavigation.Screen name={routes.more.faq} component={FaqScreen} />
      <StackNavigation.Screen
        name={routes.more.changePassword}
        component={ChangePasword}
      />
    </StackNavigation.Navigator>
  );
}
