'use strict';

import React, {Component} from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';

import CommentItem from './CommentItem';
import GlobalConfig from '../../GlobalConfig';
const API_URL = GlobalConfig.apiHost + GlobalConfig.apiMap.commentList;

export default class CommentList extends Component
{
    constructor(props) {
        super(props);
        this.items = [];
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
            replyModalVisible: false,
            commentsArray: [],
            likeCounter: this.props.likeCounter,
            commentCounter: this.props.commentCounter,
            likeed: this.props.likeed,
            commented: this.props.commented,
            limit: this.props.limit, //评论显示行数

            comment: null,
            commentBarVisible: false,
            page:1,
            pageCount: 0,
            newCommentVisible: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        REQUEST_URL = API_URL + '?expand=sons&entity=' + this.props.entity + '&entity_id=' + this.props.entity_id + '&page=' + this.state.page;
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.items = this.items.concat(responseData.items);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.items),
                    pageCount:responseData._meta.pageCount,
                    loaded: true
                });
            })
            .done();
    }
  
    renderLoadingView() {
        return (
            <View style={styles.loading}>
                <Text>Loading...</Text>
            </View>

        );
    }


    setReplyModalVisible() {
        this.setState({replyModalVisible: true});
    }

    setReplyModalInVisible() {
        this.setState({replyModalVisible: false});
    }

  addNewComment(comment) {
    let commentsArray = this.state.commentsArray;
    commentsArray.push(comment);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(commentsArray),
    });

  }

  componentWillReceiveProps(nextProps) {

    if(this.props.commentCounter == nextProps.commentCounter) return;

    if(nextProps.newComment != undefined && nextProps.newComment != null) {
        this.addNewComment(nextProps.newComment);
    }
  }

  render() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return this.renderCommentList();
  }


  showCommentBar() {
    this.setState({
      commentBarVisible: true,
    });
  }

  hideCommentBar() {
    this.setState({
      isComment: false,
      commentBarVisible: false,
    });
  }


  renderCommentList() {

      return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(comment) => this.renderRow(comment)}
          />
      );

  }

  show() {
        this.props.show();
  }
  renderRow(comment) {
    if(comment == null || comment == undefined) {
      return (<View />);
    }
    return(
      <CommentItem
          comment={comment}
          showCommentBar={true}
          hideCommentBar={false}
          onPress={() => this.props.show()}
        />
    );
  }

}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 5,
        borderColor: '#dddddd',
        borderStyle: null,
        borderWidth: 0.5,
        borderRadius: 2,
    },
});
