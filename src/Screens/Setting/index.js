import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import GlobalStyles from '../../Utils/GlobalStyles';

export default function Setting({navigation,route}) {
  return(
    <SafeAreaView style={[GlobalStyles.container,{}]}>
      <ScrollView>
        <View>
          <Text style={[GlobalStyles.fontSecondary]}>Ini Setting</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}