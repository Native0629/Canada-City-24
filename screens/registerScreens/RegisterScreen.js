import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, Alert, ImageBackground  } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from "react-native-dialog";
import { CheckBox } from 'react-native-elements'
import * as Font from 'expo-font';
import Style from "../../constants/Style";
import api from '../../constants/Api'
import UserData from '../../constants/UserData'

export default class RegisterScreen extends React.Component {

   constructor(props) {
      super(props);
      this.state = { 
         spinner: false,
         dialogVisible: false,
         user_name: '',
         user_firstName: '',
         user_lastName: '',
         user_email: '',
         user_phoneNumber: '',
         user_birthday: '',
         user_password: '',
         spinner: false,
         conditionChecked: true,
         nameError: "",
         emailError: "",
         passwordError: "",

         error_name: '',
         error_birth: '',
         error_first_name: '',
         error_last_name: '',
         error_email: '',
         error_phone_number: '',
         error_password: '',
      };     
   }

   handleDialog = () => {
      this.setState({ dialogVisible: false });
   };

   componentDidMount(){

   }

   _userEmailRegister(){
      this.setState({spinner: true});
      api.register(this.state.user_name, this.state.user_firstName, this.state.user_lastName,  this.state.user_email, 
                                          this.state.user_birthday, this.state.user_phoneNumber, this.state.user_password).then((res)=>{
         console.log('register_response____', res);
         
         if(res.status == "200"){
            console.log("Register Success!!!!!!!!!");
            this.setState({spinner: false});
         
            UserData.user_name = res.username;
            UserData.user_email = res.email;
            UserData.user_password = this.state.user_password;
            AsyncStorage.setItem('user_key', JSON.stringify(UserData));

            global.user_id = res.id;
            console.log("===user_id===", global.user_id);

            this.props.navigation.replace('SelectScreen');

         }else{

            console.log('register_Error_response____', res.error.name, this.state.error_name);

            if(res.error.name != null){
                  this.setState({error_name: res.error.name.toString()});
                  Alert.alert(
                  'Error Sign up!',
                  this.state.error_name,
                  [
                     {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                  ],
                  {cancelable: false},
               );
            }else if(res.error.first_name != null){
               this.setState({error_first_name: res.error.first_name.toString()});
                  
               Alert.alert(
                  'Error Sign up!',
                  this.state.error_first_name,
                  [
                     {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                  ],
                  {cancelable: false},
               );
            }else if(res.error.last_name != null){
               this.setState({error_last_name: res.error.last_name.toString()});
                  
               Alert.alert(
                  'Error Sign up!',
                  this.state.error_last_name,
                  [
                     {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                  ],
                  {cancelable: false},
               );
            }else if(res.error.email != null){
               this.setState({error_email: res.error.email.toString()});
                  
               Alert.alert(
                  'Error Sign up!',
                  this.state.error_email,
                  [
                     {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                  ],
                  {cancelable: false},
               );
            }else if(res.error.date_of_birth != null){
               this.setState({error_birth: res.error.date_of_birth.toString()});
               Alert.alert(
                  'Error Sign up!',
                  this.state.error_birth,
                  [
                     {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                  ],
                  {cancelable: false},
               );
            }else if(res.error.phone_number != null){
               this.setState({error_phone_number: res.error.phone_number.toString()});
                  
               Alert.alert(
                  'Error Sign up!',
                  this.state.error_phone_number,
                  [
                     {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                  ],
                  {cancelable: false},
               );
            }else if(res.error.password != null){
               this.setState({error_password: res.error.password.toString()});
                  
               Alert.alert(
                  'Error Sign up!',
                  this.state.error_password,
                  [
                     {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                  ],
                  {cancelable: false},
               );
            }
    
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
            <Spinner visible={this.state.spinner}/>

            <KeyboardAvoidingView  style={{flex: 4}} behavior="padding"  enabled  keyboardVerticalOffset={10} >
               <View style={{flex: 1, marginBottom: 20}}>
                  <View style={{flex: 1.5, alignItems: "center", justifyContent: 'center'}}>
                     <Image source={require('../../assets/images/logo.png')} style={Style.logo}/>
                  </View>
                  <View style={{flex: 3, justifyContent: 'flex-end'}}>
                     <TextInput  style={Style.signup_TextInput} placeholder="Your Name"  value={this.state.user_name} onChangeText={(value) => this.setState({user_name: value})} />
                     <TextInput  style={Style.signup_TextInput} placeholder="First Name"  value={this.state.user_firstName} onChangeText={(value) => this.setState({user_firstName: value})} />
                     <TextInput  style={Style.signup_TextInput} placeholder="Last Name"  value={this.state.user_lastName} onChangeText={(value) => this.setState({user_lastName: value})} />
                     <TextInput  style={Style.signup_TextInput} placeholder="Enter your email"  keyboardType="email-address" value={this.state.user_email} onChangeText={(value) => this.setState({user_email: value})} />
                     <TextInput  style={Style.signup_TextInput} placeholder="Your Birthday(XXXX-XX-XX)"  value={this.state.user_birthday} onChangeText={(value) => this.setState({user_birthday: value})} />
                     <TextInput  style={Style.signup_TextInput} placeholder="Phone Number"  value={this.state.user_phoneNumber} onChangeText={(value) => this.setState({user_phoneNumber: value})} />
                     <TextInput  style={Style.signup_TextInput} placeholder="Enter your password" value={this.state.user_password} secureTextEntry = {true} onChangeText={(value) => this.setState({user_password: value})} />
                  </View>
               </View>
            </KeyboardAvoidingView>  
            <View style={{flex: 1}}>
               <TouchableOpacity style={Style.signIn_btn} onPress={() =>this._userEmailRegister()}>
                  <Text style={Style.signInBtn_text}>Sign up</Text>
               </TouchableOpacity>

               <View style={styles.alredyBlock}>
                  <Text style={Style.alreadyPreText}>Already have an account?</Text>
                  <TouchableOpacity onPress={()=> this.props.navigation.replace('LoginScreen')}>
                     <Text style={Style.alreadyNextText}>SIGN IN</Text>
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
      marginTop: '5%'
   },
       
});