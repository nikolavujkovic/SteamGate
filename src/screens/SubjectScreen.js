import React from 'react';
import {StyleSheet, Text, useColorScheme, View, FlatList} from 'react-native';

import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import ModelItem from '../components/ModelItem';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const SubjectScreen = ({route}) => {

  const {
    subjectName,
    subjectImage,
    cardColor,
    subjectBackgroundColor,
    themeColor,
    subjectId,
    modelsInfo,
  } = route.params;

  const renderItem = ({item}) => (
    <ModelItem backgroundCardColor={themeColor} itemData={item} />
  );

  return (
    <View
      style={[
        styles.backgroundStyle,
        {backgroundColor: subjectBackgroundColor},
      ]}>
      <View style={[styles.headerStyle, {backgroundColor: themeColor}]}>
        <View style={styles.textContainer}>
          <Text style={styles.headerTitleStyle}>{subjectName}</Text>
        </View>
        <View style={styles.headerRightContainer}>
          <View style={styles.headerImageContainer}>
            <FastImage style={styles.headerImageStyle} source={subjectImage} />
          </View>
        </View>
      </View>
      <View
        style={[
          styles.listContainer,
          {backgroundColor: subjectBackgroundColor},
        ]}>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-around'}}
          data={modelsInfo}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={styles.listStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  headerStyle: {
    flex: 0.2,
    flexDirection: 'row',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingHorizontal: 10,
  },
  textContainer: {
    flex: 0.55,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleStyle: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 32,
    color: '#ffffff',
  },
  headerTextStyle: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 16,
    color: '#ffffff',
  },
  headerRightContainer: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImageContainer: {
    width: '80%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImageStyle: {
    flex: 1,
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  listContainer: {
    flex: 0.8,
    paddingHorizontal: 10,
  },
  listStyle: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 100,
  },
});

export default SubjectScreen;
