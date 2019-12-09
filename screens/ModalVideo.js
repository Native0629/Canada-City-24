import React from 'react';
import Modal from 'react-native-modal'
import {Dimensions, TouchableOpacity} from 'react-native';
import {Ionicons, } from '@expo/vector-icons';

import { StyleSheet, Text, View,Platform } from 'react-native';
import * as Font from 'expo-font';

import { Video } from 'expo-av';

export default class ModalShare extends React.Component {
    constructor() {
        super()
        this.state = {
            visibleModal: false,
            refreshing: false,
            isMounted: false
        }
    }
   
    componentDidMount() {
        this.setState({isMounted: true});

        console.log(global.server + global.video_url);
    }

    componentWillUnmount(){
        this.state.isMounted = false;
        global.video_url = null;
        console.log("Hello my big stress!!");
    }

    open() {
        this.setState({visibleModal: true});
    }

    render() {
        return <View>
                <Modal isVisible={this.state.visibleModal}>
                    <View style={styles.modalContainer}>
                        <View style={{alignItems: 'flex-end' }}>
                            <TouchableOpacity  onPress={()=>this.setState({visibleModal: false})}>
                                <Ionicons name={'md-close-circle'} size={30} color={'#FFF'}/>
                            </TouchableOpacity>
                        </View>

                        {(Platform.OS !== 'ios') && (
                            <View style={{marginTop:'40%',alignItems: 'center' ,flex:1}}>
                                <Video
                                    source={{ uri: global.video_url? global.server + global.video_url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="cover"
                                    shouldPlay
                                    isLooping
                                    style={{ width: '100%', height: 300 }}
                                    />
                            </View>
                        )}
                        
                        {(Platform.OS == 'ios') && (
                            <View style={{marginTop:'40%',alignItems: 'center' ,flex:1}}>
                                <Video
                                    source={{ uri: global.video_url? global.server + global.video_url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="cover"
                                    shouldPlay
                                    isLooping
                                    style={{ width: '100%', height: 300 }}
                                />
                            </View>
                        )}
                    </View>
                </Modal>
            </View>
        }
    }

    const styles = StyleSheet.create({
        modalContainer: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,

    },   
    modalContainer1: {

        backgroundColor: '#FFF', 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10,
        justifyContent:'center',
        alignItems:'center'
    },


    bottomModal: {
        alignItems: 'center',
        margin: 0,
    },
    
    modalsmallContainer: {
        width:'100%',
        height:'50%',
        alignItems:'center',
        justifyContent:'center'
        },
    });


