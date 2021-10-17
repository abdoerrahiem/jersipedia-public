import React from 'react'
import {StyleSheet, ScrollView, View} from 'react-native'

import {CartCard} from '.'

export default function CartList({carts}) {
  return (
    <ScrollView>
      <View style={styles.container}>
        {carts &&
          Object.keys(carts.orders).map(key => (
            <CartCard
              key={key}
              cart={carts.orders[key]}
              mainCart={carts}
              id={key}
            />
          ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
})
