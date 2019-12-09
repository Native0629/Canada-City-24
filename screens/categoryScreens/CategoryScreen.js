import React from 'react';
import {Platform, StyleSheet, StatusBar, Text, View, ScrollView, TouchableOpacity, Image,    TextInput,  ImageBackground } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import ModalShare from '../ModalShare'
import * as Font from 'expo-font';
import Style from "../../constants/Style";
import { Linking } from 'react-native';    
import SyrianCategory from '../TvScreens/TvCategories/SyrianCategory';
import Swiper from 'react-native-swiper';
import { width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default class CategoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigate = this.props.navigation.navigate;
        this.state = { 
            platenium: [],
            gold: [],
            notification: {},   
            searchKeyword: '',
        };     
    }

    componentWillMount(){
    }

    registerForPushNotificationsAsync = async() => {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
      
        // only ask if permissions have not already been determined, because iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        //   console.log("finalStatus==========", finalStatus);
        }
      
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
        

        try {
            // Get the token that uniquely identifies this device
            let token = await Notifications.getExpoPushTokenAsync();
            global.token = token
            // console.log("token ===========", global.token);
            // POST the token to your backend server from where you can retrieve it to send push notifications. 
            fetch(global.server + '/api/token_update1?', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  //  "user_id": global.user_id,
                    "token": global.token,
                    "countryID":global.country_id,
                    "cityID":global.city_id,
                    "langID":global.en_lan
                }),
            }).then((response) => response.json())
            .then((responseJson) => {
                 console.log("User table was updated======", responseJson,global.token);
            }).done();

        } catch (error) {
            console.log('Device token update failed');
        }
    }

    async componentDidMount(){
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('chat-messages', {
                name: 'Chat messages',
                sound: true,
                priority: 'high',
                vibrate: [0, 250, 250, 250],
            });
        }

        this.registerForPushNotificationsAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);

        var url =  global.server + "/api/ads?" + "country_id=" + global.country_id + "&city_id=" + global.city_id ;
        console.log("ads url:   ", url);
        fetch(url, {
            method: 'GET'
        }).then((response) => response.json())
        .then((res)=>{
            if(res.status == "200"){
                this.setState({platenium: res.images,gold: res.images1, subcategory: res.subcategory, category: res.category});
                console.log('Categories Right Side: ', this.state.platenium,this.state.gold);
            }else{ }
        })
    }

    _handleNotification = (notification) => {
        this.setState({notification: notification});
        // console.log("notification==============>", this.state.notification);
        console.log("notification==============>", this.state.notification.origin);
        console.log("notification==============>", this.state.notification.data);

        if( this.state.notification.origin == "selected"){
            
            if(this.state.notification.data.type == 1){
                console.log("notification1==============>", "offer");
                global.offerDetail_data = this.state.notification.data;
                this.props.navigation.navigate('OfferDetailScreen');

            }else
            if(this.state.notification.data.type == 2){
                console.log("notification2==============>", "ads");
                
                this.props.navigation.navigate('AdsDetailScreen', { ads_id: this.state.notification.data.id} );

            }else
            if(this.state.notification.data.type == 3){
                console.log("notification3==============>", "news");
                global.newsDetail_data = this.state.notification.data;
                this.props.navigation.navigate('NewsDetailScreen');

            }else
            if(this.state.notification.data.type == 4){
                console.log("notification4==============>", "coupon");
                global.couponDetail_data = this.state.notification.data;
                this.props.navigation.navigate('CouponDetailScreen');

            }
        }

    };

    static navigationOptions = {
        header: null,
    };

    
    _search() {
        global.ads_location = this.state.searchKeyword;
        this.props.navigation.navigate('AdsSearchScreen')
        console.log("ads_location", global.ads_location);
    }


    render() {
        return (
            <View style={styles.container}>

                <View  style={Style.header}>
                    <View style={{flex: 1}}></View>
                    <View style={Style.middle}>
                        <Text style={{  fontFamily: 'cairo-semibold', color: '#fff', fontSize: 27 }}>{global.en_lan? "Categories" : "الاقسام"}</Text>
                    </View>
                    <TouchableOpacity style={Style.right} onPress={() => this.refModalShare.open()}>
                        <MaterialIcons name='menu' size={30} color="#fff"/>
                    </TouchableOpacity>
                </View>

                <View  style={Style.header1}>
                    <Text style={{  fontFamily: 'cairo-semibold', color: '#1f1f1f', fontSize: 16, marginLeft: 20 }}>Current Location: {global.currentlocation}</Text>
                </View>
                
                <View  style={Style.header1}>
                    <TextInput style={styles.txtInput} placeholder="What Are You Looking For ?" value={this.state.searchKeyword} onChangeText={(value) => this.setState({ searchKeyword: value })} />

                    <View style={{ flex: 1,  backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this._search()}>
                            <FontAwesome name='search' size={20} color="#a9adb2" />
                        </TouchableOpacity>
                    </View>
                </View>


                <ImageBackground source={require('../../assets/images/BackgroundImage.png')} style={{width: '100%', height: '100%'}}resizeMode="stretch">

                    
                <View style={{ flexDirection:'row'}}>
                
                    <View style={{ marginTop: 10}}>
                        <ScrollView style={{padding: 2, marginBottom:80}}showsVerticalScrollIndicator={false} >
                    
                            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5,borderRadius:10, borderColor: '#dddddd' ,backgroundColor:'#fff'}}>
                                <TouchableOpacity style={{ height: 100, padding: 20, alignItems: "center", }}
                                                                                    onPress={()=>this.navigate('CategoryDetailScreen', { category_id: 1})}>
                                    <Image source={require('../../assets/images/estate.png')}  style={{}}/>
                                    <Text style={Style.text_font}>{global.en_lan? 'RealEstate' : 'العقارات'}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5,borderRadius:10, borderColor: '#dddddd',backgroundColor:'#fff' }}>
                                <TouchableOpacity style={{flex: 1, height: 100, padding: 20, alignItems: "center", }} 
                                                                                    onPress={()=>this.navigate('CategoryDetailScreen', { category_id: 2})}>
                                    <Image source={require('../../assets/images/car.png')}  style={{}}/>
                                    <Text style={Style.text_font}>{global.en_lan? 'Automotive' : 'سيارات'}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5,borderRadius:10, borderColor: '#dddddd' ,backgroundColor:'#fff'}}>
                                <TouchableOpacity style={{flex: 1, height: 100, padding: 20, alignItems: "center", }} 
                                                                                    onPress={()=>this.navigate('CategoryDetailScreen', { category_id: 3})}>
                                    <Image source={require('../../assets/images/restaurant.png')}  style={{}}/>
                                    <Text style={Style.text_font}>{global.en_lan? 'Restaurant' : 'مطعم'}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5,borderRadius:10, borderColor: '#dddddd',backgroundColor:'#fff' }}>
                                <TouchableOpacity style={{flex: 1, height: 100, padding: 20, alignItems: "center", }} 
                                                                                    onPress={()=>this.navigate('CategoryDetailScreen', { category_id: 4})}>
                                    <Image source={require('../../assets/images/construction.png')}  style={{ }}/>
                                    <Text style={Style.text_font}>{global.en_lan? 'Construction' : 'اعمال بناء'}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5,borderRadius:10, borderColor: '#dddddd',backgroundColor:'#fff' }}>
                                <TouchableOpacity style={{flex: 1, height: 100, padding: 20, alignItems: "center", }} 
                                                                                    onPress={()=>this.navigate('CategoryDetailScreen', { category_id: 5})}>
                                    <Image source={require('../../assets/images/finalcial.png')}  style={{}}/>
                                    <Text style={Style.text_font}numberOfLines={1}>{global.en_lan? 'Financial Services' : 'الأمور المالية'}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5,borderRadius:10, borderColor: '#dddddd',backgroundColor:'#fff' }}>
                                <TouchableOpacity style={{flex: 1, height: 100, padding: 20, alignItems: "center", }} 
                                                                                    onPress={()=>this.navigate('CategoryDetailScreen', { category_id: 6})}>
                                    <Image source={require('../../assets/images/health.png')}  style={{}}/>
                                    <Text style={Style.text_font}numberOfLines={1}>{global.en_lan? 'Health and Medicine' : 'الصحة'}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5,borderRadius:10, borderColor: '#dddddd',backgroundColor:'#fff' }}>
                                <TouchableOpacity style={{flex: 1, height: 100, padding: 20, alignItems: "center", }} 
                                                                                    onPress={()=>this.navigate('CategoryDetailScreen', { category_id: 7})}>
                                    <Image source={require('../../assets/images/services.png')}  style={{ }}/>
                                    <Text style={Style.text_font}>{global.en_lan? 'Services' : 'خدمات'}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5,borderRadius:10, borderColor: '#dddddd' ,backgroundColor:'#fff'}}>
                                <TouchableOpacity style={{flex: 1, height: 100, padding: 20, alignItems: "center", }} 
                                                                                    onPress={()=>this.navigate('CategoryDetailScreen', { category_id: 8})}>
                                    <Image source={require('../../assets/images/technology.png')}  style={{}}/>
                                    <Text style={Style.text_font}>{global.en_lan? 'Technology' : 'تقنية'}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5,borderRadius:10, borderColor: '#dddddd',backgroundColor:'#fff' }}>
                                <TouchableOpacity style={{flex: 1, height: 100, padding: 20, alignItems: "center", }} 
                                                                                    onPress={()=>this.navigate('CategoryDetailScreen', { category_id: 9})}>
                                    <Image source={require('../../assets/images/store.png')}  style={{}}/>
                                    <Text style={Style.text_font}>{global.en_lan? 'Stores' : 'مخازن'}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5,borderRadius:10, borderColor: '#dddddd' ,backgroundColor:'#fff'}}>
                                <TouchableOpacity style={{flex: 1, height: 100, padding: 20, alignItems: "center", }} 
                                                                                    onPress={()=>this.navigate('eventScreen')}>
                                    <Image source={require('../../assets/images/event.png')}  style={{ }}/>
                                    <Text style={Style.text_font}>{global.en_lan? 'Events' : 'أحداث'}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5,borderRadius:10, borderColor: '#dddddd' ,backgroundColor:'#fff'}}>
                                <TouchableOpacity style={{flex: 1, height: 100, padding: 20, alignItems: "center", }} 
                                                                                    onPress={()=>this.navigate('CategoryDetailScreen', { category_id: 11})}>
                                    <Image source={require('../../assets/images/money.png')}  style={{}}/>
                                    <Text style={Style.text_font}>{global.en_lan? '$ Exchange' : 'مال'}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5,borderRadius:10, borderColor: '#dddddd',backgroundColor:'#fff' }}>
                                <TouchableOpacity style={{flex: 1, height: 100, padding: 20, alignItems: "center", }} 
                                                                                    onPress={()=>this.navigate('jobScreen')}>
                                    <Image source={require('../../assets/images/job.png')}  style={{}}/>
                                    <Text style={Style.text_font}>{global.en_lan? 'Jobs' : 'وظائف'}</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>
                     

                    <ScrollView padding={20} marginBottom={80} marginTop={30} >
 
                    {this.state.platenium.length >=1?
                        <Swiper style={{height: 250,borderRadius:10}} showsButtons={false} loop={true} autoplay={true} autoplayTimeout={2.5} >
                            {this.state.platenium.map((data, index)=>(
                                <TouchableOpacity   onPress={()=>this.navigate('AdsDetailScreen', { ads_id: data.ads_id})} key={index}>
                                    <Image source={require('../../assets/images/price.png')}  style={{position: 'absolute', right: 10, top: -10, zIndex: 1}}/>
                                    <Image source={{ uri: global.server + data.image}}  style={{height: 250,width:'100%',borderRadius:10,borderWidth:4,borderColor:'#dddddd',resizeMode:'stretch'}} key={index}/>
                              </TouchableOpacity>
                           ))}

                        </Swiper>     
                              :
                              null
                        }

                         {this.state.gold.length >=1?
                        <Swiper style={{height: 250,marginTop:10}} showsButtons={false} loop={true} autoplay={true} autoplayTimeout={2.5} >
                            {this.state.gold.map((data, index)=>(
                                <TouchableOpacity   onPress={()=>this.navigate('AdsDetailScreen', { ads_id: data.ads_id})} key={index}>
                                    <Image source={require('../../assets/images/price.png')}  style={{position: 'absolute', right: 10, top:-10, zIndex: 1}}/>
                                    <Image source={{ uri: global.server + data.image}}  style={{height: 250,width:'100%',borderRadius:10,borderWidth:4,borderColor:'#dddddd',resizeMode:'stretch'}} key={index}/>
                              </TouchableOpacity>
                           ))}
                        </Swiper>     
                              :
                              null
                        } 

                    
                    </ScrollView> 

                     {/* <ScrollView padding={10} marginBottom={80} marginTop={10} >
                        {this.state.last_ads.map((data, index)=>(
                            <View style={Style.business_block} key={index}>
                               
                                <TouchableOpacity   onPress={()=>this.navigate('AdsDetailScreen', { ads_id: data.id})}>
                                    <Image source={{ uri: global.server + data.attachment}} style={{width: 100, height:90}} resizeMode='stretch'/>
                                </TouchableOpacity>

                                <View style={styles.txtViewCon}>
                                    <View style={{ width: width(50), alignItems:'flex-start' }}>
                                        <Text style={styles.subHeadingTxt}>{global.en_lan? data.en_name : data.ar_name}</Text>
                                    </View>
                                    <View style={{ width: width(50), alignItems:'flex-start' }}>
                                        <Text style={styles.txtViewHeading}>{global.en_lan? data.en_title : data.ar_title}</Text>
                                    </View>
                                    <View style={styles.ratingCon}>
                                    
                                        <Icon
                                            size={20}
                                            name='eye'
                                            type='evilicon'
                                            color='#8a8a8a'
                                            containerStyle={{ marginLeft: 0, marginVertical: 3 }}/>
                                        <Text style={styles.ratingTxt}>{data.view_counts}</Text>
                                    </View>
                                    <View style={{ marginTop: 2, width: width(45), marginHorizontal: 8, flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon
                                            size={18}
                                            name='calendar'
                                            type='evilicon'
                                            color='#8a8a8a'
                                            containerStyle={{ marginHorizontal: 0, marginVertical: 0 }}
                                        />
                                        <Text style={{ fontSize: 10, color: '#8a8a8a' }}>{data.en_description}</Text>
                                    </View>
                                </View>

                            </View>
                        ))}
                        <View style={{height: 20}}/>
                    </ScrollView>  */}
                    </View>
                     

                </ImageBackground>

                <ModalShare ref={(c) => { this.refModalShare = c }} navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        // backgroundColor: ''

    },
    ratingTxt: {
        marginHorizontal: 2,
        marginVertical: 3,
        fontSize: 11, //totalSize(S15)
        color: '#8a8a8a',
      },
    ratingCon: {
        // height: height(8),
        marginTop: 3,
        marginLeft: 7,
        width: 55,
        flexDirection: 'row',
      },
      featuredFLItem: {
        alignSelf:'center',
        marginHorizontal: 5,
     
        height: 118,
        width: width(90),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        marginVertical: 5,
        marginBottom: 6
      },
      featuredImg: {
        height: 118,
        width: width(32),
        alignSelf: 'stretch',
        margin: 0,
        alignItems: 'flex-start',
        borderRadius: 5
      },
    subHeadingTxt: {
        marginTop: 0,
        marginLeft: 10,
        fontSize: 11, //totalSize(S15),
        textAlign: 'left',
        width: 250
      },
      txtViewHeading: {
        textAlign: 'left',
        fontWeight: 'bold',
        // height: height(6),
        // width: width(45),
        marginTop: 3,
        marginBottom: 1,
        marginLeft: 10,
        fontSize: 14, //totalSize(S16)
        color: 'black',
      },
    txtViewCon: {
        height: 115,
        width: 55,
     
      },
    newsBlock: {
        height: 250,
        borderColor: '#b3b3c2',
        borderWidth: 0.5,
        marginBottom: 20
    },
    newsBlock_description: {
        padding: 5
    },
    image_block: {
       
       
       
    },
   
});