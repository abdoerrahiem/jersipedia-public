import React from 'react'
import {StyleSheet, Text, View, ScrollView} from 'react-native'

import {HistoryCard} from '.'

export default function HistoryList({carts}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {carts &&
          Object.keys(carts).map(key => (
            <HistoryCard cart={carts[key]} key={key} id={key} />
          ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 30,
  },
})
