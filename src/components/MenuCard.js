import React from 'react'
import {StyleSheet, Text, View, Pressable} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useDispatch} from 'react-redux'

import {IconArrowRight} from '../assets'
import {colors, fonts, responsiveHeigth} from '../utils'
import {logoutUser} from '../store/actions'

export default function MenuCard({menu}) {
  const {navigate} = useNavigation()

  const dispatch = useDispatch()

  const handlePress = () => {
    if (menu.halaman === 'Login') {
      dispatch(logoutUser())
    } else {
      navigate(menu.halaman)
    }
  }

  return (
    <View style={styles.menuContainer}>
      <Pressable
        android_ripple={{color: colors.secondary}}
        onPress={handlePress}>
        <View style={styles.container}>
          <View style={styles.content}>
            {menu.gambar}
            <Text style={styles.text}>{menu.nama}</Text>
          </View>
          <IconArrowRight />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  menuContainer: {
    overflow: 'hidden',
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: responsiveHeigth(15),
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary.semiBold,
    marginLeft: 20,
    color: colors.primary,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
