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
import NavBar from '../components/NavBar';
import PhotoSwiper from '../components/PhotoSwiper';
import GlobalConfig from '../../GlobalConfig';
const API_URL = GlobalConfig.apiHost + GlobalConfig.apiMap.articleDetail;
export default class PhotoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            article: {}
        };
    }
    fetchData() {
        this.setState({
            article: null,
        });
        fetch(API_URL + this.props.articleID + '?expand=data')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                loaded: true,
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
        if(!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <Text>loading...</Text>
                </View>
            );
        }
        let article = this.state.article;
        return (
            <View style={styles.container}>
                <NavBar title={article.title} leftPress={() => this.back()} leftIcon="ios-arrow-back"/>
                <PhotoSwiper imgList={article.data.photos}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  }
});
