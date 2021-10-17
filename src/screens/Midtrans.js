import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {WebView} from 'react-native-webview'
import * as Progress from 'react-native-progress'
import {useDispatch, useSelector} from 'react-redux'

import {colors} from '../utils'
import {getCarts, updateOrder} from '../store/actions'
import {CLEAN_UPDATE_ORDER} from '../store/types'

export default function Midtrans({route, navigation}) {
  const {uri, order_id} = route.params

  const [progress, setProgress] = useState(0)
  const [isLoaded, setLoaded] = useState(false)

  const dispatch = useDispatch()
  const {user} = useSelector(state => state.userReducer)

  useEffect(() => {
    if (order_id) {
      dispatch(updateOrder(route.params))
    }
  }, [])

  const handleMessage = data => {
    if (data.nativeEvent.data === 'Success') {
      navigation.replace('History')
      dispatch(getCarts(user.uid))
      // dispatch({type: CLEAN_UPDATE_ORDER})
    }
  }

  return (
    <>
      {!isLoaded ? (
        <Progress.Bar
          progress={progress}
          width={null}
          borderWidth={0}
          borderRadius={0}
          color={colors.primary}
        />
      ) : null}
      <WebView
        source={{uri}}
        onLoadProgress={({nativeEvent}) => setProgress(nativeEvent.progress)}
        onLoadEnd={() => setLoaded(true)}
        onMessage={handleMessage}
      />
    </>
  )
}

const styles = StyleSheet.create({})
