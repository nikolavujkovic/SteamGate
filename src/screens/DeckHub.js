import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function DeckHub({navigation}) {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{position: 'absolute', right: 0, bottom: 150}}
        onPress={() => navigation.navigate('DeckView')}>
        <Text>helloooooooooo</Text>
      </TouchableOpacity>
    </View>
  );
}
