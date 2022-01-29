import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

export default function ModelLoading({selected}) {
  const astros = [
    require('../assets/other/model/astroLoad1M.png'),
    require('../assets/other/model/astroLoad2M.png'),
    require('../assets/other/model/astroLoad3M.png'),
  ];

  return (
    <View style={styles.container}>
      <Image source={astros[selected]} style={styles.astro} />
      <Text style={styles.text}>3D model se priprema...</Text>

      <ActivityIndicator size={60} color="#462D8C" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  astro: {
    marginTop: '30%',
    width: '75%',
    height: undefined,
    aspectRatio: 1,
  },
  text: {
    fontFamily: 'JosefinSans-LightItalic',
    color: 'black',
    fontSize: 26,
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 40,
    textAlign: 'center',
  },
});
