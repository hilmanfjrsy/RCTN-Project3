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
  header: {
    marginTop: 50,
    marginBottom: 40,
  },
  settingContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 10,
  },
  settingTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  settingSection: {
    marginTop: 5,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});

export default GlobalStyles;
