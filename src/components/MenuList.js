import React from 'react'
import {StyleSheet, View} from 'react-native'
import MenuCard from './MenuCard'

export default function MenuList({menus}) {
  return (
    <View>
      {menus.map(menu => (
        <MenuCard key={menu.id} menu={menu} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({})
