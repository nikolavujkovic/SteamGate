import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ViroARSceneNavigator,
  ViroARScene,
  Viro3DObject,
  ViroPortal,
  ViroPortalScene,
  Viro360Video,
  ViroAmbientLight,
  ViroConstants,
} from '@viro-community/react-viro';
import Icons from '../constants/Icons';
import PortalLoading from '../components/PortalLoading';
import portalConstants from '../constants/portalConstants';

import {playSound} from '../components/AppSound';
import Sound from 'react-native-sound';
import dingS from '../assets/sounds/portalSound.mp3';
Sound.setCategory('Playback');
let SOUNDlol = new Sound(dingS);

import dingS2 from '../assets/sounds/functionPressed.mp3';
Sound.setCategory('Playback');
let FUNCTIONlol = new Sound(dingS2);

import dingS3 from '../assets/sounds/buttonPressed.mp3';
Sound.setCategory('Playback');
let BUTTONlol = new Sound(dingS3);

import dingS4 from '../assets/sounds/errorSoundBAD.mp3';
Sound.setCategory('Playback');
let ERRORlol = new Sound(dingS4);

const initText = 'Pomjerajte polako uređaj...'; //this means Move the device slowly
const errorText =
  'Prekoračenje memorije! Ukoliko se portali ne prikazuju, molimo Vas restartujte aplikaciju i pokušajte ponovo!';

class PortalViewClass extends Component {
  state = {
    isPaused: false,
    isMuted: false,
    shouldHide: false,
    backAllowed: false,
    portalVisible: false,
    titleText: initText,
    ready: false,
    fadeAnim: new Animated.Value(1),
    selectedAstro: Math.floor(Math.random() * 3),
    ARSCENE: null,
    error: false,
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  backAction = () => {
    if (!this.state.backAllowed) return true;

    playSound(BUTTONlol);

    this.setState({
      shouldHide: true,
      ARSCENE: null,
    });
    this.props.navigation.pop();

    return true;
  };

  displayErrorMessage = e => {
    console.log(e.nativeEvent.error);
    setTimeout(() => playSound(ERRORlol), 1000);
    this.setState({error: true});
  };

  shouldPause = (a, b) => {
    console.log('should pause:', a || !b);
    return a || !b;
  };

  newARSCENE = (portalTitle, portalVideoSource, portalVolume) => () =>
    (
      <ViroARScene
        onTrackingUpdated={t => {
          console.log('t', t);
          t === ViroConstants.TRACKING_UNAVAILABLE
            ? this.setState({titleText: initText, portalVisible: false})
            : this.setState({titleText: portalTitle, portalVisible: true});
        }}>
        <ViroAmbientLight color="#fff" />
        <ViroPortalScene passable={true}>
          <ViroPortal
            visible={this.state.portalVisible}
            position={[0, 0, -1]}
            scale={[0.2, 0.2, 0.2]}>
            <Viro3DObject
              source={require('../models/ViroPortal/portal_archway.vrx')}
              resources={[
                require('../models/ViroPortal/portal_archway_diffuse.png'),
                require('../models/ViroPortal/portal_archway_normal.png'),
                require('../models/ViroPortal/portal_archway_specular.png'),
                require('../models/ViroPortal/portal_entry.png'),
              ]}
              type="VRX"
            />
          </ViroPortal>

          <Viro360Video
            loop
            paused={this.shouldPause(
              this.state.isPaused,
              this.state.portalVisible,
            )}
            muted={this.state.isMuted}
            volume={portalVolume}
            source={portalVideoSource}
            onError={e => this.displayErrorMessage(e)}
          />
        </ViroPortalScene>
      </ViroARScene>
    );

  componentDidMount() {
    playSound(SOUNDlol);

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );

    const {portalTitle, portalVideoSource, portalVolume} = {
      // ...props,
      portalTitle: portalConstants[this.props.portalId].portalName,
      portalVideoSource: portalConstants[this.props.portalId].portalSource,
      portalVolume: portalConstants[this.props.portalId].portalVolume
        ? portalConstants[this.props.portalId].portalVolume
        : 1,
    };

    console.log('THE PASSED SOURCE', portalVideoSource);
    const AR = this.newARSCENE(portalTitle, portalVideoSource, portalVolume);
    this.setState({ARSCENE: AR});

    setTimeout(() => {
      this.setState({backAllowed: true});
      this.fadeOut();
    }, 1500);
    setTimeout(() => {
      this.setState({ready: true});
    }, 2000);
  }

  componentWillUnmount() {
    console.log('unmounted');
    this.setState({shouldHide: true});
    this.backHandler.remove();
  }

  render() {
    const toggleVideoPlayback = () => {
      playSound(FUNCTIONlol);
      this.setState({isPaused: !this.state.isPaused});
    };
    const toggleVideoSound = () => {
      playSound(FUNCTIONlol);
      this.setState({isMuted: !this.state.isMuted});
    };

    return this.state.shouldHide ? null : (
      <>
        {this.state.ARSCENE && (
          <ViroARSceneNavigator
            autofocus
            initialScene={{scene: this.state.ARSCENE}}
          />
        )}
        <Text style={styles.title}>{this.state.titleText}</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            this.backAction();
          }}
          style={styles.backButton}>
          <Icons.AntDesign name="arrowleft" size={16} color="black" />
          <Text style={styles.backButtonText}>Nazad</Text>
        </TouchableOpacity>

        <View style={styles.functionButtonsContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => toggleVideoPlayback()}
            style={styles.functionButton}>
            <Icons.Entypo
              name={this.state.isPaused ? 'controller-play' : 'controller-paus'}
              size={28}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => toggleVideoSound()}
            style={styles.functionButton}>
            <Icons.MaterialCommunityIcons
              name={this.state.isMuted ? 'volume-mute' : 'volume-high'}
              size={28}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {this.state.error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorText}</Text>
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
            <PortalLoading selected={this.state.selectedAstro} />
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
    position: 'absolute',
    bottom: 16,
    right: 16,
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

  functionButtonsContainer: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
  },
  functionButton: {
    borderRadius: 100,
    padding: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  errorContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  errorText: {
    opacity: 0.7,
    position: 'absolute',
    fontFamily: 'Sen-Bold',
    color: 'red',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 30,
    fontSize: 18,
    textAlign: 'center',
    marginTop: '15%',
    bottom: 75,
  },
});

export default function ({route}) {
  const navigation = useNavigation();
  return (
    <PortalViewClass navigation={navigation} portalId={route.params.portalId} />
  );
}
