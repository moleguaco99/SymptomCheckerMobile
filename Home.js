import React from 'react';
import { View, Text, ProgressBarAndroid, Image } from 'react-native';
import { Icon, Header, Card, ListItem, SearchBar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; 
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';

const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
]

export const Home = ({navigation}) => { 
    return <View style={{width:"100%", height:"100%"}}>
                <Header
                    placement="left"
                    statusBarProps={{ barStyle: 'light-content' }}
                    leftComponent={<Icon reverse color="#1E2952" name="bars" type='font-awesome' size={20} onPress={()=>navigation.openDrawer()} />}
                    centerComponent={{ text: 'Symptoms page', style: { color: '#fff', fontWeight:'400', fontSize:14 }}}
                    containerStyle={{
                        backgroundColor: '#1E2952',
                        justifyContent: "flex-start"
                    }}
                    rightComponent={<Image style={{width: 75, height: 75, alignSelf:"center"}}
                    source={require('./assets/logo2.png')} />}
                />
                <Text style={{color:"#1E2952", fontSize:12.5, fontWeight:"bold", fontStyle:"italic", marginTop:"5%", marginLeft:"5%", textShadowOffset:{width:2, height:2}, textShadowColor:"#DCDCDC", textShadowRadius:5}}>
                        Welcome to symptoms page!
                </Text>
                <Card containerStyle={{backgroundColor:"#03CEA4", borderRadius:5, elevation: 6, display:"flex"}}> 
                    <Text style={{color:"white", fontWeight:"400", fontSize:12}}>
                        Diagnostic1
                    </Text>
                    <ProgressBarAndroid
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={0.5}
                    />
                    <Text style={{color:"white", fontWeight:"400", fontSize:10}}> Expectance: 50% </Text>
                </Card>
                <Card containerStyle={{backgroundColor:"#FF6060", borderRadius:5, elevation: 6, display:"flex", marginBottom:"5%"}}> 
                    <Text style={{color:"white", fontWeight:"400", fontSize:12}}>
                        Diagnostic2
                    </Text>
                    <ProgressBarAndroid
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={0.8}
                    />
                    <Text style={{color:"white", fontWeight:"400", fontSize:10}}> Expectance: 80% </Text>
                    <View style={{ marginTop:"2%" }}>
                        <Text style={{color:"white", fontWeight:"500", fontSize:10}}> It is highly recommended that you make an appointment!</Text>
                    </View>
                </Card>
                {list.map((l, i) => (
                        <ListItem
                            key={i}
                            Component={TouchableScale}
                            friction={80} //
                            tension={80} // These props are passed to the parent component (here TouchableScale)
                            activeScale={0.95} //
                            containerStyle={{width:"90%", backgroundColor:"#1E2952", borderRadius:5, alignSelf:"center"}}
                            title="Symptom1"
                            titleStyle={{ color: 'white', fontSize:10 }}
                            chevron={{ color: 'white' }}
                            bottomDivider
                        />
                    )) 
                }
                <SearchBar
                    placeholder="Search for symptoms"
                    platform="android"
                    containerStyle={{ width:"90%", alignSelf:"center" }}
                    leftIconContainerStyle={{transform: [ {scaleX: 0.7}, {scaleY: 0.7} ] }}
                    rightIconContainerStyle={{transform: [ {scaleX: 0.7}, {scaleY: 0.7} ] }}
                    inputStyle={{ fontSize:12 }}
                />
                <Modal
                    visible={false}
                    width={280}
                    modalAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                    })}>
                    <ModalContent>
                        <Text style={{color:"#1E2952", fontSize:11, fontWeight:"900", marginBottom:"5%" }}>
                            Choose one of the following:</Text>
                        {list.map((l, i) => (
                            <ListItem
                                key={i}
                                Component={TouchableScale}
                                leftAvatar={{ source: require("./assets/hth.jpg"), containerStyle:{width:22, height:18} }}
                                friction={80} //
                                tension={80} // These props are passed to the parent component (here TouchableScale)
                                activeScale={0.95} //
                                containerStyle={{ backgroundColor:"white", borderRadius:2, alignSelf:"center", elevation:2, marginBottom:"1%"}}
                                title="Organ1"
                                titleStyle={{ color: '#1E2952', fontSize:10 }}
                                chevron={{color: '#1E2952'}}
                                bottomDivider />
                            )) 
                        }
                    </ModalContent>
                </Modal>
            </View>
}

Home.navigationOptions = ({ navigation }) => ({
    drawerIcon : (
        <Icon reverse size={15}
        type='font-awesome'
        name='home'
        color='#1E2952'/>
    )
})