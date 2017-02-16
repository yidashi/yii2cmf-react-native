import React, { Component } from 'react';
import {
    Platform,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableNativeFeedback,
    TouchableHighlight,
    ToastAndroid,
} from 'react-native';

class DetailToolbar extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            comment:this.props.comment ? this.props.comment: null,
            up:this.props.up ? this.props.up : null
        };
    }
  _onPressBackButton() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  }
  _onPressShareButton() {
    // TODO:
    ToastAndroid.show('分享', ToastAndroid.SHORT);
  }
  _onPressCollectButton() {
    // TODO:
    ToastAndroid.show('收藏', ToastAndroid.SHORT);
  }
  _onPressCommentButton() {
    // TODO:
    ToastAndroid.show('评论', ToastAndroid.SHORT);
  }
  _onPressPriseButton() {
    // TODO:
    ToastAndroid.show('赞', ToastAndroid.SHORT);
  }
  render() {
    let TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return(
      <View {...this.props}>
        <View style={styles.actionsContainer}>
          <TouchableElement onPress={this._onPressBackButton.bind(this)}>
            <View style={styles.actionItem}>
              <Image
                style={styles.backIcon}
                source={require('./assets/ic_back_white.png')}
                resizeMode='contain' />
            </View>
          </TouchableElement>
          <View style={{flex: 1}} />
          <TouchableElement onPress={this._onPressShareButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIcon}
                source={require('./assets/ic_share_white.png')}
                resizeMode='contain' />
            </View>
          </TouchableElement>
          <TouchableElement onPress={this._onPressCollectButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIcon}
                source={require('./assets/ic_collect_white.png')}
                resizeMode='contain' />
            </View>
          </TouchableElement>
          <TouchableElement onPress={this._onPressCommentButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIconWithCount}
                source={require('./assets/ic_comment_white.png')}
                resizeMode='contain' />
              <Text style={styles.count}>
                {this.state.comment != null  ? this.state.comment : '...'}
              </Text>
            </View>
          </TouchableElement>
          <TouchableElement onPress={this._onPressPraiseButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIconWithCount}
                source={require('./assets/ic_praise_white.png')}
                resizeMode='contain' />
              <Text style={styles.count}>
                {this.state.up != null ? this.state.up : '...'}
              </Text>
            </View>
          </TouchableElement>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  actionsContainer: {
    height: 56,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 32,
    height: 32,
    marginLeft: 8,
    marginRight: 8,
  },
  actionItem: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  actionIcon: {
    width: 32,
    height: 32,
  },
  actionIconWithCount: {
    width: 32,
    height: 32,
    marginLeft: 5,
  },
  count: {
    fontSize: 16,
    color: 'white',
    marginRight: 5,
  },
});

export default DetailToolbar;
