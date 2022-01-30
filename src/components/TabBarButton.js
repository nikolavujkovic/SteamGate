import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {playSound} from '../components/AppSound';
import Sound from 'react-native-sound';
import dingS from '../assets/sounds/bottomTabSound.mp3';
Sound.setCategory('Playback');
let SOUNDlol = new Sound(dingS);

//TODO: export colors to constants

export default function TabBarButton(props) {
  const {item, onPress, accessibilityState} = {...props};
  const focused = accessibilityState.selected;

  const [startup, setStartup] = useState(true);

  const viewRef = useRef(null);
  useEffect(() => {
    if (!startup) {
      if (focused) {
        viewRef.current.animate({
          0: {rotate: '0deg', scale: 0.9},
          1: {rotate: '360deg', scale: 1.3},
        });
      } else {
        viewRef.current.animate({
          0: {rotate: '360deg', scale: 1.3},
          1: {rotate: '0deg', scale: 0.9},
        });
      }
    } else {
      setStartup(false);
      if (focused) {
        viewRef.current.animate({0: {scale: 1.3}, 1: {scale: 1.3}});
      } else {
        viewRef.current.animate({0: {scale: 0.9}, 1: {scale: 0.9}});
      }
    }
  }, [focused]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => {
        playSound(SOUNDlol, -0.3);
        onPress();
      }}>
      <Animatable.View style={styles.container} ref={viewRef} duration={1000}>
        <item.type
          name={focused ? item.activeIcon : item.inactiveIcon}
          size={32}
          color={focused ? 'black' : 'gray'}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
