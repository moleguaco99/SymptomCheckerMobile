import React from 'react';
import { TouchableOpacity, Text, View, ScrollView, Image } from 'react-native'; 
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import { ListItem, Icon, Button } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; 

let dictionary = {
    "head": ["Brain", "Eyes", "Nose", "Tongue", "Face"],
    "torso": ["Stomach", "Heart", "Lungs", "Excretory", "Abdomen", "Throat", "Back", "Chest", "Liver", "Neck",],
    "limbs": ["Limbs"],
}

let images = {
    "Brain" : require("./OrganImages/Brain.jpg"),
    "Eyes" : require("./OrganImages/Eyes.jpg"),
    "Nose" : require("./OrganImages/Nose.jpg"),
    "Tongue" : require("./OrganImages/Tongue.jpg"),
    "Face" : require("./OrganImages/Face.jpg"),
    "Stomach" : require("./OrganImages/Stomach.jpg"),
    "Heart" : require("./OrganImages/Heart.jpg"),
    "Lungs" : require("./OrganImages/Lungs.jpg"),
    "Excretory" : require("./OrganImages/Excretory.jpg"),
    "Abdomen" : require("./OrganImages/Abdomen.jpg"),
    "Back" : require("./OrganImages/Back.jpg"),
    "Throat" : require("./OrganImages/Throat.jpg"),
    "Chest" : require("./OrganImages/Chest.jpg"),
    "Liver" : require("./OrganImages/Liver.jpg"),
    "Neck" : require("./OrganImages/Neck.jpg"),
    "Limbs" : require("./OrganImages/Limbs.jpg"),
}

export const OrgansModal = ({zone, navigation, width, height, marginTop, marginLeft, zIndex}) => {
    const [show, setShow] = React.useState(false);

    return <TouchableOpacity onPress={()=> setShow(true)} style={{position: 'absolute', backgroundColor:"white", width: width,
                                                                 height: height, marginTop: marginTop, marginLeft: marginLeft, zIndex: zIndex}} > 
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
                            leftElement={<Image source={images[l]} style={{width:22, height:18, borderRadius: 20}}></Image>}
                            friction={80}
                            tension={80}
                            activeScale={0.95} 
                            containerStyle={{ backgroundColor:"white", borderRadius:2, alignSelf:"center", elevation:1, marginBottom:"1%"}}
                            title={l}
                            titleStyle={{ color: '#1E2952', fontSize:10 }}
                            chevron={{color: '#1E2952'}}
                            bottomDivider />
                    ))}
                    </ScrollView>
                    <View style={{marginTop:"10%"}}>
                    <Button 
                        buttonStyle={{backgroundColor:"#EF3E36", width:"50%", marginLeft:"50%", borderRadius:10}}
                        icon={
                        <Icon
                            type='font-awesome'
                            name="arrow-circle-left"
                            size={10}
                            color="white"
                            />}
                        title="Oops! Wrong part..."
                        titleStyle={{fontSize:10, fontWeight:'300', marginLeft:"2%"}}
                        onPress={()=>setShow(false)}/>
                    </View>
                    </ModalContent>
                </Modal>
            </TouchableOpacity>
}