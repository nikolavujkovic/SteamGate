import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
} from 'react-native';

import {Dimensions} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModelItem = ({itemData}) => (
  <View style={styles.itemStyle}>
    <Text style={styles.itemText}>{itemData.name}</Text>
    <Image style={styles.imageStyle} source={itemData.image} />

    
  </View>
);

const styles = StyleSheet.create({
  itemStyle: {
    height: windowHeight * 0.32,
    width: windowWidth * 0.42,
    backgroundColor: '#F16A7D',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 30,
  },
  imageStyle: {
    flex: 0.75,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  itemText: {
    flex: 0.25,
    fontSize: 20,
    textAlignVertical: 'center',
    color: '#ffffff'
  },
});

export default ModelItem;
