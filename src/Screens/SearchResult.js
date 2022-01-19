import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';

import Ion from 'react-native-vector-icons/Ionicons'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Components/Loading';
import RenderHotel from '../Components/RenderHotel';

export default function SearchResult({ navigation, route }) {
  const params = route.params.parameter
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  async function getSearch() {
    setIsLoading(true)
    let r = await AsyncStorage.getItem('searchResult')
    if (!r) {
      let res = await getRequest('properties/list', params);
      if (res) {
        await AsyncStorage.setItem('searchResult', JSON.stringify(res.data.data.body));
        setResult(res.data.data.body)
      }
    } else {
      setResult(JSON.parse(r))
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getSearch()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[GlobalStyles.container, {}]}>
        <View style={[GlobalStyles.cardBody, { marginBottom: 15 }]}>
          <Text style={[GlobalStyles.fontSecondary, { fontSize: 14 }]}>Location</Text>
          <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500' }]}>{result?.header}</Text>
          <View style={[GlobalStyles.spaceBetween, { marginTop: 20 }]}>
            <View style={{ width: '48%' }}>
              <Text style={[GlobalStyles.fontSecondary, { fontSize: 14 }]}>Date</Text>
              <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500' }]}>{moment(params.checkIn).format('DD MMM')} - {moment(params.checkOut).format('DD MMM')}</Text>
            </View>
            <View style={{ width: '48%' }}>
              <Text style={[GlobalStyles.fontSecondary, { fontSize: 14 }]}>Guest</Text>
              <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500' }]}>{params.adults1} Adult</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 15, paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: GlobalVar.greyColor, alignItems: 'center' }}>
            <Text style={[GlobalStyles.fontPrimary, { fontWeight: 'bold', fontSize: 14, color: GlobalVar.primaryColor }]}>Change</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={[GlobalStyles.spaceBetween, {}]}>
            <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500' }]}>{result?.searchResults.totalCount} hotels found</Text>
            <TouchableOpacity
              hitSlop={GlobalVar.hitSlop}
              style={[GlobalStyles.row, {}]}>
              <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', marginRight: 10 }]}>Filter</Text>
              <Ion name="filter" size={20} color={GlobalVar.primaryColor} />
            </TouchableOpacity>
          </View>

          <View>
            {result?.searchResults.results.map((item, index) => <RenderHotel key={String(index)} navigation={navigation} index={index} params={params} item={item} />)}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}