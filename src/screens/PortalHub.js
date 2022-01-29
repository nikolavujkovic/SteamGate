import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FadeInOut from 'react-native-fade-in-out';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';

import portalConstants from '../constants/portalConstants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const portalData = Object.keys(portalConstants).map(
  key => portalConstants[key],
);

export default function PortalHub({navigation}) {
  const [counter, setCounter] = useState(0);
  const [visible, setVisible] = useState(true);

  const arr = portalData[counter].portalTitle.split('\n');

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

  const onPortalSelected = () => {
    navigation.navigate('PortalView', {
      portalId: portalData[counter].portalId,
    });
  };

  const toggleVisible = option => {
    setVisible(option);
  };

  const handleClick = direction => {
    if (direction === 'up') {
      toggleVisible(false);
      if (counter < 4) {
        setTimeout(function () {
          setCounter(counter + 1);
          toggleVisible(true);
        }, 250);
      } else {
        setTimeout(function () {
          setCounter(0);
          toggleVisible(true);
        }, 250);
      }
    } else if (direction === 'down') {
      toggleVisible(false);
      if (counter > 0) {
        setTimeout(function () {
          setCounter(counter - 1);
          toggleVisible(true);
        }, 250);
      } else {
        setTimeout(function () {
          setCounter(4);
          toggleVisible(true);
        }, 250);
      }
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.backgroundBodyStyle,
        {backgroundColor: portalData[counter].themeColor},
      ]}>
      {/* this is an underlayer for the "portal moving" effectr */}
      <View
        style={[
          {
            position: 'absolute',
            alignSelf: 'center',
            width: '85%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 15,
            opacity: 0.5,
          },
        ]}>
        <View
          style={[
            {
              width: '100%',
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <FastImage
            style={styles.imageStyle}
            resizeMode={FastImage.resizeMode.contain}
            source={require('../assets/backgroundImages/PortalsBackgrounds/hole.png')}
          />
        </View>
      </View>

      <FadeInOut
        style={[
          {
            width: '100%',
            position: 'absolute',
            backgroundColor: portalData[counter].themeColor,
          },
        ]}
        visible={visible}
        duration={350}>
        <ImageBackground
          source={portalData[counter].portalBackground}
          style={styles.backgroundStyle}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.7)', 'transparent']}
            style={{flex: 0.2, width: '100%'}}>
            <Text style={styles.titleStyle}>
              {text.map((text, index) => {
                if (text.startsWith('**')) {
                  return (
                    <Text
                      key={index}
                      style={[
                        styles.titleStyle,
                        {fontFamily: 'Sen-ExtraBold'},
                      ]}>
                      {text.split('**').join('')}
                      {'\n'}
                    </Text>
                  );
                }
                return `${text}\n`;
              })}
            </Text>
          </LinearGradient>
          <View style={styles.restContainer} />

          <View style={styles.portalContainer}>
            <TouchableOpacity
              onPress={() => onPortalSelected()}
              activeOpacity={1}
              style={styles.portalStyle}>
              <FastImage
                style={styles.imageStyle}
                resizeMode={FastImage.resizeMode.contain}
                source={require('../assets/backgroundImages/PortalsBackgrounds/hole.png')}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </FadeInOut>

      <View style={[{position: 'absolute'}, styles.arrowContainer]}>
        <TouchableOpacity
          style={styles.arrowStyle}
          activeOpacity={0.7}
          onPress={() => {
            handleClick('down');
          }}>
          <FontAwesome5 name="chevron-left" color={'#ffffff'} size={60} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.arrowStyle}
          activeOpacity={0.7}
          onPress={() => {
            handleClick('up');
          }}>
          <FontAwesome5 name="chevron-right" color={'#ffffff'} size={60} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundBodyStyle: {
    height: '100%',
    width: '100%',
  },
  backgroundStyle: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowStyle: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 24,
    fontFamily: 'Sen-Regular',
    color: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    textAlign: 'center',
  },
  restContainer: {
    flex: 0.8,
    width: '100%',
  },
  portalContainer: {
    position: 'absolute',
    height: '100%',
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  portalStyle: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: '90%',
    width: '100%',
  },
});
