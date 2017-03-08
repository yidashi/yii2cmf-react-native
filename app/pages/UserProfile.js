'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import NavBar from '../components/NavBar'
import Item from '../components/Item'
//FontAwesome
export default class UserProfile extends Component {
  constructor(props){
      super(props)
  }
  back(){
    this.props.navigator.pop()
  }
  render(){
    let user = this.props.user;
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar
          title="账户信息"
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          <Item name="头像" avatar={{uri:user.avatar}} first={true}/>
          <Item name="用户名" disable={true} subName={user.username} />
          <Item name="个性签名" disable={true} subName={user.profile.signature} />
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#666"
  }
})
