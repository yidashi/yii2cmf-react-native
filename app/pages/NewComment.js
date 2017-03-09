import React, {Component} from 'react';

import {
  View,
  Image,
  Text,
  Modal,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import GlobalConfig from "../../GlobalConfig"

export default class NewComment extends Component
{
  constructor(props) {
      super(props);
      this.state = {
        replyModalVisible: false,
        commentObjectType: this.props.object_type,
        commentObjectID: this.props.object_id,
        commentContent: null,
        commentParent: 0,
      }
  }

  cancle() {
    this.props.hide();
  }

  send() {
    this.cancle();
    this.props.callbackParentPushNewComment();
    return ;

    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment_object_type: this.state.commentObjectType,
        comment_object_id: this.state.commentObjectID,
        comment_content: 'a new comment test',
        comment_parent: 0
      })
    };

    fetch(url, options).then((response) => response.text())
      .then((responseData) => {
        console.log(responseData);
        this.cancle();
      }).done();

  }

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {}}
        >

        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.nav}>
            <View style={styles.cancleBtn} >
              <Text onPress={() => this.cancle()}>取消</Text>
            </View>
            <View style={styles.sendBtn}><Text onPress={() => this.send} style={{textAlign: 'right'}}>发射</Text></View>
          </View>
          <View style={{flex:1}} />
          <View style={{height: 50}} />
        </View>
      </Modal>


    );
  }

}



const styles = StyleSheet.create({
  nav: {
    //flex: 1,
    flexDirection: 'row',
    height: 70,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  cancleBtn: {
    flex: 1,
  },
  sendBtn: {
      flex: 1,
  },
});
