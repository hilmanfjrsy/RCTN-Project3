import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import GlobalStyles from '../../Utils/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import FA from 'react-native-vector-icons/FontAwesome';
import Ion from 'react-native-vector-icons/Ionicons'
import GlobalVar from '../../Utils/GlobalVar';
import RenderTextHorizontal from '../../Components/RenderTextHorizontal';
export default function Setting({ navigation, route }) {
  const menu = [
    {
      onPress: () => console.log('sd'),
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
      onPress: () => console.log('sd'),
      text: 'Term of Services',
      icon: 'chevron-forward'
    },
    {
      onPress: () => console.log('sd'),
      text: 'Privacy Policy',
      icon: 'chevron-forward'
    },
    {
      onPress: () => console.log('sd'),
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
            Toast.show({
              type: 'success',
              text1: 'Berhasil logout',
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