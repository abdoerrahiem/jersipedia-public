import React from 'react'
import {StyleSheet, Text, View, TextInput} from 'react-native'
import {colors, fonts} from '../utils'

export default function Input({
  title,
  width,
  height,
  minHeight,
  fontSize,
  placeholder,
  multiline,
  numberOfLines,
  value,
  handleChangeText,
  ...otherProps
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title(fontSize)}>{title}</Text>
      <TextInput
        style={styles.input(width, height, minHeight, fontSize)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChangeText}
        {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: fontSize => ({
    fontSize: fontSize ?? 18,
    fontFamily: fonts.primary.regular,
    color: colors.primary,
  }),
  input: (width, height, minHeight, fontSize) => ({
    fontSize: fontSize ?? 18,
    fontFamily: fonts.primary.regular,
    width,
    height,
    minHeight,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    color: colors.primary,
  }),
})
