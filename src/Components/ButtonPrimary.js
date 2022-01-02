import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Flow } from 'react-native-animated-spinkit'
import GlobalVar from '../Utils/GlobalVar';
import GlobalStyles from '../Utils/GlobalStyles';

export default function ButtonPrimary({
  height = 60,
  width = '100%',
  isRounded = true,
  isLoading = false,
  text = 'Tombol',
  onPress = () => { }
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      style={[GlobalStyles.row, { justifyContent: 'center', alignItems: 'center', backgroundColor: isLoading ? GlobalVar.greyColor : GlobalVar.primaryColor, height, width, borderRadius: isRounded ? 5 : 0 }]}
    >
      {isLoading ?
        <Flow
          color='white'
          size={25}
        />
        :
        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>{text}</Text>
      }
    </TouchableOpacity>
  )
}