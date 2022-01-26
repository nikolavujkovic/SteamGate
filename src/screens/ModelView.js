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
} from '@viro-community/react-viro';
import Icons from '../constants/Icons';
import modelConstants from '../constants/modelConstants';

class ModelView extends Component {
  //FIXME: MODEL RESOURCES CANT BE OF THE SAME NAME
  // fix shadow
  //TODO: add rotation and postition parameters but with default values
  // make it invisible until it finds an anchor

  state = {
    shouldHide: false,
    backAllowed: false,
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
    };

    const GroundComponent = props => {
      if (onGround) {
        return (
          <ViroARPlane minHeight={0.5} minWidth={0.5} alignment={'Horizontal'}>
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
            // animation={{name: 'Take 001', run: true, loop: true, delay: 0}}
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
});

export default function (props) {
  const navigation = useNavigation();
  return <ModelView route={props.route} navigation={navigation} />;
}
