import React from 'react'
import {StyleSheet, Text, View, Image, Pressable} from 'react-native'
import {useDispatch} from 'react-redux'

import {Distance} from '.'
import {IconDelete} from '../assets'
import {
  colors,
  fonts,
  responsiveHeigth,
  responsiveWidth,
  rupiahFormatter,
} from '../utils'
import {deleteCart} from '../store/actions'

export default function CartCard({cart, mainCart, id}) {
  const dispatch = useDispatch()

  const handleTouch = () => dispatch(deleteCart(id, mainCart, cart))

  return (
    <View style={styles.cartContainer}>
      <Pressable
        android_ripple={{
          color: colors.border,
        }}>
        <View style={styles.container}>
          <Image
            source={{uri: cart.product.gambar[0]}}
            style={styles.image}
            resizeMode="center"
          />
          <View style={styles.desc}>
            <Text style={styles.name}>{cart.product.nama}</Text>
            <Text style={styles.text('unbold')}>
              Rp. {rupiahFormatter(cart.product.harga)}
            </Text>
            <Distance height={responsiveHeigth(14)} />
            <Text style={styles.text('bold')}>
              Pesan:{' '}
              <Text style={styles.text('unbold')}>{cart.jumlahPesan}</Text>{' '}
            </Text>
            <Text style={styles.text('bold')}>
              Ukuran: <Text style={styles.text('unbold')}>{cart.size}</Text>
            </Text>
            <Text style={styles.text('bold')}>
              Total Harga:{' '}
              <Text style={styles.text('unbold')}>
                Rp. {rupiahFormatter(cart.totalHarga)}
              </Text>
            </Text>
            <Text style={styles.text('bold')}>Keterangan:</Text>
            <Text style={styles.text('unbold')}>{cart.desc}</Text>
          </View>
          <View style={styles.delete} onTouchStart={handleTouch}>
            <IconDelete />
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  cartContainer: {
    overflow: 'hidden',
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
  },
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: responsiveWidth(88),
    height: responsiveHeigth(88),
  },
  desc: {},
  delete: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text: text => ({
    fontFamily: text === 'bold' ? fonts.primary.bold : fonts.primary.regular,
    fontSize: 11,
    color: colors.black,
  }),
  name: {
    fontFamily: fonts.primary.bold,
    fontSize: 13,
    textTransform: 'capitalize',
    color: colors.black,
  },
})
