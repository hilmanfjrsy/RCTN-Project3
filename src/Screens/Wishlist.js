import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';

import Ion from 'react-native-vector-icons/Ionicons'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Components/Loading';
import RenderHotel from '../Components/RenderHotel';
import NotLogged from '../Components/NotLogged';

export default function Wishlist({ navigation, route }) {
  const [result, setResult] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  async function getData() {
    setIsLoading(true)
    let user = JSON.parse(await AsyncStorage.getItem('profile'))
    let r = JSON.parse(await AsyncStorage.getItem('wishlist_' + user.username)) || []
    if (r) {
      console.log(r)
      setResult(r)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      getData()
    })
    return unsub
  }, [navigation])

  if (isLoading) {
    return <Loading />
  }

  return (
    <SafeAreaView style={[GlobalStyles.container, {}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[GlobalStyles.fontPrimary, { fontSize: 30, fontWeight: 'bold', marginBottom: 30 }]}>My Favorite</Text>
        <View style={[GlobalStyles.spaceBetween, {}]}>
          <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500' }]}>{result.length} hotels found</Text>
        </View>
        {result.length == 0 && <NotLogged icon='box-open' text='Data tidak ditemukan' showButton={false} />}
        <View>
          {result.map((item, index) => <RenderHotel key={String(index)} navigation={navigation} index={index} params={item.params} item={item} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}