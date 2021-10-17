import React from 'react'
import {StyleSheet, View} from 'react-native'

import JerseyCard from './JerseyCard'

export default function JerseyList({jerseys}) {
  return (
    <View style={styles.container}>
      {Object.keys(jerseys).map(key => (
        <JerseyCard key={key} jersey={jerseys[key]} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
})
