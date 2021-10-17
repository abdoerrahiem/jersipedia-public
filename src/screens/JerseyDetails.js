import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, ToastAndroid} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useSelector, useDispatch} from 'react-redux'

import {
  Button,
  Distance,
  Input,
  JerseySlider,
  LeagueCard,
  Options,
} from '../components'
import {
  colors,
  defaultHeight,
  fonts,
  responsiveHeigth,
  responsiveWidth,
  rupiahFormatter,
} from '../utils'
import {IconBack, IconShoppingPutih} from '../assets'
import {addCart, getLeague} from '../store/actions'
import {CLEAR_ADD_CART} from '../store/types'

export default function JerseyDetails({navigation, route}) {
  const [total, setTotal] = useState('')
  const [size, setSize] = useState('')
  const [desc, setDesc] = useState('')
  const [uid, setUid] = useState('')
  const {jersey} = route.params

  const dispatch = useDispatch()
  const {getLeagueSuccess} = useSelector(state => state.leagueReducer)
  const {user} = useSelector(state => state.userReducer)
  const {addCartLoading, addCartSuccess, addCartFail} = useSelector(
    state => state.cartReducer,
  )

  useEffect(() => {
    dispatch(getLeague(jersey.liga))
  }, [])

  useEffect(() => {
    if (user) {
      setUid(user.uid)
    }

    if (addCartSuccess) {
      navigation.navigate('Cart')
      dispatch({type: CLEAR_ADD_CART})
    }
  }, [user, addCartSuccess])

  const handleCart = () => {
    if (user) {
      if (total && size && desc) {
        dispatch(addCart({total, size, desc, uid, jersey}))
      } else {
        ToastAndroid.show('Please input all fields', ToastAndroid.SHORT)
      }
    } else {
      ToastAndroid.show('Please login first', ToastAndroid.SHORT)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          Icon={<IconBack />}
          padding={7}
          onPress={() => navigation.goBack()}
        />
      </View>
      <JerseySlider images={jersey.gambar} />
      <View style={styles.content}>
        <View style={styles.league}>
          <LeagueCard league={getLeagueSuccess} id={jersey.liga} />
        </View>
        <View style={styles.desc}>
          <Text style={styles.name}>{jersey.nama}</Text>
          <Text style={styles.price}>
            Price: Rp. {rupiahFormatter(jersey.harga)}
          </Text>
          <View style={styles.line} />
          <View style={styles.additionalDesc}>
            <Text style={styles.additionalDescText}>Jenis: {jersey.jenis}</Text>
            <Text style={styles.additionalDescText}>Berat: {jersey.berat}</Text>
          </View>
          <View style={styles.input}>
            <Input
              title="Jumlah:"
              width={responsiveWidth(166)}
              height={responsiveHeigth(43)}
              fontSize={13}
              keyboardType="number-pad"
              value={total}
              handleChangeText={text => setTotal(text)}
            />
            <Options
              title="Pilih Ukuran:"
              width={responsiveWidth(130)}
              height={responsiveHeigth(43)}
              fontSize={13}
              options={jersey.ukuran}
              value={size}
              handleChangeText={text => setSize(text)}
            />
          </View>
          <Input
            title="Keterangan:"
            width="100%"
            minHeight={responsiveHeigth(33)}
            fontSize={13}
            placeholder="Isi jika ingin menambahkan Name Tag (nama dan nomor punggung)"
            multiline
            numberOfLines={3}
            value={desc}
            handleChangeText={text => setDesc(text)}
          />
          <Distance height={15} />
          <Button
            title="Masuk Keranjang"
            Icon={<IconShoppingPutih />}
            fontSize={16}
            padding={responsiveHeigth(18)}
            onPress={handleCart}
            loading={addCartLoading}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    height: responsiveHeigth(465),
    backgroundColor: colors.white,
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  button: {
    position: 'absolute',
    marginTop: 30,
    marginLeft: 30,
    zIndex: 1,
  },
  desc: {
    marginHorizontal: 30,
  },
  name: {
    fontSize: RFValue(24, defaultHeight),
    fontFamily: fonts.primary.bold,
    textTransform: 'capitalize',
    color: colors.black,
  },
  price: {
    fontSize: RFValue(24, defaultHeight),
    fontFamily: fonts.primary.light,
    color: colors.black,
  },
  league: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: -30,
  },
  line: {
    borderWidth: 0.25,
    marginVertical: 5,
  },
  additionalDesc: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  additionalDescText: {
    fontSize: 13,
    fontFamily: fonts.primary.regular,
    marginRight: 30,
    color: colors.black,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
