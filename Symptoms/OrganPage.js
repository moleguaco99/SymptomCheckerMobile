import React, { useEffect } from 'react';
import { View, ProgressBarAndroid, BackHandler, Text, ScrollView, ToastAndroid } from 'react-native';
import { Card, SearchBar, ListItem, Icon } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; 
import { MainHeader } from '../components/headers/MainHeader';
import { SymptomsContext } from '../Symptoms/SymptomsContext';
import _ from 'lodash';

export const OrganPage = ({ navigation }) => {
    const [organ, setOrgan] = React.useState(navigation.state.params.organ);
    const [search, onChangeSearch] = React.useState("");

    const { images, onSymptomTouch } = React.useContext(SymptomsContext);

    const handleSearch = (event) => {
        onChangeSearch(event);
    }
    
    function organSymptoms(symptoms){
        if(search !== ""){
            symptoms = _.filter(symptoms, function(element){
                return element.symptomName.startsWith(search)
            })
        }
        return _.sortBy(_.filter(symptoms, function(element){
            return element.bodyPart === organ.toLowerCase()
        }), "occurenceProbability").reverse();
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => navigation.goBack())
      }, [])

    return <View style={{width: "100%", height: "100%", backgroundColor: "white", overflow: "scroll" }}>
                <MainHeader navigation={navigation} backButton={true}/>

                <View style={{flexDirection: "row", marginLeft:"4%"}}>
                    <Icon reverse size={10} type='font-awesome' name='info-circle'
                          color='#06D6A0'/>
                    <Text style={{fontSize:8, fontWeight:'400', marginTop:'4%'}}>Indicate your symptoms! </Text>
                </View>

                <Card image={images[organ]} containerStyle={{borderRadius:5, elevation:3}}>
                    <Text style={{fontSize:10, fontWeight:'400'}}>{organ}</Text>
                </Card>

                <SearchBar
                        placeholder="Search for symptoms" platform="android"
                        containerStyle={{ transform: [{scaleX: 0.9}, {scaleY: 0.9}], alignSelf: "center", borderRadius: 5, elevation: 2 }}
                        leftIconContainerStyle={{transform: [ {scaleX: 0.7}, {scaleY: 0.7} ] }}
                        rightIconContainerStyle={{transform: [ {scaleX: 0.7}, {scaleY: 0.7} ] }}
                        inputStyle={{ fontSize:12 }}
                        onChangeText={(e) => handleSearch(e)}
                        value={search} />

                <SymptomsContext.Consumer>
                    {({symptoms}) => (
                        
                        <View style={{height:"43%", elevation: 2}}>
                            <ScrollView>
                                {symptoms && organSymptoms(symptoms).map((l, i) => (                                    
                                    <ListItem
                                        key={i}
                                        Component={TouchableScale} friction={80} tension={80} 
                                        activeScale={0.95} 
                                        containerStyle={{ backgroundColor:"#1E2952", width:'90%', borderRadius:5, alignSelf:"center"}}
                                        title={l.symptomName} titleStyle={{ color: 'white', fontSize:10 }}
                                        rightTitle="Frequency:" rightTitleStyle={{ color: 'white', fontSize:10 }}
                                        rightElement={<ProgressBarAndroid styleAttr="Horizontal"
                                                            indeterminate={false} color={"#FF6060"}
                                                            progress={l.occurenceProbability} />}
                                        onPress = {() => { onSymptomTouch(l); ToastAndroid.show(`You have added '${l.symptomName}'`, ToastAndroid.SHORT);}}
                                        bottomDivider />
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </SymptomsContext.Consumer>
           </View>
}

OrganPage.navigationOptions = ({navigation}) => ({
    headerShown: false,
})