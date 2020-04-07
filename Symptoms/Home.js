import React, { useEffect } from 'react';
import { View, ProgressBarAndroid, Text, BackHandler, ToastAndroid } from 'react-native';
import { Icon, ListItem, SearchBar, Button } from 'react-native-elements';
import { MainHeader } from '../components/headers/MainHeader';
import { HumanBody } from '../HumanBody';
import { SymptomsContext } from './SymptomsContext';
import TouchableScale from 'react-native-touchable-scale'; 
import { ScrollView } from 'react-native-gesture-handler';
import { OrgansModal } from '../components/modals/OrgansModal';
import _ from 'lodash';
import { SymptomsModal } from '../components/modals/SymptomsModal';

export const Home = ({ navigation }) => { 
    const [ search, onChangeSearch ] = React.useState("");
    const [ showSymptomsModal, onChangeShow ] = React.useState(false);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])

    const handleSearch = (event) => {
        onChangeSearch(event);
    }

    function bodySymptoms(symptoms){
        if(search !== ""){
            symptoms = _.filter(symptoms, function(element){
                return element.symptomName.startsWith(search)
            })
        }
        return _.sortBy(_.filter(symptoms, function(element){
            return element.bodyPart === "body"
        }), "occurenceProbability").reverse();
    }

    return <View style={{width: "100%", height: "100%", backgroundColor: "white", overflow: "scroll" }}>
                <MainHeader navigation={navigation} />
                        
                    <View style={{flexDirection: "row", marginLeft:"4%"}}>
                        <Icon reverse size={12} type='font-awesome' name='info-circle'
                              color='#06D6A0'/>
                        <Text style={{fontSize:10, fontWeight:'400', marginTop:'4%'}}>Click on the body part that troubles you!</Text>
                    </View>

                    <OrgansModal zone={"torso"} navigation={navigation} height={2} marginTop={"45%"} marginLeft={"38%"} zIndex={5} />
                    <OrgansModal zone={"head"} navigation={navigation} height={2} marginTop={"35%"} marginLeft={"38%"} zIndex={2} />
                    <OrgansModal zone={"limbs"} navigation={navigation} height={2} marginTop={"60%"} marginLeft={"38%"} zIndex={4} />
                    <OrgansModal zone={"limbs"} navigation={navigation} height={2} marginTop={"45%"} marginLeft={"48%"} zIndex={2} />
                    <OrgansModal zone={"limbs"} navigation={navigation} height={2} marginTop={"45%"} marginLeft={"30%"} zIndex={2} />
                        
                    <View style={{height:"35%"}}>
                        <HumanBody />
                    </View>
                        
                    <SearchBar
                        placeholder="Search for symptoms" platform="android"
                        containerStyle={{ transform: [{scaleX: 0.9}, {scaleY: 0.9}], alignSelf: "center", borderRadius: 5 }}
                        leftIconContainerStyle={{transform: [ {scaleX: 0.7}, {scaleY: 0.7} ] }}
                        rightIconContainerStyle={{transform: [ {scaleX: 0.7}, {scaleY: 0.7} ] }}
                        inputStyle={{ fontSize:12 }}
                        onChangeText={(e) => handleSearch(e)}
                        value={search}
                    />
                <SymptomsContext.Consumer>
                    {({symptoms, onSymptomTouch}) => (
                        <View style={{height:"32%", elevation: 2}}>
                        <ScrollView style={{elevation: 2}}>
                            {symptoms && bodySymptoms(symptoms).map((l, i) => (
                                    
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
                                    bottomDivider
                                    onPress = {() => {ToastAndroid.show(`You have added '${l.symptomName}'`, ToastAndroid.SHORT); onSymptomTouch(l)}}
                                    />
                                ))}
                                
                        </ScrollView>
                        </View>
                    )}
                </SymptomsContext.Consumer>
                    <View style={{ marginTop:"2%", flexDirection:'row' }}>
                         <Button 
                            buttonStyle={{ backgroundColor:"orange", marginLeft:'18%', width:130, borderRadius:20 }}
                            icon={
                                <Icon type='font-awesome' name="check-circle"
                                    size={13} color="white" />
                                }
                            title="One last check, doc"
                            titleStyle={{fontSize:10, fontWeight:'300', marginLeft:"5%"}}
                            onPress={()=>onChangeShow(!showSymptomsModal)}
                            />
                        <Button 
                            buttonStyle={{backgroundColor:"#06D6A0", width:130, borderRadius:20}}
                            icon={
                                <Icon type='font-awesome' name="user-md"
                                    size={13} color="white" />
                                }
                            title="Ready for diagnosis"
                            titleStyle={{fontSize:10, fontWeight:'300', marginLeft:"5%"}}/>
                    </View>
                    <SymptomsModal show={showSymptomsModal} onChangeShow={onChangeShow} />
            </View>
}

Home.navigationOptions = ({ navigation }) => ({
    headerShown: false,
})