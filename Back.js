import React, {Component} from 'react';
import {
    Image,
    TouchableOpacity
} from 'react-native';

export default class Back extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('./assets/ic_back_white.png')}
          style={[{ width: 20, height: 20, }, this.props.style]}/>
      </TouchableOpacity>
    );
  }
}