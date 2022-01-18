import React, { Component } from 'react';
import { SafeAreaView, Text, View, TextInput, StyleSheet } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import ButtonPrimary from './ButtonPrimary';
import FA from 'react-native-vector-icons/FontAwesome'

export default function NotLogged({ navigation, route }) {
  return (
    <SafeAreaView style={[GlobalStyles.container, { justifyContent: 'center' }]}>
      <View style={{alignItems: 'center'}}>
        <FA name='sign-in' size={80} color={'grey'} />
        <Text style={[GlobalStyles.fontSecondary, { fontSize: 14, marginBottom: 20,marginTop:30 }]}>Anda Belum Login</Text>
        <ButtonPrimary onPress={() => navigation.navigate('Login')} text={'Login'} />
      </View>
    </SafeAreaView>
  )
}
