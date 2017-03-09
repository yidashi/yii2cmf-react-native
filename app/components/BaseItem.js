import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import ArticleDetail from '../pages/ArticleDetail';

export default class BaseItem extends Component
{
    goDetail(article) {
        this.props.navigator.push({
            component: ArticleDetail,
            params:{
                articleID:article.id
            }
        })
    }

    render() {
        let article = this.props.article;
        let image;
        if (article.cover != '') {
            image = <Image
                source={{uri: article.cover}}
                style={styles.cover}
            />;
        }
        return (
            <TouchableOpacity
                onPress={() => this.goDetail(article)}
                >
                <View style={styles.row}>
                    <Text style={styles.title}>{article.title}</Text>
                    {image}
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  titleRead: {
    flex: 1,
    fontSize: 16,
    color: '#777777',
  },
  row: {
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
  cover: {
    backgroundColor: '#dddddd',
    height: 60,
    marginLeft: 10,
    width: 80,
  },
});
