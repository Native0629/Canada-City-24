import React from 'react';
import { StyleSheet, Text, View,WebView, Image, SafeAreaView,Platform, TouchableOpacity, KeyboardAvoidingView, Alert, AsyncStorage, ImageBackground } from 'react-native';
import { MaterialIcons, Feather, Entypo, AntDesign } from '@expo/vector-icons';
import {useKeepAwake} from 'expo-keep-awake';
import { FontAwesome5 } from "@expo/vector-icons";
import Style from "../../constants/Style";
//import { Audio } from 'expo-av';
import * as Font from 'expo-font';
import ModalShare from '../ModalShare'

export default class RadioScreen extends React.Component {
    constructor(props)
    {
      super(props);

   //   this.audioPlayer = new Audio.Sound();

    }

    static navigationOptions = {
        header: null,
    };



    handleMessage = (e) => {
        const message = e.nativeEvent.data
        console.log('message from webview:', message)
      }
    

   render() {
  
    return <View style={styles.container}>
                <View  style={Style.header}>
                    
                    <View style={Style.middle}>
                        <Text style={{  fontFamily: 'cairo-extralight', color: '#fff', fontSize: 27 }}>{global.en_lan? 'Radio' : 'راديو'}</Text>
                    </View>
                    <TouchableOpacity style={Style.right} onPress={() => this.refModalShare.open()} >
                        <MaterialIcons name='menu' size={30} color="#fff"/>
                    </TouchableOpacity>
                </View>
                {(Platform.OS == 'ios') && (
                        <WebView
                        style={{flex:1,height:60, width:'100%', backgroundColor:'#f1f3f4'}}
                        ref={el => this.webView = el}
                        useWebKit={true}
                        source={{uri:'http://youbeksoft.com/radio'}}
                        nativeConfig={{props: {webContentsDebuggingEnabled: true}}}
                        mediaPlaybackRequiresUserAction={true}
                        allowsInlineMediaPlayback={true}                     
                        javaScriptEnabled
                        onMessage={this.handleMessage}
                        />
                )   
                }
                {(Platform.OS !== 'ios') && (
                         <WebView
                         style={{flex:1,height:60, width:'100%', backgroundColor:'#f1f3f4'}}
                         ref={el => this.webView = el}
                         useWebKit={true}
                         source={{uri:'http://youbeksoft.com/radio'}}
                         nativeConfig={{props: {webContentsDebuggingEnabled: true}}}
                         mediaPlaybackRequiresUserAction={true}
                        allowsInlineMediaPlayback={true}
                        // mixedContentMode={"always"}
                         //  source={
                        //     {
                             
                        //         html: '<audio preload="none" autoplay="autoplay" controls="controls"><source src="' + 'http://s3.voscast.com:9516/;' + '" type="audio/mpeg" /></audio>'
                        //     }
                        // }
                         javaScriptEnabled
                         onMessage={this.handleMessage}
                        />
                      
                        )   
                    }

                {/* <TouchableOpacity onPress={this.playSound}>
                    <Text >Pass to Main Page</Text>
                </TouchableOpacity> */}
                <ModalShare ref={(c) => { this.refModalShare = c }} navigation={this.props.navigation}/>   

            </View>
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subcategory_header: {
        padding: 20,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        backgroundColor: '#f1f1f1',
        borderBottomWidth: 1,
        borderColor: '#e4e4e4'
        
    },
    subcategory_block: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#e6e6e6'
    },

    container: {
        flex: 1,
        backgroundColor: "#EAEAEC"
    },
    textLight: {
        color: "#B6B7BF"
    },
    text: {
        color: "#8E97A6"
    },
    textDark: {
        color: "#3D425C"
    },
    coverContainer: {
        marginTop: 32,
        width: 250,
        height: 250,
        shadowColor: "#5D3F6A",
        shadowOffset: { height: 15 },
        shadowRadius: 8,
        shadowOpacity: 0.3
    },
    cover: {
        width: 250,
        height: 250,
        borderRadius: 125,
        resizeMode:'stretch'
    },
    track: {
        height: 2,
        borderRadius: 1,
        backgroundColor: "#FFF"
    },
    thumb: {
        width: 8,
        height: 8,
        backgroundColor: "#3D425C"
    },
    timeStamp: {
        fontSize: 11,
        fontWeight: "500"
    },
    playButtonContainer: {
        backgroundColor: "#FFF",
        borderColor: "#426d90",
        borderWidth: 3,
        width: 100,
        height: 100,
        borderRadius: 64,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 32,
        shadowColor: "#426d90",
        shadowRadius: 30,
        shadowOpacity: 0.5
    }
});

