import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import {Dimensions} from 'react-native';
import Data from '../constants/subjectConstants';

import FastImage from 'react-native-fast-image';
import SubjectItem from '../components/SubjectItem';

const dataArr = Object.keys(Data).map(key => Data[key]);

const ModelHub = () => {
  
  const renderItem = ({item}) => <SubjectItem itemData={item} />;

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View style={styles.headerStyle}>
        <Text style={styles.titleStyle}>
          Dobrodošli u <Text style={{color: '#462D8C'}}>Steam</Text>
          <Text style={{color: '#8CE4FC'}}>Gate</Text>!
        </Text>
        <Text style={styles.descriptionStyle}>
          Pronađite modele koji Vas interesuju i otkrijte 3D svijet nauke!
        </Text>
      </View>
      <View style={styles.bodyStyle}>
        <FastImage
          source={require('../assets/backgroundImages/modelHubBackground.jpg')}
          style={styles.listContainer}>
          <FlatList
            contentContainerStyle={styles.listStyle}
            data={dataArr}
            renderItem={renderItem}
            keyExtractor={item => item.subjectId}
          />
        </FastImage>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#8CE4FC',
  },
  headerStyle: {
    flex: 0.35,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 40,
  },
  titleStyle: {
    fontSize: 50,
    color: '#202020',
    marginTop: 20,
  },
  descriptionStyle: {
    fontSize: 20,
    color: '#404040',
    marginTop: 15,
  },
  bodyStyle: {
    flex: 0.65,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  listContainer: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: 40,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  listStyle: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 80,
  },
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

export default ModelHub;
