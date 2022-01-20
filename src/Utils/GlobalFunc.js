import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import GlobalVar from "./GlobalVar";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { sign, decode } from "react-native-pure-jwt";

import FA from 'react-native-vector-icons/FontAwesome'
import GlobalStyles from './GlobalStyles';

export async function getRequest(path, params) {
  try {
    const response = await axios.get(GlobalVar.host + path, {
      params,
      headers: {
        'x-rapidapi-host': 'hotels4.p.rapidapi.com',
        'x-rapidapi-key': GlobalVar.apiKey,
      },
    });
    if (response) {
      return response;
    }
  } catch (error) {
    let message = 'Terjadi Kesalahan';
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      message = error.response.data.message
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      message = error.message;
    }
    console.log(error.config);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
    });
    return null
  }
}

export async function postRequest(path, data) {
  try {
    const response = await axios.post(GlobalVar.host + path, data);
    if (response) {
      return response;
    }
  } catch (error) {
    var message = 'Terjadi Kesalahan';
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      message = error.response.data.message
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      message = error.message;
    }
    console.log(error.config);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
    });
    return null
  }
}

export async function encryptToken(params = {}, name = null) {
  sign(
    {
      iss: "notinissapasich",
      exp: new Date().getTime() + 60000 * 15, // expiration date, required, in ms, absolute to 1/1/1970
      data: params
    }, // body
    GlobalVar.secretKey, // secret
    {
      alg: "HS256"
    }
  )
    .then(async v => {
      console.log(v)
      await AsyncStorage.setItem(name, v)
      await AsyncStorage.setItem('profile', JSON.stringify(params))
    }) // token as the only argument
    .catch(console.error); // possible errors
}

export async function decodeToken(token = '', navigation) {
  decode(
    token, // the token
    GlobalVar.secretKey, // the secret
    {
      skipValidation: false // to skip signature and exp verification
    }
  )
    .then(v => v) // already an object. read below, exp key note
    .catch(async e => {
      Toast.show({
        type: 'error',
        text1: 'Your session has expired',
        text2: e.message
      });
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('profile')
      navigation.reset({
        index: 0,
        routes: [{ name: 'SplashScreen' }],
      });
      return null
    });
}

export async function checkExpireToken(navigation) {
  let token = await AsyncStorage.getItem('token')
  if (token) {
    let user = await decodeToken(token, navigation)
    if (user) {
      await AsyncStorage.setItem('profile', user)
    }
  }
}

export const getRating = (total = 0, fontSize = 10) => {
  function getValue(value) {
    switch (value) {
      case 0:
        return "star-o";
      case 50:
        return "star-half-o";
      case 100:
        return "star";
    }
  }

  function getStars(value) {
    if (value > 0 && value < 1) {
      return [50, 0, 0, 0, 0];
    } else if (value == 1) {
      return [100, 0, 0, 0, 0];
    } else if (value > 1 && value < 2) {
      return [100, 50, 0, 0, 0];
    } else if (value == 2) {
      return [100, 100, 0, 0, 0];
    } else if (value > 2 && value < 3) {
      return [100, 100, 50, 0, 0];
    } else if (value == 3) {
      return [100, 100, 100, 0, 0];
    } else if (value > 3 && value < 4) {
      return [100, 100, 100, 50, 0];
    } else if (value == 4) {
      return [100, 100, 100, 100, 0];
    } else if (value > 4 && value < 5) {
      return [100, 100, 100, 100, 50];
    } else if (value >= 5) {
      return [100, 100, 100, 100, 100];
    } else {
      return [0, 0, 0, 0, 0];
    }
  }

  return (
    <View style={[GlobalStyles.row, {}]}>
      {getStars(total).map((value, idx) => {
        return (
          <View key={idx} className="list-inline-item m-0">
            <FA name={getValue(value)} size={fontSize} color={'orange'} />
          </View>
        );
      })}
      <Text style={{ fontSize, color: GlobalVar.greyColor, marginLeft: 5 }}>
        ({total})
      </Text>
    </View>
  );
};

export async function handleWishlish(getdata = () => { }, username, item, parameter, wishList,v) {
  let checkToken = await AsyncStorage.getItem('token')
  if (checkToken) {
    let checkWishlist = JSON.parse(await AsyncStorage.getItem('wishlist_' + username)) || []

    if (wishList) {
      let idx = checkWishlist.findIndex(v => v.id == item.id)
      checkWishlist.splice(idx, 1)
      Toast.show({
        type: 'error',
        text1: 'You have removed from favorites',
        text2: item.name,
      });
    } else {
      item.params = parameter
      checkWishlist.push(item)
      Toast.show({
        type: 'success',
        text1: 'You have added to favorites',
        text2: item.name,
      });
    }
    await AsyncStorage.setItem('wishlist_' + username, JSON.stringify(checkWishlist))
    await getdata(v)
  } else {
    Toast.show({
      type: 'error',
      text1: "You're not logged in",
      text2: 'Please login first',
    });
  }
}