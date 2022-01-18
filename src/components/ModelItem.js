import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModelItem = ({backgroundCardColor, subjectId, itemData, index}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('ModelScreen', {
      subjectId: subjectId,
      modelId: index,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress()}
      style={[
        styles.itemStyle,
        {
          backgroundColor: backgroundCardColor,
          marginEnd: index % 2 == 0 ? 15 : 0,
        },
      ]}>
      <Text style={styles.itemText}>{itemData.modelTitle}</Text>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.imageStyle}
          source={itemData.modelLogo}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    height: windowHeight * 0.32,
    // width: windowWidth * 0.42,
    flex: 1,
    backgroundColor: '#F16A7D',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 30,
    elevation: 2,
  },
  imageContainer: {
    flex: 0.75,
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 10,
  },
  imageStyle: {
    height: '100%',
  },
  itemText: {
    flex: 0.25,
    fontSize: 22,
    textAlignVertical: 'center',
    fontFamily: 'Sen-Bold',
    color: '#ffffff',
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default ModelItem;
