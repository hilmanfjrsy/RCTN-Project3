import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ButtonPrimary from '../Components/ButtonPrimary';
import IconText from '../Components/IconText';
import Loading from '../Components/Loading';
import RenderPrice from '../Components/RenderPrice';
import { getRating, getRequest } from '../Utils/GlobalFunc';
import GlobalStyles from '../Utils/GlobalStyles';
import RenderHtml from 'react-native-render-html';
import Toast from 'react-native-toast-message';
import Ent from 'react-native-vector-icons/Entypo'

const { width } = Dimensions.get('screen')
export default function DetailHotel({ navigation, route }) {
  const params = route.params.parameter
  const image = route.params.image
  const [detail, setDetail] = useState(null)
  const [transportation, setTransportation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getDetails() {
    setIsLoading(true)
    let checkData = await AsyncStorage.getItem('detail')
    if (checkData) {
      let d = JSON.parse(checkData)
      setDetail(d.data.body)
      setTransportation(d.transportation)
    } else {
      let res = await getRequest('properties/get-details', params)
      if (res) {
        setDetail(res.data.data.body)
        setTransportation(res.data.transportation)
        await AsyncStorage.setItem('detail', JSON.stringify(res.data))
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getDetails()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <FastImage
            style={{ height: 250, width: '100%', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}
            source={{ uri: image }}
            resizeMode='cover'
          />
          {detail?.propertyDescription.featuredPrice.offer && <View style={{ backgroundColor: '#842029', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, position: 'absolute', bottom: 10, right: 10 }}>
            <Text style={[GlobalStyles.fontPrimary, { fontSize: 12, fontWeight: '500', color: 'white' }]}>{detail?.propertyDescription.featuredPrice.offer.label}</Text>
            <Text style={[GlobalStyles.fontSecondary, { fontSize: 8, color: 'white' }]}>{detail?.propertyDescription.featuredPrice.offer.text}</Text>
          </View>}
        </View>

        <View style={[GlobalStyles.cardBody, { marginTop: 0, padding: 15, borderRadius: 0 }]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[GlobalStyles.row, { backgroundColor: '#cff4fc', borderRadius: 2, paddingHorizontal: 10, marginBottom: 10, paddingVertical: 5 }]}>
              <Ent name='info' size={12} color={'#055160'} />
              <Text style={[GlobalStyles.fontSecondary, { color: '#055160', marginLeft: 5 }]}>{detail?.hotelWelcomeRewards?.info}</Text>
            </View>
          </View>
          {getRating(detail?.propertyDescription.starRating, 13)}
          <Text style={[GlobalStyles.fontPrimary, { fontSize: 16, marginVertical: 5, fontWeight: 'bold' }]}>{detail?.propertyDescription.name}</Text>
          <IconText
            icon="Ionicons"
            name={'ios-location-sharp'}
            size={15}
            text={detail?.propertyDescription.address.fullAddress}
          />
        </View>

        <View style={[GlobalStyles.cardBody, { padding: 15 }]}>
          {detail?.amenities.map((item, index) => {
            return (
              <View key={String(index)}>
                <Text style={[GlobalStyles.fontPrimary, { fontSize: 16, marginVertical: 5, fontWeight: 'bold' }]}>{item.heading}</Text>
                {item.listItems.map((item, index) => <RenderOverview title={item.heading} listItems={item.listItems} index={index} key={String(index)} />)}
              </View>
            )
          })}
        </View>

        <View style={[GlobalStyles.cardBody, { padding: 15 }]}>
          <Text style={[GlobalStyles.fontPrimary, { fontSize: 16, marginVertical: 5, fontWeight: 'bold' }]}>{detail?.hygieneAndCleanliness?.title}</Text>
          <Text style={[GlobalStyles.fontPrimary, { fontSize: 14, marginVertical: 5, fontWeight: '500' }]}>{detail?.hygieneAndCleanliness?.healthAndSafetyMeasures?.title}</Text>
          <Text style={[GlobalStyles.fontSecondary, { marginBottom: 5 }]}>{detail?.hygieneAndCleanliness?.healthAndSafetyMeasures?.description}</Text>
        </View>

        <View style={[GlobalStyles.cardBody, { padding: 15 }]}>
          <Text style={[GlobalStyles.fontPrimary, { fontSize: 16, marginVertical: 5, fontWeight: 'bold' }]}>Alternative Names</Text>
          {detail?.smallPrint.alternativeNames.map((item, index) => <Text key={String(index)} style={[GlobalStyles.fontSecondary, { marginVertical: 5, fontSize: 12 }]} >&#8226; {item}</Text>)}

          <Text style={[GlobalStyles.fontPrimary, { fontSize: 16, marginVertical: 5, fontWeight: 'bold' }]}>Policies</Text>
          {detail?.smallPrint.policies.map((item, index) =>
            <RenderHtml
              key={index}
              style={{ marginBottom: 0, backgroundColor: 'red' }}
              contentWidth={width}
              source={{ html: item.replace('<p>', '<p style="margin-bottom:5px; margin-top:0; font-size:12px; color:#949494" >&#8226; ') }}
            />)}
        </View>

        <View style={[GlobalStyles.cardBody, { padding: 15 }]}>
          <Text style={[GlobalStyles.fontPrimary, { fontSize: 16, marginVertical: 5, fontWeight: 'bold' }]}>Nearest Public Transportation</Text>
          {transportation?.transportLocations.map((item, index) => <RenderOverview title={item.category} listItems={item.locations} index={index} key={String(index)} />)}
        </View>

      </ScrollView>

      <View style={[GlobalStyles.cardBody, GlobalStyles.spaceBetween, { borderRadius: 0, marginVertical: 0, paddingHorizontal: 15 }]}>
        <RenderPrice
          size={18}
          current={detail?.propertyDescription.featuredPrice?.currentPrice.formatted}
          old={detail?.propertyDescription.featuredPrice?.oldPrice}
          label
          taxInfo={detail?.propertyDescription.featuredPrice?.taxInclusiveFormatting}
        />
        <ButtonPrimary
          onPress={() => handleBooking()}
          style={{ marginLeft: 30, flex: 1 }}
          text={'Booking Now'}
        />
      </View>
    </SafeAreaView >
  )

  async function handleBooking() {
    let token = await AsyncStorage.getItem('token')
    if (token) {
      navigation.navigate('Booking', { parameter: params, detail, result: route.params.item })
    } else {
      Toast.show({
        type: 'error',
        text1: 'Anda belum login',
        text2: 'Harap login terlebih dahulu',
      });
    }
  }

  function RenderOverview({ title, listItems, index }) {
    return (
      <View>
        <Text style={[GlobalStyles.fontPrimary, { fontSize: 14, marginVertical: 5, fontWeight: '500', textTransform: 'capitalize' }]}>{title.replace('-', ' ')}</Text>
        {listItems.length == 0 && <Text style={[GlobalStyles.fontSecondary, {}]}>Data tidak ditemukan</Text>}
        {listItems.map((item, index) => {
          if (item.distanceInTime) {
            item = item.name + ' ' + item.distanceInTime
          }
          return (
            <Text key={String(index)} style={[GlobalStyles.fontSecondary, { marginBottom: 5 }]} >&#8226; {item}</Text>
          )
        })}
      </View>
    )
  }
}