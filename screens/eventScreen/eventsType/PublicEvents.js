import React from 'react';
import {  FlatList, ActivityIndicator, Text, View, StyleSheet, Image, TouchableOpacity , RefreshControl} from 'react-native';

import Style from "../../../constants/Style";
import api from '../../../constants/Api'
import * as Font from 'expo-font';
export default class PublicEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            offerData: [],
            status: 1,
            refreshing: false,  
            page: 1,
            isLoading: false,
            last_page: 0 
        };     
    }

    getData = async () =>{
        api.getOffers(global.country_id, global.city_id, 1, this.state.page).then((res)=>{

            console.log('offer_response____', res);
            if(res.status == "200"){
                this.setState({offerData: res.offers, isLoading: false, last_page: res.last_page});
                this.setState({status: 1})

            }else{
                console.log("get offers data failed")
                this.setState({status: 0})
            }

        })
    }

    componentDidMount(){
  
        
        this.setState({isLoading: true}, this.getData );
    }

    handleLoadMore = () => {
        console.log("this.state.page=========", this.state.page   );

        if(this.state.page < this.state.last_page){
            this.setState({page: this.state.page + 1, isLoading: true}, this.getData );
        }else{
            this.setState({isLoading: false});
        }
    };

    renderFooter = () => {
        return (
            this.state.isLoading?
            <View style={styles.loader}>
                <ActivityIndicator size="large"/>
            </View> : null
        )
    };

    renderRow = ({item}) => {
        return(
            <View style={Style.business_block}>
            {/* <View style={Style.businessLogo}>
                <Image source={{ uri: global.server + item.logo_attachment}} style={{width: 30, height:30}} />
            </View> */}
            <View style={Style.businessDescription}>
                <View>
                    <Text style={Style.text_fontOffer} numberOfLines={2}>{global.en_lan? item.en_title : item.ar_title}</Text>
                </View>
                <View style={{alignItems: 'flex-start',}}>
                    <Text style={Style.text_fontBusinessOffer}>{global.en_lan? item.name : item.name}</Text>
                    {/* <Text style={Style.text_font}>{item.created_at}</Text> */}
                </View>
            </View>
            <TouchableOpacity style={Style.newsImage}  onPress={()=>this.offerDetail(item)}>
                <Image source={{ uri: global.server + item.images[0].image}} style={{width: '100%', height:'100%'}}resizeMode="stretch"/>
            </TouchableOpacity>
        </View>
        )
    };

    _onRefresh(){
        this.setState({refreshing: true});
        api.getOffers(global.country_id, global.city_id, 1, 1).then((res)=>{
            console.log('offer_response____', res);
            if(res.status == "200"){
                this.setState({offerData: res.offers})
                this.setState({status: 1})
                this.setState({refreshing: false});

            }else{
                console.log("get offers data failed")
                this.setState({status: 0})
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }


    offerDetail(data){
        this.props.method();
        global.offerDetail_data = data;
    }
    
    render() {
        return (
            <View                    
                style={{padding: 20}}
            >
                {
                    this.state.status?  
                    <FlatList
                        data = {this.state.offerData}     
                        renderItem = {this.renderRow}       
                        keyExtractor = {(item, index) => index.toString()}    
                        onEndReached = {this.handleLoadMore}
                        onEndReachedThreshold={10}
                        ListFooterComponent = {this.renderFooter}
                        refreshControl={
                            <RefreshControl 
                                refreshing = {this.state.refreshing}
                                onRefresh = {this._onRefresh.bind(this)}
                            />
                        }
                    />
                    : 
                    
                    <View style={Style.empty_screen} >
                        <Text>
                            There are not any matched records.
                        </Text>
                    </View> 
                    
                }
   
            </View> 
        );
    }
}

const styles = StyleSheet.create({
   
});