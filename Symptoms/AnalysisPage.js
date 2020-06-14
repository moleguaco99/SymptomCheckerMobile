import React from 'react';
import { View, Dimensions, TouchableOpacity, FlatList, Text, ScrollView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { DiagnosticCard } from '../components/cards/DiagnosticCard';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { Icon } from 'react-native-elements';
import { MainHeader } from '../components/headers/MainHeader';
import { _ } from 'lodash';
import Animated from 'react-native-reanimated';

const initialLayout = { width: Dimensions.get('window').width };

export const AnalysisPage = ({navigation}) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Apriori' },
      { key: 'second', title: 'Naive Bayes' },
      { key: 'third', title: 'KMeans' }
    ]);

    const FirstRoute = () => (
        <View style={{ backgroundColor: 'white', height:'92%' }}>  
                <FlatList
                        data={Object.entries(navigation.state.params.diagnostics[0])}
                        renderItem={({item}) => <DiagnosticCard diseaseName={item[0]} expectance={item[1]} />}
                        keyExtractor={(item) => item[0]} />
        </View>
    );
      
    const SecondRoute = () => (
        <View style={{ backgroundColor: 'white', height:'92%' }}>
            <FlatList
                data={Object.entries(navigation.state.params.diagnostics[1])}
                renderItem={({item}) => <DiagnosticCard diseaseName={item[0]} expectance={item[1]} />}
                keyExtractor={(item) => item[0]} />
        </View>
    );

    const ThirdRoute = () => (
      <View style={{ backgroundColor: 'white', height:'92%' }}>
      <FlatList
          data={Object.entries(navigation.state.params.diagnostics[2])}
          renderItem={({item}) => <DiagnosticCard diseaseName={item[0]} expectance={item[1]} />}
          keyExtractor={(item) => item[0]} />
      </View>
    )

    function generateData(){  
      let labels = [];
      let datasetApriori = [];
      let datasetBayes = [];
      let datasetKMeans = [];
      const ap = Object.entries(navigation.state.params.diagnostics[0]);
      const ba = Object.entries(navigation.state.params.diagnostics[1]);
      const km = Object.entries(navigation.state.params.diagnostics[2]);

      if(ap.length >= 3){
        datasetBayes = [0, 0, 0];
        datasetKMeans = [0, 0, 0];
        for(var i = 0; i < 3; i += 1){
            labels.push(ap[i][0].split("(")[0]);
            datasetApriori.push(ap[i][1] * 100);
        }

        for(var i = 0; i < ba.length; i += 1){
          if(ba[i][0] === labels[0])
            datasetBayes[0] = ba[i][1] * 100;
          if(ba[i][0] === labels[1])
            datasetBayes[1] = ba[i][1] * 100;
          if(ba[i][0] === labels[2])
            datasetBayes[2] = ba[i][1] * 100;
        }

        for(var i = 0; i < km.length; i += 1){
          if(km[i][0] === labels[0])
            datasetKMeans[0] = km[i][1] * 100;
          if(km[i][0] === labels[1])
            datasetKMeans[1] = km[i][1] * 100;
          if(km[i][0] === labels[2])
            datasetKMeans[2] = km[i][1] * 100;
        }
      }

      else{
        for(var i = 0; i < ap.length; i += 1){
          labels.push(ap[i][0].split("(")[0]);
          datasetApriori.push(ap[i][1] * 100);
          datasetBayes.push(0);
          datasetKMeans.push(0);
        }
        for(var i = 0; i < ba.length; i += 1){
          if(ba[i][0] === labels[0])
            datasetBayes[0] = ba[i][1] * 100;
          if(ba[i][0] === labels[1])
            datasetBayes[1] = ba[i][1] * 100;
          if(ba[i][0] === labels[2])
            datasetBayes[2] = ba[i][1] * 100;
        }
        for(var i = 0; i < km.length; i += 1){
          if(km[i][0] === labels[0])
            datasetKMeans[0] = km[i][1] * 100;
          if(km[i][0] === labels[1])
            datasetKMeans[1] = km[i][1] * 100;
          if(km[i][0] === labels[2])
            datasetKMeans[2] = km[i][1] * 100;
        }
      }

    let data = {
        labels: labels,
        datasets: [
          {
            data: datasetApriori,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          },
          { 
            data: datasetBayes,
            color: (opacity = 1) => `rgba(15, 247, 160, ${opacity})`
          },
          { 
            data: datasetKMeans,
            color: (opacity = 1) => `rgba(111, 117, 20, ${opacity})`
          }
        ],
        legend: ["Apriori", "Naive Bayes", "KMeans"]
      }
      return data;
    }

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute
      });
    
    const _renderTabBar = (props) => {    
        return (
          <View style={{ flexDirection: 'row' , paddingTop:10,}}>
            {props.navigationState.routes.map((route, i) => {
              return (
                <TouchableOpacity
                  style={{flex: 1, alignItems: 'center', padding: 16, backgroundColor:'#1E2952', borderBottomWidth:3, borderBottomColor: index === i ? "#7AFFFF" : 'white', zIndex:5 }}
                  onPress={() => setIndex(i)}>
                  <Animated.Text style={{ color: index === i ? "#7AFFFF" : 'white' }}>{route.title}</Animated.Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      };
      
    const chartConfig = {
        backgroundGradientFrom: '#1E2952',
        backgroundGradientTo: '#1E2952',
        color: (opacity = 1) => `rgba(122, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
          justifyContent:'center',
        }
      }


    const configureBarData = () => {
        const array = Object.entries(navigation.state.params.diagnostics[3]);
        
        return { 
          labels: ['Apriori', 'Naive Bayes', 'KMeans'],
          datasets: [{
              data: [array[0][1], array[1][1], array[2][1]]
          }]
        }
      }
      

    return <View style={{height:'100%', width:'100%', overflow:'scroll', backgroundColor:'white'}}>
                <MainHeader navigation={navigation} backButton={true} />
                <TabView style ={{marginTop:'-5%'}}
                    navigationState={{ index, routes }}
                    renderTabBar={_renderTabBar}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                />
                 <View style={{height:'38%'}}>
                 <ScrollView>
                 <View style={{flexDirection: "row", marginLeft:"4%"}}>
                        <Icon reverse size={10} type='font-awesome' name='info-circle'
                              color='#06D6A0'/>
                        <Text style={{fontSize:10, fontWeight:'400', marginTop:'3%'}}>Here we have our algorithms' efficiency:</Text>
                </View>
                <View style={{width:Dimensions.get('window').width - 30, alignSelf:'center', justifyContent:'center', backgroundColor:'#1E2952', borderRadius:16, marginBottom:'2%', elevation: 4}}>
                <Text style={{alignSelf:'center'}}></Text>
                <BarChart
                    yAxisSuffix={'s'}
                    style={{
                      borderRadius: 16,
                      alignSelf: 'center',
                    }}
                    data={configureBarData()}
                    width={Dimensions.get('window').width - 30}
                    height={195}
                    chartConfig={chartConfig}
                    fromZero={true}
                  />  
                </View>
                <View style={{flexDirection: "row", marginLeft:"4%"}}>
                        <Icon reverse size={10} type='font-awesome' name='info-circle'
                              color='#06D6A0'/>
                        <Text style={{fontSize:10, fontWeight:'400', marginTop:'3%'}}>Here we have our algorithms' top predictions:</Text>
                </View>
                <View style={{width: Dimensions.get('window').width - 30, alignSelf:'center', justifyContent:'center', backgroundColor:'#1E2952', borderRadius:16, marginBottom:'2%', elevation: 4}}>
                <Text style={{alignSelf:'center', height: 5}} />
                <LineChart 
                  height={185}
                  width={Dimensions.get('window').width - 30}
                  data={generateData()}
                  chartConfig={chartConfig}
                  style={{
                    borderRadius: 16,
                    alignSelf: 'center',
                  }}
                  bezier
                  yAxisSuffix={"%"}
                  fromZero={true}
                />
                </View>
                </ScrollView>  
                </View>
          </View>
}

AnalysisPage.navigationOptions = ({ navigation }) => ({
    headerShown: false,
})