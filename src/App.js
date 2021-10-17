import React, {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {Provider} from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import Navigation from './navigation'
import store from './store'
import {getUser} from './store/actions'
import {StatusBar} from 'react-native'
import {colors} from './utils'
import {navigationRef} from './navigation/RootNavigation'

store.dispatch(getUser())

function App() {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar backgroundColor={colors.primary} />
        <Navigation />
      </NavigationContainer>
    </Provider>
  )
}

export default App
