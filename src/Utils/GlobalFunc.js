import axios from 'axios';
import Toast from 'react-native-toast-message';
import GlobalVar from "./GlobalVar";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { sign, decode } from "react-native-pure-jwt";

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
  }
}

export async function postRequest(path, data) {
  try {
    const response = await axios.post(GlobalVar.host + path, data);
    if (response) {
      return response;
    }
  } catch (error) {
    let message = 'Terjadi Kesalahan';
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
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
    }) // token as the only argument
    .catch(console.error); // possible errors
}

export async function decodeToken(token = '') {
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
        text1: 'Sesi telah habis',
        text2: e.message
      });
      await AsyncStorage.removeItem('token')
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Login' }],
      // });
      return null
    });
}

export async function checkExpireToken() {
  let token = await AsyncStorage.getItem('token')
  if (token) {
    let user = await decodeToken(token)
    if (user) {
      await AsyncStorage.setItem('profile', user)
    }
  }
}
