import React, {Component} from 'react';
import { View, Text } from 'react-native';
import NavBar from '../components/NavBar';

export default class Home extends Component {
    render() {
        return (
            <View>
                <NavBar title="发现"/>
                <Text>发现</Text>
            </View>
        )
    }
}
