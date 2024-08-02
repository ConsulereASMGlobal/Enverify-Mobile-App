import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from './routes';
import { CollectOrderList } from '../features/AllHistory/orderList/CollectOrder';
import OrderDetailsScreen from '../features/OrderDetailsScreen/OrderDetailsScreen';
import { colors } from '../globals/colors';
import { HeaderBackBtn } from './AuthStack';
import { useNavigation } from '@react-navigation/native';

const StackNavigation = createNativeStackNavigator();

export function OrderStack() {
  const navigation = useNavigation();
  return (
    <StackNavigation.Navigator
      initialRouteName={routes.collect.default}
      screenOptions={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.backgroundColor
        }
      })}>
      <StackNavigation.Screen
        name={routes.collect.default}
        component={CollectOrderList}
        options={{
          headerShown: true,
          headerLeft: () => <HeaderBackBtn navigation={navigation} />
        }}
      />
    </StackNavigation.Navigator>
  );
}
