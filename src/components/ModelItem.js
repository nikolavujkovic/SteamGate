import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModelItem = ({backgroundCardColor, itemData}) => (
  <View style={[styles.itemStyle, {backgroundColor: backgroundCardColor}]}>
    <Text style={styles.itemText}>{itemData.modelName}</Text>
    <FastImage
      style={styles.imageStyle}
      source={itemData.modelImage}
      resizeMode={FastImage.resizeMode.contain}
    />
  </View>
);

const styles = StyleSheet.create({
  itemStyle: {
    height: windowHeight * 0.32,
    width: windowWidth * 0.42,
    backgroundColor: '#F16A7D',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 30,
  },
  imageStyle: {
    flex: 0.75,
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  itemText: {
    flex: 0.25,
    fontSize: 22,
    textAlignVertical: 'center',
    color: '#ffffff',
  },
});

export default ModelItem;
