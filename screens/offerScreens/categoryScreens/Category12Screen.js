import React from 'react';
import {  FlatList, ActivityIndicator, Text, View, StyleSheet, Image, TouchableOpacity , RefreshControl} from 'react-native';

import Style from "../../../constants/Style";
import api from '../../../constants/Api'
import * as Font from 'expo-font';
import { width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';

export default class Category12Screen extends React.Component {
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
        api.getOffers(global.country_id, global.city_id, 12, this.state.page).then((res)=>{

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
           
        <TouchableOpacity style={[styles.featuredFLItem,{ width:  width(95) }]} onPress={()=>this.offerDetail(item)} >
        <Image source={{  uri: global.server + item.images[0].image}} style={styles.featuredImg}>
          
        </Image> 
        <View style={styles.txtViewCon}>
         {
            global.en_lan? 
            <View style={{ width: width(50), alignItems:'flex-start' }}>
                <Text style={styles.subHeadingTxt}numberOfLines={1} allowFontScaling={false}>{global.en_lan? item.name : item.name}</Text>
            </View>
            :
            <View style={{ width: width(50), alignItems:'flex-end' }}>
                <Text style={styles.subHeadingTxtAr}numberOfLines={1} allowFontScaling={false}>{global.en_lan? item.name : item.name}</Text>
            </View>
         }

         {
             global.en_lan?
        
            <View style={{ width: width(50), alignItems:'flex-start' }}>
                <Text style={styles.txtViewHeading}numberOfLines={2} allowFontScaling={false}>{global.en_lan? item.en_title : item.ar_title}</Text>
            </View>
            :
            <View style={{ width: width(50), alignItems:'flex-end' }}>
                <Text style={styles.txtViewHeadingAr}numberOfLines={2} allowFontScaling={false}>{global.en_lan? item.en_title : item.ar_title}</Text>
            </View>

        }
            <View style={styles.ratingCon}>
               
                <Icon
                    size={20}
                    name='eye'
                    type='evilicon'
                    color='#426d90'
                    containerStyle={{ marginLeft: 0, marginVertical: 3 }}
                />
                <Text style={styles.ratingTxt}numberOfLines={1}allowFontScaling={false}>25555</Text>
            </View>
            <View style={{ marginTop: 2, width: width(45), marginHorizontal: 8, flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                    size={18}
                    name='calendar'
                    type='evilicon'
                    color='#426d90'
                    containerStyle={{ marginHorizontal: 0, marginVertical: 0 }}
                />
                <Text style={{ fontSize: 10, color: '#8a8a8a' }}numberOfLines={1}allowFontScaling={false}>{item.created_at}</Text>
            </View>
        </View>
                        
                   
        </TouchableOpacity>
        )
    };

    _onRefresh(){
        this.setState({refreshing: true});
        api.getOffers(global.country_id, global.city_id,12, 1).then((res)=>{
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
    ratingTxt: {
        marginHorizontal: 2,
        marginVertical: 3,
        fontSize: 11, //totalSize(S15)
        color: '#8a8a8a',
      },
    ratingCon: {
        // height: height(8),
        marginTop: 3,
        width: 55,
        flexDirection: 'row',
      },
      featuredFLItem: {
        alignSelf:'center',
        marginHorizontal: 5,
        resizeMode:"stretch",

        height: 118,
        width: width(95),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        marginVertical: 5,
        marginBottom: 6
      },
      featuredImg: {
        height: 118,
        width: width(35),
        resizeMode:"stretch",

        margin: 0,
        
        alignItems: 'flex-start',
        borderRadius: 5
      },
    subHeadingTxt: {
        marginTop: 0,
        marginLeft: 10,
        fontSize: 11, //totalSize(S15),
        textAlign: 'left',
        width: 50
      },
      subHeadingTxtAr: {
        marginTop: 0,
        marginLeft: 10,
        fontSize: 11, //totalSize(S15),
        textAlign: 'right',
        width: 50
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
      txtViewHeadingAr: {
        textAlign: 'right',
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
        height: 118,
        width: 55,
        justifyContent: 'center'
      },
});