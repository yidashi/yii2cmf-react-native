'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  Alert,
  AsyncStorage
} from 'react-native';
import GlobalConfig from "../../GlobalConfig";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const margin = 20;

const LOGIN_URL = GlobalConfig.apiHost + GlobalConfig.apiMap.login;

function trim(str){
  return str.replace(/(^\s*)|(\s*$)/g,"");
}

export default class Login extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            username: 'demo',
            password: '111111',
            animated: true,
            transparent: false,
            inTheLog: false,
        };
    }

  cancle() {
      this.props.navigator.pop()
  }

  checkInfo() {
    if(this.state.username == '' || trim(this.state.username).length == 0) {
      Alert.alert('请输入用户名');
      return false;
    }

    if(this.state.password == '' || trim(this.state.password).length == 0) {
      Alert.alert('请输入密码');
      return false;
    }
    return true;
  }

  login() {

    if(!this.checkInfo()) return;

    this.setState({
      inTheLog: true,
    });
    var url = LOGIN_URL;
    var options = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: "username=" + this.state.username + "&password=" + this.state.password
    };
    fetch(url, options).then((response) => response.json())
      .then((responseData) => {
        let errCode = responseData.errcode;
        if(errCode == 0) {
          let user = responseData.user;
          AsyncStorage.multiSet([['token', user.access_token], ['userId', user.id.toString()], ['userName', user.username], ['avatar', user.avatar]], () => {
              this.props.refresh(true);
              this.props.navigator.pop();
          });
        } else {
            Alert.alert(responseData.errmsg);
            this.setState({inTheLog: false});
        }
      }).done();

  }

  render() {
      let modalBackgroundStyle = {
          backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
      };
      let innerContainerTransparentStyle = this.state.transparent ? {backgroundColor: '#fff', padding: 20} : null;
    return (
            <View style={{flex:1}}>
              <View style={styles.cancleBtn}>
                <TouchableOpacity onPress={() => this.cancle()}>
                  <Image style={{width: 16, height: 16}} source={require('../images/multiply.png')}/>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <View style={{marginTop: 100, height: 100,}}>
                  <Image style={{width: 100, height: 100}} source={require('../images/default-avatar.jpg')}/>
                </View>

                <View style={styles.inputs}>
                  <TextInput
                    style={{height: 40,
                            width: windowWidth-margin*2,
                            padding:10,
                            borderColor: '#9B9B9B',
                            borderWidth: 0.2,
                            borderRadius: 3,
                            color: '#9B9B9B'}}
                    placeholder="用户名/邮箱"
                    editable={this.state.inTheLog ? false: true}
                    onChangeText={(username) => this.setState({username})}
                    defaultValue={this.state.username}
                  />
                  <TextInput
                            style={{height: 40,
                                    width: windowWidth-margin*2,
                                    padding: 10,
                                    borderColor: '#9B9B9B',
                                    borderWidth: 0.2,
                                    marginTop: 10,
                                    borderRadius: 3,
                                    color: '#9B9B9B'}}
                            placeholder="密码"
                            editable={this.state.inTheLog ? false: true}
                            onChangeText={(password) => this.setState({password})}
                            defaultValue={this.state.password}
                          />
                  <View>
                    {
                      this.state.inTheLog ?
                      <View style={[styles.loginBtn, {backgroundColor: '#f16705'}]}>
                        <Text style={{color: 'white', fontSize: 16}}>登录中</Text>
                      </View> :
                      <TouchableOpacity onPress={() => this.login()} style={styles.loginBtn}>
                        <Text style={{color: 'white', fontSize: 16}}>登录</Text>
                      </TouchableOpacity>
                    }

                  </View>
                </View>
              </View>

            </View>
    );
  }

}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cancleBtn: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
  },

  inputs: {
    marginTop: 30,
  },
  loginBtn: {
    width: windowWidth-margin*2,
    height: 40,
    marginTop: 10,
    borderRadius: 3,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f16705',
  },

});
