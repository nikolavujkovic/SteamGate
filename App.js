import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {ModelHub, PortalHub, DeckHub} from './src/screens';

const Stack = createStackNavigator();

const ModelStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="ModelHub"
        component={ModelHub}
      />
    </Stack.Navigator>
  );
};

const PortalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="PortalHub"
        component={PortalHub}
      />
    </Stack.Navigator>
  );
};

const DeckStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="DeckHub"
        component={DeckHub}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{headerShown: false}}
          name="Models"
          component={ModelStack}
        />
        <Tab.Screen
          options={{headerShown: false}}
          name="Portals"
          component={PortalStack}
        />
        <Tab.Screen
          options={{headerShown: false}}
          name="Deck"
          component={DeckStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
