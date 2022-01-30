import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import modelConstants from '../constants/modelConstants';

import {playSound} from '../components/AppSound';
import dingS from '../assets/sounds/buttonPressed.mp3';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');
let SOUNDlol = new Sound(dingS);

const SubjectItem = ({itemData}) => {
  const navigation = useNavigation();

  const [currentFont, setCurrentFont] = useState(26);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        playSound(SOUNDlol);
        navigation.navigate('SubjectScreen', {
          subjectName: itemData.subjectName,
          subjectDescription: itemData.subjectDescription,
          subjectImage: itemData.subjectImage,
          cardColor: itemData.themeColor,
          subjectBackgroundColor: itemData.bgColor,
          themeColor: itemData.themeColor,
          subjectId: itemData.subjectId,
          modelsInfo: modelConstants[itemData.subjectId],
        });
      }}>
      <View
        style={[
          styles.cardStyle,
          {
            backgroundColor: itemData.themeColor,
            // borderTopEndRadius: itemData.subjectId === 'electronics' ? 5 : null,
          },
        ]}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          onTextLayout={e => {
            const {lines} = e.nativeEvent;
            if (lines.length > 1) {
              setCurrentFont(currentFont - 1);
            }
          }}
          style={[styles.cardText, {fontSize: currentFont}]}>
          {itemData.subjectName}
        </Text>
        <View style={styles.cardRightSideStyle}>
          <View style={styles.scienceImageContainer}>
            <FastImage
              style={styles.scienceImageStyle}
              source={itemData.subjectImage}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    width: '88%',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 40,
    borderRadius: 40,
    // backgroundColor: 'teal',
  },
  cardText: {
    marginLeft: 20,
    flex: 0.6,
    color: '#ffffff',
    fontFamily: 'Sen-Bold',
  },
  cardRightSideStyle: {
    flex: 0.4,
    marginBottom: 60,
    alignItems: 'flex-end',
  },
  scienceImageContainer: {
    height: 130,
    width: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scienceImageStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    overflow: 'visible',
    borderRadius: 0,
  },
});

export default SubjectItem;
