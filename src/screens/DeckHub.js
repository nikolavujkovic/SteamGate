import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function DeckHub({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <FastImage
        style={styles.background}
        source={require('../assets/backgroundImages/cardWpBlank.jpg')}
        resizeMode={FastImage.resizeMode.stretch}
      />

      <View
        style={[
          styles.container,
          {
            padding: 20,
          },
        ]}>
        <FastImage
          source={require('../assets/other/playing-cards.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Špil Znanja</Text>
        <Text style={styles.subtitle}>
          Provjerite svoje znanje na totalno drugačiji način!
        </Text>

        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={styles.paragraph}>1. </Text>
            <Text style={styles.paragraph}>
              Pronađite 3D modele koji Vam se sviđaju
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={styles.paragraph}>2. </Text>
            <Text style={styles.paragraph}>
              Odaberite karte kojima želite da dodjelite te modele
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={styles.paragraph}>3. </Text>
            <Text style={styles.paragraph}>
              Navratite ovdje i testirajte svoje znanje prolazeći kroz špil
              karata!
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('DeckView')}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>Isprobajte odmah!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'white',
    // justifyContent: 'space-evenly',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '50%',
    height: undefined,
    aspectRatio: 1,
    marginTop: 40,
  },
  title: {
    fontFamily: 'Sen-Bold',
    color: 'black',
    fontSize: 38,
    textAlign: 'center',
    marginTop: 30,
  },
  subtitle: {
    fontFamily: 'Sen-Regular',
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  paragraph: {
    fontFamily: 'Sen-Regular',
    color: 'black',
    fontSize: 20,
  },
  startButton: {
    backgroundColor: '#462D8C',
    width: '75%',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Sen-Bold',
  },
});
