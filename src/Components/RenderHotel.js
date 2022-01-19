import React, { Component, useEffect, useState } from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Ant from 'react-native-vector-icons/AntDesign'
import { getRating } from '../Utils/GlobalFunc';
import FastImage from 'react-native-fast-image';
import IconText from './IconText';
import RenderPrice from './RenderPrice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalVar from '../Utils/GlobalVar';
import GlobalStyles from '../Utils/GlobalStyles';
import Toast from 'react-native-toast-message';

export default function RenderHotel({ item, params,navigation }) {
  const [wishList, setWishList] = useState(false)
  const [triggerWishlist, setTriggerWishlist] = useState(0)
  const [username, setUsername] = useState('')

  let parameter = {
    id: item.id,
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    adults1: params.adults1,
    currency: 'IDR',
    locale: 'en_US'
  }

  async function getWishlist() {
    let user = JSON.parse(await AsyncStorage.getItem('profile'))
    let wish = JSON.parse(await AsyncStorage.getItem('wishlist_' + user.username)) || []
    let find = wish.find(v => item.id == v.id)

    if (find) {
      setWishList(true)
    } else {
      setWishList(false)
    }
    setUsername(user.username)
  }

  async function handleWishlish(params) {
    let checkWishlist = JSON.parse(await AsyncStorage.getItem('wishlist_' + username)) || []

    if (wishList) {
      let idx = checkWishlist.findIndex(v => v.id == params.id)
      checkWishlist.splice(idx, 1)
      Toast.show({
        type: 'error',
        text1: 'Anda telah menghapus dari favorite',
        text2: item.name,
      });
    } else {
      checkWishlist.push(params)
      Toast.show({
        type: 'success',
        text1: 'Anda telah menambahkan ke favorite',
        text2: item.name,
      });
    }
    await AsyncStorage.setItem('wishlist_' + username, JSON.stringify(checkWishlist))
    await setTriggerWishlist((prev) => prev + 1)
  }

  useEffect(() => {
    getWishlist()
  }, [triggerWishlist])

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DetailHotel', {
          parameter,
          image: item.optimizedThumbUrls.srpDesktop,
        })
      }}
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
            onPress={() => handleWishlish(item)}
            hitSlop={GlobalVar.hitSlop}
            style={[GlobalStyles.cardBody, { position: 'absolute', right: 10, top: 5, }]}>
            <Ant name={wishList ? 'heart' : 'hearto'} size={20} color={wishList ? 'firebrick' : GlobalStyles.greyColor} />
          </TouchableOpacity>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ padding: 10, }}>
        {item.messaging.scarcity && <View style={[GlobalStyles.row]}>
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
          <RenderPrice
            current={item.ratePlan.price.current}
            old={item.ratePlan.price.old}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}