import React from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, Image} from 'react-native';
import { Home } from './Home';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return (
        <AppContainer />
    )
  } 
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex: 1, }}>
      <Image style={{width: 100, height: 100, alignSelf:"center", marginTop:"5%"}}
          source={require('./assets/logo.png')} />
      <ScrollView>
        <DrawerItems activeTintColor='#1E2952' {...props} />
      </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
    Home: { screen: Home }
    
  },
  {
    contentComponent: CustomDrawerComponent,
    drawerWidth: Dimensions.get("window").width - 150,

})
const AppContainer = createAppContainer(AppDrawerNavigator)
