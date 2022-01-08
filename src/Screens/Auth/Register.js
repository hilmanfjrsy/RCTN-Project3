import React, {useState, useEffect} from 'react';
import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';
import FA from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
const Register = ({navigation}) => {
    const [passwordShow, setPasswordShow] = useState(false)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [username, setUsername] = useState(null)
    const [dataUser, setDataUser] = useState([])
    // console.log('data baru dari register',dataUser)
    function togglePassword(){
        setPasswordShow(!passwordShow)
      }
      async function getDataUser() {
        const jsonValue = await AsyncStorage.getItem('user')
        const newJson = JSON.parse(jsonValue)
        setDataUser(newJson)
        // console.log('data user>>',newJson )
    }

      async function onSubmit (){
          // const data = [{username: username,email: email, password: password, firstName: null, lastName: null, phone: null}]
          dataUser.push({username: username, email: email, password: password, firstName: null, lastName: null, phone: null})
          // console.log('dat', dataUser)
          // alert(JSON.stringify(dataSubmit))
        try {
            await AsyncStorage.setItem('user', JSON.stringify(dataUser))
            Toast.show({
              type: 'success',
              text1: 'Berhasil mendaftar',
            })
            setTimeout(()=>{
              navigation.navigate('Login')
            },2000)
        } catch (e) {
          // saving error
        }
      }

      useEffect(()=>{
        getDataUser()
      },[])
  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Text style={[GlobalStyles.title, {color: GlobalVar.primaryColor}]}>
          Register
        </Text>
        <Text style={GlobalStyles.subtitle}>
          Please fill information to create an account and sign up to continue
        </Text>
      </View>
      {/* <View style={{flexDirection: 'row'}}>
      <View style={{flex:1, marginRight: 5}}>
        <TextInput placeholder="First name" style={GlobalStyles.input} onChangeText={(v)=> setFirstName(v)}/>
      </View>
      <View style={{flex:1, marginLeft: 5}}>
        <TextInput placeholder="Last name" style={GlobalStyles.input} onChangeText={(v)=> setLastName(v)}/>
      </View>
      </View> */}
      <View style={GlobalStyles.containerInput}>
        <TextInput placeholder="Username" style={GlobalStyles.input} onChangeText={(v)=> setUsername(v)} />
      </View>
      <View style={GlobalStyles.containerInput}>
        <TextInput placeholder="Email" style={GlobalStyles.input} onChangeText={(v)=> setEmail(v)} />
      </View>
      <View style={[GlobalStyles.input,{flexDirection: 'row', marginBottom: 50, marginTop:3}]}>
      <TextInput placeholder="Password" style={{width: '85%'}} secureTextEntry={!passwordShow ? true : false} onChangeText={(v)=>setPassword(v)}/>
        <TouchableOpacity style={{justifyContent: 'center'}} onPress={togglePassword}><FA name={passwordShow ? 'eye' :'eye-slash'} color={'grey'} size={20} style={{marginLeft: 10}}/></TouchableOpacity>
      </View>
        {/* <View style={[GlobalStyles.containerInput, {marginBottom: 10}]}>
        <TextInput placeholder="Enter mobile number " style={GlobalStyles.input} keyboardType='numeric' onChangeText={(v)=>setPhone(v)}/>
      </View> */}
      <ButtonPrimary text={'Sign up'} onPress={onSubmit}/>
      <Text style={GlobalStyles.textRegister}>
        Already have an account?{' '}
        <Text
          onPress={() => navigation.navigate('Login')}
          style={{color: GlobalVar.primaryColor}}>
          Login
        </Text>
      </Text>
    </View>
  );
};

export default Register;
