import React from 'react'
import {Text, StyleSheet, Pressable} from 'react-native'

import {
  IconHome,
  IconHomeActive,
  IconJersey,
  IconJerseyActive,
  IconProfile,
  IconProfileActive,
  IconNotification,
  IconNotificationActive,
} from '../assets'
import {colors, fonts} from '../utils'

export default function TabItem({
  isFocused,
  options,
  onPress,
  onLongPress,
  label,
}) {
  const Icon = () => {
    if (label === 'Home') {
      return isFocused ? <IconHomeActive /> : <IconHome />
    } else if (label === 'Jersey') {
      return isFocused ? <IconJerseyActive /> : <IconJersey />
    } else if (label === 'Profile') {
      return isFocused ? <IconProfileActive /> : <IconProfile />
    } else if (label === 'Notifications') {
      return isFocused ? <IconNotificationActive /> : <IconNotification />
    }
  }

  return (
    <Pressable
      android_ripple={{
        color: colors.secondary,
        borderless: true,
      }}
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text style={styles.text(isFocused)}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  text: isFocused => ({
    color: isFocused ? colors.white : colors.secondary,
    fontSize: 11,
    marginTop: 4,
    fontFamily: isFocused ? fonts.primary.bold : fonts.primary.regular,
  }),
  container: {
    alignItems: 'center',
  },
})
