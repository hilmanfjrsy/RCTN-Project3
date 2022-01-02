// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import SplashScreen from '../SplashScreen';

const Stack = createNativeStackNavigator();

export default function BaseRoute() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'SplashScreen'}>
        <Stack.Screen name="BottomTab" component={BottomTab} options={({navigation,route})=>({
          headerShown:false
        })} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={({navigation,route})=>({
          headerShown:false
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}