import React, { Component } from 'react';
import {
    View,
    Text,
    WebView,
    StyleSheet,
    Platform,
    ActivityIndicatorIOS,
    TouchableOpacity,
} from 'react-native';

import HomeScreen from './HomeScreen';
import DetailToolbar from './DetailToolbar';
import GlobalConfig from './GlobalConfig';
var API_URL = GlobalConfig.apiUrl.articleDetail;
class ArticleDetailScreen extends Component {
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
        fetch(API_URL + this.props.articleID + '?expand=html')
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

    _pressButton() {
        const navigator = this.props.navigator;
        console.log(navigator);
        if(navigator) {
            navigator.pop();
        }
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
                  + this.state.article.html
                  + '</body></html>';
                  console.log(html);
                return (
                    <View style={styles.container}>
                        <WebView
                            style={styles.content}
                            source={{html:html}}
                        ></WebView>
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
  },
  content: {
    flex: 1,
  },
  footer:{
      height:44
  }
});
export default ArticleDetailScreen
