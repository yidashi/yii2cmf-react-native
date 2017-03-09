import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import PhotoDetail from '../pages/PhotoDetail';

export default class PhotoItem extends Component
{
    goDetail(article) {
        this.props.navigator.push({
            component: PhotoDetail,
            params:{
                articleID:article.id
            }
        })
    }

    render() {
        let article = this.props.article;
        return (
            <TouchableOpacity
                onPress={() => this.goDetail(article)}
                >
                <View style={styles.row}>
                    <Text style={styles.title}>{article.title}</Text>
                    <View style={{flex:1, flexDirection: 'row', marginTop: 5}}>
                    {
                        article.data.part_photos.map((item, i) => {
                            return (<Image source={{uri: item.url}} key={i} style={styles.cover}/>);
                        })
                    }
                    </View>
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
    justifyContent: 'center',
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
