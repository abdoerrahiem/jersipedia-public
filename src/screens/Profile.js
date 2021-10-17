import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useSelector} from 'react-redux'
import {DefaultImage} from '../assets'

import {MenuList} from '../components'
import {dummyProfile, dummyMenu} from '../data'
import {
  colors,
  defaultHeight,
  fonts,
  responsiveHeigth,
  responsiveWidth,
} from '../utils'

export default function Profile({navigation}) {
  const [profile, setProfile] = useState(dummyProfile)
  const [menus, setMenus] = useState(dummyMenu)

  const {user} = useSelector(state => state.userReducer)

  useEffect(() => {
    if (!user) {
      navigation.replace('Login')
    }
  }, [user])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={user?.avatar ? {uri: user.avatar} : DefaultImage}
          style={styles.image}
        />
        <View style={styles.profile}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.desc}>{user?.phone}</Text>
          <Text style={styles.desc}>{user?.address}</Text>
        </View>
        <MenuList menus={menus} />
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
    height: responsiveHeigth(680),
    backgroundColor: colors.white,
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  name: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(24, defaultHeight),
    color: colors.black,
  },
  desc: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(18, defaultHeight),
    textAlign: 'center',
    color: colors.black,
  },
  image: {
    width: responsiveWidth(150),
    height: responsiveHeigth(150),
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: -responsiveWidth(75),
  },
  profile: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
})
