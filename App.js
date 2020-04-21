import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Dimensions, Image, AsyncStorage} from 'react-native';
import { Symptoms, SymptomsStore } from './Symptoms';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { CheckBox } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { About } from './About';

export default function App() {
    return (
      <SymptomsStore>
        <AppContainer/>
      </SymptomsStore>
    )
} 

const CustomDrawerComponent = (props) => {
  const [check, onCheck] = React.useState(false);

  useEffect(() => {
    async function checkingBox(){
      const checked = JSON.parse(await AsyncStorage.getItem("CHECKED"));
      if(typeof checked === 'undefined'){
        onCheck(false);
        await AsyncStorage.setItem("CHECKED", JSON.stringify(false));
      }
      else
        onCheck(checked);
    }
    checkingBox();
  }, [])

 return <SafeAreaView style={{flex: 1, elevation: 5}}>
      <Image style={{width: 100, height: 100, alignSelf:"center", marginTop:"5%"}}
          source={require('./assets/logo.png')} />
      <ScrollView>
        <DrawerItems activeTintColor='#1E2952' {...props} />
        <CheckBox title='Scientific mode'
            checked={check}
            checkedColor="#06D6A0"
            onPress={async () => { onCheck(!check); await AsyncStorage.setItem("CHECKED", JSON.stringify(!check)); console.log(JSON.parse(await AsyncStorage.getItem("CHECKED")))}}
            containerStyle={{backgroundColor:'white', borderColor:'white'}}
            textStyle={{color:"#1E2952"}}
        />
      </ScrollView>
  </SafeAreaView>
}

const AppDrawerNavigator = createDrawerNavigator(
  { 
    Symptoms: {screen: Symptoms},
    About: {screen: About}
  },
  {
    contentComponent: props => <CustomDrawerComponent {...props} />,
    drawerWidth: Dimensions.get("window").width - 150,

})
const AppContainer = createAppContainer(AppDrawerNavigator)
