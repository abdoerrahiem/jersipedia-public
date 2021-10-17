import React, {useState, useEffect} from 'react'
import {StyleSheet, View, TextInput} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'

import Button from './Button'
import Distance from './Distance'
import {IconSearch, IconShopping} from '../assets'
import {colors, fonts, responsiveHeigth} from '../utils'
import {saveKeywordJersey} from '../store/actions'

export default function Header({screen}) {
  const [search, setSearch] = useState('')
  const [totalCart, setTotalCart] = useState(null)

  const {navigate} = useNavigation()

  const dispatch = useDispatch()
  const {keyword} = useSelector(state => state.jerseyReducer)
  const {getCartsSuccess} = useSelector(state => state.cartReducer)

  useEffect(() => {
    if (keyword) {
      setSearch(keyword)
    } else {
      setSearch('')
    }

    if (getCartsSuccess) {
      setTotalCart(Object.keys(getCartsSuccess.orders).length)
    } else {
      setTotalCart(null)
    }
  }, [keyword, getCartsSuccess])

  const handleSubmit = () => {
    dispatch(saveKeywordJersey(search))

    if (screen !== 'ListJersey') {
      navigate('ListJersey')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapperHeader}>
        <View style={styles.textInputContainer}>
          <IconSearch />
          <TextInput
            placeholder="Search Jersey..."
            style={styles.textInput}
            value={search}
            onChangeText={text => setSearch(text)}
            onSubmitEditing={handleSubmit}
          />
        </View>
        <Distance width={10} />
        <Button
          Icon={<IconShopping />}
          padding={12}
          total={totalCart}
          onPress={() => navigate('Cart')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: responsiveHeigth(125),
  },
  textInput: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: colors.black,
  },
  textInputContainer: {
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  wrapperHeader: {
    marginTop: 15,
    marginHorizontal: 30,
    flexDirection: 'row',
  },
})
