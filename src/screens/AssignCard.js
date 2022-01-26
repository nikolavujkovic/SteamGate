import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import deckConstants from '../constants/deckConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import subjectConstants from '../constants/subjectConstants';
import Icons from '../constants/Icons';
import FastImage from 'react-native-fast-image';
import {useState} from 'react/cjs/react.development';
import Toast from 'react-native-simple-toast';

const {height, width} = Dimensions.get('window');

export default function AssignCard({route, navigation}) {
  const {SID, MID} = route.params;
  const themeColor = subjectConstants[SID].themeColor;
  const [cardState, setCardState] = useState([]);
  const [noToastCurrently, setNoToastCurrently] = useState(true);

  const selectedDeck = JSON.parse(JSON.stringify(deckConstants.playingCards));
  const cardData = Object.keys(selectedDeck).map(key => ({
    ...selectedDeck[key],
    id: key,
  }));

  useEffect(async () => {
    let selectedDeck = JSON.parse(JSON.stringify(deckConstants.playingCards));
    Promise.all(
      Object.keys(selectedDeck).map(async (key, index) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value === null) return null;
          const [recievedSubjectId, recievedModelId] = value.split('|');
          return {recievedSubjectId, recievedModelId};
        } catch (e) {
          console.warn(e);
        }
      }),
    )
      .then(recievedState => {
        console.log(recievedState);
        setCardState(recievedState);
      })
      .catch(e => console.warn(e));
  }, []);

  const renderItem = ({index, item}) => {
    const cardTaken = cardState[index] ? true : false;
    const cardSID = !cardTaken ? '' : cardState[index].recievedSubjectId;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => assignToSelectedCard(item.id)}
        key={index}
        style={[
          styles.cardContainer,
          {
            marginEnd: index % 2 == 0 ? 16 : 0,
            borderColor: cardTaken
              ? subjectConstants[cardSID].themeColor
              : '#ccc',
          },
        ]}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={item.source}
          style={styles.cardImage}
        />
      </TouchableOpacity>
    );
  };

  // this code section is repetitive but w/e no time for clean coding
  const assignToSelectedCard = async CID => {
    let selectedDeck = JSON.parse(JSON.stringify(deckConstants.playingCards));
    let theIndex;
    let newState = JSON.parse(JSON.stringify(cardState));
    let text = 'Karta uspješno dodjeljena';

    Promise.all(
      Object.keys(selectedDeck).map(async (key, index) => {
        if (key === CID) {
          theIndex = index;
          return null;
        }
        try {
          const value = await AsyncStorage.getItem(key);
          if (value === null) return null;
          const [recievedSubjectId, recievedModelId] = value.split('|');

          if (recievedSubjectId === SID && parseInt(recievedModelId) === MID) {
            console.log(CID, 'should delete...');
            await AsyncStorage.removeItem(key);
            newState[index] = null;
            console.log('done once');
          }
        } catch (e) {
          console.warn(e);
        }
      }),
    )
      .then(async () => {
        console.log('done twice');

        try {
          const value = await AsyncStorage.getItem(CID);
          let recievedModelId, recievedSubjectId;
          if (value) {
            const [recievedSubjectId2, recievedModelId2] = value.split('|');
            recievedModelId = recievedModelId2;
            recievedSubjectId = recievedSubjectId2;
          } else {
            recievedModelId = null;
            recievedSubjectId = null;
          }
          if (
            (recievedSubjectId !== SID || parseInt(recievedModelId) !== MID) &&
            recievedModelId &&
            recievedSubjectId
          ) {
            text = 'Vrijednost karte zamjenjena';
          }

          await AsyncStorage.setItem(CID, SID + '|' + MID.toString());
          newState[theIndex] = {
            id: CID,
            recievedModelId: MID,
            recievedSubjectId: SID,
          };

          console.log(`Card ${CID} assigned successfully to ${SID}|${MID}.`);
        } catch (e) {
          console.warn(e);
        }

        setCardState(newState);

        if (noToastCurrently) {
          Toast.show(text, Toast.SHORT);
          setNoToastCurrently(false);
          setTimeout(() => {
            setNoToastCurrently(true);
          }, 1750);
        }
      })
      .catch(e => console.warn(e));
  };

  const onResetPressed = () => {
    Object.keys(selectedDeck).map(async (key, index) => {
      try {
        await AsyncStorage.removeItem(key);
      } catch (e) {
        console.warn(e);
      }
    });

    setCardState([]);
  };

  return (
    <SafeAreaView style={styles.f1}>
      <View style={[styles.header, {backgroundColor: themeColor}]}>
        <Text style={styles.headerText}>Unesite u Špil Znanja</Text>
        <Icons.MaterialCommunityIcons
          name="cards-playing-outline"
          size={40}
          color="white"
        />
      </View>

      <View style={styles.body}>
        <FlatList
          overScrollMode="never"
          columnWrapperStyle={{justifyContent: 'space-around'}}
          data={cardData}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={styles.listStyle}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onResetPressed()}
        style={[
          styles.resetButton,
          // {backgroundColor: subjectConstants[SID].themeColor},
        ]}>
        <Text style={styles.resetButtonText}>Resetujte Špil Znanja</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  f1: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    flex: 1,
    maxHeight: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingLeft: 20,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Sen-Bold',
  },
  body: {
    flex: 1,
  },
  listStyle: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 80,
  },

  cardContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 5,
    borderRadius: 20,
  },
  cardImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 740 / 1040,
    borderRadius: 20,
  },

  resetButton: {
    position: 'absolute',
    width: width * 0.65,
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: '#ccccccf8',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
  },
  resetButtonText: {
    fontFamily: 'Sen-Bold',
    fontSize: 20,
    color: 'black',
  },
});
