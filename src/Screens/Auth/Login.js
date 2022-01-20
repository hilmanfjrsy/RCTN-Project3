import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';
import FA from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { encryptToken, generateToken } from '../../Utils/GlobalFunc';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  console.log('data user >>>', dataUser);
  function togglePassword() {
    setPasswordShow(!passwordShow);
  }

  async function getDataUser() {
    const jsonValue = await AsyncStorage.getItem('user');
    const newJson = JSON.parse(jsonValue) || [];
    setDataUser(newJson);
  }

  function handleSubmit() {
    if (username && password) {
      const find = dataUser.find((item) => item.username.toLowerCase() == username.toLowerCase())
      console.log(find)
      if (find) {
        if (find.username == username && find.password == password) {
          encryptToken(find,'token')
          Toast.show({
            type: 'success',
            text1: 'Login Success',
            text2: 'Your session is only 15 minutes, after that you will be logged out automatically',
          });
          navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTab' }],
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Wrong username or password!',
            text2: 'Please recheck your username or password',
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'User not found!',
          text2: 'You are not registered in our system. Please register first',
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please fill out all forms',
        text2: 'Please check all forms',
      });
    }
  }
  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <View style={[GlobalStyles.container, { justifyContent: 'center' }]}>
      <View style={GlobalStyles.header}>
        <Text style={[GlobalStyles.fontPrimary, { color: GlobalVar.primaryColor, fontSize: 30, fontWeight: 'bold' }]}>
          Login
        </Text>
        <Text style={[GlobalStyles.fontSecondary, { fontSize: 16 }]}>
          Enter your username and password to access your account
        </Text>
      </View>
      <View style={GlobalStyles.cardBody}>
        <TextInput
          autoCapitalize='none'
          placeholder="Username"
          onChangeText={v => setUsername(v)}
        />
      </View>
      <View
        style={[GlobalStyles.cardBody, GlobalStyles.spaceBetween, { marginBottom: 60 }]}>
        <TextInput
          placeholder="Password"
          style={{ flex: 1 }}
          secureTextEntry={!passwordShow}
          onChangeText={v => setPassword(v)}
        />
        <TouchableOpacity
          style={{ justifyContent: 'center' }}
          onPress={togglePassword}>
          <FA
            name={passwordShow ? 'eye' : 'eye-slash'}
            color={'grey'}
            size={20}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      </View>
      <ButtonPrimary text={'Login'} onPress={handleSubmit} />
      <Text style={[GlobalStyles.fontSecondary, { textAlign: 'center', fontSize: 14, marginTop: 110 }]}>
        Dont Have an account?{' '}
        <Text
          onPress={() => navigation.navigate('Register', { getDataUser: ()=>getDataUser() })}
          style={[GlobalStyles.fontPrimary, { fontWeight: 'bold', color: GlobalVar.primaryColor }]}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default Login;
