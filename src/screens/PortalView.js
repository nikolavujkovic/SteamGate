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

const initText = 'Pomjerajte polako Vaš uređaj...';

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
    this.setState({shouldHide: true});
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );

    setTimeout(() => {
      this.setState({backAllowed: true});
      this.fadeOut();
    }, 1500);
    setTimeout(() => {
      this.setState({ready: true});
    }, 2000);
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const {portalTitle, portalVideoSource} = {
      // ...props,
      portalTitle: 'Neki kul video svemira',
      portalVideoSource: require('../videos/fake.mp4'),
    };

    const toggleVideoPlayback = () => {
      this.setState({isPaused: !this.state.isPaused});
    };
    const toggleVideoSound = () => {
      this.setState({isMuted: !this.state.isMuted});
    };

    const ARSCENE = () => (
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
            paused={this.state.isPaused}
            muted={this.state.isMuted}
            // volume={videoVolume}
            source={portalVideoSource}
          />
        </ViroPortalScene>
      </ViroARScene>
    );

    return this.state.shouldHide ? null : (
      <>
        <ViroARSceneNavigator autofocus initialScene={{scene: ARSCENE}} />
        <Text style={styles.title}>{this.state.titleText}</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.backAction()}
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
});

export default function (props) {
  const navigation = useNavigation();
  return <PortalViewClass navigation={navigation} />;
}
