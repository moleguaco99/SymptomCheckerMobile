import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { SymptomsContext } from './SymptomsContext';

export const LoadingScreen = ({navigation}) => {
    const context = React.useContext(SymptomsContext);

    const navigate = () => navigation.navigate("Home")

    return <View style={{width: "100%", height:"100%", backgroundColor:"white"}}>
                { (context.isLoading === null || context.isLoading) ? 
                            <View style={{alignItems:'center', justifyContent:'center', marginTop:'80%' }}>
                                <Image source={require("../assets/logo.png")} style={{width: 130, height: 130, justifyContent:"center"}}/>
                                <ActivityIndicator  />
                            </View> : navigate()
                }
            </View>
}

LoadingScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false,
    
})