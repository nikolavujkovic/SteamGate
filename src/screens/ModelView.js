import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
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

export default function ModelView({route, navigation}) {
  //FIXME: MODEL RESOURCES CANT BE OF THE SAME NAME
  // fix shadow and add plane support
  //TODO: add rotation and postition parameters but with default values
  // make it invisible until it finds an anchor

  const SID = route.params.subjectId;
  const MID = route.params.modelId;

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
    modelPositionArray: [0, 0, -0.5],
    modelRotationArray:
      // [0, 30, -60]
      [0, 0, 0],
    modelTitle: modelConstants[SID][MID].modelTitle,
  };

  const [shouldHide, setShouldHide] = useState(false);

  useFocusEffect(() => {
    setShouldHide(false);
    return () => {
      setShouldHide(true);
    };
  });

  const backAction = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

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
        <ViroAmbientLight color="#fff" />

        <Viro3DObject
          position={modelPositionArray}
          rotation={modelRotationArray}
          source={modelSource}
          resources={modelResourcesArr}
          scale={[modelScale, modelScale, modelScale]}
          type={modelType}
        />

        {shadowVisible && (
          <>
            <ViroSpotLight
              innerAngle={5}
              outerAngle={25}
              direction={[0, -1, -0.2]}
              position={[0, 3, 1]}
              color="#444"
              castsShadow={true}
              shadowMapSize={2048}
              shadowNearZ={2}
              shadowFarZ={5}
              shadowOpacity={0.3}
            />

            <ViroQuad
              position={[0, 0, -6]}
              rotation={[-90, 0, 0]}
              width={4}
              height={4}
              arShadowReceiver={true}
            />
          </>
        )}
      </GroundComponent>
    </ViroARScene>
  );

  return shouldHide ? null : (
    <>
      <ViroARSceneNavigator autofocus initialScene={{scene: ARSCENE}} />
      <Text style={styles.title}>{modelTitle}</Text>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => backAction()}
        style={styles.backButton}>
        <Icons.AntDesign name="arrowleft" size={16} color="black" />
        <Text style={styles.backButtonText}>Nazad</Text>
      </TouchableOpacity>
    </>
  );
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
