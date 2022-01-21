import React, { Component } from 'react';
import { Text, View } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';

import Ant from 'react-native-vector-icons/AntDesign'
import Ent from 'react-native-vector-icons/Entypo'
import FA from 'react-native-vector-icons/FontAwesome'
import Ion from 'react-native-vector-icons/Ionicons'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'

export default function IconText({ icon, name, text, size }) {
  function RenderIcon() {
    if(icon =='AntDesign'){
      return <Ant name={name} size={size} color={GlobalVar.primaryColor} />
    }else if(icon =='Entypo'){
      return <Ent name={name} size={size} color={GlobalVar.primaryColor} />
    }else if(icon =='FontAwesome'){
      return <FA name={name} size={size} color={GlobalVar.primaryColor} />
    }else if(icon =='Ionicons'){
      return <Ion name={name} size={size} color={GlobalVar.primaryColor} />
    }else{
      return <MCI name={name} size={size} color={GlobalVar.primaryColor} />
    }
  }
  return (
    <View style={[GlobalStyles.row, { marginTop: 5 }]}>
      <RenderIcon/>
      <Text style={[GlobalStyles.fontSecondary, { marginLeft: 5 }]}>{text}</Text>
    </View>
  )
}