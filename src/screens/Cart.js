import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

import {IconShoppingPutih} from '../assets'
import {Button, CartList} from '../components'
import {colors, fonts, responsiveHeigth, rupiahFormatter} from '../utils'
import {getCarts} from '../store/actions'

export default function Cart({navigation}) {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.userReducer)
  const {getCartsSuccess, deleteCartSuccess} = useSelector(
    state => state.cartReducer,
  )

  useEffect(() => {
    if (user) {
      dispatch(getCarts(user.uid))
    } else {
      navigation.replace('Login')
    }

    if (deleteCartSuccess && user) {
      dispatch(getCarts(user.uid))
    }
  }, [user, deleteCartSuccess])

  return (
    <View style={styles.container}>
      <CartList carts={getCartsSuccess} />
      <View style={styles.footer}>
        <View style={styles.total}>
          <Text style={styles.text}>Total Harga:</Text>
          <Text style={styles.text}>
            Rp. {rupiahFormatter(getCartsSuccess?.totalHarga ?? 0)}
          </Text>
        </View>
        <Button
          Icon={<IconShoppingPutih />}
          title="Check Out"
          fontSize={18}
          padding={responsiveHeigth(15)}
          onPress={() =>
            navigation.navigate('Checkout', {
              totalHarga: getCartsSuccess.totalHarga,
              totalBerat: getCartsSuccess.totalBerat,
            })
          }
          disabled={!getCartsSuccess}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
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
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
})
