import React, {useEffect} from 'react'
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native'
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
import {getLeagues, getJerseys, getCarts} from '../store/actions'

export default function Home({navigation}) {
  const dispatch = useDispatch()
  const {getLeaguesSuccess, getLeaguesFail} = useSelector(
    state => state.leagueReducer,
  )
  const {getJerseysSuccess, keyword} = useSelector(state => state.jerseyReducer)
  const {user} = useSelector(state => state.userReducer)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getLeagues())
      dispatch(getJerseys({limit: true}))
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(getCarts(user.uid))
    }
  }, [])

  return (
    <>
      {/* <StatusBar backgroundColor={colors.primary} /> */}
      <View style={styles.container}>
        <ScrollView>
          <Header screen="Home" />
          <Banner />
          {getLeaguesSuccess && (
            <>
              <Text style={styles.label}>Choose League</Text>
              <LeagueList leagues={getLeaguesSuccess} />
            </>
          )}
          {getJerseysSuccess && (
            <>
              <Text style={styles.label}>
                Choose <Text style={styles.labelBold}>Jersey</Text> You Like
              </Text>
              <View style={styles.chooseJersey}>
                <JerseyList jerseys={getJerseysSuccess} />
                <Button title="View All" padding={7} />
              </View>
            </>
          )}
          <Distance height={100} />
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
    marginVertical: 10,
    marginHorizontal: 30,
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
