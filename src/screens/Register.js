import React, {useState} from 'react'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import {useDispatch} from 'react-redux'

import {Button, Distance, Input} from '../components'
import {IconBack, IconSubmit, RegisterIllustration} from '../assets'
import {colors, fonts, responsiveHeigth, responsiveWidth} from '../utils'
import {getProvinces} from '../store/actions'

export default function Register({navigation}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handlePress = () => {
    if (name && email && phone && password) {
      navigation.navigate('RegisterContinue', {
        name,
        email,
        phone,
        password,
      })
      dispatch(getProvinces())
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
            <RegisterIllustration />
            <Distance height={5} />
            <Text style={styles.title}>Daftar</Text>
            <Text style={styles.title}>Isi Daftar Diri Anda</Text>
            <View style={styles.wrapperCircle}>
              <View style={styles.circlePrimary}></View>
              <Distance width={10} />
              <View style={styles.circleDisabled}></View>
            </View>
          </View>
          <View style={styles.card}>
            <Input
              title="Nama"
              value={name}
              handleChangeText={text => setName(text)}
            />
            <Input
              title="Email"
              value={email}
              handleChangeText={text => setEmail(text)}
            />
            <Input
              title="No. Handphone"
              keyboardType="number-pad"
              value={phone}
              handleChangeText={text => setPhone(text)}
            />
            <Input
              title="Password"
              secureTextEntry
              value={password}
              handleChangeText={text => setPassword(text)}
            />
            <Distance height={25} />
            <Button
              title="Continue"
              Icon={<IconSubmit />}
              padding={10}
              fontSize={18}
              onPress={handlePress}
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
