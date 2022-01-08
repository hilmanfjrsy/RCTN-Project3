import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import GlobalStyles from '../../Utils/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function Setting({navigation,route}) {
  async function handleLogout(){
    try{
      await AsyncStorage.removeItem('token')
      Toast.show({
        type: 'success',
        text1: 'Berhasil logout',
      });
      navigation.navigate('Login')
    } catch {

    }
  }
  return(
    <SafeAreaView style={[GlobalStyles.container,{}]}>
      <ScrollView>
        <View>
          <Text style={[GlobalStyles.fontSecondary]}>Ini Setting</Text>
          <ButtonPrimary onPress={handleLogout} text={'Logout'}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}