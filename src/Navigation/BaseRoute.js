// In App.js in a new project

import React, { useEffect } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import SplashScreen from '../SplashScreen';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import SearchResult from '../Screens/SearchResult';
import DetailHotel from '../Screens/DetailHotel';

import EditProfile from '../Screens/Profile/EditProfile';
import { checkExpireToken } from '../Utils/GlobalFunc';
import Booking from '../Screens/Booking';

const Stack = createNativeStackNavigator();

export default function BaseRoute() {
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => checkExpireToken(navigationRef)}>
      <Stack.Navigator initialRouteName={'SplashScreen'}>
        <Stack.Screen name="BottomTab" component={BottomTab} options={({ navigation, route }) => ({
          headerShown: false
        })} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={({ navigation, route }) => ({
          headerShown: false
        })} />
        <Stack.Screen name="Login" component={Login} options={({ navigation, route }) => ({
          headerShown: false
        })} />
        <Stack.Screen name="Register" component={Register} options={({ navigation, route }) => ({
          headerShown: false
        })} />
        <Stack.Screen name="DetailHotel" component={DetailHotel} options={({ navigation, route }) => ({
          headerShown: true,
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: ''
        })} />
        <Stack.Screen name="SearchResult" component={SearchResult} options={({ navigation, route }) => ({
          headerShown: true,
          headerTransparent: true,
          headerShadowVisible: false,
          title: ''
        })} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={({ navigation, route }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
        })} />
        <Stack.Screen name="Booking" component={Booking} options={({ navigation, route }) => ({
          headerShown: true,
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: '',
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}