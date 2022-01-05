import React , {useState}from 'react';
import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';
import FA from 'react-native-vector-icons/FontAwesome'

const Login = ({navigation}) => {
    const [passwordShow, setPasswordShow] = useState(false)
    function togglePassword(){
        setPasswordShow(!passwordShow)
      }
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
        <TextInput placeholder="Email" style={GlobalStyles.input} autoComplete='email'/>
      </View>
      <View style={[GlobalStyles.input,{flexDirection: 'row', marginBottom: 60}]}>
        <TextInput placeholder="Password" style={{width: '85%'}} secureTextEntry={!passwordShow ? true : false}/>
        <TouchableOpacity style={{justifyContent: 'center'}} onPress={togglePassword}><FA name={passwordShow ? 'eye' :'eye-slash'} color={'grey'} size={20} style={{marginLeft: 10}}/></TouchableOpacity>
    </View>
      <ButtonPrimary text={'Login'}/>
      <Text style={[GlobalStyles.textRegister,{marginTop: 110}]}>
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
