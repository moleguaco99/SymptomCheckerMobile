import React from 'react';
import { TouchableOpacity, Text, View, ScrollView, Image } from 'react-native'; 
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import { ListItem, Icon, Button } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; 
import { SymptomsContext } from '../../Symptoms/SymptomsContext';

let dictionary = {
    "head": ["Brain", "Eyes", "Nose", "Tongue", "Face"],
    "torso": ["Stomach", "Heart", "Lungs", "Excretory", "Abdomen", "Throat", "Back", "Chest", "Liver", "Neck",],
    "limbs": ["Limbs"],
}

export const OrgansModal = ({zone, navigation, height, marginTop, marginLeft, zIndex}) => {
    const [show, setShow] = React.useState(false);
    const { images } = React.useContext(SymptomsContext);

    return  <TouchableOpacity onPress={()=> setShow(true)} style={{position: 'absolute', backgroundColor:"#06D6A0", opacity:0, width: 'auto', height: height,
                                                                 marginTop: marginTop, marginLeft: marginLeft, zIndex: zIndex}} > 
                <Modal visible={show} width={280} height={350}
                        modalAnimation={new SlideAnimation({
                        slideFrom: 'bottom' })}>
                    <ModalContent>
                    <View style={{flexDirection: "row"}}>
                            <Icon reverse size={6} type='font-awesome' name='info-circle'
                                  color='#06D6A0'/>
                            <Text style={{fontSize:8, fontWeight:'400', marginTop:'4%'}}>Choose one of the following:</Text>
                    </View>
                    <ScrollView style={{height:"70%", elevation:3}}>
                    {dictionary[zone].map((l, i) => (
                        <ListItem
                            key={i}
                            Component={TouchableScale}
                            leftElement={<Image source={images[l]} style={{width:22, height:18, borderRadius:20}}></Image>}
                            friction={80}
                            tension={80}
                            activeScale={0.95} 
                            containerStyle={{ backgroundColor:"white", borderRadius:4, alignSelf:"center", elevation:1, marginBottom:"1%"}}
                            title={l}
                            titleStyle={{ color: '#1E2952', fontSize:8 }}
                            chevron={{color: '#1E2952'}}
                            bottomDivider
                            onPress={()=> {navigation.navigate("OrganPage", {organ: l}); setShow(false)}}
                            />
                    ))}
                    </ScrollView>
                    <View style={{marginTop:"10%"}}>
                    <Button 
                        buttonStyle={{backgroundColor:"#D33F49", width:"50%", marginLeft:"50%", borderRadius:10}}
                        icon={
                        <Icon
                            type='font-awesome'
                            name="arrow-circle-left"
                            size={10}
                            color="white"
                            />}
                        title="Go back"
                        titleStyle={{fontSize:10, fontWeight:'300', marginLeft:"2%"}}
                        onPress={()=>setShow(false)}/>
                    </View>
                    </ModalContent>
                </Modal>
            </TouchableOpacity>
}