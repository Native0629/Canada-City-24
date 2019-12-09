import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, AsyncStorage, ImageBackground } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

import Style from "../../constants/Style";
import api from '../../constants/Api'
import UserData from '../../constants/UserData'
import * as Font from 'expo-font';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            spinner: false,
            user_email: 'test@test.com',
            user_password: '123456',
    

        };     
        // global.country_id = '0'
        // global.city_id = '0'
    }

    componentWillMount(){
        console.log("introScreen_componentWillMount")
        console.log('global.isLoggedIn___'+global.isLoggedIn)
        if(global.isLoggedIn){
            this.props.navigation.replace('SelectScreen');
        }
    }

    _userEmailLognin(){

        this.setState({spinner: true});
        
        api.logIn(this.state.user_email, this.state.user_password).then((res)=>{
        console.log('LogIn_response____');
        
            if(res.status == "200"){
                this.setState({spinner: false});
                console.log("LogIn Success!!!!!!!!!");
                
                UserData.user_name = res.user_info.username;
                UserData.user_email = res.user_info.email;
                UserData.user_password = this.state.user_password;

                AsyncStorage.multiSet([
                    ["user_name",  res.user_info.username],
                    ["user_email", res.user_info.email],
                    ["user_password",this.state.user_password],
                ]);

                // AsyncStorage.setItem('user_key', JSON.stringify(UserData));

                global.user_id = res.user_info.id;
                console.log("===user_id===", global.user_id);

                // this.props.navigation.replace('MainTabNavigator');
                this.props.navigation.replace('SelectScreen');

            }else{
                Alert.alert(
                    'Error Log in!',
                    'These credentials do not match our records.',
                    [
                        {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                    ],
                    {cancelable: false},
                );
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/images/bgSignIn.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}/>
                    <KeyboardAvoidingView  style={{flex: 1.9}} behavior="padding"  enabled   keyboardVerticalOffset={50} >
                        <View style={{flex: 1, marginBottom: 20}}>
                            <View style={{flex: 1.7, alignItems: "center", justifyContent: 'center'}}>
                                <Image source={require('../../assets/images/logo.png')}  style={Style.logo}/>
                            </View>
                            <View style={{flex: 1, justifyContent: 'flex-end' }}>
                                <TextInput  style={Style.login_TextInput} placeholder="Enter your email"  keyboardType="email-address" value={this.state.user_email} onChangeText={(value) => this.setState({user_email: value})} />
                                <TextInput  style={Style.login_TextInput} placeholder="Enter your password" secureTextEntry = {true} value={this.state.user_password} onChangeText={(value) => this.setState({user_password: value})} />
                            </View>
                           
                        </View>
                    </KeyboardAvoidingView>  
                    <View style={{flex: 1, marginTop: 40}}>
                        <TouchableOpacity style={Style.signIn_btn} onPress={() =>this._userEmailLognin()}>
                            <Text style={Style.signInBtn_text}>Sign in</Text>
                        </TouchableOpacity>

                        <View style={styles.alredyBlock}>
                            <Text style={Style.alreadyPreText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={()=> this.props.navigation.replace('RegisterScreen')}>
                                <Text style={Style.alreadyNextText}> SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingLeft: '10%', 
        paddingRight: '10%',
        
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


