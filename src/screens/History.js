import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

import HistoryList from '../components/HistoryList'
import {dummyPesanans} from '../data'
import {getHistories} from '../store/actions'
import {colors} from '../utils'

export default function History({navigation}) {
  const [carts, setCarts] = useState(dummyPesanans)

  const dispatch = useDispatch()
  const {user} = useSelector(state => state.userReducer)
  const {getHistoriesSuccess} = useSelector(state => state.historyReducer)

  useEffect(() => {
    if (!user) {
      navigation.replace('Login')
    } else {
      dispatch(getHistories(user.uid))
    }
  }, [])

  return (
    <View style={styles.container}>
      <HistoryList carts={getHistoriesSuccess} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
})
