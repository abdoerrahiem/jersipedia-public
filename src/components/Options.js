import React, {useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {useDispatch} from 'react-redux'

import {colors, fonts, responsiveHeigth} from '../utils'
import {getCities} from '../store/actions'

export default function Options({
  options,
  title,
  width,
  height,
  fontSize,
  value,
  handleChangeText,
}) {
  const dispatch = useDispatch()

  const handleChange = value => {
    handleChangeText(value)

    if (title === 'Provinsi') {
      dispatch(getCities(value))
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title(fontSize)}>{title}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker(width, height, fontSize)}
          selectedValue={value}
          onValueChange={handleChange}>
          <Picker.Item label="---" value="" enabled={false} />
          {options.map((opt, idx) => (
            <Picker.Item
              key={idx}
              label={
                title === 'Provinsi'
                  ? opt.province
                  : title === 'Kota/Kab'
                  ? `${opt.type} ${opt.city_name}`
                  : title === 'Choose expedition'
                  ? opt.label
                  : opt
              }
              value={
                title === 'Provinsi'
                  ? opt.province_id
                  : title === 'Kota/Kab'
                  ? opt.city_id
                  : title === 'Choose expedition'
                  ? opt
                  : opt
              }
            />
          ))}
        </Picker>
      </View>
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
  picker: (width, height, fontSize) => ({
    fontSize: fontSize ?? 18,
    fontFamily: fonts.primary.regular,
    width,
    height: height ?? responsiveHeigth(46),
    top: -10,
    color: colors.primary,
  }),
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
  },
})
