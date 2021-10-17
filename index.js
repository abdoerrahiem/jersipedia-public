import 'react-native-gesture-handler'
import React from 'react'
import {AppRegistry, LogBox} from 'react-native'
import messaging from '@react-native-firebase/messaging'
import notifee, {AndroidImportance, EventType} from '@notifee/react-native'

import App from './src/App'
import {name as appName} from './app.json'
import {navigate} from './src/navigation/RootNavigation'

LogBox.ignoreLogs(['Require cycles are allowed'])

notifee.onForegroundEvent(({type, detail}) => {
  if (type === EventType.PRESS) {
    console.log('foreground press!')
    if (detail.notification.data.type === 'newJersey') {
      navigate('JerseyDetails', {
        jersey: JSON.parse(detail.notification.data.jersey),
      })
    }
  }
})

notifee.onBackgroundEvent(({type}) => {
  if (type === EventType.PRESS) {
    console.log('background press!')
    navigate('History', {})
  }
})

async function onDisplayNotification(remoteMessage) {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  })

  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      importance: AndroidImportance.HIGH,
    },
    data: remoteMessage.data,
  })
}

messaging()
  .subscribeToTopic('all')
  .then(() => console.log('Subscribe success'))
  .catch(err => console.log(err))

messaging().onMessage(remoteMessage => {
  console.log('Foreground notif!', remoteMessage)

  onDisplayNotification(remoteMessage)
})

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Background notif!', remoteMessage)

//   await notifee.displayNotification({
//     title: remoteMessage.notification.title,
//     body: remoteMessage.notification.body,
//     android: {
//       channelId: '12345',
//       smallIcon: 'ic_launcher',
//       importance: AndroidImportance.HIGH,
//     },
//     data: remoteMessage.data,
//   })
// })

AppRegistry.registerComponent(appName, () => App)
