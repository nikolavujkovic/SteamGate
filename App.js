import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AppLoading from './src/components/AppLoading';
import {Animated} from 'react-native';

import {
  ModelHub,
  SubjectScreen,
  PortalHub,
  DeckHub,
  ModelScreen,
  ModelView,
  PortalView,
  DeckView,
  AssignCard,
} from './src/screens';
import Icons from './src/constants/Icons';
import TabBarButton from './src/components/TabBarButton';

const Stack = createStackNavigator();

const ModelStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ModelHub" component={ModelHub} />
      <Stack.Screen name="SubjectScreen" component={SubjectScreen} />
      <Stack.Screen name="ModelScreen" component={ModelScreen} />
      <Stack.Screen name="PortalHub" component={PortalHub} />
    </Stack.Navigator>
  );
};

const PortalStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PortalHub" component={PortalHub} />
    </Stack.Navigator>
  );
};

const DeckStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DeckHub" component={DeckHub} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

//TODO: icon and tab bar sizes need to be responsive maybe

const TabArr = [
  {
    route: 'Models',
    name: 'Models',
    type: Icons.Feather,
    activeIcon: 'codesandbox',
    inactiveIcon: 'box',
    component: ModelStack,
  },

  {
    route: 'Portals',
    name: 'Portals',
    type: Icons.Ionicons,
    activeIcon: 'planet',
    inactiveIcon: 'planet-outline',
    component: PortalStack,
  },

  {
    route: 'Deck',
    name: 'Deck',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'cards-playing-outline',
    inactiveIcon: 'cards-outline',
    component: DeckStack,
  },
];

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 60,
        position: 'absolute',
        bottom: 12,
        right: 12,
        left: 12,
        borderRadius: 16,
      },
    }}>
    {TabArr.map((item, index) => {
      return (
        <Tab.Screen
          key={index}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => <TabBarButton {...props} item={item} />,
          }}
          name={item.route}
          component={item.component}
        />
      );
    })}
  </Tab.Navigator>
);

export default () => {
  const [initVisible, setInitVisible] = useState(true);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  setTimeout(() => {
    setInitVisible(false);
  }, 3000);
  setTimeout(() => {
    fadeOut();
  }, 2500);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="ModelView" component={ModelView} />
          <Stack.Screen name="PortalView" component={PortalView} />
          <Stack.Screen name="DeckView" component={DeckView} />
          <Stack.Screen name="AssignCard" component={AssignCard} />
        </Stack.Navigator>
      </NavigationContainer>

      {initVisible && (
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: fadeAnim,
          }}>
          <AppLoading />
        </Animated.View>
      )}
    </>
  );
};
