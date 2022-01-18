// In App.js in a new project

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import SplashScreen from '../SplashScreen';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import SearchResult from '../Screens/SearchResult';
import DetailHotel from '../Screens/DetailHotel';
import { Text, TouchableOpacity } from 'react-native';
import GlobalVar from '../Utils/GlobalVar';

import Ant from 'react-native-vector-icons/AntDesign'
import GlobalStyles from '../Utils/GlobalStyles';
import EditProfile from '../Screens/Profile/EditProfile';

const Stack = createNativeStackNavigator();

export default function BaseRoute({ navigation }) {

  useEffect(() => {
    console.log('navigation')
  }, [navigation])
  return (
    <NavigationContainer>
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
          headerTitle: '',
          headerRight: () => (
            <TouchableOpacity
              style={[GlobalStyles.cardBody, { borderRadius: 100 }]}
            >
              <Ant name="hearto" size={20} color={GlobalVar.greyColor} />
            </TouchableOpacity>
          )
        })} />
        <Stack.Screen name="SearchResult" component={SearchResult} options={({ navigation, route }) => ({
          headerShown: true,
          title: 'Search Result'
        })} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={({ navigation, route }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}