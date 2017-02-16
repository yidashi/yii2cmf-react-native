import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class ArticleItem extends Component
{
    render() {
        let article = this.props.article;
        return (
            <TouchableOpacity
                onPress={() => this.props.onPress()}
                >
                <View style={styles.row}>
                    <Text style={styles.title}>{article.title}</Text>
                    <Image
                        source={{uri: article.cover}}
                        style={styles.cover}
                    />
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
