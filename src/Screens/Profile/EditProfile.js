import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import ButtonPrimary from '../../Components/ButtonPrimary';
import RenderTextHorizontal from '../../Components/RenderTextHorizontal';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';
import Toast from 'react-native-toast-message';

export default function EditProfile({ navigation, route }) {
  const profile = route.params.profile
  const [firstName, setFirstName] = useState(profile?.firstName)
  const [lastName, setLastName] = useState(profile?.lastName)
  const [phone, setPhone] = useState(profile?.phone)

  return (
    <SafeAreaView style={[GlobalStyles.container, { paddingBottom: 0, backgroundColor: 'white' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[GlobalStyles.fontPrimary, { fontSize: 30, fontWeight: 'bold', marginBottom: 30 }]}>Edit Profile</Text>
        <View>
          <Avatar.Text size={100} label={profile.username.substring(0, 1).toUpperCase()} style={{ backgroundColor: GlobalVar.greyColor, marginBottom: 30, alignSelf: 'center', marginTop: 20 }} />
          <RenderTextHorizontal
            disabled
            textInput
            text={'Username'}
            valueTextInput={profile.username}
            inputDisabled
          />
          <RenderTextHorizontal
            disabled
            textInput
            text={'Email'}
            valueTextInput={profile.email}
            inputDisabled
          />
          <RenderTextHorizontal
            disabled
            textInput
            text={'First Name'}
            onChangeText={(v) => setFirstName(v)}
            valueTextInput={firstName}
          />
          <RenderTextHorizontal
            disabled
            textInput
            text={'Last Name'}
            onChangeText={(v) => setLastName(v)}
            valueTextInput={lastName}
          />
          <RenderTextHorizontal
            disabled
            textInput
            text={'Phone'}
            keyType='numeric'
            onChangeText={(v) => setPhone(v)}
            valueTextInput={phone}
          />
          <ButtonPrimary
            text={'Update Profile'}
            style={{ marginTop: 30 }}
            onPress={() => saveProfile()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )

  async function saveProfile() {
    let newUpdate = {
      ...profile,
      firstName,
      lastName,
      phone
    }
    let allUser = JSON.parse(await AsyncStorage.getItem('user'))
    let all = allUser.map((item) => {
      if (item.username == profile?.username && item.email == profile?.email) {
        item = newUpdate
      }
      return item
    })
    await AsyncStorage.setItem('user', JSON.stringify(all))
    await AsyncStorage.setItem('profile', JSON.stringify(newUpdate))
    Toast.show({
      type: 'success',
      text1: 'Sucess',
      text2: 'Profile has been updated',
    });
    navigation.goBack()
  }
}