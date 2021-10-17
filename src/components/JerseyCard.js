import React from 'react'
import {StyleSheet, Text, View, Pressable, Image} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import Button from './Button'
import {colors, fonts, responsiveWidth} from '../utils'

export default function JerseyCard({jersey}) {
  const {navigate} = useNavigation()

  const handlePress = () => navigate('JerseyDetails', {jersey})

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Pressable
          android_ripple={{
            color: colors.secondary,
          }}
          onPress={handlePress}>
          <View style={styles.card}>
            <Image source={{uri: jersey.gambar[0]}} style={styles.pic} />
            <Text style={styles.title} numberOfLines={2}>
              {jersey.nama}
            </Text>
          </View>
        </Pressable>
      </View>
      <Button
        title="Details"
        padding={7}
        onPress={() => navigate('JerseyDetails', {jersey})}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  pic: {
    width: '100%',
    height: 124,
    borderRadius: 10,
  },
  title: {
    fontFamily: fonts.primary.bold,
    fontSize: 13,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: colors.black,
  },
  card: {
    width: responsiveWidth(150),
    alignItems: 'center',
    // padding: 10,
    height: 180,
  },
  container: {
    marginBottom: 25,
  },
  cardContainer: {
    backgroundColor: colors.yellow,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 10,
  },
})
