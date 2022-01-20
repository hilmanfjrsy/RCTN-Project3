import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';
import FA from 'react-native-vector-icons/FontAwesome'
import RenderTextHorizontal from '../Components/RenderTextHorizontal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPrimary from '../Components/ButtonPrimary';
import Toast from 'react-native-toast-message';

export default function Booking({ navigation, route }) {
  const params = route.params.parameter
  const price = route.params.detail.propertyDescription.featuredPrice
  var result = route.params.result
  const [profile, setProfile] = useState(null)

  const cekout = moment(params.checkOut)
  const cekin = moment(params.checkIn)
  const dif = cekout.diff(cekin, 'days')
  const total = (dif * price.currentPrice.plain).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  async function getProfile() {
    let prof = JSON.parse(await AsyncStorage.getItem('profile'))
    if (prof) {
      setProfile(prof)
    }
  }

  useEffect(() => {
    const sub = navigation.addListener('focus', () => {
      getProfile()
    })
    return sub
  }, [navigation])
  return (
    <SafeAreaView style={[GlobalStyles.container, { paddingBottom: 0 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[GlobalStyles.fontPrimary, { fontSize: 30, fontWeight: 'bold', marginVertical: 30 }]}>Booking Hotel</Text>
        <View style={[GlobalStyles.spaceBetween, {}]}>
          <View style={[GlobalStyles.cardBody, {}]}>
            <Text style={[GlobalStyles.fontSecondary, {}]}>Check-In Date</Text>
            <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 16, marginTop: 5 }]}>{moment(params.checkIn).format('ddd, DDD MMM YYYY')}</Text>
          </View>
          <FA name='long-arrow-right' size={20} color={GlobalVar.primaryColor} />
          <View style={[GlobalStyles.cardBody, {}]}>
            <Text style={[GlobalStyles.fontSecondary, {}]}>Check-Out Date</Text>
            <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 16, marginTop: 5 }]}>{moment(params.checkOut).format('ddd, DDD MMM YYYY')}</Text>
          </View>
        </View>

        <View style={[GlobalStyles.cardBody, { marginTop: 25, paddingVertical: 15 }]}>
          <Text style={[GlobalStyles.fontPrimary, { fontSize: 14, fontWeight: '500', marginBottom: 10 }]}>Contact Information</Text>
          <RenderTextHorizontal
            text='Full Name'
            disabled
            rightText={profile?.firstName + ' ' + profile?.lastName }
          />
          <RenderTextHorizontal
            text='Email'
            disabled
            rightText={profile?.email}
          />
          <RenderTextHorizontal
            text='Phone'
            disabled
            rightText={profile?.phone}
          />
        </View>

        <View style={[GlobalStyles.cardBody, { marginTop: 25, paddingVertical: 15 }]}>
          <Text style={[GlobalStyles.fontPrimary, { fontSize: 14, fontWeight: '500', marginBottom: 10 }]}>Price Summary</Text>
          <Text style={[GlobalStyles.fontPrimary, { fontSize: 12, fontWeight: '500', marginBottom: 10 }]}>{params.adults1} Adults, 1 Rooms</Text>
          <RenderTextHorizontal
            text='Discount'
            disabled
            rightText={price?.offer?.label}
          />
          <RenderTextHorizontal
            text='Total Price'
            disabled
            rightText={'Rp' + total}
          />
        </View>
        <ButtonPrimary
          onPress={() => handleBooking()}
          style={{ marginVertical: 20 }}
          text={'Booking'}
        />
      </ScrollView>
    </SafeAreaView>
  )

  async function handleBooking() {
    if (profile?.firstName && profile?.email && profile?.phone) {
      let user = JSON.parse(await AsyncStorage.getItem('profile'))
      let book = JSON.parse(await AsyncStorage.getItem('booking_' + user.username)) || []
      result.fullPayment = 'Rp' + total

      book.push(result)
      await AsyncStorage.setItem('booking_' + user.username, JSON.stringify(book))
      navigation.goBack()
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: route.params.detail.propertyDescription.name + ' has booked',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Profile is not complete',
        text2: 'Please complete your profile',
      });
      navigation.navigate('EditProfile', { profile })
    }
  }
}