import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

import {colors, fonts} from '../utils'

export default function DefaultHeader({title}) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.primary.regular,
    fontSize: 18,
    color: colors.black,
  },
})
