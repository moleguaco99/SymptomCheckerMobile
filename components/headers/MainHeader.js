import React from 'react';
import { Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';

export const MainHeader = ({navigation, backButton}) => {
    return <Header
                placement="center"
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={backButton ? <Icon reverse color="#1E2952" name="arrow-left" type='font-awesome' containerStyle={{marginBottom: "30%"}} size={14} onPress={()=>navigation.goBack()} /> : null}
                rightComponent={<Icon reverse color="#1E2952" name="bars" type='font-awesome' containerStyle={{marginBottom: "30%"}} size={16} onPress={()=>navigation.openDrawer()} />}
                containerStyle={{
                    backgroundColor: '#1E2952',
                    height:"10%",
                    minHeight:"8%",
                    marginBottom: "2%"
                }}
                centerComponent={<Image style={{width: 105, height: 100, marginBottom: "10%"}}
                                        source={ require('../../assets/logo2.png')} />}
                />
}
