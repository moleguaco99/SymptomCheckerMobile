import React from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, Image} from 'react-native';
import { Symptoms, SymptomsStore } from './Symptoms';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

export default function App() {
    return (
      <SymptomsStore>
        <AppContainer />
      </SymptomsStore>
    )
} 

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex: 1, elevation: 5}}>
      <Image style={{width: 100, height: 100, alignSelf:"center", marginTop:"5%"}}
          source={require('./assets/logo.png')} />
      <ScrollView>
        <DrawerItems activeTintColor='#1E2952' {...props} />
      </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator(
  {Symptoms: {screen: Symptoms}},
  {
    contentComponent: CustomDrawerComponent,
    drawerWidth: Dimensions.get("window").width - 150,

})
const AppContainer = createAppContainer(AppDrawerNavigator)
