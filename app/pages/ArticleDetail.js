import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    ActivityIndicatorIOS,
    TouchableOpacity,
    BackAndroid
} from 'react-native';
import MyWebView from '../components/MyWebView';
import NavBar from '../components/NavBar';
import GlobalConfig from '../../GlobalConfig';
var API_URL = GlobalConfig.apiHost + GlobalConfig.apiMap.articleDetail;
export default class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:false,
            article:null
        };
    }
    fetchData() {
        this.setState({
            isLoading: true,
            article: null,
        });
        fetch(API_URL + this.props.articleID + '?expand=data')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                isLoading: false,
                article: responseData,
            });
        })
        .done();
    }
    componentDidMount() {
        this.fetchData();
    }
    back() {
        this.props.navigator.pop()
    }
    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.back.bind(this));
    }
    render() {
        if(this.state.isLoading) {
            return (
                <View>
                    <Text>loading...</Text>
                </View>
            );
        } else {
            if(this.state.article) {
                let html = '<!DOCTYPE html><html><head>'
                  + '</head><body>'
                  + this.state.article.data.content
                  + '</body></html>';
                return (
                    <View style={styles.container}>
                        <NavBar
                            title={this.state.article.title}
                            leftIcon="ios-arrow-back"
                            leftPress={this.back.bind(this)}
                            rightPress={()=>{}}
                        />
                        <MyWebView
                            style={styles.content}
                            source={{html:html}}
                        />
                    </View>
                );
            }else {
                return (
                    <View>
                        <Text>加载失败</Text>
                    </View>
                );
            }
        }
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
