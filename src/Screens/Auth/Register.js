import React, {useState, useEffect} from 'react';
import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';
import FA from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({navigation}) => {
    const [passwordShow, setPasswordShow] = useState(false)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [phone, setPhone] = useState(null)
    function togglePassword(){
        setPasswordShow(!passwordShow)
      }

      const onSubmit = async () => {
          const data = [{email: email, password: password, firstName: firstName, lastName: lastName, phone: phone}]
          alert(JSON.stringify(data))
        try {
          await AsyncStorage.setItem('user', JSON.stringify(data))
        } catch (e) {
          // saving error
        }
      }
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
      <View style={{flexDirection: 'row'}}>
      <View style={{flex:1, marginRight: 5}}>
        <TextInput placeholder="First name" style={GlobalStyles.input} onChangeText={(v)=> setFirstName(v)}/>
      </View>
      <View style={{flex:1, marginLeft: 5}}>
        <TextInput placeholder="Last name" style={GlobalStyles.input} onChangeText={(v)=> setLastName(v)}/>
      </View>
      </View>
      <View style={GlobalStyles.containerInput}>
        <TextInput placeholder="Email" style={GlobalStyles.input} onChangeText={(v)=> setEmail(v)} />
      </View>
      <View style={[GlobalStyles.input,{flexDirection: 'row'}]}>
      <TextInput placeholder="Password" style={{width: '85%'}} secureTextEntry={!passwordShow ? true : false} onChangeText={(v)=>setPassword(v)}/>
        <TouchableOpacity style={{justifyContent: 'center'}} onPress={togglePassword}><FA name={passwordShow ? 'eye' :'eye-slash'} color={'grey'} size={20} style={{marginLeft: 10}}/></TouchableOpacity>
        </View>
        <View style={[GlobalStyles.containerInput, {marginBottom: 10}]}>
        <TextInput placeholder="Enter mobile number " style={GlobalStyles.input} keyboardType='numeric' onChangeText={(v)=>setPhone(v)}/>
      </View>
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
