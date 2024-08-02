import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from './routes';
import { ProcessScreen } from '../features/ProcessScreen/ProcessScreen';
import { SelectProcess } from '../features/ProcessScreen/Screens/SelectProcess/SelectProcess';
import { SelectedProcess } from '../features/ProcessScreen/Screens/SelectedProcess';
import { SelectedProcessSummary } from '../features/ProcessScreen/Screens/SelectedProcessSummary';
import { colors } from '../globals/colors';
import { optionsWithoutHeaderLeft, options } from './RootNavigation';

const StackNavigation = createNativeStackNavigator();

export const ProcessStack = () => {
  return (
    <StackNavigation.Navigator
      initialRouteName={routes.process.default}
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.backgroundColor
        }
      }}>
      <StackNavigation.Screen
        name={routes.process.selectProcess}
        component={SelectProcess}
        options={{ headerShown: true, headerTitle: 'Select Process' }}
      />
      <StackNavigation.Screen
        name={routes.process.preSort}
        component={SelectedProcess}
        options={{ headerShown: true, headerTitle: 'Sorting' }}
      />

      <StackNavigation.Screen
        name={routes.process.preSortingSummary}
        component={SelectedProcessSummary}
        options={{ headerShown: true, headerTitle: 'Summary' }}
      />
    </StackNavigation.Navigator>
  );
};
