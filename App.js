import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {ModelHub, PortalHub, DeckHub} from './src/screens';

const Stack = createStackNavigator();

const ModelStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ModelHub" component={ModelHub} />
    </Stack.Navigator>
  );
};

const PortalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PortalHub" component={PortalHub} />
    </Stack.Navigator>
  );
};

const DeckStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DeckHub" component={DeckHub} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Models" component={ModelStack} />
        <Tab.Screen name="Portals" component={PortalStack} />
        <Tab.Screen name="Deck" component={DeckStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
