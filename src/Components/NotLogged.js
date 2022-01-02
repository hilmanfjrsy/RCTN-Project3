import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import ButtonPrimary from './ButtonPrimary';

export default function NotLogged({ navigation, route }) {
  return (
    <SafeAreaView style={[GlobalStyles.container, { }]}>
      <View>
      <Text style={[GlobalStyles.fontSecondary,{fontSize:14,textAlign:'center',marginBottom:20}]}>Anda Belum Login</Text>
        <ButtonPrimary />
      </View>
    </SafeAreaView>
  )
}