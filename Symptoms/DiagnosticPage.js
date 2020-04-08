import React from 'react';
import { MainHeader } from '../components/headers/MainHeader';
import { View, ScrollView, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { DiagnosticCard } from '../components/cards/DiagnosticCard';

export const DiagnosticPage = ({ navigation }) => {
    console.log(navigation.state.params.diagnostics);
    return <View style={{backgroundColor: 'white', height: '100%', width: '100%', overflow: 'scroll'}}>
            <MainHeader navigation={navigation} backButton={true}/>
            <View style={{flexDirection: "row", marginLeft:"4%"}}>
                        <Icon reverse size={12} type='font-awesome' name='info-circle'
                              color='#06D6A0'/>
                        <Text style={{fontSize:10, fontWeight:'400', marginTop:'4%'}}>Your projected diagnostics are: </Text>
                    </View>
                <ScrollView>
                {Object.entries(navigation.state.params.diagnostics).map(([key, val]) => (
                        <DiagnosticCard diseaseName={key} expectance={val} />
                    )
                )}
                </ScrollView>
            </View>
}

DiagnosticPage.navigationOptions = ({ navigation }) => ({
    headerShown: false,
})