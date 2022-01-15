import React, { Component, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import GlobalStyles from './Utils/GlobalStyles';
import { Swing } from 'react-native-animated-spinkit'
import GlobalVar from './Utils/GlobalVar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkExpireToken, decodeToken } from './Utils/GlobalFunc';

export default function SplashScreen({ navigation, route }) {

  useEffect(() => {
    setTimeout(async () => {
      checkExpireToken()
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTab' }],
      });
    }, 3000);
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar hidden />
      <Text style={[GlobalStyles.fontPrimary, { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }]}>Kelompok 2</Text>
      <Swing
        color={GlobalVar.primaryColor}
      />
    </View>
  )
}