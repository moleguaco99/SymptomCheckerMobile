import React, { useEffect } from 'react';
import { Text, View, ScrollView, ProgressBarAndroid } from 'react-native';
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import { ListItem, Icon, Button } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; 
import { SymptomsContext } from '../../Symptoms/SymptomsContext';

export const SymptomsModal = ({ show, onChangeShow }) => {
    const { searchingSymptoms, onSymptomDelete } = React.useContext(SymptomsContext);
    const [ symptoms, onChangeSymptoms ] = React.useState(searchingSymptoms);

    function processName(symptomName){
        let fields = symptomName.split("_");
        let name = "";
        fields[0] = fields[0].charAt(0).toUpperCase() + fields[0].slice(1);
        for(let i = 0; i < fields.length; i += 1){
            name += fields[i] + " ";
        }
        return name;
    }

    return <Modal visible={show} width={300} height={350}
                modalAnimation={new SlideAnimation({
                slideFrom: 'bottom' })}>
                <ModalContent>
                <View style={{flexDirection: "row"}}>
                    <Icon reverse size={6} type='font-awesome' name='info-circle'
                            color='#06D6A0'/>
                    <Text style={{fontSize:8, fontWeight:'400', marginTop:'4%'}}>You have selected the following symptoms:</Text>
                </View>
                <ScrollView style={{height:"70%", elevation:3}}>
                    {symptoms.map((l, i) => (
                            <ListItem
                                key={i}
                                Component={TouchableScale}
                                friction={80}
                                tension={80}
                                activeScale={0.95} 
                                containerStyle={{ backgroundColor:"white", borderRadius:4, alignSelf:"center", elevation:1, marginBottom:"1%"}}
                                leftElement={<Icon type='font-awesome'
                                                    name="times"
                                                    size={12}
                                                    color="#EF3E36"
                                                    onPress={()=> { onChangeSymptoms(onSymptomDelete(l)); }}      
                                            />}
                                rightTitle="Frequency:" rightTitleStyle={{ color: '#1E2952', fontSize:8 }}
                                rightElement={<ProgressBarAndroid styleAttr="Horizontal" containerStyle
                                                        indeterminate={false} color={"#EF3E36"}
                                                        progress={l.occurenceProbability} />}
                                title={processName(l.symptomName)}
                                titleStyle={{ color: '#1E2952', fontSize:8 }}
                                bottomDivider
                            />
                    ))}
                </ScrollView>
                <Button buttonStyle={{backgroundColor:"#EF3E36", width:"50%", marginLeft:"50%", borderRadius:10}}
                        icon={
                        <Icon
                            type='font-awesome'
                            name="arrow-circle-left"
                            size={10}
                            color="white"
                            />}
                        title="We are done here"
                        titleStyle={{fontSize:10, fontWeight:'300', marginLeft:"2%"}}
                        onPress={()=> onChangeShow(false)}/>
            </ModalContent>
            </Modal>
}