import React from 'react';
import { View, ProgressBarAndroid, Text } from 'react-native';
import { Icon, ListItem, SearchBar, Button } from 'react-native-elements';
import { MainHeader } from '../components/headers/MainHeader';
import { HumanBody } from '../HumanBody';
import { SymptomsContext } from './SymptomsContext';
import TouchableScale from 'react-native-touchable-scale'; 
import { ScrollView } from 'react-native-gesture-handler';
import { OrgansModal } from '../components/modals/OrgansModal';

export const Home = ({ navigation }) => { 
    return <View style={{width: "100%", height: "100%", backgroundColor: "white", overflow: "scroll" }}>
                <MainHeader navigation={navigation} />
                        <View style={{flexDirection: "row", marginLeft:"4%"}}>
                            <Icon reverse size={12} type='font-awesome' name='info-circle'
                                  color='#06D6A0'/>
                            <Text style={{fontSize:10, fontWeight:'400', marginTop:'4%'}}>Click on the body part that troubles you!</Text>
                        </View>
                        <OrgansModal zone={"torso"} navigation={navigation} height={0} width={30} marginTop={"40%"} zIndex={2}></OrgansModal>
                        <View style={{height:"35%"}}>
                        <HumanBody />
                        </View>
                        <SearchBar
                            placeholder="Search for symptoms" platform="android"
                            containerStyle={{ transform: [{scaleX: 0.9}, {scaleY: 0.9}], alignSelf: "center", borderRadius: 5 }}
                            leftIconContainerStyle={{transform: [ {scaleX: 0.7}, {scaleY: 0.7} ] }}
                            rightIconContainerStyle={{transform: [ {scaleX: 0.7}, {scaleY: 0.7} ] }}
                            inputStyle={{ fontSize:12 }}
                        />
                <SymptomsContext.Consumer>
                        {({symptoms}) => (
                            <View style={{height:"32%", elevation: 2}}>
                            <ScrollView>
                                {symptoms && symptoms.map((l, i) => (
                                    <ListItem
                                        key={i}
                                        Component={TouchableScale} friction={80} tension={80} 
                                        activeScale={0.95} containerStyle={{ backgroundColor:"#1E2952", width:'90%', borderRadius:5, alignSelf:"center"}}
                                        title={l.symptomName} titleStyle={{ color: 'white', fontSize:10 }}
                                        chevron={{color: 'white'}} rightTitle="Frequency:" rightTitleStyle={{ color: 'white', fontSize:10 }}
                                        rightElement={<ProgressBarAndroid styleAttr="Horizontal"
                                                        indeterminate={false} color={"#FF6060"}
                                                        progress={l.occurenceProbability} />} bottomDivider />
                                ))}
                                
                            </ScrollView>
                            </View>
                        )}
                </SymptomsContext.Consumer>
                    <View style={{marginTop:"2%"}}>
                    <Button 
                        buttonStyle={{backgroundColor:"#06D6A0", width:"40%", marginLeft:"55%", borderRadius:20}}
                        icon={
                        <Icon
                            type='font-awesome'
                            name="user-md"
                            size={15}
                            color="white"
                            />}
                        title="Ready for diagnosis"
                        titleStyle={{fontSize:12, fontWeight:'300', marginLeft:"2%"}}/>
                    </View>
            </View>
}

Home.navigationOptions = ({ navigation }) => ({
    headerShown: false,
})