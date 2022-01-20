import React, { Component, useEffect, useState } from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Ant from 'react-native-vector-icons/AntDesign'
import { getRating, handleWishlish } from '../Utils/GlobalFunc';
import FastImage from 'react-native-fast-image';
import IconText from './IconText';
import RenderPrice from './RenderPrice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalVar from '../Utils/GlobalVar';
import GlobalStyles from '../Utils/GlobalStyles';
import Toast from 'react-native-toast-message';

export default function RenderHotel({ item, params, navigation, disabled = false }) {
  const [wishList, setWishList] = useState(false)
  const [username, setUsername] = useState('')

  let parameter = {
    id: item.id,
    checkIn: params?.checkIn,
    checkOut: params?.checkOut,
    adults1: params?.adults1,
    currency: 'IDR',
    locale: 'en_US'
  }

  async function getWishlist() {
    let user = JSON.parse(await AsyncStorage.getItem('profile'))
    if (user) {
      let wish = JSON.parse(await AsyncStorage.getItem('wishlist_' + user.username)) || []
      let find = wish.find(v => item.id == v.id)

      if (find) {
        setWishList(true)
      } else {
        setWishList(false)
      }
      setUsername(user.username)
    }
  }

  useEffect(() => {
    getWishlist()
  }, [])

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        navigation.navigate('DetailHotel', {
          parameter,
          image: item?.optimizedThumbUrls?.srpDesktop,
          item
        })
      }}
      style={[GlobalStyles.cardBody, { padding: 0, marginTop: 15 }]}
    >
      <View>
        <FastImage
          style={{ height: 150, width: '100%', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}
          source={{ uri: item?.optimizedThumbUrls?.srpDesktop }}
          resizeMode='cover'
        />
        {!disabled && <TouchableWithoutFeedback>
          <TouchableOpacity
            onPress={() => handleWishlish(getWishlist.bind(this), username, item, parameter, wishList)}
            hitSlop={GlobalVar.hitSlop}
            style={[GlobalStyles.cardBody, { position: 'absolute', right: 10, top: 5, }]}>
            <Ant name={wishList ? 'heart' : 'hearto'} size={20} color={wishList ? 'firebrick' : GlobalStyles.greyColor} />
          </TouchableOpacity>
        </TouchableWithoutFeedback>}
      </View>
      <View style={{ padding: 10, }}>
        {item.messaging?.scarcity && <View style={[GlobalStyles.row]}>
          <Text style={[GlobalStyles.fontSecondary, { marginBottom: 5, paddingVertical: 3, fontWeight: '500', color: '#664d03', backgroundColor: '#fff3cd', paddingHorizontal: 5 }]}>{item.messaging.scarcity}</Text>
        </View>}
        <Text style={[GlobalStyles.fontPrimary, { fontWeight: 'bold' }]} numberOfLines={2} lineBreakMode='tail' >{item.name}</Text>
        <IconText
          icon="Ionicons"
          name={'ios-location-sharp'}
          size={12}
          text={item.address.locality}
        />

        <View style={[GlobalStyles.spaceBetween, { marginTop: 15 }]}>
          <View>
            {item.landmarks.length > 0 &&
              <IconText
                icon="FontAwesome"
                name={'location-arrow'}
                size={12}
                text={item.landmarks[0].distance + ' to ' + item.landmarks[0].label}
              />
            }
            {getRating(item.starRating, 12)}
          </View>
          {item.fullPayment ?
            <RenderPrice
              current={item.fullPayment}
            />
            :
            <RenderPrice
              current={item.ratePlan.price.current}
              old={item.ratePlan.price.old}
            />
          }
        </View>
      </View>
    </TouchableOpacity>
  )
}