import React, {useState} from 'react';
import {StyleSheet, Text, useColorScheme, View, FlatList} from 'react-native';

import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import ModelItem from '../components/ModelItem';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SubjectScreen = ({route}) => {
  const {
    subjectName,
    subjectDescription,
    subjectImage,
    subjectBackgroundColor,
    themeColor,
    subjectId,
    modelsInfo,
  } = route.params;

  const [subjectImageWidth, setSubjectImageWidth] = useState(0);
  const [currentFont, setCurrentFont] = useState(30);

  const renderItem = ({item, index}) => (
    <ModelItem
      backgroundCardColor={themeColor}
      subjectId={subjectId}
      itemData={item}
      index={index}
    />
  );

  return (
    <View
      style={[
        styles.backgroundStyle,
        {backgroundColor: subjectBackgroundColor},
      ]}>
      <View
        style={[
          styles.listContainer,
          {backgroundColor: subjectBackgroundColor},
        ]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          columnWrapperStyle={{justifyContent: 'space-around'}}
          data={modelsInfo}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={styles.listStyle}
        />
      </View>

      <View style={[styles.headerStyle, {backgroundColor: themeColor}]}>
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            onTextLayout={e => {
              const {lines} = e.nativeEvent;
              if (lines.length > 1) {
                setCurrentFont(currentFont - 1);
              }
            }}
            style={[styles.headerTitleStyle, {fontSize: currentFont}]}>
            {subjectName}
          </Text>
          <Text style={styles.headerDescriptionStyle}>
            {subjectDescription}
          </Text>
        </View>
        <View style={styles.headerRightContainer}>
          <View style={styles.headerImageContainer}>
            <FastImage
              style={[styles.headerImageStyle, {width: subjectImageWidth}]}
              source={subjectImage}
              onLoad={evt =>
                setSubjectImageWidth(
                  (evt.nativeEvent.width / evt.nativeEvent.height) *
                    ((windowWidth - 25) * 0.4 - 25),
                )
              }
            />
          </View>
        </View>
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
    height: 160,
    flexDirection: 'row',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    paddingLeft: 25,
  },
  textContainer: {
    width: '60%',
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingEnd: 5,
  },
  headerTitleStyle: {
    textAlignVertical: 'center',
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'Sen-Bold',
    color: '#ffffff',
    marginBottom: 12.5,
  },
  headerDescriptionStyle: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 18,
    color: '#ffffff',
    alignSelf: 'flex-start',
    fontFamily: 'Sen-Regular',
    textAlign: 'left',
  },
  headerRightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginEnd: 25,
  },
  headerImageContainer: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImageStyle: {
    height: '100%',
  },
  listContainer: {
    position: 'absolute',
    top: 80,
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
  },
  listStyle: {
    paddingTop: 10 + 80,
    flexGrow: 1,
    paddingBottom: 160, // this is because of the bottom tabs navigator
  },
});

export default SubjectScreen;
