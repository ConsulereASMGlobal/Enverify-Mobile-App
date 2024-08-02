import React from 'react';
import { FirstScreen } from '../features/OnBoarding/FirstScreen';
import { SecondScreen } from '../features/OnBoarding/SecondScreen';
import { ThirdScreen } from '../features/OnBoarding/ThirdScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const StackNavigation = createNativeStackNavigator();

export function OnBoardingStack() {
  return (
    <StackNavigation.Navigator initialRouteName={'first'}>
      <StackNavigation.Screen
        name={'first'}
        component={FirstScreen}
        options={{
          headerShown: false
        }}
      />
      <StackNavigation.Screen
        name={'second'}
        component={SecondScreen}
        options={{
          headerShown: false
        }}
      />
      <StackNavigation.Screen
        name={'third'}
        component={ThirdScreen}
        options={{
          headerShown: false
        }}
      />
    </StackNavigation.Navigator>
  );
}
