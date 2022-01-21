import React, { Component, useState, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';
import FA from 'react-native-vector-icons/FontAwesome';
import DateRangePicker from "react-native-daterange-picker";
import ButtonPrimary from '../Components/ButtonPrimary';
import { getRequest } from '../Utils/GlobalFunc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import 'moment/locale/id'
import Loading from '../Components/Loading';

export default function Search({ navigation, route }) {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const [kota, setKota] = useState([]);
  const [open, setOpen] = useState(false);
  const [destinationId, setDestinationId] = useState(null);
  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)
  const [guest, setGuest] = useState('')
  const [showDate, setShowDate] = useState(false);
  const [showCheckoutDate, setShowCheckoutDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState({
    endDate: null,
    startDate: null
  })

  const [pageNumber, setPageNumber] = useState(1)

  async function getCity() {
    setIsLoading(true)
    let k = await AsyncStorage.getItem('kota')
    if (!k) {
      let params = { query: 'Indonesia', locale: 'in_ID', currency: 'IDR' }
      let res = await getRequest('locations/v2/search', params);
      if (res) {
        // console.log('masuk')
        await AsyncStorage.setItem('kota', JSON.stringify(res.data.suggestions[0].entities));
        setKota(res.data.suggestions[0].entities);
      }
    } else {
      // console.log('sini',)
      setKota(JSON.parse(k))
    }
    setIsLoading(false)
  }

  async function clickSearch(id = destinationId, start = new Date(), end = new Date().setDate(new Date().getDate() + 1), adult = guest || 1, page = pageNumber) {
    if (start && end && adult && id && page) {
      let params = {
        destinationId: id,
        pageNumber: page,
        pageSize: '25',
        checkIn: moment(start).format('YYYY-MM-DD'),
        checkOut: moment(end).format('YYYY-MM-DD'),
        adults1: adult,
        sortOrder: 'PRICE',
        locale: 'en_US',
        currency: 'IDR'
      }
      navigation.navigate('SearchResult', { parameter: params })
    }
  }

  useEffect(() => {
    getCity();
  }, []);

  if (isLoading) {
    return <Loading />
  }
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <View style={[GlobalStyles.container, {}]}>
        <Text style={[GlobalStyles.fontPrimary, { fontSize: 30, fontWeight: 'bold', marginBottom: 30 }]}>Search</Text>
        <View
          style={[
            { paddingVertical: 5 },
          ]}>
          <DropDownPicker
            style={{ borderWidth: 0, borderRadius: 5 }}
            placeholder="Where do you want to go?"
            placeholderStyle={{ color: GlobalVar.greyColor }}
            schema={{
              label: 'name', // required
              value: 'destinationId', // required
              testID: 'destinationId',
            }}
            open={open}
            value={destinationId}
            items={kota}
            searchable={true}
            setOpen={setOpen}
            setValue={(v) => setDestinationId(v)}
          // setItems={setItems}
          />
        </View>

        <View style={[GlobalStyles.spaceBetween, { marginBottom: 5 }]}>
          <View
            style={[
              GlobalStyles.cardBody,
              GlobalStyles.row,
              { paddingHorizontal: 15, width: '48%', paddingVertical: 13 },
            ]}>
            <FA name="calendar" size={14} color={GlobalVar.primaryColor} />
            <TouchableOpacity
              hitSlop={GlobalVar.hitSlop}
              style={{ marginLeft: 10 }}
              onPress={() => setShowDate(true)}>
              <Text style={[GlobalStyles.fontSecondary, {}]}>Date</Text>
              <Text
                style={[
                  GlobalStyles.fontPrimary,
                  { fontWeight: '500' },
                ]}>
                {dateStart ? moment(dateStart).format('DD MMM') : 'In'} - {dateEnd ? moment(dateEnd).format('DD MMM') : 'Out'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              GlobalStyles.cardBody,
              GlobalStyles.row,
              { paddingHorizontal: 15, width: '48%' },
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
              min={0}
              value={guest}
              onChangeText={(v) => setGuest(v)}
              keyboardType="number-pad"
              placeholderTextColor={GlobalVar.greyColor}
            />

            <TouchableOpacity
              hitSlop={GlobalVar.hitSlop}
              onPress={() => setGuest((prev) => String(parseInt(prev || 0) + 1))}
              style={[
                GlobalStyles.cardBody,
                { alignItems: 'center', justifyContent: 'center', padding: 5 },
              ]}>
              <FA name="chevron-up" size={16} color={GlobalVar.primaryColor} />
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={GlobalVar.hitSlop}
              onPress={() => {
                let g = guest || '0'
                let c = parseInt(g) - 1

                if (c >= 0) {
                  setGuest(String(c))
                }
              }}
              style={[
                GlobalStyles.cardBody,
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5,
                  marginLeft: 10,
                },
              ]}>
              <FA name="chevron-down" size={16} color={GlobalVar.primaryColor} />
            </TouchableOpacity>
          </View>
        </View>

        <ButtonPrimary onPress={() => clickSearch(destinationId, dateStart, dateEnd, guest, pageNumber)} text={'Search'} />

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
      </View>

      <DateRangePicker
        open={showDate}
        onChange={(v) => {
          console.log('sda', v)
          if (v.endDate) { setDateEnd(v.endDate); setShowDate(false) }
          if (v.startDate) { setDateStart(v.startDate) }
        }}
        presetButtons
        dayHeaders
        endDate={dateEnd}
        startDate={dateStart}
        minDate={moment()}
        displayedDate={moment()}
        range
        backdropStyle={{ height: '100%', }}
      >
        <Text></Text>
      </DateRangePicker>
    </SafeAreaView>
  );

  function RenderCity({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          clickSearch(item.destinationId)
        }}
        style={[GlobalStyles.cardBody, { marginRight: 10 }]}>
        <Text style={[GlobalStyles.fontPrimary, {}]}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}
