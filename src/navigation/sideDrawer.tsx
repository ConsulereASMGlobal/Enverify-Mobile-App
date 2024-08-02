import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { RootNavigation } from './RootNavigation';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors } from '../globals/colors';
import { FastImage } from '../components/image';
import Cart from '../assets/svgIcon/home.svg';
import Logout from '../assets/svgIcon/logout.svg';

import FAQ from '../assets/sideDrawer/faq.svg';
import Contact from '../assets/sideDrawer/contact.svg';
import Legal from '../assets/sideDrawer/legal.svg';
import Password from '../assets/sideDrawer/password.svg';
import { TextField } from '../components/TextField/TextField';
import { styles } from '../features/CollectFlow/orderSummery';
import OrderSvgIcon from '../assets/MoreScreenIcons/OrderSvgIcon';
import { useNavigation } from '@react-navigation/native';
import { persistor, useAppDispatch } from '../redux/store';
import { authActions } from '../redux/actions/combineAction';
import { FaqScreen } from '../features/MoreScreens/FAQ';
import ContactUs from '../features/MoreScreens/contactUs/ContactUs';
import Dashboard from '../features/MoreScreens/Dashboard/Dashboard';
import { PrivacyPolicy } from '../features/MoreScreens/PrivacyPolicy/PrivacyPolicy';
import { globalStyle } from '..//globals/globalStyles';
import { MEDIUM_PADDING_SIZE } from '../globals/themes';
import { ChangePasword } from '../features/MoreScreens/ChangePasword';
import DeviceInfo from 'react-native-device-info';
import { OrderStack } from './OrderStack';
import { ProductionStack } from './ProductionStack';
import RecordsSvg from '../assets/MoreScreenIcons/RecordsSvg';
import DashboardSvg from '../assets/MoreScreenIcons/DashboardSvg';
import { selectProfile } from '../redux/selectors';
import { useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  let version = DeviceInfo.getVersion();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={style.drawerViewStyle}>
        {/* <FastImage
          source={require('../assets/erlogo.png')}
          resizeMode="contain"
          style={{ height: 70, width: 200 }}
        /> */}
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#E0E0E0',
          marginBottom: MEDIUM_PADDING_SIZE,
          marginHorizontal: MEDIUM_PADDING_SIZE
        }}
      />
      <DrawerItemList {...props} />
      <TouchableOpacity
        style={styles.logoutStyle}
        onPress={() => {
          dispatch(authActions.logout());
          persistor.purge();

          // navigation.navigate("Login");
        }}>
        <Logout height={22} width={22} fill={colors.error} />
        <View style={{ paddingHorizontal: 30 }}>
          <TextField
            style={{ fontSize: 14, color: colors.error, fontWeight: 'bold' }}>
            Logout
          </TextField>
        </View>
      </TouchableOpacity>
      <View style={style.drawerViewStyleBottom}>
        <View style={{ ...globalStyle.justifySpaceBetween }}>
          <FastImage
            source={require('../assets/others/poweredbyasm.png')}
            resizeMode="contain"
            style={{
              height: 40,
              width: 170
            }}
          />
        </View>
        <TextField style={{ fontSize: 12 }}>Version {version}</TextField>
      </View>
    </DrawerContentScrollView>
  );
};

export const SideDrawer = () => {
  const profileData = useSelector(selectProfile);
  const userType = profileData?.userType;

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: colors.dark,
        drawerActiveTintColor: colors.secondary,
        headerStyle: {
          backgroundColor: colors.backgroundColor
        }
      }}>
      <Drawer.Screen
        name="Home"
        component={RootNavigation}
        options={{
          headerShown: false,
          drawerIcon: ({ focused }) => (
            <Cart
              height={20}
              width={20}
              fill={focused ? colors.secondary : colors.dark}
            />
          )
        }}
      />

      {userType === 'PICKUP_POINT' && (
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: true,

            drawerIcon: ({ focused }) => (
              <DashboardSvg
                height={20}
                width={20}
                fill={focused ? colors.secondary : colors.dark}
              />
            )
          }}
        />
      )}

      {userType === 'PICKUP_POINT' && (
        <Drawer.Screen
          name="Collect Orders"
          component={OrderStack}
          options={{
            headerShown: false,
            drawerIcon: ({ focused }) => (
              <OrderSvgIcon color={focused ? colors.secondary : colors.dark} />
            )
          }}
        />
      )}

      {userType === 'PICKUP_POINT' && (
        <Drawer.Screen
          name="Production Report"
          component={ProductionStack}
          options={{
            headerShown: false,
            drawerIcon: ({ focused }) => (
              <RecordsSvg color={focused ? colors.secondary : colors.dark} />
            )
          }}
        />
      )}

      <Drawer.Screen
        name="Contact Us"
        component={ContactUs}
        options={{
          headerShown: true,
          drawerIcon: ({ focused }) => (
            <Contact
              height={20}
              width={20}
              fill={focused ? colors.secondary : colors.dark}
            />
          )
        }}
      />

      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicy}
        options={{
          headerShown: true,
          drawerIcon: ({ focused }) => (
            <Legal
              height={20}
              width={20}
              fill={focused ? colors.secondary : colors.dark}
            />
          )
        }}
      />
      <Drawer.Screen
        name="FAQ"
        component={FaqScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ focused }) => (
            <FAQ
              height={20}
              width={20}
              fill={focused ? colors.secondary : colors.dark}
            />
          )
        }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePasword}
        options={{
          headerShown: true,
          title: 'Change Password',
          drawerIcon: ({ focused }) => (
            <Password
              height={20}
              width={20}
              fill={focused ? colors.primary : colors.dark}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
};
const style = StyleSheet.create({
  drawerViewStyle: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20
  },
  drawerViewStyleBottom: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  },
  logoutStyle: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    marginLeft: 20
  }
});
