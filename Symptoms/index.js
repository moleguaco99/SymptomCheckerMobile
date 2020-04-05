import React from 'react';
import { Easing, Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';
import { Home } from './Home';

export const Symptoms = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        initialRouteName: "Home",
    }
);

Symptoms.navigationOptions = ({ navigation }) => ({
  drawerIcon : (
      <Icon reverse size={15} type='font-awesome'
                              name='home'
                              color='#1E2952'/>
  ),
  headerShown: false,
})

export * from './SymptomsStore';