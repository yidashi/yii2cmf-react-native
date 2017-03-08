'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
    AsyncStorage
} from 'react-native'
import NavBar from '../components/NavBar'
import Item from '../components/Item';
import TabView from '../components/TabView';
//FontAwesome
export default class Setting extends Component {
  constructor(props){
      super(props)
  }
  back(){
    this.props.navigator.pop()
  }
  logout() {
      AsyncStorage.removeItem('token', () => {
          this.props.navigator.popToTop();
          TabView.logout.bind(TabView);
      });

  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar
          title="设置"
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          <Item name="通用"/>
          <Item name="关于猿书" first={true}/>
          <Item.Button name="退出登录" first={true} onPress={() => this.logout()}/>
        </ScrollView>
      </View>
    )
  }
}
