import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from './routes';
import ProductionDetailsScreen from '../features/AllHistory/ProductionReport/ProductionDetailsScreen';
import { ProductionReport } from '../features/AllHistory/ProductionReport';
import { colors } from '../globals/colors';
import { HeaderBackBtn } from './AuthStack';

const StackNavigation = createNativeStackNavigator();

export function ProductionStack() {
  return (
    <StackNavigation.Navigator
      initialRouteName={routes.production.default}
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
        name={routes.production.default}
        component={ProductionReport}
        options={({ navigation }) => ({
          headerLeft: () => <HeaderBackBtn navigation={navigation} />
        })}
      />
      <StackNavigation.Screen
        name={routes.production.productionDetails}
        component={ProductionDetailsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Production Details',
          headerLeft: () => <HeaderBackBtn navigation={navigation} />
        })}
      />
    </StackNavigation.Navigator>
  );
}
