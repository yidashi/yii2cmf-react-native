import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    RefreshControl
} from 'react-native';
import BaseItem from './BaseItem';
import PhotoItem from './PhotoItem';
import GlobalConfig from '../../GlobalConfig';
const API_URL = GlobalConfig.apiHost + GlobalConfig.apiMap.articleList;
export default class ArticleList extends Component
{
    constructor(props) {
        super(props);
        this.items = [];
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            isLoadingMore: false,
            loaded: false,
            isRefreshing: false,
            page:1,
            pageCount: 0
        };
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        REQUEST_URL = API_URL + '?module=' + this.props.module + '&expand=data&page=' + this.state.page;
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.items = this.items.concat(responseData.items);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.items),
                    pageCount:responseData._meta.pageCount,
                    loaded: true,
                    isLoadingMore:false
                });
            })
            .done();
        this.state.page++;
    }
    renderLoadingView() {
        return (
            <View style={styles.loading}>
                <Text>
                    Loading...
                </Text>
            </View>
        );
    }
    onRefresh() {
        this.items = [];
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            isLoadingMore: false,
            loaded: false,
            isRefreshing: false,
            page:1,
            pageCount: 0
        };
        this.fetchData();
    }
    onEndReached() {
        if (this.state.isLoadingMore || this.state.page >= this.state.pageCount) {
            return;
        }

        this.setState({
            isLoadingMore: true
        });

        this.fetchData();
    }
    renderFooter() {
        if(this.state.isLoadingMore) {
            return (
                <View style={styles.footer}>
                <Text>正在加载...</Text>
                </View>
            );
        } else if(this.state.page >= this.state.pageCount){
            return(
                <View style={styles.footer}>
                    <Text style={{color: '#adadad'}}>没有更多了</Text>
                </View>
            );
        }
    }
    render() {
        if(!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderItem.bind(this)}
                renderFooter={this.renderFooter.bind(this)}
                onEndReached={this.onEndReached.bind(this)}
                onEndReachedThreshold={10}
                refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={() => this.onRefresh()}
                  tintColor="#F3F3F3"
                  title="刷新中..."
                  titleColor="#9B9B9B"
                  colors={['#F3F3F3', '#F3F3F3', '#F3F3F3']}
                  progressBackgroundColor="#F3F3F3"
                />
              }
            />
        );
    }
    renderItem(article) {
        switch (this.props.module) {
            case 'base':
                return (
                    <BaseItem
                        article={article}
                        navigator={this.props.navigator}
                    />
                );
                break;
            case 'photo':
                return (
                    <PhotoItem
                        article={article}
                        navigator={this.props.navigator}
                    />
                );
                break;
        }

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
    footer: {
        width:Dimensions.get('window').width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
