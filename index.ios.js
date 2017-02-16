/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Navigator,
  View,
  Image,
  StyleSheet
} from 'react-native';

import HomeScreen from './HomeScreen';
import NavigationBar from 'react-native-navbar';
import Back from './Back';
class MyProject extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{name: '首页', index: 0, Component:HomeScreen}}
                // configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                renderScene={(route, navigator) =>
                    {
                        let Screen = route.Component;
                        if(route.name) {
                            var titleConfig = {
                                title:route.name,
                                tintColor:'#fff'
                            }
                            if(route.name != '首页') {
                                var leftButtonConfig = <Back
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
})
AppRegistry.registerComponent('MyProject', () => MyProject);
