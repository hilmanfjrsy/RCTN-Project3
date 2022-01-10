import AsyncStorage from '@react-native-async-storage/async-storage'

export async function Token() {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    try{
        await AsyncStorage.setItem('token', JSON.stringify(result))
    } catch {
        
    }
    return result;
  }