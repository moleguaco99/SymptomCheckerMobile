import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { MainHeader } from './components/headers/MainHeader';

export const About = ({navigation}) => {
    return <View style={{width: "100%", height: "100%", backgroundColor: "white", overflow: "scroll" }}>
                <MainHeader navigation={navigation} />
            </View>
}

About.navigationOptions = ({ navigation }) => ({
    drawerIcon : (
        <Icon reverse size={15} type='font-awesome'
                                name='question-circle'
                                color='#1E2952'/>
    ),
    headerShown: false,
})
  