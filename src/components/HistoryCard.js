import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ToastAndroid,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import {Distance} from '.'
import {
  colors,
  fonts,
  responsiveWidth,
  responsiveHeigth,
  rupiahFormatter,
} from '../utils'
import {updateStatus} from '../store/actions'

export default function HistoryCard({cart, id}) {
  const history = cart.orders

  const {navigate} = useNavigation()
  const dispatch = useDispatch()
  const {updateOrderLoading} = useSelector(state => state.orderReducer)

  useEffect(() => {
    dispatch(updateStatus(cart.order_id))
  }, [])

  const goToMidtrans = () => {
    if (cart.status === 'lunas') {
      ToastAndroid.show('Item already paid', ToastAndroid.SHORT)
    } else {
      navigate('Midtrans', {uri: cart.url})
    }
  }

  return (
    <View style={styles.historyContainer}>
      <Pressable android_ripple={{color: colors.border}} onPress={goToMidtrans}>
        <View style={styles.container}>
          <Text style={styles.tanggal}>{cart.tanggal}</Text>
          {Object.keys(history).map((key, index) => (
            <View key={index} style={styles.history}>
              <Text style={styles.textBold}>{index + 1}.</Text>
              <Image
                source={{uri: history[key].product.gambar[0]}}
                style={styles.jersey}
              />
              <View style={styles.desc}>
                <Text style={styles.nama}>{history[key].product.nama}</Text>
                <Text style={styles.harga}>
                  Rp. {rupiahFormatter(history[key].product.harga)}
                </Text>
                <Distance height={10} />
                <Text style={styles.textBold}>
                  Pesan : {history[key].jumlahPesan}
                </Text>
                <Text style={styles.textBold}>
                  Total Harga : Rp. {rupiahFormatter(history[key].totalHarga)}
                </Text>
              </View>
            </View>
          ))}
          <Distance height={10} />
          <View style={styles.footer}>
            <View style={styles.label}>
              <Text style={styles.textBlue}>Status :</Text>
              <Text style={styles.textBlue}>Ongkir (2-3 Hari) :</Text>
              <Text style={styles.textBlue}>Total Harga :</Text>
            </View>
            <View style={styles.label}>
              <Text style={styles.textBlue}>
                {updateOrderLoading ? 'Loading' : cart.status}
              </Text>
              <Text style={styles.textBlue}>
                Rp. {rupiahFormatter(cart.ongkir)}
              </Text>
              <Text style={styles.textBlue}>
                Rp. {rupiahFormatter(cart.totalHarga + cart.ongkir)}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  historyContainer: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 20,
  },
  container: {
    padding: 15,
  },
  history: {
    flexDirection: 'row',
    marginTop: 10,
  },
  jersey: {
    width: responsiveWidth(66),
    height: responsiveWidth(66),
  },
  tanggal: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: colors.black,
  },
  textBold: {
    fontSize: 11,
    fontFamily: fonts.primary.bold,
    color: colors.black,
  },
  desc: {
    marginLeft: responsiveWidth(7),
  },
  nama: {
    fontSize: 13,
    fontFamily: fonts.primary.bold,
    textTransform: 'capitalize',
    color: colors.black,
  },
  harga: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: colors.black,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: colors.border,
    paddingTop: 5,
  },
  label: {
    marginRight: 10,
  },
  textBlue: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    textTransform: 'uppercase',
  },
})
