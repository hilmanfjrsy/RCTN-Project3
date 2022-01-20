import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import GlobalStyles from '../../Utils/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import RenderTextHorizontal from '../../Components/RenderTextHorizontal';

export default function Setting({ navigation, route }) {
  const menu = [
    {
      onPress: () => handleComingSoon(),
      text: 'Notifications',
      icon: 'notifications'
    },
    {
      disabled: true,
      text: 'Country',
      rightText: 'Indonesia'
    },
    {
      disabled: true,
      text: 'Currency',
      rightText: 'IDR'
    },
    {
      onPress: () => handleComingSoon(),
      text: 'Term of Services',
      icon: 'chevron-forward'
    },
    {
      onPress: () => handleComingSoon(),
      text: 'Privacy Policy',
      icon: 'chevron-forward'
    },
    {
      onPress: () => handleComingSoon(),
      text: 'Give us Feedback',
      icon: 'chevron-forward'
    },
    {
      onPress: handleLogout,
      text: 'Logout',
      icon: 'ios-power',
      color: 'firebrick'
    }
  ]

  function handleComingSoon() {
    Toast.show({
      type: 'info',
      text1: 'Coming Soon',
      text2: 'This feature is still under development',
    });
  }
  async function handleLogout() {
    console.log('asd')
    Alert.alert(
      "Confirmation",
      "You want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('profile')
            Toast.show({
              type: 'success',
              text1: 'Logout successfully',
            });
            navigation.reset({
              index: 0,
              routes: [{ name: 'SplashScreen' }],
            });
          }
        }
      ]
    );
  }
  return (
    <SafeAreaView style={[GlobalStyles.container, { backgroundColor: 'white' }]}>
      <ScrollView>
        <Text style={[GlobalStyles.fontPrimary, { fontSize: 30, fontWeight: 'bold', marginBottom: 30 }]}>Settings</Text>
        {menu.map((item, index) =>
          <RenderTextHorizontal
            key={index}
            onPress={item.onPress}
            text={item.text}
            icon={item.icon}
            color={item.color}
            rightText={item.rightText}
            disabled={item.disabled}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}