/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    Platform,
    AlertIOS,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    RefreshControl
} from 'react-native'
import LocalImg from '../images'
import NavBar from '../components/NavBar'
import Item from '../components/Item'
import Setting from './Setting'
import UserProfile from './UserProfile'
import px2dp from '../util'

import Icon from 'react-native-vector-icons/Ionicons'
import GlobalConfig from '../../GlobalConfig';
let {width, height} = Dimensions.get('window')
let API_URL = GlobalConfig.apiUrl.getUserInfo;
export default class My extends Component {
    constructor(props){
        super(props)
        this.state = {
            isRefreshing: false,
            user: {}
        }
        this.config = [
            {icon:"ios-heart", name:"我的投稿", color:"#fc7b53"},
            {icon:"ios-heart", name:"我的点赞", color:"#fc7b53"},
            {icon:"ios-heart", name:"我的收藏", color:"#fc7b53"},
        ]
    }
    goPage(key, data = {}){
        let pages = {

        }
        if(pages[key]){
            this.props.navigator.push({
                component: pages[key],
                args: { data }
            })
        }
    }
    leftPress(){

    }
    rightPress(){
        this.props.navigator.push({
            component: Setting,
            params: {}
        });
    }
    goProfile(){
        this.props.navigator.push({
            component: UserProfile,
            params: {}
        });
    }
    componentDidMount(){
        this._onRefresh()
    }
    _onRefresh(){
        this.setState({isRefreshing: true});
        this._fetchData();
    }
    _fetchData() {
        fetch(API_URL + 1)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                isRefreshing: false,
                article: responseData,
            });
        })
        .done();
    }
    _renderListItem(){
        return this.config.map((item, i) => {
            if(i%3==0){
                item.first = true
            }
            return (<Item key={i} {...item}/>)
        })
    }
    render() {
        let user = this.state.user;
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="我的"
                    leftIcon="ios-notifications-outline"
                    leftPress={this.leftPress.bind(this)}
                    rightIcon="ios-settings-outline"
                    rightPress={this.rightPress.bind(this)}
                />
                <ScrollView
                    style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.isRefreshing}
                          onRefresh={this._onRefresh.bind(this)}
                          tintColor="#fff"
                          colors={['#ddd', '#0398ff']}
                          progressBackgroundColor="#ffffff"
                        />
                    }
                >
                    <View style={{minHeight: height - 64 - px2dp(46), paddingBottom: 100, backgroundColor: "#f3f3f3"}}>
                        <TouchableWithoutFeedback onPress={this.goProfile.bind(this)}>
                            <View style={styles.userHead}>
                                <View style={{flex: 1,flexDirection: "row"}}>
                                    <Image source={LocalImg.avatar} style={{width: px2dp(60), height: px2dp(60), borderRadius: px2dp(30)}}/>
                                    <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                                        <Text style={{color: "#333", fontSize: px2dp(18)}}>_平行时空</Text>
                                        <View style={{marginTop: px2dp(10), flexDirection: "row"}}>
                                            <Icon name="ios-phone-portrait-outline" size={px2dp(14)} color="#333" />
                                            <Text style={{color: "#333", fontSize: 13, paddingLeft: 5}}>135****0418</Text>
                                        </View>
                                    </View>
                                </View>
                                <Icon name="ios-arrow-forward-outline" size={px2dp(22)} color="#333" />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.numbers}>
                            <TouchableWithoutFeedback>
                                <View style={styles.numItem}>
                                    <Text style={{color: "#f90", fontSize: 18, textAlign: "center", fontWeight: "bold"}}>{"999999.0元"}</Text>
                                    <Text style={{color: "#333", fontSize: 12, textAlign: "center", paddingTop: 5}}>{"余额"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View style={[styles.numItem,{borderLeftWidth: 1, borderLeftColor: "#f5f5f5",borderRightWidth: 1, borderRightColor: "#f5f5f5"}]}>
                                    <Text style={{color: "#ff5f3e", fontSize: 18, textAlign: "center", fontWeight: "bold"}}>{"1940个"}</Text>
                                    <Text style={{color: "#333", fontSize: 12, textAlign: "center", paddingTop: 5}}>{"优惠"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View style={styles.numItem}>
                                    <Text style={{color: "#6ac20b", fontSize: 18, textAlign: "center", fontWeight: "bold"}}>{"999999分"}</Text>
                                    <Text style={{color: "#333", fontSize: 12, textAlign: "center", paddingTop: 5}}>{"积分"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View>
                            {this._renderListItem()}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    scrollView: {
        marginBottom: px2dp(46),
        backgroundColor: "#000"
    },
    userHead: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#fff",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f5f5f5"
    },
    numbers: {
        flexDirection: "row",
        backgroundColor: "#fff",
        height: 74
    },
    numItem: {
        flex: 1,
        height: 74,
        justifyContent: "center",
        alignItems: "center"
    }
})
