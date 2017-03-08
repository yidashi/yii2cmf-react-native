'use strict';

import React, {Component} from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ListView,
    Dimensions,
    AsyncStorage
} from 'react-native';

import NavBar from '../components/NavBar';
import GlobalConfig from '../../GlobalConfig';
const API_URL = GlobalConfig.apiHost + GlobalConfig.apiMap.getNotify;
const windowWidth = Dimensions.get('window').width;
const margin = 20;
const dic = {reply:1, suggest:2, comment:3, favourite: 4, up_article: 5, message:6, reward:7, follow: 8};
const type = {album: 2, post: 4};

export default class Alarm extends Component
{

    constructor(props) {
        super(props);
        this.items = [];
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            notifications:[],
        };
    }
    componentWillReceiveProps(nextProps) {
        this.fetchData();
    }

    componentWillMount() {
        this.fetchData();
    }
    fetchData() {
        AsyncStorage.getItem('token', (error, result) => {
            fetch(API_URL + '?&access_token=' + result)
                .then((response) => response.json())
                .then((responseData) => {
                    let notifications = responseData.items;
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(notifications)
                    });
                })
                .done();
        })
    }

    renderNotification(notification) {
        //console.log('notification:' + notification);
        return (
            <TouchableOpacity style={{flex: 1,
                        flexDirection: 'row',
                        height: 54,
                        marginTop: 5,
                        marginBottom: 5,
                        paddingLeft: margin,
                        paddingRight: margin,
                        borderBottomWidth: 0.5,
                        borderColor: '#EEEEEE'}}>
                <View style={{flex:1}}>
                    <Image source={{uri:notification.from.avatar}} style={{width: 48, height: 48, borderRadius: 24}}/>
                </View>
                <View style={{flex:4, marginTop: 18, }}><Text style={{color: '#9B9B9B', fontSize: 16}}>{notification.title}</Text></View>
            </TouchableOpacity>
        );
    }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <NavBar title="消息"/>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderNotification.bind(this)}
              style={{marginTop: 0,}}
          />
      </View>
    );
  }


}
