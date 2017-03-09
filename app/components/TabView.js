/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
    Text,
    Dimensions,
    StyleSheet,
    Animated,
    Image,
    View,
    AsyncStorage
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import TabNavigator from 'react-native-tab-navigator'
import px2dp from '../util'
let {width, height} = Dimensions.get('window');
import Home from '../pages/Home';
import Discover from '../pages/Discover';
import My from '../pages/My';
import Suggest from '../pages/Suggest';
import Login from '../pages/Login';

export default class TabView extends Component {
  constructor(props){
    super(props);
    this.state = {
        currentTab: 'Home',
        hideTabBar: false,
        isLogin: false
    };
      AsyncStorage.getItem('token', (error, result) => {
          if (result) {
              this.setState({
                  isLogin: true
              });
          }
      });
    this.tabNames = [
        { title: "首页", icon: "ios-home-outline", tab: "Home", component: <Home {...this.props}/>, needLogin: false},
        // { title: "投稿", icon: "ios-add-circle-outline", tab: "Discover", component: <Discover {...this.props}/>, needLogin: true},
        { title: "留言板", icon: "ios-clipboard-outline", tab: "Suggest", component: <Suggest {...this.props}/>, needLogin: true},
        { title: "我的", icon: "ios-contact-outline", tab: "My", component: <My {...this.props}/>, needLogin: true},
    ];
    TabView.hideTabBar = TabView.hideTabBar.bind(this);
    TabView.showTabBar = TabView.showTabBar.bind(this);
  }
  static showTabBar(time){
    this.setState({hideTabBar: false})
  }
  static hideTabBar(time){
    this.setState({hideTabBar: true})
  }
    refresh(isLogin) {
        this.setState({
            isLogin: isLogin,
        });
    }
  render(){
    return (
      <TabNavigator
        hidesTabTouch={true}
        tabBarStyle={[styles.tabbar,
          (this.state.hideTabBar?styles.hide:{})
        ]}
        >
          {
            this.tabNames.map((item, i) => {
              return (
                <TabNavigator.Item
                    key={i}
                    tabStyle={styles.tabStyle}
                    title={item.title}
                    selected={this.state.currentTab === item.tab}
                    selectedTitleStyle={{color: "#f16705"}}
                    renderIcon={() => <Icon name={item.icon} size={px2dp(22)} color="#666" />}
                    renderSelectedIcon={() => <Icon name={item.icon.replace(/\-outline$/, "")} size={px2dp(22)} color="#f16705" />}
                    onPress={item.needLogin && !this.state.isLogin ? ()=>{this.props.navigator.push({
                        component: Login,
                        params: {refresh:this.refresh.bind(this)}
                    })} : () => this.setState({ currentTab: item.tab })}
                    >
                    {item.needLogin && !this.state.isLogin ? <View/> : item.component}
                </TabNavigator.Item>
              )
            })
          }
      </TabNavigator>
    )
  }
}

const styles = StyleSheet.create({
    tabbar: {
      height: px2dp(46),
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    hide: {
      transform: [
        {translateX:width}
      ]
    },
    tabStyle:{
      padding: px2dp(4)
    },
    icon: {
        height: 28,
        width: 28,
    },
});
