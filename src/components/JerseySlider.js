import React, {useState} from 'react'
import {StyleSheet, Text, View, Modal} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import {SliderBox} from 'react-native-image-slider-box'

import {colors, responsiveHeigth, responsiveWidth} from '../utils'

export default function JerseySlider({images}) {
  const [showModal, setShowModal] = useState(false)
  const [image, setImage] = useState(null)

  const handleImagePress = index => {
    let restImages = []

    images
      .filter((img, idx) => idx !== index)
      .map(img => restImages.push({url: img, props: {source: ''}}))

    setShowModal(true)
    setImage([{url: images[index], props: {source: ''}}, ...restImages])
  }

  console.log(image)

  return (
    <View>
      <SliderBox
        images={images}
        circleLoop
        imageLoadingColor={colors.primary}
        sliderBoxHeight={responsiveHeigth(430)}
        ImageComponentStyle={styles.image}
        dotStyle={styles.dotStyle}
        dotColor={colors.primary}
        onCurrentImagePressed={handleImagePress}
      />

      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setShowModal(false)}>
        <ImageViewer
          imageUrls={image}
          backgroundColor={colors.primary}
          enableImageZoom
          enableSwipeDown
          onSwipeDown={() => setShowModal(false)}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: responsiveWidth(430),
    marginTop: 25,
  },
  container: {
    marginTop: -15,
  },
  dotStyle: {
    width: 20,
    height: 5,
    borderRadius: 5,
    marginTop: -50,
  },
})
