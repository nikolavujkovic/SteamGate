import React, {Component} from 'react';
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroAmbientLight,
  ViroSpotLight,
  ViroQuad,
  Viro3DObject,
  ViroARPlane,
  ViroMaterials,
  ViroConstants,
} from '@viro-community/react-viro';
import Icons from '../constants/Icons';
import modelConstants from '../constants/modelConstants';
import subjectConstants from '../constants/subjectConstants';
import ModelLoading from '../components/ModelLoading';

const initText = 'Pomjerajte polako Vaš uređaj...';

class ModelView extends Component {
  // fix shadow

  state = {
    shouldHide: false,
    backAllowed: false,
    selectedAnimationId: 0,
    specialAnimationRunning: false,
    specialAnimationName: '',
    runAnimation: true,
    modelVisible: false,
    titleText: initText,
    ready: false,
    fadeAnim: new Animated.Value(1),
    selectedAstro: Math.floor(Math.random() * 3),
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
    const SID = this.props.route.params.subjectId;
    const MID = this.props.route.params.modelId;

    const {
      modelResourcesArr,
      modelScale,
      modelSource,
      modelType,
      shadowVisible,
      onGround,
      modelPositionArray,
      modelRotationArray,
      modelTitle,
      animationName,
      specialAnimations,
      extraLight,
    } = {
      shadowVisible: modelConstants[SID][MID].shadowVisible,
      onGround: modelConstants[SID][MID].onGround,
      modelScale: modelConstants[SID][MID].modelScale,
      modelSource: modelConstants[SID][MID].modelSource,
      modelType: modelConstants[SID][MID].modelType,
      modelResourcesArr: modelConstants[SID][MID].modelResourcesArr,
      modelPositionArray: modelConstants[SID][MID].modelPositionArray
        ? modelConstants[SID][MID].modelPositionArray
        : [0, 0, -0.5],
      modelRotationArray: modelConstants[SID][MID].modelRotationArray
        ? modelConstants[SID][MID].modelRotationArray
        : [0, 0, 0],
      modelTitle: modelConstants[SID][MID].modelTitle,
      animationName: modelConstants[SID][MID].animationName
        ? modelConstants[SID][MID].animationName
        : null,
      specialAnimations: modelConstants[SID][MID].specialAnimations
        ? modelConstants[SID][MID].specialAnimations
        : null,
      extraLight: modelConstants[SID][MID].extraLight
        ? modelConstants[SID][MID].extraLight
        : false,
    };

    let spotlightPositionArray = [...modelPositionArray];
    spotlightPositionArray[0] -= 2;
    spotlightPositionArray[1] += 3;
    spotlightPositionArray[2] += 3;

    const GroundComponent = props => {
      if (onGround) {
        return (
          <ViroARPlane minHeight={1} minWidth={1} alignment={'Horizontal'}>
            {props.children}
          </ViroARPlane>
        );
      } else return <>{props.children}</>;
    };

    const ARSCENE = () => (
      <ViroARScene
        onTrackingUpdated={t => {
          console.log('t', t);
          t === ViroConstants.TRACKING_UNAVAILABLE
            ? this.setState({titleText: initText, modelVisible: false})
            : this.setState({titleText: modelTitle, modelVisible: true});
        }}>
        <GroundComponent>
          {shadowVisible && (
            <ViroSpotLight
              innerAngle={30}
              outerAngle={90}
              direction={[0.3, -0.8, -0.5]}
              position={spotlightPositionArray}
              color="#fff"
              castsShadow={true}
              shadowMapSize={2048}
              shadowNearZ={2}
              shadowFarZ={5}
              shadowOpacity={extraLight ? 0.75 : 0.2}
              intensity={extraLight ? 2000 : 100}
            />
          )}

          <ViroAmbientLight
            color="#fff"
            intensity={shadowVisible ? (extraLight ? 700 : 75) : 1000}
          />

          <Viro3DObject
            visible={this.state.modelVisible}
            position={onGround ? undefined : modelPositionArray}
            rotation={modelRotationArray}
            source={modelSource}
            resources={modelResourcesArr}
            scale={[modelScale, modelScale, modelScale]}
            type={modelType}
            animation={
              animationName
                ? {
                    name: this.state.specialAnimationRunning
                      ? this.state.specialAnimationName
                      : animationName[this.state.selectedAnimationId],
                    run: true,
                    loop: true,
                    onFinish: () =>
                      this.setState({
                        specialAnimationRunning: false,
                        specialAnimationName: '',
                        selectedAnimationId:
                          this.state.selectedAnimationId + 1 >
                          animationName.length - 1
                            ? 0
                            : this.state.selectedAnimationId + 1,
                      }),
                  }
                : null
            }
          />

          {shadowVisible && (
            <ViroQuad
              rotation={[-90, 0, 0]}
              width={10}
              height={10}
              arShadowReceiver={true}
            />
          )}
        </GroundComponent>
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

        {specialAnimations && (
          <View style={styles.functionButtonsContainer}>
            {specialAnimations.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => {
                  this.setState({
                    specialAnimationRunning: true,
                    specialAnimationName: item.name,
                  });
                }}
                style={[
                  styles.functionButton,
                  {
                    backgroundColor:
                      this.state.specialAnimationName === item.name
                        ? subjectConstants[SID].themeColor
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
            <ModelLoading selected={this.state.selectedAstro} />
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
    textAlign: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
});

export default function (props) {
  const navigation = useNavigation();
  return <ModelView route={props.route} navigation={navigation} />;
}
