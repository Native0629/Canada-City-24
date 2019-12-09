import React from 'react';
import { StyleSheet, StatusBar, Text, View, ScrollView, TouchableOpacity, Image, ImageBackground , RefreshControl} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import ModalShare from '../ModalShare'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { Linking } from 'react-native';
import Swiper from 'react-native-swiper';

import Style from "../../constants/Style";
import * as Font from 'expo-font';
import Category1Screen from './categoryScreens/Category1Screen';
import Category2Screen from './categoryScreens/Category2Screen';
import Category3Screen from './categoryScreens/Category3Screen';
import Category4Screen from './categoryScreens/Category4Screen';
import Category5Screen from './categoryScreens/Category5Screen';
import Category6Screen from './categoryScreens/Category6Screen';
import Category7Screen from './categoryScreens/Category7Screen';
import Category8Screen from './categoryScreens/Category8Screen';
import Category9Screen from './categoryScreens/Category9Screen';
import Category10Screen from './categoryScreens/Category10Screen';
import Category11Screen from './categoryScreens/Category11Screen';
import Category12Screen from './categoryScreens/Category12Screen';


export default class CouponScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            refreshing: false               
        };     
        this.goCouponDetailScreen=this.goCouponDetailScreen.bind(this); 
        this.gotoSelectScreen=this.gotoSelectScreen.bind(this); 

    }

    gotoSelectScreen=()=>{
        this.props.navigation.navigate('SelectScreen');
    };

    static navigationOptions = {
        header: null,
    };

    goCouponDetailScreen=()=> {
        this.props.navigation.navigate('CouponDetailScreen');
    };

    componentDidMount(){

    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/header.png')} style={Style.header}>
                    
                    <View style={Style.left}>
                    <TouchableOpacity onPress={() => Linking.openURL('http://youbeksoft.com/radio')}>
                        <FontAwesome name='podcast' size={30} color="#C21807"/>
                        </TouchableOpacity>
                    </View>
                    <View style={Style.middle}>
                        <Text style={{ fontFamily: 'cairo-semibold',  color: '#C21807', fontSize: 27 }}>{global.en_lan? "Coupons" : "كوبونات"}</Text>
                    </View>
                    <TouchableOpacity style={Style.right} onPress={() => this.refModalShare.open()}>
                        <MaterialIcons name='menu' size={30} color="#C21807"/>
                    </TouchableOpacity>
                </ImageBackground>

                <ImageBackground source={require('../../assets/images/BackgroundImage.png')} style={{width: '100%', height: '100%'}}resizeMode="stretch">
             
                <ScrollableTabView
                    initialPage={0}
                    tabBarUnderlineStyle={{backgroundColor:'#426d90'}}
                    tabBarBackgroundColor='#fff'
                    tabBarInactiveTextColor='#426d90'
                    tabBarTextColor='#426d90'
                    tabBarActiveTextColor='#426d90'
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    <Category1Screen tabLabel={global.en_lan? 'RealEstate' : 'العقارات'} method={this.goCouponDetailScreen}/>
                    <Category2Screen tabLabel={global.en_lan? 'Cars' : 'سيارات'} method={this.goCouponDetailScreen}/>
                    <Category3Screen tabLabel={global.en_lan? 'Restaurant' : 'مطعم'} method={this.goCouponDetailScreen}/>
                    <Category4Screen tabLabel={global.en_lan? 'Construction' : 'اعمال بناء'} method={this.goCouponDetailScreen}/>
                    <Category5Screen tabLabel={global.en_lan? 'Financial' : 'الأمور المالية'} method={this.goCouponDetailScreen}/>
                    <Category6Screen tabLabel={global.en_lan? 'Health' : 'الصحة'} method={this.goCouponDetailScreen}/>
                    <Category7Screen tabLabel={global.en_lan? 'Services' : 'خدمات'} method={this.goCouponDetailScreen}/>
                    <Category8Screen tabLabel={global.en_lan? 'Technology' : 'تقنية'} method={this.goCouponDetailScreen}/>
                    <Category9Screen tabLabel={global.en_lan? 'Stores' : 'مخازن'} method={this.goCouponDetailScreen}/>
                    {/* <Category10Screen tabLabel={global.en_lan? 'Events' : 'أحداث'} method={this.goCouponDetailScreen}/> */}
                    <Category11Screen tabLabel={global.en_lan? 'Money' : 'مال'} method={this.goCouponDetailScreen}/>
                    {/* <Category12Screen tabLabel={global.en_lan? 'Jobs' : 'وظائف'} method={this.goCouponDetailScreen}/> */}

                </ScrollableTabView>
                
                </ImageBackground>
                 <ModalShare
                    ref={(c) => { this.refModalShare = c }}  method={this.gotoSelectScreen}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_block: {
        width: '100%',
        height:'100%',
        resizeMode:"stretch"
    },
});