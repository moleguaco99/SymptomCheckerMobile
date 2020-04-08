import React from 'react';
import { Card } from 'react-native-elements';
import { View, Text, ProgressBarAndroid } from 'react-native';

export const DiagnosticCard = ({diseaseName, expectance}) => {
    return  <Card containerStyle={{ backgroundColor: expectance > 0.5 ? "#FF6060" : "#06D6A0", borderRadius:5, elevation: 6, display:"flex", marginBottom:"2%"}}> 
                <Text style={{color:"white", fontWeight:"400", fontSize:12}}>
                    {diseaseName}
                </Text>
                <ProgressBarAndroid
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={expectance}
                />
                <Text style={{color:"white", fontWeight:"400", fontSize:10}}> Expectance: {(expectance * 100).toFixed(2)} % </Text>
                {expectance > 0.5 ? <View style={{ marginTop:"2%" }}>
                    <Text style={{color:"white", fontWeight:"500", fontSize:10}}> It is highly recommended that you make an appointment!</Text>
                </View> : null }
            </Card>
}