import {StyleSheet} from 'react-native';
import GlobalVar from './GlobalVar';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  cardBody: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fontSecondary: {
    fontSize: 12,
    color: '#949494',
  },
  fontPrimary: {
    fontSize: 14,
    color: '#1D1D1D',
  },
  textRegister: {
    textAlign: 'center', 
    marginTop: 40
  },
  containerInput: {
    paddingVertical: 2, 
    marginBottom: 2},
  input: {
    borderColor: GlobalVar.primaryColor,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  container: {
    marginHorizontal: 10
  },
  header: {
    marginTop: 50, marginBottom: 40
  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold', 
    marginBottom: 5
  },
  subtitle: {
    fontSize: 18
  },
});

export default GlobalStyles;
