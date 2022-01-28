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
    selectedAstro:
      Math.floor(Math.random() * 23) === 22 ? 3 : Math.floor(Math.random() * 3),
    fadeAnim: new Animated.Value(1),
    selectedAnimationId: 0,
    markerArrayState: [],

    specialAnimationRunning: false,
    specialAnimations: null,
    specialAnimationName: '',
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
      selectedAstro:
        Math.floor(Math.random() * 23) === 22
          ? 3
          : Math.floor(Math.random() * 3),
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

  addSpecialAnimations = (subjectId, modelId) => {
    const spec = modelConstants[subjectId][modelId].specialAnimations;
    return spec;
  };

  setArState = markerArr => {
    this.setState({anyCardsAssigned: markerArr.length > 0 ? true : false});

    this.setState({
      ARSCENEchildren: markerArr.map((item, index) => {
        console.log('item', item);
        const scaleDivider = item.scaleDivider ? item.scaleDivider : 1;
        let newPositionArray = [...item.positionArray];
        newPositionArray[1] = newPositionArray[1] + 0.05;

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

                if (item.specialAnimations)
                  this.setState({
                    specialAnimations: item.specialAnimations,
                  });

                // this.setState({onlyVisible: item.modelTarget});
              }}>
              <Viro3DObject
                position={item.onGround ? item.positionArray : newPositionArray}
                source={item.modelSource}
                resources={item.modelResourcesArr}
                scale={[
                  item.modelScale / scaleDivider,
                  item.modelScale / scaleDivider,
                  item.modelScale / scaleDivider,
                ]}
                type={item.modelType}
                rotation={item.rotationArray}
                animation={
                  item.animationName
                    ? {
                        name: this.state.specialAnimationRunning
                          ? this.state.specialAnimationName
                          : item.animationName[this.state.selectedAnimationId],
                        run: true,
                        loop: true,
                        onFinish: () => {
                          this.setState(
                            {
                              specialAnimationRunning: false,
                              specialAnimationName: '',
                              selectedAnimationId:
                                this.state.selectedAnimationId + 1 >
                                item.animationName.length - 1
                                  ? 0
                                  : this.state.selectedAnimationId + 1,
                            },
                            () => {
                              let clonedArray = JSON.parse(
                                JSON.stringify(this.state.markerArrayState),
                              );
                              console.log('CLONED MARKER STATE:', clonedArray);
                              this.setArState(clonedArray); // more performace efficient way);
                            },

                            // this.arRender();
                          );
                        },
                      }
                    : null
                }
              />
            </ViroARImageMarker>
          );
        }
      }),
    });

    const newARSCENE = () => (
      <ViroARScene>
        <ViroAmbientLight color="#ffffff" />
        {this.state.ARSCENEchildren}
      </ViroARScene>
    );
    this.setState({
      ARSCENE: (
        <ViroARSceneNavigator autofocus initialScene={{scene: newARSCENE}} />
      ),
    });
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
        scaleDivider: modelConstants[subjectId][modelId].scaleDivider,
        animationName: modelConstants[subjectId][modelId].animationName,
        onGround: modelConstants[subjectId][modelId].onGround,
        rotationArray: modelConstants[subjectId][modelId].modelRotationArray,
        positionArray: modelConstants[subjectId][modelId].cardPositionArray
          ? modelConstants[subjectId][modelId].cardPositionArray
          : modelConstants[subjectId][modelId].modelPositionArray
          ? modelConstants[subjectId][modelId].modelPositionArray
          : [0, 0, 0],
        specialAnimations: modelConstants[subjectId][modelId].specialAnimations
          ? this.addSpecialAnimations(subjectId, modelId)
          : null,
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

        this.setState({markerArrayState: markerArr});
        this.setArState(markerArr);

        console.log('ARSCENEchildren:', this.state.ARSCENEchildren);
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
      this.setState({backAllowed: true});
      this.fadeOut();
    }, 3000);
    setTimeout(() => {
      this.setState({ready: true});
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
    const logArray = ['pizzaaaa', 'soupppp', 'buuuurger', 'SUSHIIII'];
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

        {this.state.specialAnimations && (
          <View style={styles.functionButtonsContainer}>
            {this.state.specialAnimations.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => {
                  this.setState(
                    {
                      specialAnimationRunning: true,
                      specialAnimationName: item.name,
                    },
                    () => {
                      let clonedArray = JSON.parse(
                        JSON.stringify(this.state.markerArrayState),
                      );
                      console.log('CLONED MARKER STATE:', clonedArray);
                      this.setArState(clonedArray); // more performace efficient way);
                    },
                  );

                  // this.arRender();
                }}
                style={[
                  styles.functionButton,
                  {
                    backgroundColor:
                      this.state.specialAnimationName === item.name
                        ? '#462D8C'
                        : 'white',
                  },
                ]}>
                <Icons.MaterialCommunityIcons
                  name={item.icon}
                  size={28}
                  color={
                    this.state.specialAnimationName === item.name
                      ? 'white'
                      : 'black'
                  }
                />
              </TouchableOpacity>
            ))}
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
    marginHorizontal: 20,
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

  functionButtonsContainer: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
  },
  functionButton: {
    borderRadius: 100,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
});

export default function (props) {
  const navigation = useNavigation();
  return <DeckView navigation={navigation} />;
}
