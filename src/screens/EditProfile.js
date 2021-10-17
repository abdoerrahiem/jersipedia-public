import React, {useState, useEffect} from 'react'
import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {launchImageLibrary} from 'react-native-image-picker'

import {DefaultImage, IconSubmit} from '../assets'
import {Button, Input, Options} from '../components'
import {dummyProfile} from '../data'
import {getCities, getProvinces, getUser, updateUser} from '../store/actions'
import {colors, fonts, responsiveHeigth, responsiveWidth} from '../utils'
import {RESET_UPDATE_USER} from '../store/types'

export default function EditProfile({navigation}) {
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [profile, setProfile] = useState(dummyProfile)

  const [data, setData] = useState({
    uid: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    province: null,
    city: null,
    avatar: null,
    newAvatar: null,
    oldAvatar: null,
  })

  const dispatch = useDispatch()
  const {user, updateUserLoading, updateUserSuccess, updateUserFail} =
    useSelector(state => state.userReducer)
  const {getProvincesSuccess, getCitiesSuccess} = useSelector(
    state => state.rajaOngkirReducer,
  )

  useEffect(() => {
    dispatch(getProvinces())
  }, [])

  useEffect(() => {
    if (user) {
      setData({
        uid: user.uid,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        province: user.province,
        // avatar: user.avatar,
        oldAvatar: user.avatar,
      })

      dispatch(getCities(user.province))
    }

    if (updateUserSuccess) {
      dispatch(getUser())
      dispatch({type: RESET_UPDATE_USER})
      navigation.goBack()
    }
  }, [user, updateUserSuccess])

  const handleChangeText = (text, name) => {
    setData(oldData => ({
      ...oldData,
      [name]: text,
    }))
  }

  const handleImage = () => {
    launchImageLibrary(
      {
        quality: 1,
        maxWidth: 500,
        maxHeight: 500,
        includeBase64: true,
        selectionLimit: 1,
        cameraType: 'front',
      },
      response => {
        if (response.didCancel || response.errorCode || response.errorMessage) {
          Alert.alert('Error', 'Please choose your photo!')
        } else {
          const source = response.assets[0].uri
          const fileString = `data:${response.assets[0].type};base64,${response.assets[0].base64}`

          setData(oldData => ({
            ...oldData,
            avatar: source,
            newAvatar: fileString,
          }))
        }
      },
    )
  }

  const handlePress = () => {
    const {name, phone, address, province, city} = data
    if (name && phone && address && province && city) {
      dispatch(updateUser(data))
    } else {
      Alert.alert('Error', 'Please fill all fields')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          title="Nama"
          value={data.name}
          handleChangeText={text => handleChangeText(text, 'name')}
        />
        <Input
          title="Email"
          value={data.email}
          handleChangeText={text => handleChangeText(text, 'email')}
        />
        <Input
          title="No. Handphone"
          value={data.phone}
          handleChangeText={text => handleChangeText(text, 'phone')}
        />
        <Input
          title="Alamat"
          value={data.address}
          handleChangeText={text => handleChangeText(text, 'address')}
        />

        <Options
          title="Provinsi"
          options={getProvincesSuccess ?? []}
          value={data.province}
          handleChangeText={text => handleChangeText(text, 'province')}
        />
        <Options
          title="Kota/Kab"
          options={getCitiesSuccess ?? []}
          value={data.city}
          handleChangeText={text => handleChangeText(text, 'city')}
        />

        <View style={styles.inputFoto}>
          <Text style={styles.label}>Foto Profile :</Text>

          <View style={styles.wrapperUpload}>
            <Image
              source={
                data.avatar
                  ? {uri: data.avatar}
                  : data.oldAvatar
                  ? {uri: data.oldAvatar}
                  : DefaultImage
              }
              style={styles.foto}
            />

            <View style={styles.tombolChangePhoto}>
              <Button
                title="Change Photo"
                type="text"
                padding={7}
                onPress={handleImage}
              />
            </View>
          </View>
        </View>

        <View style={styles.submit}>
          <Button
            title="Submit"
            Icon={<IconSubmit />}
            padding={responsiveHeigth(15)}
            fontSize={18}
            onPress={handlePress}
            loading={updateUserLoading}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    // paddingTop: 10,
  },
  inputFoto: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  foto: {
    width: responsiveWidth(150),
    height: responsiveWidth(150),
    borderRadius: 40,
  },
  wrapperUpload: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  tombolChangePhoto: {
    marginLeft: 20,
    flex: 1,
  },
  submit: {
    marginVertical: 30,
  },
})
