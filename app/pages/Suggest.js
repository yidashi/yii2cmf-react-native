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
    RefreshControl,
    Alert
} from 'react-native'
import NavBar from '../components/NavBar'
import CommentList from './CommentList';
import NewComment from './NewComment';

export default class Suggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCommentVisible: false
        }
    }
    showNewComment() {
        this.setState({
            newCommentVisible:true
        })
    }
    hideNewComment() {
        this.setState({
            newCommentVisible:false
        })
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <NavBar title="留言板" rightIcon="ios-add" rightPress={() => this.showNewComment()}/>
                <CommentList entity="suggest" entity_id="1" show={this.showNewComment.bind(this)} hide={this.hideNewComment.bind(this)}/>
                <NewComment visible={this.state.newCommentVisible} show={this.showNewComment.bind(this)} hide={this.hideNewComment.bind(this)}/>
            </View>
        );
    }
}