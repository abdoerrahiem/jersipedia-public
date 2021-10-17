import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import {colors, fonts} from '../utils'

export default function AddressCard({address, province, city}) {
  const {navigate} = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Adress:</Text>
      <Text style={styles.text}>{address}</Text>
      <Text style={styles.text}>{city}</Text>
      <Text style={styles.text}>Province {province}</Text>
      <TouchableOpacity onPress={() => navigate('EditProfile')}>
        <Text style={styles.buttonText}>Change Address</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    marginBottom: 5,
    color: colors.black,
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: colors.black,
  },
  buttonText: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    color: colors.primary,
    textAlign: 'right',
  },
})
