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
  ViroARCamera,
} from '@viro-community/react-viro';
import Icons from '../constants/Icons';

export default function ModelView({navigation}) {
  //FIXME: MODEL RESOURCES CANT BE OF THE SAME NAME
  // fix shadow and add plane support
  //TODO: add rotation and postition parameters but with default values
  // make it invisible until it finds an anchor
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
    // ...props
    shadowVisible: false,
    onGround: false,
    modelScale:
      // 0.01
      0.003,
    modelSource: require('../../dummies/dummyAR/scene.gltf'),
    modelType: 'GLTF',
    modelResourcesArr: [
      require('../../dummies/dummyAR/sceneB.bin'),
      require('../../dummies/dummyAR/mat0_0_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_1_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_2_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_3_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_4_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_5_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_6_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_7_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_8_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_9_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_10_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_11_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_12_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_13_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_14_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_15_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_16_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_17_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_20_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_21_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_22_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_23_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_24_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_25_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_26_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_27_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_28_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_29_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_30_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_31_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_32_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_33_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_34_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_35_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_36_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_37_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_38_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_39_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_40_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_41_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_42_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_43_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_44_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_45_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_46_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_47_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_48_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_49_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_50_baseColor.jpg'),
      require('../../dummies/dummyAR/mat0_baseColor.jpg'),
    ],
    modelPositionArray: [0, 0, -0.5],
    modelRotationArray:
      // [0, 30, -60]
      [0, 0, 0],
    modelTitle: 'Bazalne ganglije',
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

  const ARSCENE = () => (
    <ViroARScene
      onTrackingUpdated={() => {
        console.log('tracking...');
      }}>
      {/* <ViroARPlane minHeight={0.5} minWidth={0.5} alignment={'Horizontal'}> */}
      <ViroAmbientLight color="#fff" />

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

      <Viro3DObject
        position={modelPositionArray}
        rotation={modelRotationArray}
        source={modelSource}
        resources={modelResourcesArr}
        scale={[modelScale, modelScale, modelScale]}
        type={modelType}
      />

      {/* </ViroARPlane> */}
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
