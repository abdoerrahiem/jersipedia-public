import React, {useEffect, useState} from 'react'
import {StyleSheet, View, ToastAndroid} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

import {IconSubmit} from '../assets'
import {Button, Input} from '../components'
import {updatePassword} from '../store/actions'
import {RESET_UPDATE_PASSWORD_USER} from '../store/types'
import {colors, responsiveHeigth} from '../utils'

export default function ChangePassword({navigation}) {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const {
    user,
    updatePasswordSuccess,
    updatePasswordLoading,
    updatePasswordFail,
  } = useSelector(state => state.userReducer)

  useEffect(() => {
    if (updatePasswordSuccess) {
      ToastAndroid.show('Password updated', ToastAndroid.SHORT)
      navigation.goBack()
      dispatch({type: RESET_UPDATE_PASSWORD_USER})
    }

    if (updatePasswordFail) {
      ToastAndroid.show(updatePasswordFail, ToastAndroid.SHORT)
      dispatch({type: RESET_UPDATE_PASSWORD_USER})
    }
  }, [updatePasswordSuccess, updatePasswordFail])

  const handlePress = () => {
    if (!password || !newPassword || !confirmPassword) {
      return ToastAndroid.show('Please enter all fields', ToastAndroid.SHORT)
    }

    if (newPassword !== confirmPassword) {
      return ToastAndroid.show(
        'New password and confirm password are not matched',
        ToastAndroid.SHORT,
      )
    }

    dispatch(
      updatePassword({
        email: user.email,
        password,
        newPassword,
        uid: user.uid,
      }),
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <Input
          title="Old Password"
          secureTextEntry
          value={password}
          handleChangeText={text => setPassword(text)}
        />
        <Input
          title="New Password"
          secureTextEntry
          value={newPassword}
          handleChangeText={text => setNewPassword(text)}
        />
        <Input
          title="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          handleChangeText={text => setConfirmPassword(text)}
        />
      </View>
      <View style={styles.submit}>
        <Button
          title="Submit"
          Icon={<IconSubmit />}
          padding={responsiveHeigth(15)}
          fontSize={18}
          onPress={handlePress}
          loading={updatePasswordLoading}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  submit: {
    marginVertical: 30,
  },
})
