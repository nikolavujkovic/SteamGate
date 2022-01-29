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

export default function PortalHub() {
  const [counter, setCounter] = useState(0);
  const [visible, setVisible] = useState(true);

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
      }
      else {
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
              {portalData[counter].portalTitle}
            </Text>
          </LinearGradient>
          <View style={styles.portalCotainer}>
            <TouchableOpacity style={styles.portalStyle}>
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
          onPress={() => {
            handleClick('down');
          }}>
          <FontAwesome5 name="chevron-left" color={'#ffffff'} size={60} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.arrowStyle}
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
    fontFamily: 'Sen-Bold',
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 24,
    textAlign: 'center',
  },
  portalCotainer: {
    flex: 0.8,
    width: '85%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  portalStyle: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (windowHeight - windowWidth * 0.85) * 0.5,
  },
  imageStyle: {
    height: '90%',
    width: '100%',
  },
});
