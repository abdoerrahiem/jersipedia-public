import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, ToastAndroid} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

import {AddressCard, Button, Distance, Options} from '../components'
import {colors, fonts, responsiveHeigth, rupiahFormatter} from '../utils'
import {couriers} from '../data'
import {IconSubmit} from '../assets'
import {addTransaction, getCity, getOngkir} from '../store/actions'
import {CLEAR_ADD_TRANSACTION} from '../store/types'

export default function Checkout({navigation, route}) {
  const {totalHarga, totalBerat} = route.params
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.userReducer)
  const {getCitySuccess, getOngkirSuccess, getOngkirFail} = useSelector(
    state => state.rajaOngkirReducer,
  )
  const {addTransactionSuccess, addTransactionFail, addTransactionLoading} =
    useSelector(state => state.paymentReducer)

  const [data, setData] = useState({
    profile: user,
    address: user.address,
    ekspedisi: couriers,
    ekspedisiSelected: null,
    ongkir: 0,
    estimasi: '',
    totalHarga,
    totalBerat,
    city: '',
    province: '',
    date: new Date().getTime(),
  })

  useEffect(() => {
    dispatch(getCity(user.city))
  }, [])

  useEffect(() => {
    if (getCitySuccess) {
      setData(oldData => ({
        ...oldData,
        province: getCitySuccess.province,
        city: `${getCitySuccess.type} ${getCitySuccess.city_name}`,
      }))
    }

    if (getOngkirSuccess) {
      setData(oldData => ({
        ...oldData,
        ongkir: getOngkirSuccess.cost[0].value,
        estimasi: getOngkirSuccess.cost[0].etd,
      }))
    }

    if (addTransactionSuccess) {
      const params = {
        uri: addTransactionSuccess.redirect_url,
        ongkir: data.ongkir,
        estimasi: data.estimasi,
        order_id: `${data.profile.uid}_${data.date}`,
      }

      navigation.navigate('Midtrans', params)
      dispatch({type: CLEAR_ADD_TRANSACTION})
    }
  }, [getCitySuccess, getOngkirSuccess, addTransactionSuccess])

  const handleChangeText = text => {
    if (text) {
      setData(oldData => ({
        ...oldData,
        ekspedisiSelected: text,
      }))

      dispatch(getOngkir(data, text))
    }
  }

  const handlePress = () => {
    const state = {
      transaction_details: {
        order_id: `${data.profile.uid}_${data.date}`,
        gross_amount: parseInt(data.totalHarga + data.ongkir),
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: data.profile.name,
        email: data.profile.email,
        phone: data.profile.phone,
      },
    }

    if (data.ongkir === 0) {
      ToastAndroid.show('Please choose expedition first', ToastAndroid.SHORT)
    } else {
      dispatch(addTransaction(state))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Are you sure this address is available?</Text>
        <AddressCard
          address={data.address}
          province={data.province}
          city={data.city}
        />
        <View style={styles.total}>
          <Text style={styles.totalText}>Total Harga:</Text>
          <Text style={styles.totalText}>
            Rp. {rupiahFormatter(data.totalHarga)}
          </Text>
        </View>
        <Options
          title="Choose expedition"
          options={data.ekspedisi}
          value={data.ekspedisiSelected}
          handleChangeText={handleChangeText}
        />
        <Distance height={10} />
        <Text style={styles.text}>Biaya Ongkir:</Text>
        <View style={styles.ongkir}>
          <Text style={styles.ongkirText}>Untuk Berat: {totalBerat} kg</Text>
          <Text style={styles.totalText}>
            Rp. {rupiahFormatter(data.ongkir)}
          </Text>
        </View>
        <View style={styles.ongkir}>
          <Text style={styles.ongkirText}>Estimasi Waktu:</Text>
          <Text style={styles.totalText}>{data.estimasi} Days</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.total}>
          <Text style={styles.text}>Total Harga:</Text>
          <Text style={styles.text}>
            Rp. {rupiahFormatter(data.totalHarga + data.ongkir)}
          </Text>
        </View>
        <Button
          Icon={<IconSubmit />}
          title="Pay Now"
          fontSize={18}
          padding={responsiveHeigth(15)}
          onPress={handlePress}
          loading={addTransactionLoading}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: 30,
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    textTransform: 'capitalize',
    color: colors.black,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  totalText: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: colors.black,
  },
  ongkir: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ongkirText: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
    color: colors.black,
  },
  footer: {
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    paddingBottom: 10,
  },
})
