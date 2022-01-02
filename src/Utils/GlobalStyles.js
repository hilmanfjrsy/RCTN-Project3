import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f4f4f4',
    padding:20
  },
  cardBody:{
    padding:10,
    borderRadius:5,
    marginVertical:5,
    backgroundColor:'white'
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
  fontSecondary:{
    fontSize:12,
    color:'#949494'
  },
  fontPrimary:{
    fontSize:14,
    color:'#1D1D1D'
  }
})

export default GlobalStyles