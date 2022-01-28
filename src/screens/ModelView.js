import React, {Component} from 'react';
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
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
  ViroAnimations,
} from '@viro-community/react-viro';
import Icons from '../constants/Icons';
import modelConstants from '../constants/modelConstants';
import subjectConstants from '../constants/subjectConstants';

class ModelView extends Component {
  //FIXME: MODEL RESOURCES CANT BE OF THE SAME NAME
  // fix shadow
  //TODO: add rotation and postition parameters but with default values
  // make it invisible until it finds an anchor

  state = {
    shouldHide: false,
    backAllowed: false,
    selectedAnimationId: 0,
    specialAnimationRunning: false,
    specialAnimationName: '',
    runAnimation: true,
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
    };

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
        onTrackingUpdated={() => {
          console.log('tracking...');
        }}>
        <GroundComponent>
          {shadowVisible && (
            <ViroSpotLight
              innerAngle={5}
              outerAngle={25}
              direction={[0, -1, -0.2]}
              position={[0, 3, 1]}
              color="#000"
              castsShadow={true}
              shadowMapSize={2048}
              shadowNearZ={2}
              shadowFarZ={5}
              shadowOpacity={1}
            />
          )}

          <ViroAmbientLight color="#fff" />
          <Viro3DObject
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
        <Text style={styles.title}>{modelTitle}</Text>
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
