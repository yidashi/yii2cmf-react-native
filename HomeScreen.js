import React, {Component} from 'react';

import ArticleList from './ArticleList';
class HomeScreen extends Component {
    render() {
        return (
            <ArticleList navigator={this.props.navigator}/>
        )
    }
}
export default HomeScreen;
