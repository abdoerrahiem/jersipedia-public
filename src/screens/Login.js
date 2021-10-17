import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View, Alert} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

import {Button, Distance, Input} from '../components'
import {Logo, Illustration} from '../assets'
import {colors, fonts, responsiveHeigth} from '../utils'
import {getUser, loginUser} from '../store/actions'

export default function Login({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const {loginUserLoading, loginUserFail, loginUserSuccess} = useSelector(
    state => state.authReducer,
  )
  const {user} = useSelector(state => state.userReducer)

  useEffect(() => {
    if (loginUserFail) {
      Alert.alert('Error', loginUserFail)
    }

    if (loginUserSuccess) {
      dispatch(getUser())
    }

    if (user) {
      navigation.replace('Main')
    }
  }, [loginUserFail, loginUserSuccess, user])

  const handlePress = () => {
    if (email && password) {
      dispatch(loginUser(email, password))
    } else {
      Alert.alert('Error', 'Please enter your email & password')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.cardLogin}>
        <Input
          title="Email"
          value={email}
          handleChangeText={text => setEmail(text)}
        />
        <Input
          title="Password"
          secureTextEntry
          value={password}
          handleChangeText={text => setPassword(text)}
        />
        <Distance height={25} />
        <Button
          title="Login"
          padding={12}
          fontSize={18}
          onPress={handlePress}
          loading={loginUserLoading}
        />
      </View>
      <View style={styles.register}>
        <Text style={styles.textBlue}>Don't have an account ?</Text>
        <Text
          style={styles.textBlue}
          onPress={() => navigation.navigate('Register')}>
          Click Here To Register
        </Text>
      </View>
      <View style={styles.ilustrasi}>
        <Illustration />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  ilustrasi: {
    position: 'absolute',
    bottom: 0,
    right: -100,
  },
  logo: {
    alignItems: 'center',
    marginTop: responsiveHeigth(70),
  },
  cardLogin: {
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
    padding: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  register: {
    alignItems: 'center',
    marginTop: 10,
  },
  textBlue: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
  },
})
