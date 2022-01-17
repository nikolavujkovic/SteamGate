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

import ModelItem from '../components/ModelItem'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [
  {
    key: 1,
    name: 'srce',
    image: require('../assets/probno_srce.jpg'),
  },
  {
    key: 2,
    name: 'srce',
    image: require('../assets/probno_srce.jpg'),
  },
  {
    key: 3,
    name: 'srce',
    image: require('../assets/probno_srce.jpg'),
  },
  {
    key: 4,
    name: 'srce',
    image: require('../assets/probno_srce.jpg'),
  },
];

const SubjectScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderItem = ({item}) => <ModelItem itemData={item} />;

  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.headerStyle}>
        <View style={styles.textContainer}>
          <Text style={styles.headerTitleStyle}>Anatomija</Text>
        </View>
        <View style={styles.headerRightContainer}>
          <View style={styles.headerImageContainer}>
            <Image
              style={styles.headerImageStyle}
              source={require('../assets/Anatomija_slika.png')}
            />
          </View>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-around'}}
          data={data}
          numColumns={2}
          renderItem={renderItem}
          style={styles.listStyle}
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
    backgroundColor: '#e9b3bb',
  },
  headerStyle: {
    flex: 0.2,
    flexDirection: 'row',
    backgroundColor: '#f16a7d',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingHorizontal: 5,
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
    width: '75%',
    aspectRatio: 1,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
  },
  headerImageStyle: {
    flex: 1,
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
  },
  listContainer: {
    flex: 0.8,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: '#e9b3bb',
  },
  listStyle: {
    flex: 1,
  },
});

export default SubjectScreen;
