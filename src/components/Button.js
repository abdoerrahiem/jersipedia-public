import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import {Distance} from '.'

import {colors, fonts} from '../utils'

export default function Button({
  Icon,
  title,
  padding,
  total,
  fontSize,
  onPress,
  loading,
  disabled,
}) {
  return (
    <View style={styles.buttonContainer(title, loading, disabled)}>
      <Pressable
        disabled={loading || disabled}
        android_ripple={{
          color: colors.secondary,
        }}
        onPress={onPress}>
        <View style={styles.container(padding)}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.white} />
              <Text style={styles.loadingText}>Loading....</Text>
            </View>
          ) : (
            <>
              {Icon && Icon}
              {Icon && title && <Distance width={5} />}
              {title && <Text style={styles.title(fontSize)}>{title}</Text>}
              {total && (
                <View style={styles.notif}>
                  <Text style={styles.notifText}>{total}</Text>
                </View>
              )}
            </>
          )}
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: (title, loading, disabled) => ({
    backgroundColor: title ? colors.primary : colors.white,
    borderRadius: 5,
    overflow: 'hidden',
    opacity: loading || disabled ? 0.8 : 1,
  }),
  container: padding => ({
    padding,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  notif: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 999,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifText: {
    fontSize: 8,
    color: colors.white,
  },
  title: fontSize => ({
    fontFamily: fonts.primary.semiBold,
    textAlign: 'center',
    color: colors.white,
    fontSize: fontSize ?? 15,
    fontFamily: fonts.primary.bold,
  }),
  loadingText: {
    fontSize: 16,
    fontFamily: fonts.primary.semiBold,
    color: colors.white,
    marginLeft: 5,
  },
  loadingContainer: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
})
