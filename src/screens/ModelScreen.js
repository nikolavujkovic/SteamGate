import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const {height, width} = Dimensions.get('window');
const bodyPadding = 16;

//TODO: use react-native-fast-image
// export colors to constants?
// export bottom margin to constants!!!

export default function ModelScreen() {
  const {
    subjectName,
    subjectImage,
    modelImage,
    modelTitle,
    modelText,
    themeColor,
  } = {
    // ...props,
    subjectName: 'Anatomija',
    subjectImage: require('../../dummySubject.png'),
    modelImage: require('../../dummy.png'),
    modelTitle: 'Mozak',
    modelText:
      'U medicini se često koristi izraz "desno" i "lijevo" srce. Desno srce je desna pretklijetka i klijetka; u desnu pretklijetku dolazi venska krv iz tijela koja se kroz desnu klijetku pumpa u pluća.\nKrv iz desnog srca u pluća vodi plućna arterija.',
    themeColor: '#F16A7D',
  };

  const [modelImageHeight, setModelImageHeight] = useState(0);

  return (
    <SafeAreaView style={[styles.f1, styles.bgw]}>
      {/* header */}
      <View style={[styles.header, {backgroundColor: themeColor}]}>
        <Text style={styles.headerText}>{subjectName}</Text>
        <FastImage style={styles.headerImage} source={subjectImage} />
      </View>

      {/* body */}
      <ScrollView style={styles.f1}>
        <View style={styles.body}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={[
              styles.modelImageStyle,
              {
                height:
                  modelImageHeight <= height * 0.35
                    ? modelImageHeight
                    : height * 0.35,
              },
            ]}
            source={modelImage}
            onLoad={evt =>
              setModelImageHeight(
                (evt.nativeEvent.height / evt.nativeEvent.width) *
                  (width - bodyPadding * 2), // By this, you keep the image ratio
              )
            }
          />
          <Text style={styles.modelTitleStyle}>{modelTitle}</Text>
          <Text style={styles.modelTextStyle}>{modelText}</Text>

          <TouchableOpacity
            style={[styles.startARButton, {backgroundColor: themeColor}]}
            activeOpacity={0.7}>
            <Text style={styles.startARButtonText}>Pogledajte u AR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  fg: {
    flexGrow: 1,
  },
  bgw: {
    backgroundColor: 'white',
  },

  header: {
    flex: 1,
    maxHeight: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  headerImage: {
    height: '75%',
    width: undefined,
    aspectRatio: 1,
  },

  body: {
    padding: bodyPadding,
    marginBottom: 76, //this is because of the bottom tabs
  },
  modelTitleStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
  modelImageStyle: {
    alignSelf: 'center',
    width: '100%',
  },
  modelTextStyle: {
    fontSize: 20,
    lineHeight: 26,
    marginVertical: 15,
  },
  startARButton: {
    width: '70%',
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  startARButtonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});
