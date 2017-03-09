'use strict';

import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    View,
    ScrollView
} from 'react-native';

import Swiper from 'react-native-swiper';
import PhotoView from 'react-native-photo-view';

const { width, height } = Dimensions.get('window');

export default class PhotoSwiper extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            imgList:this.props.imgList,
            showViewer: false,
            showIndex: 0,
        };
    }


    viewerPressHandle() {
        this.props.viewerPressHandle();
    }

    renderPagination(index, total, context) {
        return (
            <View style={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 25,
      left: 0,
      right: 0
    }}>
                <View style={{
        borderRadius: 7,
        backgroundColor: 'rgba(255,255,255,.15)',
        padding: 3,
        paddingHorizontal: 7
      }}>
                    <Text style={{
          color: '#fff',
          fontSize: 14
        }}>{index + 1} / {total}</Text>
                </View>
            </View>
        )
    }

    render() {
        console.log(this.state.imgList);
        return (
            <View style={{position: 'relative'}}>
                <Swiper index={this.state.showIndex}
                        style={styles.wrapper}
                        viewerPressHandle={this.viewerPressHandle}
                        renderPagination={this.renderPagination.bind(this)}
                >
                    {
                        this.state.imgList.map((item, i) => {
                            return (
                                <View style={styles.slide} key={i}>
                                    <TouchableOpacity onPress={() => this.viewerPressHandle}>
                                        <PhotoView
                                            source={{uri: item.url}}
                                            resizeMode='contain'
                                            minimumZoomScale={0.5}
                                            maximumZoomScale={3}
                                            androidScaleType='center'
                                            style={styles.photo} />
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                </Swiper>
            </View>);
    }
}


const styles = StyleSheet.create({

    feedContentImages: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10,
        marginBottom: 10,
    },
    feedContentImage: {
        width: 100,
        height:100,

    },
    wrapper: {
        backgroundColor: '#000',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        width,
        height: 300,
        flex: 1,
        marginTop: -100,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
});
