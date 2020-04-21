import React from 'react';
import { MainHeader } from '../components/headers/MainHeader';
import { View, Text, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { DiagnosticCard } from '../components/cards/DiagnosticCard';

export const DiagnosticPage = ({ navigation }) => {

    return <View style={{ backgroundColor: 'white', height: '100%', width: '100%', overflow: 'scroll' }}>
            <MainHeader navigation={navigation} backButton={true}/>
                <View style={{flexDirection: "row", marginLeft:"4%"}}>
                        <Icon reverse size={12} type='font-awesome' name='info-circle'
                              color='#06D6A0'/>
                        <Text style={{fontSize:10, fontWeight:'400', marginTop:'4%'}}>Your projected diagnostics are: </Text>
                </View>
                <View style={{height:'60%'}}>
                <FlatList
                        data={Object.entries(navigation.state.params.diagnostics[0])}
                        renderItem={({item}) => <DiagnosticCard diseaseName={item[0]} expectance={item[1]} />}
                        keyExtractor={(item) => item[0]} />
                </View>
            </View>
}

DiagnosticPage.navigationOptions = ({ navigation }) => ({
    headerShown: false,
})