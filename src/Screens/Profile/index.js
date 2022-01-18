import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';

export default function Profile({ navigation, route }) {
  const [profile, setProfile] = useState(null)

  async function getProfile() {
    let prof = await AsyncStorage.getItem('profile')
    if (prof) {
      setProfile(JSON.parse(prof))
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfile()
    });

    return unsubscribe;
  }, [navigation])

  return (
    <SafeAreaView style={[GlobalStyles.container, { padding: 0, flex: 1 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[GlobalStyles.cardBody, { borderRadius: 0, marginTop: 0, padding: 20 }]}>
          <Text style={[GlobalStyles.fontPrimary, { fontSize: 30, fontWeight: 'bold', marginBottom: 30 }]}>My Profile</Text>

          <View style={[GlobalStyles.row, {}]}>
            <View style={{ alignItems: 'center' }}>
              <Avatar.Text size={70} label={profile?.username.substring(0, 1).toUpperCase()} style={{ backgroundColor: GlobalVar.greyColor }} />
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile', { profile })}
                style={{ borderWidth: 1, borderColor: GlobalVar.primaryColor, marginTop: 15, borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5 }}
              >
                <Text style={[GlobalStyles.fontSecondary, { color: GlobalVar.primaryColor, fontWeight: '500' }]}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 20, flex: 1 }}>
              <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>{profile?.username}</Text>
              <Text style={[GlobalStyles.fontSecondary, {}]}>{profile?.email}</Text>

              <View style={[GlobalStyles.spaceBetween, { marginTop: 20 }]}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>50</Text>
                  <Text style={[GlobalStyles.fontSecondary, {}]}>Booking</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>0</Text>
                  <Text style={[GlobalStyles.fontSecondary, {}]}>Reviews</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>50</Text>
                  <Text style={[GlobalStyles.fontSecondary, {}]}>Favorites</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={[GlobalStyles.cardBody, { borderRadius: 0 }]}>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}