import React, {useState, useEffect} from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

import {IconBack, IconSubmit, RegisterContinueIllustration} from '../assets'
import {Button, Distance, Input, Options} from '../components'
import {getUser, registerUser} from '../store/actions'
import {colors, fonts, responsiveWidth} from '../utils'

export default function RegisterContinue({navigation, route}) {
  const [address, setAddress] = useState('')
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')

  const {name, email, phone, password} = route.params

  const dispatch = useDispatch()
  const {getProvincesSuccess, getCitiesSuccess} = useSelector(
    state => state.rajaOngkirReducer,
  )
  const {registerUserLoading, registerUserSuccess, registerUserFail} =
    useSelector(state => state.authReducer)
  const {user} = useSelector(state => state.userReducer)

  useEffect(() => {
    if (registerUserSuccess) {
      dispatch(getUser())
    }

    if (user) {
      navigation.replace('Main')
    }
  }, [registerUserSuccess, user])

  const handlePress = () => {
    if (name && email && phone && password) {
      const data = {
        name,
        email,
        phone,
        password,
        address,
        province,
        city,
        status: 'user',
      }

      dispatch(registerUser(data, password))
    } else {
      Alert.alert('Error', 'Please fill all the fields!')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.btnBack}>
            <Button Icon={<IconBack />} onPress={() => navigation.goBack()} />
          </View>
          <View style={styles.ilustrasi}>
            <RegisterContinueIllustration />
            <Distance height={5} />
            <Text style={styles.title}>Isi Alamat</Text>
            <Text style={styles.title}>Lengkap Anda</Text>
            <View style={styles.wrapperCircle}>
              <View style={styles.circleDisabled}></View>
              <Distance width={10} />
              <View style={styles.circlePrimary}></View>
            </View>
          </View>
          <View style={styles.card}>
            <Input
              title="Alamat"
              multiline
              minHeight={50}
              numberOfLines={3}
              value={address}
              handleChangeText={text => setAddress(text)}
            />
            <Options
              title="Provinsi"
              options={getProvincesSuccess ?? []}
              value={province}
              handleChangeText={text => setProvince(text)}
            />
            <Options
              title="Kota/Kab"
              options={getCitiesSuccess ?? []}
              value={city}
              handleChangeText={text => setCity(text)}
            />
            <Distance height={25} />
            <Button
              title="Continue"
              Icon={<IconSubmit />}
              padding={10}
              fontSize={18}
              onPress={handlePress}
              loading={registerUserLoading}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  ilustrasi: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.primary.light,
    color: colors.primary,
  },
  wrapperCircle: {
    flexDirection: 'row',
    marginTop: 10,
  },
  circlePrimary: {
    backgroundColor: colors.primary,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  circleDisabled: {
    backgroundColor: colors.border,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  card: {
    backgroundColor: colors.white,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  btnBack: {
    marginLeft: 30,
    position: 'absolute',
  },
})
