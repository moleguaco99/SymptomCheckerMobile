import React from 'react';
import { Card } from 'react-native-elements';
import { View, Text, ProgressBarAndroid } from 'react-native';

export const DiagnosticCard = () => {
    return  <Card containerStyle={{backgroundColor:"#FF6060", borderRadius:5, elevation: 6, display:"flex", marginBottom:"5%"}}> 
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
}