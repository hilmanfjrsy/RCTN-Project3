import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';
import FA from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
const Register = ({ navigation, route }) => {
  const [passwordShow, setPasswordShow] = useState(false)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [username, setUsername] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [dataUser, setDataUser] = useState([])

  function togglePassword() {
    setPasswordShow(!passwordShow)
  }
  async function getDataUser() {
    const jsonValue = await AsyncStorage.getItem('user')
    const newJson = JSON.parse(jsonValue) || []
    setDataUser(newJson)
  }

  async function onSubmit() {
    if (username && password && email) {
      let checkEmail = GlobalVar.regexEmail.test(email)
      if (checkEmail) {
        let checkUser = dataUser.find((item) => item.username.toLowerCase() == username.toLowerCase() || item.email == email)

        if (checkUser) {
          if (checkUser.username == username) {
            Toast.show({
              type: 'error',
              text1: 'Username telah digunakan',
            })
          } else if (checkUser.email == email) {
            Toast.show({
              type: 'error',
              text1: 'Email telah digunakan',
            })
          }
        } else {
          setIsLoading(true)
          let temp = dataUser
          temp.push({ username: username, email: email, password: password, firstName: null, lastName: null, phone: null })

          setTimeout(async () => {
            await AsyncStorage.setItem('user', JSON.stringify(temp))
            Toast.show({
              type: 'success',
              text1: 'Berhasil mendaftar',
            })
            route.params.getDataUser()
            navigation.navigate('Login')
            setIsLoading(false)
          }, 2000)
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Email tidak valid',
        })
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Harap isi semua form',
      })
    }
  }

  useEffect(() => {
    getDataUser()
  }, [])
  return (
    <ScrollView>
      <View style={[GlobalStyles.container, { justifyContent: 'center' }]}>
        <View style={GlobalStyles.header}>
          <Text style={[GlobalStyles.fontPrimary, { fontSize: 30, fontWeight: 'bold', color: GlobalVar.primaryColor }]}>
            Register
          </Text>
          <Text style={[GlobalStyles.fontSecondary, { fontSize: 14 }]}>
            Please fill information to create an account and sign up to continue
          </Text>
        </View>
        <View style={GlobalStyles.cardBody}>
          <TextInput autoCapitalize='none' placeholder="Username" style={GlobalStyles.input} onChangeText={(v) => setUsername(v)} />
        </View>
        <View style={GlobalStyles.cardBody}>
          <TextInput autoCapitalize='none' placeholder="Email" style={GlobalStyles.input} onChangeText={(v) => setEmail(v)} />
        </View>
        <View style={[GlobalStyles.cardBody, GlobalStyles.spaceBetween, { marginBottom: 50, marginTop: 3 }]}>
          <TextInput placeholder="Password" style={{ flex: 1 }} secureTextEntry={!passwordShow ? true : false} onChangeText={(v) => setPassword(v)} />
          <TouchableOpacity style={{ justifyContent: 'center', marginHorizontal: 10 }} onPress={togglePassword}><FA name={passwordShow ? 'eye' : 'eye-slash'} color={'grey'} size={20} /></TouchableOpacity>
        </View>
        <ButtonPrimary isLoading={isLoading} text={'Sign up'} onPress={onSubmit} />
        <Text style={[GlobalStyles.fontSecondary, { textAlign: 'center', fontSize: 14, marginTop: 50 }]}>
          Already have an account?{' '}
          <Text
            onPress={() => navigation.navigate('Login')}
            style={[GlobalStyles.fontPrimary, { marginTop: 20, color: GlobalVar.primaryColor, fontWeight: 'bold' }]}>
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Register;
