import React from 'react';
import {  FlatList, ActivityIndicator, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';

import Style from "../../../constants/Style";
import api from '../../../constants/Api'
import * as Font from 'expo-font';
export default class Category1Screen extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
            couponData: [],
            refreshing: false,
            status1: 1
        };     
    }

    componentDidMount(){
 
        
        api.getCoupons(global.country_id, global.city_id, 7).then((res)=>{
            console.log('offer_response____', res);
        
            if(res.status == "200"){
                this.setState({couponData: res.coupons})
                this.setState({status1: 1})

            }else{
                console.log("Faild to get coupons data")
                this.setState({status1: 0})
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    couponDetail(data){
        this.props.method();
        global.couponDetail_data = data;
    }

    _onRefresh(){
        this.setState({refreshing: true});
        api.getCoupons(global.country_id, global.city_id, 7).then((res)=>{
            console.log('offer_response____', res);
            this.setState({refreshing: false});
        
            if(res.status == "200"){
                this.setState({couponData: res.coupons})
                this.setState({status1: 1})

            }else{
                console.log("Faild to get coupons data")
                this.setState({status1: 0})
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    render() {
        return (
            <ScrollView                    
                refreshControl={
                    <RefreshControl 
                        refreshing = {this.state.refreshing}
                        onRefresh = {this._onRefresh.bind(this)}
                    />
                }
            >
            {
                this.state.status1?
                    <View style={{flexDirection: 'row',  flexWrap: 'wrap', justifyContent: 'flex-end'}}>
                    {this.state.couponData.map((data, index)=>(
                        <View style={Style.coupon} key = {index}>
                            <View style={Style.coupon_block} >
                                <TouchableOpacity style={Style.couponLogo} onPress={()=>this.couponDetail(data)}>
                                    <Image source={{ uri: global.server + data.b_logo}} style={{width: '100%', height:'100%'}} />
                                </TouchableOpacity>
                                <View style={Style.couponDescription}>
                                    <View style={{ alignItems: 'flex-end',}}>
                                        <Text style={{ fontFamily: 'cairo-extralight', fontSize: 10}}>{global.en_lan? data.b_name : data.b_name}</Text>
                                        <Text style={{ fontFamily: 'cairo-extralight', fontSize: 10}}>{global.en_lan? data.en_title : data.ar_title}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Image source={require('../../../assets/images/savedPeople.png')}  style={Style.savedPeopleLogo}/>
                                            <Text style={{ fontFamily: 'cairo-extralight', fontSize: 10, color: '#426d90'}}>{data.buy_counts}</Text>
                                        </View>
                                        <Text style={{ fontFamily: 'cairo-extralight', fontSize: 10}}>{data.from_date}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                    </View>
                :
                    <View style={Style.coupon_empty_screen} >
                        <Text>
                            There are not any matched records.
                        </Text>
                    </View>     
            }
                
            </ScrollView> 
        );
    }
}

const styles = StyleSheet.create({
   
});