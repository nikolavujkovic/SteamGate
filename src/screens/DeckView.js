import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Animated,
} from 'react-native';
import React, {Component} from 'react';
import {
  ViroARScene,
  Viro3DObject,
  ViroAmbientLight,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroARSceneNavigator,
} from '@viro-community/react-viro';
import Icons from '../constants/Icons';
import deckConstants from '../constants/deckConstants';
import modelConstants from '../constants/modelConstants';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeckLoading from '../components/DeckLoading';

const initText = ['Skenirajte kartu...'];
const scaleDivider = 5;

class DeckView extends Component {
  state = {
    shouldHide: false,
    foundModelTitle: initText,
    onlyVisible: null,
    anyCardsAssigned: true,
    ARSCENEchildren: null,
    backAllowed: false,
    ARSCENE: null,
    ready: false,
    selectedAstro: Math.floor(Math.random() * 2),
    fadeAnim: new Animated.Value(1),
  };

  backAction = () => {
    if (!this.state.backAllowed) return true;
    this.setState({shouldHide: true});
    this.props.navigation.goBack();
    return true;
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  refreshHandler = () => {
    this.setState({
      ARSCENE: null,
      onlyVisible: null,
      foundModelTitle: initText,
      ready: false,
      backAllowed: false,
      selectedAstro: Math.floor(Math.random() * 2),
      fadeAnim: new Animated.Value(1),
    });

    setTimeout(() => {
      this.setState({backAllowed: true});
      this.fadeOut();
    }, 5000);
    setTimeout(() => {
      this.setState({ready: true});
    }, 5500);

    this.arRender();

    console.log('Refreshed!');
  };

  getItemFromId = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return {subjectId: undefined, modelId: undefined};
      const [recievedSubjectId, recievedModelId] = value.split('|');
      console.log(
        `There is a card in memory with IDs: ${recievedSubjectId} and ${recievedModelId}`,
      );
      return {subjectId: recievedSubjectId, modelId: recievedModelId};
    } catch (e) {
      console.warn(e);
    }
  };

  arRender = () => {
    let selectedDeck = JSON.parse(JSON.stringify(deckConstants.playingCards));

    const doSmthAsync = async (key, index) => {
      const {subjectId, modelId} = await this.getItemFromId(key);

      // console.log('current', key, subjectId, modelId);
      if (!subjectId || !modelId) return null;

      return {
        modelTarget: key,
        modelSource: modelConstants[subjectId][modelId].modelSource,
        modelResourcesArr: modelConstants[subjectId][modelId].modelResourcesArr,
        modelScale: modelConstants[subjectId][modelId].modelScale,
        modelType: modelConstants[subjectId][modelId].modelType,
        modelTitle: modelConstants[subjectId][modelId].modelTitle,
      };
    };

    let markerArrFUNCTION = async () => {
      return Promise.all(
        Object.keys(selectedDeck).map((key, index) => doSmthAsync(key, index)),
      );
    };

    markerArrFUNCTION()
      .then(markerArrWithNull => {
        const markerArr = markerArrWithNull.filter(marker => marker);

        this.setState({anyCardsAssigned: markerArr.length > 0 ? true : false});

        console.log(markerArr);
        console.log(`User has assigned ${markerArr.length} cards.`);
        console.log('Triggered marker:', this.state.onlyVisible);

        this.setState({
          ARSCENEchildren: markerArr.map((item, index) => {
            console.log('test');
            if (
              item != null
              // && //THIS MAY IMPROVE PERFORMANCE SO ITS JUST A "just-in-case feature"
              // (item.modelTarget == this.state.onlyVisible ||
              //   this.state.onlyVisible == null)
            ) {
              return (
                <ViroARImageMarker
                  key={index}
                  target={item.modelTarget}
                  onAnchorFound={() => {
                    console.log('ANCHOR FOUND BBY');
                    this.setState(
                      this.state.foundModelTitle === initText
                        ? {foundModelTitle: [item.modelTitle]}
                        : {
                            foundModelTitle: [
                              ...new Set([
                                ...this.state.foundModelTitle,
                                item.modelTitle,
                              ]),
                            ],
                          },
                    );
                    this.setState({onlyVisible: item.modelTarget});
                  }}>
                  <Viro3DObject
                    position={[0, 0, -0.03]}
                    source={item.modelSource}
                    resources={item.modelResourcesArr}
                    scale={[
                      item.modelScale / scaleDivider,
                      item.modelScale / scaleDivider,
                      item.modelScale / scaleDivider,
                    ]}
                    type={item.modelType}
                  />
                </ViroARImageMarker>
              );
            }
          }),
        });

        console.log('ARSCENEchildren:', this.state.ARSCENEchildren);
        const newARSCENE = () => (
          <ViroARScene>
            <ViroAmbientLight color="#ffffff" />
            {this.state.ARSCENEchildren}
          </ViroARScene>
        );
        this.setState({
          ARSCENE: (
            <ViroARSceneNavigator
              autofocus
              initialScene={{scene: newARSCENE}}
            />
          ),
        });
      })
      .catch(e => {
        console.warn(e);
      });
  };

  componentDidMount() {
    console.log('Component will mount');
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );

    setTimeout(() => {
      this.setState({backAllowed: true, ready: true});
      this.fadeOut();
    }, 3000);
    setTimeout(() => {
      this.setState({backAllowed: true});
    }, 3500);

    this.arRender();

    console.log('Component did mount');
  }

  componentWillUnmount() {
    this.setState({shouldHide: true});
    this.backHandler.remove();
    console.log('component unmounted called');
  }

  render() {
    const logArray = ['pizzaaaa', 'soupppp', 'buuuurger'];
    console.log(logArray[this.state.selectedAstro]);
    //// AR stuff onwards

    let selectedDeck = JSON.parse(JSON.stringify(deckConstants.playingCards));
    ViroARTrackingTargets.createTargets(selectedDeck);

    if (this.state.ARSCENE === null) console.log('ARSCENE IS NULL');

    return this.state.shouldHide ? null : (
      <>
        {this.state.ARSCENE}
        <Text style={styles.title}>
          {this.state.foundModelTitle.reduce(
            (prev, curr) => (prev = prev + ' | ' + curr),
          )}
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.refreshHandler()}
            style={styles.refreshButton}>
            <Icons.MaterialCommunityIcons
              name="refresh"
              size={28}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.backAction()}
            style={styles.backButton}>
            <Icons.AntDesign name="arrowleft" size={16} color="black" />
            <Text style={styles.backButtonText}>Nazad</Text>
          </TouchableOpacity>
        </View>

        {!this.state.anyCardsAssigned && (
          <View style={styles.error}>
            {/* hardcode af but works well */}
            <Text style={styles.errorText}>
              Dodjelite modele nekim kartama,
            </Text>
            <Text
              style={[
                styles.errorText,
                {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  paddingHorizontal: 10,
                  paddingTop: 0,
                  // marginTop: -3,
                },
              ]}>
              pa se vratite kasnije!
            </Text>
          </View>
        )}

        {!this.state.ready && (
          <Animated.View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: this.state.fadeAnim,
            }}>
            <DeckLoading selected={this.state.selectedAstro} />
          </Animated.View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    top: 26,
    alignSelf: 'center',
    fontSize: 18,
    backgroundColor: 'white',
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 16,
    fontFamily: 'Sen-Regular',
  },
  backButton: {
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 18,
    marginLeft: 5,
    fontFamily: 'Sen-Regular',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  refreshButton: {
    borderRadius: 100,
    padding: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'flex-end',
  },

  error: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  errorText: {
    fontFamily: 'Sen-Bold',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#cccccc80',
    borderRadius: 20,
    padding: 7.5,
  },
});

export default function (props) {
  const navigation = useNavigation();
  return <DeckView navigation={navigation} />;
}
