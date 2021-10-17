import React, {useEffect} from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import LeagueCard from './LeagueCard'

export default function LeagueList({leagues}) {
  let updatedLeagues = []

  Object.keys(leagues).map(key => updatedLeagues.push({...leagues[key], key}))

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={updatedLeagues}
      keyExtractor={item => item.key}
      renderItem={({item}) => (
        <View style={styles.card}>
          <LeagueCard id={item.key} league={item} />
        </View>
      )}
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  card: {
    padding: 5,
  },
})
