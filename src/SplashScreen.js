import React, { Component, useEffect } from 'react';
import { View, Text, StatusBar, Dimensions } from 'react-native';
import GlobalStyles from './Utils/GlobalStyles';
import { Swing } from 'react-native-animated-spinkit'
import GlobalVar from './Utils/GlobalVar';
import { checkExpireToken, decodeToken } from './Utils/GlobalFunc';
import FastImage from 'react-native-fast-image';

import splash from './Assets/splash.jpg'

const { width, height } = Dimensions.get('screen')
export default function SplashScreen({ navigation, route }) {

  useEffect(() => {
    setTimeout(async () => {
      checkExpireToken(navigation)
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTab' }],
      });
    }, 3000);
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar hidden />
      <FastImage
        source={splash}
        style={{ width, height }}
        resizeMode='contain'
      />
    </View>
  )
}