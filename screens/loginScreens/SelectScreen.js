import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, AsyncStorage } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import Style from "../../constants/Style";
import api from '../../constants/Api'
import * as Font from 'expo-font';
export default class SelectScreen extends React.Component {
   constructor() {
        super()
        this.state = {
            placeholder_country: {
                label: 'Select Country',
                value: null,
                color: '#9EA0A4',
            },
            placeholder_city: {
                label: 'Select City',
                value: null,
                color: '#9EA0A4',
            },
            placeholder_language: {
                label: 'Select Language',
                value: null,
                color: '#9EA0A4',
            },
            country: [],
            city: [],
            en_lan: true,
            language: [
                {
                    label: 'English',
                    value: 'English',
                },
                {
                    label: 'Arabic',
                    value: 'Arabic',
                }
            ]
        };
    }
    
    componentWillMount(){
        console.log('global.isSelect____'+global.isSelect);
        if(global.isSelect){
            this.props.navigation.navigate('MainTabNavigator');
        }
        this.props.navigation.addListener("didFocus", (payload)=>{                    
            this.setState({city_name:'', country_name:'', language1:''})
        })
    }

    componentDidMount(){
        if(global.en_lan == null){
            global.en_lan = true;
        }

        var country = [];
        console.log("============SelectScreen============")
        api.getCountry().then((res)=>{
            console.log('getCountry_response____', res);
            if(res.status == '200'){
                res.countries.map((data, index)=>{
                    country[index]= {
                        label: data.en_country_name, 
                        value: data.en_country_name,
                        country_id: data.id
                    }
                })
                this.setState({country: country});
                console.log("country=", this.state.country)
            }else{
                Alert.alert(
                    'Error',
                    'Faild to get country',
                    [
                        {text: 'OK', onPress: () =>  console.log("get country failed")},
                    ],
                    {cancelable: false},
                );
            }
        })
        .catch((error) => {
            console.log(error);
        })
   }

   select_country=(value)=>{       
      this.setState({country_name: value});
      
      this.state.country.map((data, index)=>{
          if(data.value == value){
            //alert("ddddd")
            global.country_id = data.country_id;
          }
      });
      
      var city = [];

      api.getCity(global.country_id).then((res)=>{
          console.log('getCity_response____', res);
          if(res.status == '200'){
              res.cites.map((data, index)=>{
                  city[index]= {
                      label: data.en_country_name, 
                      value: data.en_country_name,
                      city_id: data.id
                  }
              })
              this.setState({city: city});
              console.log("city=", this.state.city)
          }else{
              Alert.alert(
                  'Error',
                  'Faild to get city',
                  [
                      {text: 'OK', onPress: () =>  console.log("get city failed")},
                  ],
                  {cancelable: false},
              );
          }

      })
      .catch((error) => {
          console.log(error);
      })
   }

   select_city = (value)=>{
         this.setState({city_name: value});
   }

   change_language =(value, id)=>{       
      this.setState({language1: value});
      console.log("language1==========", this.state.language1);
      if(id == 2){
          this.setState({en_lan: false});
      }else{
          this.setState({en_lan: true});
      }
      console.log("en_lan==========", this.state.en_lan);

   }

    _passMain(){
       // alert(global.country_id)
        if(!global.country_id){
            Alert.alert(
                'Error!',
                'Please select a country.',
                [
                    {text: 'OK'},
                ],
                {cancelable: false},
            );
        }else{
            
            this.state.city.map((data, index)=>{
                if(data.value ==this.state.city_name){
                    global.city_id = data.city_id;
                }
            });

            if(!global.city_id){
                Alert.alert(
                    'Error!',
                    'Please select a city.',
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false},
                );
            }else{
        
                global.en_lan = this.state.en_lan;

                console.log("selected country_id", global.country_id);
                console.log("selected city_id", global.city_id);       
                console.log("global.en_lan=", global.en_lan);


                AsyncStorage.setItem('country_id',  global.country_id.toString());
                AsyncStorage.setItem('city_id', global.city_id.toString());
                if(global.en_lan){
                    AsyncStorage.setItem('en_lan', "1");
                }else{
                    AsyncStorage.setItem('en_lan', "0");
                }

                // this.props.navigation.navigate('MainTabNavigator');
                this.props.navigation.navigate('MainTabNavigator');

                
            }
        }
   }

   render() {
    return <View style={styles.container}>
               <View style={{flex: 4, alignItems: "center", justifyContent: 'center'}}>
                  <Image source={require('../../assets/images/logo.png')}  style={Style.logo}/>
               </View>

               <View style={{ flex: 3, alignItems: 'center', justifyContent: 'space-between', marginTop: '10%'}}>
                  <View style={{width: '100%', }}>
                        <RNPickerSelect
                           placeholder={this.state.placeholder_country}
                           items={this.state.country}
                           onValueChange={(value)=>this.select_country(value)}
                           style={pickerSelectStyles}
                           value={this.state.country_name}
                           useNativeAndroidPickerStyle={false}
                        />
                  </View>
                  <View style={{width: '100%', marginVertical: 20}}>
                        <RNPickerSelect
                           placeholder={this.state.placeholder_city}
                           items={this.state.city}
                           onValueChange={(value)=>this.select_city(value)}
                           style={pickerSelectStyles}
                           value={this.state.city_name}
                           useNativeAndroidPickerStyle={false}
                        />
                  </View>
                  <View style={{width: '100%'}}>
                        <RNPickerSelect
                           placeholder={this.state.placeholder_language}
                           items={this.state.language}
                           onValueChange={(value, id)=>this.change_language(value, id)}
                           style={pickerSelectStyles}
                           value={this.state.language1}
                           useNativeAndroidPickerStyle={false}
                        />
                  </View>
               </View>

               <View style={{flex: 3, marginTop: 10}}>
                  <TouchableOpacity style={Style.signIn_btn} onPress={() =>this._passMain()}>
                     <Text style={Style.signInBtn_text}>Pass to Main Page</Text>
                  </TouchableOpacity>
               </View>

            </View>
   }
}

const styles = StyleSheet.create({
   container: {
       flex: 1, 
       paddingLeft: '10%', 
       paddingRight: '10%',
       opacity:1,
       backgroundColor:'#34495E'
   },

   alredyBlock: {
       flexDirection: 'row', 
       justifyContent: 'center', 
       marginTop: '10%'
   },

   forgotBlock: {
       flexDirection: 'row',
       justifyContent: 'center', 
       marginTop: '5%'
   },
   
});

const pickerSelectStyles = StyleSheet.create({
   inputIOS: {
     fontSize: 14,
     paddingVertical: 12,
     paddingHorizontal: 1,
     borderWidth: 1,
     fontFamily: 'cairo-extralight', 
     borderColor: 'gray',
     borderRadius: 25,
     color: 'black',
     paddingRight: 0, // to ensure the text is never behind the icon
   },
   inputAndroid: {
     fontSize: 14,
     fontFamily: 'cairo-extralight', 
     paddingHorizontal: 1,
     paddingVertical: 8,
     borderWidth: 0.5,
     borderColor: 'purple',
     borderRadius: 8,
     color: 'black',
     paddingRight: 0, // to ensure the text is never behind the icon
   },
 });
 