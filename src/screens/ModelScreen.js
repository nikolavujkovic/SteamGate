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
import modelConstants from '../constants/modelConstants';
import subjectConstants from '../constants/subjectConstants';

const {height, width} = Dimensions.get('window');
const bodyPadding = 16;

//TODO: use react-native-fast-image
// export colors to constants?
// export bottom margin to constants!!!

export default function ModelScreen({navigation, route}) {
  const {
    subjectName,
    subjectImage,
    themeColor,
    bgColor,
    modelImage,
    modelTitle,
    modelTextLocation,
  } = {
    // ...props,
    subjectName: subjectConstants[route.params.subjectId].subjectName,
    subjectImage: subjectConstants[route.params.subjectId].subjectImage,
    themeColor: subjectConstants[route.params.subjectId].themeColor,
    bgColor: subjectConstants[route.params.subjectId].bgColor,
    modelImage:
      modelConstants[route.params.subjectId][route.params.modelId].modelImage,
    modelTitle:
      modelConstants[route.params.subjectId][route.params.modelId].modelTitle,
    modelTextLocation:
      modelConstants[route.params.subjectId][route.params.modelId]
        .modelTextLocation,
  };

  let modelText = 'nope';

  const onStartARPressed = () => {
    navigation.navigate('ModelView');
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
          <Text style={[styles.modelTitleStyle, {color: themeColor}]}>
            {modelTitle}
          </Text>
          <Text
            style={[
              styles.modelTextStyle,
              // {color: themeColor},
              //
            ]}>
            {modelText}
          </Text>

          <TouchableOpacity
            style={[styles.startARButton, {backgroundColor: themeColor}]}
            activeOpacity={0.7}
            onPress={() => onStartARPressed()}>
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
    fontFamily: 'Sen-Bold',
  },
  headerImage: {
    height: '75%',
    width: undefined,
    aspectRatio: 1,
  },

  body: {
    padding: bodyPadding,
    marginBottom: 80, //this is because of the bottom tabs
  },
  modelTitleStyle: {
    fontSize: 26,
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: 'Sen-Bold',
  },
  modelImageStyle: {
    alignSelf: 'center',
    width: '100%',
  },
  modelTextStyle: {
    fontSize: 20,
    lineHeight: 26,
    marginVertical: 15,
    fontFamily: 'Sen-Regular',
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
    color: 'white',
    fontSize: 20,
    fontFamily: 'Sen-Bold',
  },
});
