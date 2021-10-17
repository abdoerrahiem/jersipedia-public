import React, {useEffect} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

import {
  Banner,
  Button,
  Distance,
  Header,
  JerseyList,
  LeagueList,
} from '../components'
import {colors, fonts} from '../utils'
import {getLeagues, getJerseys} from '../store/actions'

export default function ListJersey({navigation}) {
  const dispatch = useDispatch()
  const {getLeaguesSuccess} = useSelector(state => state.leagueReducer)
  const {getJerseysSuccess, keyword, id, name} = useSelector(
    state => state.jerseyReducer,
  )

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getLeagues())
      // dispatch(getJerseys({limit: true}))
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (keyword) {
      dispatch(getJerseys({keyword}))
    } else if (id) {
      dispatch(getJerseys({id}))
    } else {
      dispatch(getJerseys({limit: true}))
    }
  }, [keyword, id])

  return (
    <View style={styles.container}>
      <Header screen="ListJersey" />
      <ScrollView style={styles.contentContainer}>
        {getLeaguesSuccess && <LeagueList leagues={getLeaguesSuccess} />}
        {getJerseysSuccess && (
          <View style={styles.chooseJersey}>
            {keyword ? (
              <Text style={styles.label}>
                Results for: <Text style={styles.labelBold}>{keyword}</Text>
              </Text>
            ) : name ? (
              <Text style={styles.label}>
                Results for category:{' '}
                <Text style={styles.labelBold}>{name}</Text>
              </Text>
            ) : (
              <Text style={styles.label}>
                Choose <Text style={styles.labelBold}>Jersey</Text> You Like
              </Text>
            )}
            <JerseyList jerseys={getJerseysSuccess} />
            <Button title="View All" padding={7} />
          </View>
        )}
        <Distance height={100} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    marginTop: -25,
  },
  chooseLeague: {
    marginHorizontal: 30,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
    marginBottom: 10,
    color: colors.black,
  },
  chooseJersey: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  labelBold: {
    fontWeight: 'bold',
  },
})
