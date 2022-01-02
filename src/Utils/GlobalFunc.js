import axios from "axios";
import Toast from 'react-native-toast-message';
import GlobalVar from "./GlobalVar";

export async function getRequest(path) {
  try {
    const response = await axios.get(GlobalVar.host + path);
    if (response) {
      return response;
    }
  } catch (error) {
    let message = 'Terjadi Kesalahan'
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
      message = error.message
    }
    console.log(error.config);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message
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
    let message = 'Terjadi Kesalahan'
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
      message = error.message
    }
    console.log(error.config);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message
    });
  }
}