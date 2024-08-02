import React from 'react';
import { colors } from '../globals/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrderConfirmation } from '../features/ReceiveSection/OrderConfirmation/OrderConfirmation';
import Receive from '../features/ReceiveSection/Receive/Receive';
import { DeliveryConfirmation } from '../features/ReceiveSection/DeliveryConfirmation/DeliveryConfirmation';
import { History } from '../features/AllHistory/ReceiveHistory/History';
import { DeliveryQRScan } from '../features/ReceiveSection/DeliveryConfirmation/DeliveryQRScan';
import { HistoryDetails } from '../features/AllHistory/ReceiveHistory/HistoryDetail';
const StackNavigation = createNativeStackNavigator();

export const ReceiveStack = () => {
  return (
    <StackNavigation.Navigator
      // initialRouteName={"receive"}
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.backgroundColor
        }
      }}>
      <StackNavigation.Screen
        name={'orderConfirmation'}
        component={OrderConfirmation}
        options={{
          headerShown: true,
          headerTitle: 'Order Confirmation'
        }}
      />
      <StackNavigation.Screen
        name={'deliveryConfirmation'}
        component={DeliveryConfirmation}
        options={{
          headerShown: true,
          headerTitle: 'Delivery Confirmation'
        }}
      />
      <StackNavigation.Screen
        name={'deliveryQRScan'}
        component={DeliveryQRScan}
        options={{
          headerShown: true,
          headerTitle: 'Delivery Confirmation'
        }}
      />
      <StackNavigation.Screen
        name={'history'}
        component={History}
        options={{
          headerShown: true,
          headerTitle: 'History'
        }}
      />
      <StackNavigation.Screen
        name={'historyDetails'}
        component={HistoryDetails}
        options={{
          headerShown: true,
          headerTitle: 'History'
        }}
      />
    </StackNavigation.Navigator>
  );
};
