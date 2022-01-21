import React, { Component } from 'react';
import { Text, View } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';

export default function RenderPrice({ current, old, label, taxInfo, style = {}, size = 16 }) {
  return (
    <View style={{ ...style }}>
      {old && <Text style={[GlobalStyles.fontSecondary, { textDecorationLine: 'line-through', marginBottom: 3 }]}>{old}</Text>}
      <Text style={[GlobalStyles.fontPrimary, { fontWeight: 'bold', fontSize: size, color: GlobalVar.primaryColor }]}>{current}</Text>
      {label && <Text style={[GlobalStyles.fontSecondary, { fontSize:10 }]}>{taxInfo ? 'Including tax' : 'Not including tax'}</Text>}
    </View>
  )
}