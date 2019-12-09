import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput,StatusBar , TouchableOpacity, KeyboardAvoidingView, Alert, AsyncStorage, ImageBackground } from 'react-native';
import Style from "../constants/Style";
import {Ionicons, } from '@expo/vector-icons';
import api from '../constants/Api'
import UserData from '../constants/UserData'
export default class ContactUs extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            spinner: false,
            fullName: '',
            email: '',
            phoneNumber: '',
            Subject: '',
            

        };     
    }


    _sendContactUS(){

        this.setState({spinner: true});
        
        api.ContactUsUrl(this.state.fullName, this.state.email, this.state.phoneNumber, this.state.Subject).then((res)=>{
        console.log('LogIn_response____');
        
            if(res.status == "200"){
                this.setState({spinner: false});
                console.log("LogIn Success!!!!!!!!!");
                
                Alert.alert(
                    'Sent',
                    'Thank You For Contacting Us We Will Reply within 24 Hours.',
                    [
                        {text: 'OK', onPress: () =>  
                        
                        {
                              this.setState({spinner: false}),
                              this.props.navigation.replace('MainTabNavigator');
                    
                    
                         }
                    
                    },
                    ],
                    {cancelable: false},
                );

                // this.props.navigation.replace('MainTabNavigator');
                

            }else{
                Alert.alert(
                    'Error Inputs!',
                    'These credentials do not match ',
                    [
                        {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                    ],
                    {cancelable: false},
                    
                );
                console.log("LogIn Success!!!!!!!!!",res);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    

    render() {
        return (
            <View style={styles.container}>


            <View  style={Style.header} >

            <View  style={{flexDirection:'row'}} >
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
  
                    <View style={Style.middle}>
                        <Text style={{  fontFamily: 'cairo-semibold',marginLeft:'10%', color: '#fff', fontSize: 27 }}>{global.en_lan? "Contact Us" : "اتصل بنا"}</Text>
                    </View>
                    <TouchableOpacity style={{alignItems: 'flex-start', padding: 15}} onPress={()=>this.props.navigation.goBack(null)}>
                                    <Ionicons name={'md-close-circle'} size={25} color={'#fff'}/>
                                </TouchableOpacity>
                    
                </View>
                </View>



           
    <ScrollView style={{ marginBottom:50}} >

            <View style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: '30%'}}>
               <View style={{width: '100%',    paddingLeft: '5%',  paddingRight: '5%'}}>
                     <TextInput style={{height:60, borderWidth:1,borderColor: 'rgba(64, 114, 150, 0.9)',borderRadius:10}}placeholder={global.en_lan? "Full Name" : "الاسم الكامل"}value={this.state.fullName} onChangeText={(value) => this.setState({fullName: value})}></TextInput>
               </View>
               <View style={{width: '100%',   paddingLeft: '5%',  paddingRight: '5%', marginTop: '5%'}}>
                     <TextInput style={{height:60, borderWidth:1,borderColor: 'rgba(64, 114, 150, 0.9)',borderRadius:10}}placeholder={global.en_lan? "Email" : "الايميل"} keyboardType="email-address" value={this.state.email} onChangeText={(value) => this.setState({email: value})}></TextInput>
               </View>
               <View style={{width: '100%', paddingLeft: '5%',  paddingRight: '5%', marginTop: '5%'}}>
               <TextInput style={{height:60, borderWidth:1,borderColor: 'rgba(64, 114, 150, 0.9)',borderRadius:10}}placeholder={global.en_lan? "Phone Number" : "رقم الهاتف"}value={this.state.phoneNumber} onChangeText={(value) => this.setState({phoneNumber: value})}></TextInput>
               
               </View>
               <View style={{width: '100%',   paddingLeft: '5%',  paddingRight: '5%', marginTop: '5%'}}>
               <TextInput 
                multiline={true}
                numberOfLines={10}
                style={{height:200, textAlignVertical: 'top', borderWidth:1,borderColor: 'rgba(64, 114, 150, 0.9)',borderRadius:10}}placeholder={global.en_lan? "Write A Massege Here .." : "اكتب الرسالة هنا.."}value={this.state.Subject} onChangeText={(value) => this.setState({Subject: value})}></TextInput>

   
               </View>
            </View>

            <View style={{marginTop: '10%',   paddingLeft: '30%',  paddingRight: '30%'}}>
               <TouchableOpacity style={Style.signIn_btn} onPress={() =>this._sendContactUS()} >
                  <Text style={Style.signInBtn_text}>{global.en_lan? "Send" : "ارسال"}</Text>
               </TouchableOpacity>
            </View>
            </ScrollView>

         </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
      
       
        
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


