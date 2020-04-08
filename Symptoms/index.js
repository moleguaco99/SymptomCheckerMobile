import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';
import { Home } from './Home';
import { LoadingScreen } from './LoadingScreen';
import { OrganPage } from './OrganPage';
import { DiagnosticPage } from './DiagnosticPage';

export const Symptoms = createStackNavigator(
    {
        Home: { screen: Home },
        LoadingScreen: { screen: LoadingScreen },
        OrganPage: { screen: OrganPage },
        DiagnosticPage: { screen: DiagnosticPage }
    },
    {
        initialRouteName: "LoadingScreen",
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