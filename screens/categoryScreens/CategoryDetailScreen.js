import React from 'react';
import { StyleSheet, StatusBar, Text, View, ScrollView, TouchableOpacity, TextInput,Image, ImageBackground, Share } from 'react-native';
import { MaterialIcons, Feather, Entypo, AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import Style from "../../constants/Style";

export default class CategoryDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigate = this.props.navigation.navigate;
        this.params = this.props.navigation.state.params;
        this.state = { 
            category_id: this.params.category_id,
            subcatesData: [],
            status: 1
        };   
        // console.log("this.params.category_id=============", this.params.category_id);  
   }

    componentDidMount(){
        const getSubcatesUrl = global.server + "/api/subcategories?";

        var url =  getSubcatesUrl + "country_id=" + global.country_id + "&city_id=" + global.city_id + "&category_id=" + this.state.category_id;

        result = fetch(url, {
            method: 'GET'
        }).then((response) => response.json())

        .then((res)=>{
            console.log('Subcates_response____', res);
        
            if(res.status == "200"){
                this.setState({subcatesData: res.sub_categories});
                this.setState({status: 1});
                this.setState({category_name: global.en_lan? res.category_en_name: res.category_ar_name });

            }else{
                console.log("get subcates data failed")
                this.setState({status: 0})
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }


    static navigationOptions = {
        header: null,
    };

    // AdsSCreen(){
    //     this.props.navigation.navigate('AdsScreen')
    // }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/header.png')} style={Style.header}>
                    <TouchableOpacity style={Style.left} onPress={() =>  this.props.navigation.goBack()}>
                        <Feather name='arrow-left' size={30} color="#8b999f"/>
                    </TouchableOpacity>
                    <View style={Style.middle}>
                        <Text style={{  fontFamily: 'cairo-semibold', color: '#8b999f', fontSize: 27 ,alignItems:'center'}}>{global.en_lan? this.state.category_name :this.state.category_name }</Text>
                    </View>
                    <View style={{flex: 1}}></View>
                </ImageBackground>

                <ImageBackground source={require('../../assets/images/BackgroundImage.png')} style={{width: '100%', height: '100%'}}>
                <ScrollView style={{padding: 20 }}marginBottom={100}>
                    {
                        this.state.subcatesData.map((data, index)=>(
                            <View key={index}>
                                {
                                       global.en_lan?
                                <TouchableOpacity style={styles.subcategory_block} onPress={()=>this.navigate('AdsScreen', { category_id: this.state.category_id, subCate_id: data.id})}>
                                   
                                  
                                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                        <Text style={Style.text_fonts}>{global.en_lan? data.en_name : data.ar_name}</Text>
                                        {/* <Image source={require('../../assets/images/restaurant.png')}  style={{width: 40, height: 40}}/> */}
                                    </View>
                                    
                                    <AntDesign name='caretright' size={20} color="#426d90"/>
                                    
                                    
                                </TouchableOpacity>
                                :

                                <TouchableOpacity style={styles.subcategory_block} onPress={()=>this.navigate('AdsScreen', { category_id: this.state.category_id, subCate_id: data.id})}>
                                   
                                   <AntDesign name='caretleft' size={20} color="#426d90"/>
                                <View style={{flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                    <Text style={Style.text_fonts}>{global.en_lan? data.en_name : data.ar_name}</Text>
                                    {/* <Image source={require('../../assets/images/restaurant.png')}  style={{width: 40, height: 40}}/> */}
                                </View>
                                
                                
                                
                            </TouchableOpacity>
                                }
                            </View>
                        ))
                    }    
                </ScrollView>
                </ImageBackground>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subcategory_header: {
        padding: 20,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
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
    }
});