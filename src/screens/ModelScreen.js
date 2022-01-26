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
import modelDescriptions from '../assets/modelDescriptions';
import Icons from '../constants/Icons';

const {height, width} = Dimensions.get('window');
const bodyPadding = 16;
const headerHeight = 80;

// export bottom padding to constants maybe?

export default function ModelScreen({navigation, route}) {
  const {
    subjectName,
    subjectImage,
    themeColor,
    bgColor,
    modelImage,
    modelTitle,
    modelText,
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
    modelText: modelDescriptions[route.params.subjectId][route.params.modelId],
  };

  const arr = modelText.split(' ');
  const reducer = (acc, cur, index) => {
    let previousVal = acc[acc.length - 1];
    if (
      previousVal &&
      previousVal.startsWith('**') &&
      !previousVal.endsWith('**')
    ) {
      acc[acc.length - 1] = previousVal + ' ' + cur;
    } else {
      acc.push(cur);
    }
    return acc;
  };

  const text = arr.reduce(reducer, []);

  const onStartARPressed = () => {
    navigation.navigate('ModelView', {
      subjectId: route.params.subjectId,
      modelId: route.params.modelId,
    });
  };

  const [modelImageHeight, setModelImageHeight] = useState(0);
  const [subjectImageWidth, setSubjectImageWidth] = useState(0); // per il logo

  const blackColorCondition = () => {
    switch (route.params.subjectId) {
      case 'mycology':
        return false;
      default:
        return false;
    }
  };

  const addToDeck = (SID, MID) => {
    navigation.navigate('AssignCard', {
      SID: SID,
      MID: MID,
    });
  };

  return (
    <SafeAreaView style={[styles.f1, styles.bgw]}>
      {/* header */}
      <View style={[styles.header, {backgroundColor: themeColor}]}>
        <Text style={styles.headerText}>{subjectName}</Text>
        <FastImage
          style={[styles.headerImage, {width: subjectImageWidth}]}
          source={subjectImage}
          onLoad={evt =>
            setSubjectImageWidth(
              (evt.nativeEvent.width / evt.nativeEvent.height) *
                (0.75 * headerHeight),
            )
          }
        />
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
            {text.map((text, index) => {
              if (text.startsWith('**')) {
                return (
                  <Text
                    key={index}
                    style={[styles.modelTextStyle, {fontFamily: 'Sen-Bold'}]}>
                    {text.split('**').join('')}{' '}
                  </Text>
                );
              }
              return `${text} `;
            })}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.startARButton, {backgroundColor: themeColor}]}
              activeOpacity={0.7}
              onPress={() => onStartARPressed()}>
              <Text style={styles.startARButtonText}>Pogledajte u AR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addToDeckButton, {backgroundColor: themeColor}]}
              activeOpacity={0.7}
              onPress={() =>
                addToDeck(route.params.subjectId, route.params.modelId)
              }>
              <Icons.MaterialCommunityIcons
                name="cards-spade"
                size={35}
                color={blackColorCondition() ? 'black' : 'white'}
              />
            </TouchableOpacity>
          </View>
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
    maxHeight: headerHeight,
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
    marginVertical: 25,
    fontFamily: 'Sen-Regular',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 5,
  },
  startARButton: {
    width: width * 0.5,
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginRight: 10,
  },
  startARButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Sen-Bold',
  },
  addToDeckButton: {
    //FIXME: questionaable
    // theory is that icon size = font size so it will be at the samo level
    padding: 15,
    borderRadius: 100,
  },
});
