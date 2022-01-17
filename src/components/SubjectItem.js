import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';

import {Dimensions} from 'react-native';

import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const SubjectItem = ({itemData}) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('SubjectScreen', {
          subjectName: itemData.subjectName,
          subjectImage: itemData.subjectImage,
          cardColor: itemData.cardColor,
          subjectBackgroundColor: itemData.subjectBackgroundColor,
          themeColor: itemData.themeColor,
          subjectId: itemData.subjectId,
          modelsInfo: itemData.modelsInfo,
        })
      }>
      <View style={[styles.cardStyle, {backgroundColor: itemData.cardColor}]}>
        <Text style={styles.cardText}>{itemData.subjectName}</Text>
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
    marginBottom: 20,
    marginTop: 40,
    borderRadius: 40,
  },
  cardText: {
    fontSize: 26,
    marginLeft: 20,
    flex: 0.6,
    color: '#ffffff',
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
