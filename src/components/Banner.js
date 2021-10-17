import React, {useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {SliderBox} from 'react-native-image-slider-box'

import {Slider1, Slider2} from '../assets'
import {colors, responsiveHeigth, responsiveWidth} from '../utils'

export default function Banner() {
  const [images, setImages] = useState([Slider1, Slider2])

  return (
    <View style={styles.container}>
      <SliderBox
        images={images}
        autoplay
        circleLoop
        imageLoadingColor={colors.primary}
        sliderBoxHeight={responsiveHeigth(132)}
        ImageComponentStyle={styles.image}
        dotStyle={styles.dotStyle}
        dotColor={colors.primary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    width: responsiveWidth(354),
  },
  container: {
    marginTop: -15,
  },
  dotStyle: {
    width: 20,
    height: 5,
    borderRadius: 5,
  },
})
