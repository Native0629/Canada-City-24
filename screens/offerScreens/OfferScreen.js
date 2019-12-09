import React from 'react';
import { Platform, StyleSheet, StatusBar, Text, View, ScrollView, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { Linking } from 'react-native';
import Style from "../../constants/Style";

import ModalShare from '../ModalShare'
import ModalSelect from '../ModalSelect'

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


export default class OfferScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            refreshing: false,
            searchKeyword: '',   
        };    
        this.goOfferDetailScreen=this.goOfferDetailScreen.bind(this); 
        this.gotoSelectScreen=this.gotoSelectScreen.bind(this); 
    }

    gotoSelectScreen=()=>{
        this.props.navigation.navigate('SelectScreen');
    }

    static navigationOptions = {
        header: null,
    };

    goOfferDetailScreen=()=> {
        this.props.navigation.navigate('OfferDetailScreen');
    }

    _search() {
        global.offer_location = this.state.searchKeyword;
        console.log("offer---------------------------------------------------");
        this.props.navigation.navigate('OfferSearchScreen');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={Style.header}>
                    <View style={{flex:1}}></View>
                    <View style={Style.middle}>
                        <Text style={{  fontFamily: 'cairo-semibold', color: '#fff', fontSize: 27 }}>{global.en_lan? "Offers" : "عروض"}</Text>
                    </View>
                    <TouchableOpacity style={Style.right} onPress={() => this.refModalShare.open()} >
                        <MaterialIcons name='menu' size={30} color="#fff"/>
                    </TouchableOpacity>
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
           
                <ScrollableTabView
                    
                    initialPage={0}
                    tabBarUnderlineStyle={{backgroundColor:'#426d90'}}
                    tabBarBackgroundColor='#fff'
                    tabBarInactiveTextColor='#426d90'
                    tabBarTextColor='#fff'
                    tabBarActiveTextColor='#426d90'
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    <Category1Screen style={Style.text_font} tabLabel={global.en_lan? 'RealEstate' : 'العقارات'} method={this.goOfferDetailScreen}/>
                    <Category2Screen  style={Style.text_font} tabLabel={global.en_lan? 'Cars' : 'سيارات'} method={this.goOfferDetailScreen}/>
                    <Category3Screen  style={Style.text_font} tabLabel={global.en_lan? 'Restaurant' : 'مطعم'} method={this.goOfferDetailScreen}/>
                    <Category4Screen  style={Style.text_font} tabLabel={global.en_lan? 'Construction' : 'اعمال بناء'} method={this.goOfferDetailScreen}/>
                    <Category5Screen  style={Style.text_font} tabLabel={global.en_lan? 'Financial' : 'الأمور المالية'} method={this.goOfferDetailScreen}/>
                    <Category6Screen  style={Style.text_font} tabLabel={global.en_lan? 'Health' : 'الصحة'} method={this.goOfferDetailScreen}/>
                    <Category7Screen  style={Style.text_font} tabLabel={global.en_lan? 'Services' : 'خدمات'} method={this.goOfferDetailScreen}/>
                    <Category8Screen  style={Style.text_font} tabLabel={global.en_lan? 'Technology' : 'تقنية'} method={this.goOfferDetailScreen}/>
                    <Category9Screen  style={Style.text_font} tabLabel={global.en_lan? 'Stores' : 'مخازن'} method={this.goOfferDetailScreen}/>
                    {/* <Category10Screen  style={Style.text_font} tabLabel={global.en_lan? 'Events' : 'أحداث'} method={this.goOfferDetailScreen}/> */}
                    <Category11Screen  style={Style.text_font} tabLabel={global.en_lan? 'Money' : 'مال'} method={this.goOfferDetailScreen}/>
                    {/* <Category12Screen  style={Style.text_font} tabLabel={global.en_lan? 'Jobs' : 'وظائف'} method={this.goOfferDetailScreen}/> */}

                </ScrollableTabView>
                </ImageBackground>

                <ModalShare ref={(c) => { this.refModalShare = c }} navigation={this.props.navigation}/>

            {/* <ModalSelect  ref={(b) => { this.refModalShare2 = b }}></ModalSelect> */}

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