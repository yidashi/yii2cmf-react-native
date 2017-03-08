import React, {Component} from 'react';
import { View, Platform } from 'react-native'
import ArticleList from '../components/ArticleList';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabViewBar from '../components/TabViewBar'
export default class Home extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <ScrollableTabView renderTabBar={() => <TabViewBar/>}>
                    <ArticleList navigator={this.props.navigator} tabLabel="文章"/>
                    <ArticleList navigator={this.props.navigator} tabLabel="相册"/>
                </ScrollableTabView>
            </View>
        )
    }
}
