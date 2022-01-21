import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';

import Ion from 'react-native-vector-icons/Ionicons'

export default function RenderTextHorizontal({
  text = '',
  icon = null,
  color = GlobalVar.greyColor,
  rightText = '',
  disabled = false,
  onPress = () => { },
  valueTextInput = '',
  textInput=false,
  onChangeText = () => { },
  inputDisabled = false,
  keyType='default'
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[GlobalStyles.spaceBetween, { borderBottomColor: GlobalVar.greyColor, borderBottomWidth: 0.7, paddingVertical: 20 }]}
    >
      <Text style={[GlobalStyles.fontSecondary, { color, fontSize: 14, fontWeight: '500' }]}>{text}</Text>
      {icon && <Ion name={icon} size={20} color={color} />}
      {rightText ? <Text style={[GlobalStyles.fontSecondary, {}]}>{rightText}</Text> : null}
      {textInput ? <TextInput
        value={valueTextInput}
        editable={!inputDisabled}
        keyboardType={keyType}
        placeholder='Type here..'
        onChangeText={onChangeText}
        style={[GlobalStyles.fontPrimary, { fontWeight: 'bold', textAlign: 'right', padding: 0, }]}
      /> : null}
    </TouchableOpacity>
  )
}