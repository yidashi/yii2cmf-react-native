import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  View,
  Image,
  StyleSheet,
  BackAndroid
} from 'react-native';

import HomeScreen from './HomeScreen';
import NavigationBar from 'react-native-navbar';
import Back from './Back';
export default class app extends Component {
    constructor() {
        super();
        this.navigator = null;
    }
    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }
    onBackAndroid() {
        const nav = this.navigator;
        const routers = nav.getCurrentRoutes();
        if (routers.length > 1) {
          nav.pop();
          return true;
        }
        return false;
    }
    render() {
        return (
            <Navigator
                initialRoute={{name: '首页', index: 0, Component:HomeScreen}}
                // configureScene={() => Navigator.SceneConfigs.PushFromRight}
                renderScene={(route, navigator) =>
                    {
                        this.navigator = navigator;
                        let Screen = route.Component;
                        if(route.name) {
                            const  titleConfig = {
                                title:route.name,
                                tintColor:'#fff'
                            };
                            const leftButtonConfig = {
                                title:'返回'
                            };
                            if(route.name != '首页') {
                                const leftButtonConfig = <Back
                                    style={{ marginLeft: 8 }}
                                    onPress={() => navigator.pop()}
                                    />;
                            }
                            return (
                                <View style={{flex:1}}>
                                    <NavigationBar
                                        style={styles.navbar}
                                        title={titleConfig}
                                        leftButton={leftButtonConfig}
                                        statusBar={{hidden:true}}
                                    />
                                    <Screen {...route.params} navigator={navigator} />
                                </View>
                            )
                        }
                    }
                }
            />
        )
    }
}
const styles = StyleSheet.create({
    navbar:{
        flex:1,
        backgroundColor:'#00a2ed',
    },
});
AppRegistry.registerComponent('app', () => app);
