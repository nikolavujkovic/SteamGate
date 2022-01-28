import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

export default function AppLoading() {
  return (
    <>
      <View style={styles.container}>
        <Image
          fadeDuration={1000}
          resizeMode="contain"
          source={require('../assets/other/loadingAppLogo.png')}
          style={styles.appLogo}
        />
        <Image
          fadeDuration={1000}
          resizeMode="contain"
          source={require('../assets/other/loadingTeamLogo.png')}
          style={styles.teamLogo}
        />
      </View>
      <Text style={styles.text}>M:tel App Izazov 2022 | Tim Fokus Pokus</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 40,
  },
  appLogo: {
    width: '40%',
    height: undefined,
    aspectRatio: 0.8255,
  },
  teamLogo: {
    width: '60%',
    height: undefined,
    aspectRatio: 2.6421,
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
    bottom: 16,
    fontSize: 16,
    fontFamily: 'JosefinSans-SemiBold',
  },
});
