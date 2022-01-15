import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import GlobalStyles from '../../Utils/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import FA from 'react-native-vector-icons/FontAwesome';

export default function Setting({ navigation, route }) {
  async function handleLogout() {
    await AsyncStorage.removeItem('token')
    Toast.show({
      type: 'success',
      text1: 'Berhasil logout',
    });
    navigation.reset({
      index: 0,
      routes: [{ name: 'SplashScreen' }],
    });
  }
  return (
    <SafeAreaView style={[GlobalStyles.container, {}]}>
      <ScrollView>
        <View style={GlobalStyles.settingContainer}>
          <Text style={GlobalStyles.settingTitle}>MY ACCOUNT</Text>
          <View style={GlobalStyles.settingSection}>
            <Text style={GlobalStyles.fontSecondary}>First Name</Text>
            <Text style={GlobalStyles.fontSecondary}>Gilang</Text>
          </View>
          <View style={GlobalStyles.settingSection}>
            <Text style={GlobalStyles.fontSecondary}>Last Name</Text>
            <Text style={GlobalStyles.fontSecondary}>fauzi</Text>
          </View>
          <View style={GlobalStyles.settingSection}>
            <Text style={GlobalStyles.fontSecondary}>Email</Text>
            <Text style={GlobalStyles.fontSecondary}>gilang@gmail.com</Text>
          </View>
          <View style={GlobalStyles.settingSection}>
            <Text style={GlobalStyles.fontSecondary}>Gender</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[GlobalStyles.fontSecondary, { marginRight: 5 }]}>Male</Text>
              <FA name='chevron-right' color={'grey'} size={15}></FA>
            </View>
          </View>
          <View style={GlobalStyles.settingSection}>
            <Text style={GlobalStyles.fontSecondary}>Lenguage</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* <Text style={[GlobalStyles.fontSecondary, {marginRight:5}] }>Male</Text> */}
              <FA name='chevron-right' color={'grey'} size={15}></FA>
            </View>
          </View>
          <View style={GlobalStyles.settingSection}>
            <Text style={GlobalStyles.fontSecondary}>Search History</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* <Text style={[GlobalStyles.fontSecondary, {marginRight:5}] }>Male</Text> */}
              <FA name='chevron-right' color={'grey'} size={15}></FA>
            </View>
          </View>
          <View style={[GlobalStyles.settingSection, { borderBottomWidth: 0 }]}>
            <Text style={GlobalStyles.fontSecondary}>Report and Problem</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* <Text style={[GlobalStyles.fontSecondary, {marginRight:5}] }>Male</Text> */}
              <FA name='chevron-right' color={'grey'} size={15}></FA>
            </View>
          </View>
          {/* <ButtonPrimary onPress={handleLogout} text={'Logout'}/> */}
        </View>
        <View style={[GlobalStyles.settingContainer, { marginTop: 0 }]}>
          <Text style={GlobalStyles.settingTitle}>SUPPORT</Text>
          <View style={[GlobalStyles.settingSection, { flexDirection: 'column' }]}>
            <Text style={GlobalStyles.fontSecondary}>Report and Problem</Text>
          </View>
          <View style={[GlobalStyles.settingSection, { borderBottomWidth: 0, flexDirection: 'column' }]}>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={[GlobalStyles.fontSecondary, { color: 'firebrick', fontWeight:'bold' }]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <ButtonPrimary onPress={handleLogout} text={'Logout'}/> */}
      </ScrollView>
    </SafeAreaView>
  )
}