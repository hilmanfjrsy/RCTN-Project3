import React, {useState, useEffect} from 'react';
import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';
import FA from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Token } from './Token';

const Login = ({navigation}) => {
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
    const newJson = JSON.parse(jsonValue);
    setDataUser(newJson);
  }
 


  function handleSubmit() {
    const find = dataUser.find((item)=> item.username == username && item.password == password)
      if(find == undefined){
              Toast.show({
            type: 'error',
            text1: 'Username atau password salah!',
          });
      } else if(find.username == username && find.password == password){
        Token()
        Toast.show({
                type: 'success',
                text1: 'Berhasil login',
              });
          navigation.navigate('BottomTab')
      }
    return find
    // dataUser.map((i)=>{
    //   if(i.username === username && i.password === password){
    //     Toast.show({
    //       type: 'success',
    //       text1: 'Berhasil login',
    //     });
    //   } else {
    //     if(i.username !== username && i.password !== password){
    //       Toast.show({
    //         type: 'error',
    //         text1: 'Salah',
    //       });
    //     }
    //   }
    // })

    // const match = dataUser.map((item)=> item.username == username && item.password == password)
    // if(match){
    //   console.log('data benar')
    // } else {
    //   console.log('datasalah')
    // }
    // for (var i = 0; i < dataUser.length; i++) {
    //   console.log('data 0', dataUser[i])
    //   if (dataUser[i].username == username && dataUser[i].password == password) {
    //     Toast.show({
    //       type: 'success',
    //       text1: 'Berhasil login',
    //     });
    //     Token()
    //     navigation.navigate('BottomTab')
    //    break;
    //   } else {
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Username atau password salah!',
    //     });
    //     break;
    //   }
    // }
  }
  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Text style={[GlobalStyles.title, {color: GlobalVar.primaryColor}]}>
          Login
        </Text>
        <Text style={GlobalStyles.subtitle}>
          Enter your email address and password to access your account
        </Text>
      </View>
      <View style={GlobalStyles.containerInput}>
        <TextInput
          placeholder="Username"
          style={GlobalStyles.input}
          onChangeText={v => setUsername(v)}
        />
      </View>
      <View
        style={[GlobalStyles.input, {flexDirection: 'row', marginBottom: 60}]}>
        <TextInput
          placeholder="Password"
          style={{width: '85%'}}
          secureTextEntry={!passwordShow ? true : false}
          onChangeText={v => setPassword(v)}
        />
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={togglePassword}>
          <FA
            name={passwordShow ? 'eye' : 'eye-slash'}
            color={'grey'}
            size={20}
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
      </View>
      <ButtonPrimary text={'Login'} onPress={handleSubmit} />
      <Text style={[GlobalStyles.textRegister, {marginTop: 110}]}>
        Dont Have an account?{' '}
        <Text
          onPress={() => navigation.navigate('Register')}
          style={{color: GlobalVar.primaryColor}}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default Login;
