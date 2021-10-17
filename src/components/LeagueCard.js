import React from 'react'
import {StyleSheet, View, Image, Pressable} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigation} from '@react-navigation/native'

import {colors, responsiveHeigth, responsiveWidth} from '../utils'
import {getJerseyByLeague} from '../store/actions'

export default function LeagueCard({league, id}) {
  const {navigate} = useNavigation()
  const dispatch = useDispatch()

  const handlePress = (id, name) => {
    dispatch(getJerseyByLeague(id, name))
    navigate('ListJersey')
  }

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{color: colors.secondary}}
        onPress={() => handlePress(id, league.namaLiga)}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: league?.image}}
            style={styles.logo}
            resizeMode="center"
          />
        </View>
      </Pressable>
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
    borderRadius: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    padding: 10,
  },
  logo: {
    width: responsiveWidth(57),
    height: responsiveHeigth(57),
  },
})
