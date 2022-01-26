import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

export default function DeckLoading({selected}) {
  const astros = [
    require('../assets/other/astroLoad1.png'),
    require('../assets/other/astroLoad2.png'),
    require('../assets/other/astroLoad3.png'),
  ];

  return (
    <View style={styles.container}>
      <Image
        fadeDuration={300}
        source={astros[selected]}
        style={styles.astro}
      />
      <Text style={styles.text}>
        Konzumiranje memorije i performansi u toku...{' '}
        <Text style={{fontFamily: 'JosefinSans-SemiBold'}}>:)</Text>
      </Text>

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
