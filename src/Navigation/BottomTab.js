import React, { Component, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import FA from 'react-native-vector-icons/FontAwesome'
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import GlobalVar from '../Utils/GlobalVar';

import Search from '../Screens';
import Setting from '../Screens/Setting';
import NotLogged from '../Components/NotLogged';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const [isSignin, setIsSignin] = useState(false)

  async function getStatusLogin() {
    const token = await AsyncStorageLib.getItem('token')
    if (token) setIsSignin(true)
  }

  useEffect(() => {
    getStatusLogin()
  }, [])
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: GlobalVar.primaryColor,
      }}
    >
      <Tab.Screen name="Search" component={Search} options={({ navigation, route }) => ({
        title: 'Search',
        tabBarIcon: ({ focused, color }) => (
          <FA name={'search'} color={color} size={20} />
        )
      })} />
      <Tab.Screen name="Favorite" component={Search} options={({ navigation, route }) => ({
        title: 'Favorite',
        tabBarIcon: ({ focused, color }) => (
          <FA name={'heart'} color={color} size={20} />
        )
      })} />
      <Tab.Screen name="Profile" component={Search} options={({ navigation, route }) => ({
        title: 'Profile',
        tabBarIcon: ({ focused, color }) => (
          <FA name={'user'} color={color} size={20} />
        )
      })} />
      <Tab.Screen name="Setting" component={isSignin? Setting : NotLogged } options={({ navigation, route }) => ({
        title: 'Setting',
        tabBarIcon: ({ focused, color }) => (
          <FA name={'gear'} color={color} size={20} />
        )
      })} />
    </Tab.Navigator>
  );
}