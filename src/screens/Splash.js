import React, {useEffect} from 'react'
import {View, StyleSheet} from 'react-native'

import {Logo, Illustration} from '../assets'

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main')
    }, 3000)
  }, [])

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.illustration}>
        <Illustration />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  illustration: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
})
