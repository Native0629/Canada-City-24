import React from 'react';
import { StyleSheet, Modal,TouchableHighlight,Alert ,StatusBar, Text,Platform, View, ScrollView, TouchableOpacity, TextInput,Image, ImageBackground, Share, FlatList } from 'react-native';
import { MaterialIcons, Feather, Entypo } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import Style from "../../constants/Style";
import * as Font from 'expo-font';
import QRCode from 'react-native-qrcode';
import ModalView from '../ModalView';
// import QrBarcode from '../couponScreens/QrBarcode';
// import QrBarcodeAndroid from '../couponScreens/QrBarcodeAndroid';




export default class CouponDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            couponDetail_data: global.couponDetail_data,
            modalVisible: false,
        };     
        
        console.log("===============this.state.couponDetail_data================", couponDetail_data)
        
    }



    static navigationOptions = {
        header: null,
    };

    componentDidMount(){

    }

    onShare() {
        Share.share({
            message:
            'Share description',
        })
    }



 

    openQr=()=>{
        if(Platform.OS == 'ios')
        {
            this.props.navigation.navigate('QrBarcode');
         

        }
        else{

            this.props.navigation.navigate('QrBarcodeAndroid');

        }

    } 
    ScanQR=()=>{
        this.props.navigation.navigate('QrBarcodeReader');
    }
  


    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/header.png')} style={Style.header}>
                    <TouchableOpacity style={Style.left} onPress={() =>  this.props.navigation.goBack()}>
                        <Feather name='arrow-left' size={30} color="#FFF"/>
                    </TouchableOpacity>
                    <View style={Style.middle}>
                        <Text style={{  fontFamily: 'cairo-extralight', color: '#FFF', fontSize: 27 }}>{global.en_lan? "Coupon Detail" : "تفاصيل القسيمة"}</Text>
                    </View>
                </ImageBackground>
                
                <ScrollView style={{}}>
                    <Image source={require('../../assets/images/price.png')}  style={{position: 'absolute', left: 10, top: -10, zIndex: 1}}/>
                    <Swiper style={{height: 200}} showsButtons={false} loop={false}>
                        {this.state.couponDetail_data.images.map((data, index)=>(
                            <Image source={{ uri: global.server +data.image}}  style={styles.image_block} key={index}/>
                        ))}
                    </Swiper>
                    
                    <View style={styles.offerPictures}>
                        {this.state.couponDetail_data.images.map((data, index)=>(
                            <Image source={{ uri: global.server +data.image}}  style={{width: 70, height:70}} key={index}/>
                        ))}
                    </View>
                    <View style={styles.logoAndTime}>
                        <View style={styles.time}>
                            <View style={styles.timeDetail}>
                                <Text style={{ fontFamily: 'cairo-extralight', color: '#FFF', fontSize: 20}}>{this.state.couponDetail_data.time_to_end}{global.en_lan? 'Days' : 'أيام'}</Text>
                            </View>
                            <View style={styles.businessNameDetail}>
                                <Text style={{fontFamily: 'cairo-extralight', color: '#426d90'}}>{this.state.couponDetail_data.b_name}</Text>
                            </View>
                        </View>
                        <View style={styles.logo}>
                            <Image source={{ uri: global.server + this.state.couponDetail_data.b_logo}}  style={{width: '100%', height:'100%'}}/>
                        </View>
                    </View>

                    <View style={styles.newsDetail_header}>
                        <Text style={{fontFamily: 'cairo-extralight', color: '#426d90'}}>{global.en_lan? this.state.couponDetail_data.en_title : this.state.couponDetail_data.ar_title}</Text>
                    </View>
                    
                    {global.en_lan?
                        
                        <Text style={{fontFamily: 'cairo-extralight', marginHorizontal: 10}}>{this.state.couponDetail_data.en_description}</Text>
                        :
                        <View style={styles.newsDetail_header}>
                            <Text style={Style.text_font}>{this.state.couponDetail_data.ar_description}</Text>
                        </View> 
                    
                    }
                    
                    
                    <View style={styles.btnBlock}>
                        <TouchableOpacity 
                        style={styles.getOfferBtn} 
                        onPress={() => this.refModalShare.open()}
                      >
                            <Text style={{ fontFamily: 'cairo-extralight', color: '#FFF', fontSize: 20}}>{global.en_lan? "Get offer" : "احصل على عرض"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={styles.getOfferBtn} 
                        onPress={() => this.ScanQR()}
                      >
                            <Text style={{ fontFamily: 'cairo-extralight', color: '#FFF', fontSize: 20}}>{global.en_lan? "Get offer" : "احصل على عرض"}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

               
                <ModalView  ref={(c) => { this.refModalShare = c }}>
                      
                     
                    
                </ModalView>
            </View>

            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    offerPictures: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    logoAndTime: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        paddingHorizontal: 10
    },
    image_block: {
        width: '100%',
        height:200
    },
    time: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#efefef',
        marginRight: 10
    },
    timeDetail: {
        flex: 2,
        height: '100%',
        backgroundColor: '#ec2228',
        justifyContent: 'center',
        alignItems: 'center',
    },
    businessNameDetail: {
        flex: 2,
        alignItems: 'flex-end',
        padding: 10
    },
    logo: {
        flex: 1,
        padding: 7,
        backgroundColor: '#efefef',
        alignItems: 'center',
        justifyContent: 'center',

    },
     newsDetail_header: {
        paddingHorizontal: 20,
        alignItems: 'flex-end'
        
    },
    btnBlock: {
        width: '100%', 
        height: 120,  
        alignItems: 'center', 
        justifyContent: 'center',
    },
    getOfferBtn: {
        width: '70%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#426d90',
        borderRadius: 25
    }
});