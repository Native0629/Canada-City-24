import React from 'react';
import { StyleSheet, Text, View,WebView,Dimensions,Image, SafeAreaView,Platform, TouchableOpacity, KeyboardAvoidingView, Alert, AsyncStorage, ImageBackground, BackHandler } from 'react-native';
import { MaterialIcons, Feather, Entypo, AntDesign } from '@expo/vector-icons';
import { activateKeepAwake  } from 'expo-keep-awake';
import { FontAwesome5 } from "@expo/vector-icons";
import Style from "../../constants/Style";
import { Video } from 'expo-av';
//import {ScreenOrientation} from 'expo'
export default class TvScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            tvDetail_data: global.tvDetail_data,
            islandscape:false,
             v_width:300,
              v_height:600
        };     

        console.log("===============this.state.couponDetail_data================", tvDetail_data.url)
    }

    static navigationOptions = {
        header: null,
    };

    handleMessage = (e) => {
        const message = e.nativeEvent.data
        console.log('message from webview:', message)
    }
  
    componentDidMount() {
        //ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
        Dimensions.addEventListener('change', this.orientationMode.bind(this))
       
      }
     
      
      componentWillUnmount() {
        clearInterval(this._interval);
      }

      orientationMode = async() => {
        var width_ori = await Dimensions.get('window').width;
        var height_ori = await Dimensions.get('window').height;
        if(width_ori>height_ori)
        {
           this.setState({islandscape:true, v_width:width_ori, v_height:height_ori})
        }
        // else
        // {
        //     this.setState({islandscape:false, v_width:width_ori, v_height:height_ori})
        // }
    }  
  
    
     _handleVideoRef = component => {
         const playbackObject = component;
        playbackObject.loadAsync({uri:this.state.tvDetail_data.url})
    //     console.log("===============Nadeeeeeeeeeeeeeeeeeer==")

     }
    _playbackCallback(playbackStatus)
    {
        
        //console.log(playbackStatus)
    }
    onGoBack=async()=>
   {
    //await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
    this.props.navigation.goBack()
   }
    render() {
        activateKeepAwake();
        return <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/header.png')} style={Style.header}>
                    <TouchableOpacity style={Style.left} onPress={() =>  this.onGoBack()}>
                        <Feather name='arrow-left' size={30} color="#C21807"/>
                    </TouchableOpacity>
                    <View style={Style.middle}>
                        <Text style={{  fontFamily: 'cairo-extralight', color: '#C21807', fontSize: 27 }}>{global.en_lan? 'TV' : 'مذياع'}</Text>
                    </View>
                    <View style={{flex: 1}}>
                    </View>
                </ImageBackground>
                
                {(Platform.OS == 'ios') && (
                 
                        
                        <View style={styles.videoView}>
                        <Video
                        
                        source={{ uri: this.state.tvDetail_data.url ,type:'m3u8'}}
                        isLoaded
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="stretch"
                        shouldPlay
                        isLooping
                        style={{ width:this.state.v_width, height:this.state.v_height, zIndex:1003 }}
                      />
                      </View>
                )   
                }
                {(Platform.OS !== 'ios') && (
                    <View style={styles.videoView}>

                        <Video
                           source={{ uri: this.state.tvDetail_data.url ,type:'m3u8'}}
                             rate={1.0}
                             androidImplementation='MediaPlayer'
                           // ref={this._handleVideoRef}
                           onPlaybackStatusUpdate={this._playbackCallback.bind(this)}
                             volume={1.0}
                             isMuted={false}
                            
                             resizeMode="stretch"
                            shouldPlay
                             isLooping
                             style={{ width:this.state.v_width, height:this.state.v_height, zIndex:1003 }}
                            />

                        </View>)   
                    }


                

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
    videoView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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

