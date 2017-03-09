'use strict';

import React, {Component} from 'react';

import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
    AsyncStorage
} from 'react-native';
import CommentList from "./CommentList";

export default class CommentItem extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            loginRegPageVisible: false,
        };
    }

  render(){
    return (
      <View>
        {this.state.loginRegPageVisible && <PopupLoginRegPage hideLoginRegPage={this.hideLoginRegPage} refresh={this.refresh}/>}
          <TouchableOpacity onPress={() => this.props.onPress()}>
          <View style={styles.commentBox}>
            <Image style={styles.avatar} source={{uri:this.props.comment.author.avatar}} />
            <View>
                <Text style={styles.username}>{this.props.comment.author.username}</Text>
                <Text style={styles.comment}>{this.props.comment.content}</Text>
            </View>
          </View>
          </TouchableOpacity>
          {this.props.comment.sons ?
              this.props.comment.sons.map((item, i) => {
                  return (
                      <View style={styles.sonBox} key={i}>
                          <CommentItem
                              key={i}
                              comment={item}
                              showCommentBar={true}
                              hideCommentBar={false}
                          />
                      </View>
                  )
              })
              : <View/>
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  commentBox: {
    flex: 1,
    flexDirection: 'row',
    // borderColor: 'black',
    // borderWidth: 1,
    padding: 10,
  },
    sonBox: {
        flex: 1,
        flexDirection: 'row',
        //borderColor: 'black',
        //borderWidth: 1,
        marginLeft: 32,
    },
  avatar: {
    borderRadius: 16,
    width: 32,
    height: 32,
    marginRight: 10,
  },
  username: {
    fontSize: 12,
    color: '#666',
    lineHeight: 13,
    marginBottom: 5,
  },
  commentTime: {

  },
  comment: {
    fontSize: 14,
    marginRight: 30,
    color: '#030303',
    lineHeight: 18,
  }
});
