import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';
import FastImage from 'react-native-fast-image';

import Ion from 'react-native-vector-icons/Ionicons'
import Ant from 'react-native-vector-icons/AntDesign'
import FA from 'react-native-vector-icons/FontAwesome'
import { getRating } from '../Utils/GlobalFunc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Components/Loading';

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
      // console.log('sini',)
      setResult(JSON.parse(r))
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getSearch()
  }, [])

  if(isLoading){
    return <Loading/>
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

          <TouchableOpacity style={{ marginTop: 15, paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: GlobalVar.greyColor, alignItems: 'center' }}>
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
            {result?.searchResults.results.map((item, index) => <RenderHotel key={String(index)} index={index} item={item} />)}
          </View>
        </View>
      </View>
    </ScrollView>
  )

  function RenderHotel({ item, index }) {

    function renderPrice(current, old) {
      return (
        <View>
          {old && <Text style={[GlobalStyles.fontSecondary, { textDecorationLine: 'line-through', marginBottom: 3 }]}>{old}</Text>}
          <Text style={[GlobalStyles.fontPrimary, { fontWeight: 'bold', fontSize: 16, color: GlobalVar.primaryColor }]}>{current}</Text>
        </View>
      )
    }

    return (
      <TouchableOpacity
        style={[GlobalStyles.cardBody, { padding: 0, marginTop: 15 }]}
      >
        <View>
          <FastImage
            style={{ height: 150, width: '100%', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}
            source={{ uri: item.optimizedThumbUrls.srpDesktop }}
            resizeMode='cover'
          />
          <TouchableWithoutFeedback>
            <TouchableOpacity
              hitSlop={GlobalVar.hitSlop}
              style={[GlobalStyles.cardBody, { position: 'absolute', right: 10, top: 5, }]}>
              <Ant name={'hearto'} size={20} color={GlobalStyles.greyColor} />
            </TouchableOpacity>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ padding: 10, }}>
          {item.messaging.scarcity && <View style={[GlobalStyles.row]}>
            <Text style={[GlobalStyles.fontSecondary, { marginBottom: 5, paddingVertical: 3, fontWeight: '500', color: '#664d03', backgroundColor: '#fff3cd', paddingHorizontal: 5 }]}>{item.messaging.scarcity}</Text>
          </View>}
          <Text style={[GlobalStyles.fontPrimary, { fontWeight: 'bold' }]} numberOfLines={2} lineBreakMode='tail' >{item.name}</Text>
          <View style={[GlobalStyles.row, { marginTop: 5 }]}>
            <Ion name='ios-location-sharp' size={12} color={GlobalVar.primaryColor} />
            <Text style={[GlobalStyles.fontSecondary, { marginLeft: 5 }]}>{item.address.streetAddress}</Text>
          </View>

          <View style={[GlobalStyles.spaceBetween, { marginTop: 15 }]}>
            <View>
              {item.landmarks.length > 0 && <View style={[GlobalStyles.row, { marginBottom: 3 }]}>
                <FA name='location-arrow' size={12} color={GlobalVar.primaryColor} />
                <Text style={[GlobalStyles.fontSecondary, { marginLeft: 5 }]}>{item.landmarks[0].distance + ' to ' + item.landmarks[0].label}</Text>
              </View>}
              {getRating(item.starRating, 12)}
            </View>
            {renderPrice(item.ratePlan.price.current, item.ratePlan.price.old)}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}