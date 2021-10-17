import {Dimensions} from 'react-native'
import {defaultHeight, defaultWidth} from './constant'

export const responsiveWidth = width =>
  (Dimensions.get('window').width * width) / defaultWidth

export const responsiveHeigth = height =>
  (Dimensions.get('window').height * height) / defaultHeight
