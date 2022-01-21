import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Wander } from 'react-native-animated-spinkit';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';

export default function Loading({text='Loading...'}) {
  return(
    <View style={[GlobalStyles.container,{alignItems:'center',justifyContent:'center',backgroundColor:'white'}]}>
      <Wander color={GlobalVar.primaryColor} />
      <Text style={[GlobalStyles.fontSecondary,{marginTop:15}]}>{text}</Text>
    </View>
  )
}