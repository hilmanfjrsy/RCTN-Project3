import React, { Component, useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';
import DateTimePicker from '@react-native-community/datetimepicker';
import FA from 'react-native-vector-icons/FontAwesome';
import ButtonPrimary from '../Components/ButtonPrimary';
import { getRequest } from '../Utils/GlobalFunc';
import { Link, useHistory } from 'react-router-dom';

export default function Search({ navigation, route }) {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const [kota, setKota] = useState([]);
  const [search, setSearch] = useState([]);
  const [id, setId] = useState([]);
  const [showCheckinDate, setShowCheckinDate] = useState(false);
  const [showCheckoutDate, setShowCheckoutDate] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = event => {
    const value = event.target.value;
    setSearchValue(value);
  };

  async function searchKota() {
    let params = { query: 'Indonesia', locale: 'in_ID', currency: 'IDR' }
    let res = await getRequest('locations/v2/search', params);
    console.log(res.data);
    setKota(res.data.suggestions[0].entities);
  }

  useEffect(() => {
    searchKota();
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.container]}>
      <View
        style={[
          GlobalStyles.cardBody,
          GlobalStyles.row,
          { paddingHorizontal: 15, paddingVertical: 5 },
        ]}>
        <FA name="search" size={14} color={GlobalVar.greyColor} />
        <TextInput
          style={[
            GlobalStyles.fontSecondary,
            {
              fontSize: 14,
              marginLeft: 10,
              height: 40,
              flex: 1,
              justifyContent: 'center',
            },
          ]}
          placeholder="Where do you want to go?"
          onChange={handleSearch}
          value={searchValue}
          placeholderTextColor={GlobalVar.greyColor}
        />
      </View>
      <View style={[GlobalStyles.spaceBetween]}>
        <View
          style={[
            GlobalStyles.cardBody,
            GlobalStyles.row,
            { paddingHorizontal: 15, width: '48%' },
          ]}>
          <FA name="calendar" size={14} color={GlobalVar.primaryColor} />
          <TouchableOpacity
            hitSlop={GlobalVar.hitSlop}
            onPress={() => setShowCheckinDate(true)}>
            <Text
              style={[
                GlobalStyles.fontSecondary,
                { fontSize: 14, marginLeft: 10 },
              ]}>
              Check-in Date
            </Text>
            {showCheckinDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={() => {
                  setShowCheckinDate(false);
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={[
            GlobalStyles.cardBody,
            GlobalStyles.row,
            { paddingHorizontal: 15, width: '48%' },
          ]}>
          <FA name="calendar" size={14} color={GlobalVar.primaryColor} />
          <TouchableOpacity
            hitSlop={GlobalVar.hitSlop}
            onPress={() => setShowCheckoutDate(true)}>
            <Text
              style={[
                GlobalStyles.fontSecondary,
                { fontSize: 14, marginLeft: 10 },
              ]}>
              Check-out Date
            </Text>
            {showCheckoutDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={() => {
                  setShowCheckoutDate(false);
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          GlobalStyles.cardBody,
          GlobalStyles.row,
          { paddingHorizontal: 15, paddingVertical: 5 },
        ]}>
        <FA name="user" size={14} color={GlobalVar.primaryColor} />
        <TextInput
          style={[
            GlobalStyles.fontSecondary,
            {
              fontSize: 14,
              marginLeft: 10,
              height: 40,
              flex: 1,
              justifyContent: 'center',
            },
          ]}
          placeholder="Guest"
          keyboardType="number-pad"
          placeholderTextColor={GlobalVar.greyColor}
        />

        <TouchableOpacity
          hitSlop={GlobalVar.hitSlop}
          style={[
            GlobalStyles.cardBody,
            { alignItems: 'center', justifyContent: 'center', padding: 7 },
          ]}>
          <FA name="chevron-up" size={16} color={GlobalVar.primaryColor} />
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={GlobalVar.hitSlop}
          style={[
            GlobalStyles.cardBody,
            {
              alignItems: 'center',
              justifyContent: 'center',
              padding: 7,
              marginLeft: 15,
            },
          ]}>
          <FA name="chevron-down" size={16} color={GlobalVar.primaryColor} />
        </TouchableOpacity>
      </View>
      <ButtonPrimary text={'Search'} />

      <View>
        <Text
          style={[
            GlobalStyles.fontPrimary,
            { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
          ]}>
          Kota-kota di Indonesia
        </Text>
        <TouchableOpacity>
          <FlatList
            data={kota}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
            contentContainerStyle={{ marginTop: 10, minHeight: 10 }}
            renderItem={({ item, index }) => (
              <RenderCity item={item} index={index} />
            )}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={[
            GlobalStyles.fontPrimary,
            { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
          ]}>
          Popular Destinations
        </Text>

        <FlatList
          data={arr}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={{ marginTop: 10, minHeight: 10 }}
          renderItem={({ item, index }) => (
            <RenderCity item={item} index={index} />
          )}
        />
      </View>
    </SafeAreaView>
  );

  function RenderCity({ item, index }) {
    return (
      <TouchableOpacity style={[GlobalStyles.cardBody, { marginRight: 10 }]}>
        <Text style={[GlobalStyles.fontPrimary, {}]}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}
