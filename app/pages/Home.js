import React, {Component} from 'react';
import { View, Platform } from 'react-native'
import ArticleList from '../components/ArticleList';
import NavBar from '../components/NavBar'
export default class Home extends Component {
    render() {
        return (
            <View>
                <NavBar title="首页"/>
                <ArticleList navigator={this.props.navigator}/>
            </View>
        )
    }
}
