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
import NavBar from '../components/NavBar'
import CommentList from './CommentList';

export default class Suggest extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <NavBar title="留言板"/>
                <CommentList entity="suggest" entity_id="1"/>
            </View>
        );
    }
}