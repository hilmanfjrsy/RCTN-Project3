// In App.js in a new project

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import SplashScreen from '../SplashScreen';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import SearchResult from '../Screens/SearchResult';

const Stack = createNativeStackNavigator();

export default function BaseRoute({navigation}) {

  useEffect(()=>{
    console.log('navigation')
  },[navigation])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'SplashScreen'}>
        <Stack.Screen name="BottomTab" component={BottomTab} options={({navigation,route})=>({
          headerShown:false
        })} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={({navigation,route})=>({
          headerShown:false
        })} />
        <Stack.Screen name="Login" component={Login} options={({navigation,route})=>({
          headerShown:false
        })} />
        <Stack.Screen name="Register" component={Register} options={({navigation,route})=>({
          headerShown:false
        })} />
        <Stack.Screen name="SearchResult" component={SearchResult} options={({navigation,route})=>({
          headerShown:true,
          title:'Search Result'
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}