import React from 'react';
import Modal from 'react-native-modal'
import {AsyncStorage, Image, Dimensions, ScrollView,TouchableOpacity,TouchableWithoutFeedback, TextInput, Button} from 'react-native';
import {Ionicons, } from '@expo/vector-icons';

import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import Style from "../constants/Style";
import { Icon } from 'react-native-elements';
import { Linking } from 'react-native';
export default class ModalContactUs extends React.Component {
   constructor() {
        super()
        this.state = {
            visibleModal: false,
            refreshing: false,
           
            isMounted: false
        }
   }
   
    componentDidMount() {
        this.setState({isMounted: true})
    }
    componentWillUnmount(){
        this.state.isMounted = false
    }

    open() {
        this.setState({visibleModal: true});
    }

    

   //  _logout(){
   //      this.setState({visibleModal: false});
        
   //      let keys = ['user_name', 'user_email', 'user_password'];
        
   //      AsyncStorage.multiRemove(keys, (err) => {
   //          console.log("AsyncStorage.multiRemove Success!");
   //      });

   //      global.isLoggedIn = false;

   //      this.props.navigation.navigate('LoginScreen');        
   //  }

    render() {
        return <View>
                    <Modal  
                    transparent
                        animationIn={'slideInRight'}
                        animationOut={'slideOutRight'}
                        isVisible={this.state.visibleModal}
                        style={styles.bottomModal} 
                        swipeToClose={true}
                     
                        >

<TouchableWithoutFeedback  onPress={()=>this.setState({visibleModal: false})} >

<ScrollView  marginBottom={80} marginTop={10} >

                        <View style={styles.modalContainer}  >
                            
                            
                            <View style={styles.body}>

                                <View style={{padding: 30, borderColor: '#b3b3c2', alignItems:'center',paddingTop:100}} >
                                    <TextInput style={{color: 'black',fontSize:18,borderWidth:1,width:'100%',borderColor:'#fff',height:40,backgroundColor:'#fff',borderRadius:5 }}>Settings</TextInput>
                                </View>

                                <View style={{padding: 30, borderColor: '#b3b3c2',alignItems:'center',paddingTop:20}} onPress={() =>this._contactUs()}>
                                    <TextInput style={{color: 'black',fontSize:18,borderWidth:1,width:'100%',borderColor:'#fff',height:40,backgroundColor:'#fff',borderRadius:5}}>Contact us</TextInput>
                                </View>
                                <View style={{padding: 30, borderColor: '#b3b3c2',alignItems:'center',paddingTop:20}} onPress={() =>this._contactUs()}>
                                    <TextInput style={{color: 'black',fontSize:18,borderWidth:1,width:'100%',borderColor:'#fff',height:40,backgroundColor:'#fff',borderRadius:5}}>Contact us</TextInput>
                                </View>
                                <View style={{padding: 30, borderColor: '#b3b3c2',alignItems:'center',paddingTop:20}} onPress={() =>this._contactUs()}>
                                    <TextInput style={{color: 'black',fontSize:18,borderWidth:1,width:'100%',borderColor:'#fff',height:40,backgroundColor:'#fff',borderRadius:5}}>Contact us</TextInput>
                                </View>

                                <View style={{padding: 30, borderColor: '#b3b3c2',alignItems:'center',paddingTop:20}} onPress={() =>this._contactUs()}>
                                    <TextInput style={{color: 'black',fontSize:18,borderWidth:1,width:'100%',borderColor:'#fff',height:40,backgroundColor:'#fff',borderRadius:5 }}>Contact us</TextInput>
                                </View>

                                <View style={{marginLeft:90, padding: 30,borderColor: '#b3b3c2',alignItems:'center',justifyContent:'center',paddingTop:20,width:'50%'}} onPress={() =>this._contactUs()}>

                                          <TouchableOpacity style={{color: 'black',fontSize:18,borderWidth:1,justifyContent:'center',width:'100%',borderColor:'#fff',height:40,backgroundColor:'#fff',borderRadius:5 }}>
                                              <Text style={{marginLeft:60,fontSize:18}}  >Send</Text>
                                          </TouchableOpacity>
                                </View>

                                {/* <TouchableOpacity style={{paddingVertical: 10, borderColor: '#b3b3c2',alignItems:'center',addingTop:30}} onPress={() =>this._logout()}>
                                    <Text style={{color: '#fff',fontSize:18}}>Logout</Text>
                                </TouchableOpacity> */}


                                <View flexDirection='row' marginTop={60}>
                                <View style={{marginTop:10,marginLeft:120}}>
                                       <TouchableOpacity 
                                             onPress={() =>Linking.openURL('fb://page/110225127034773')

                                          }            >
                                           <Ionicons name={'logo-facebook'} size={50} color={'#fff'}/>

                            </TouchableOpacity>

                    </View>
                    <View style={{marginTop:10,marginLeft:60}}>
                                       <TouchableOpacity 
                                              onPress={() =>Linking.openURL('instagram://user?username=nader.hak') } >
                                          <Ionicons name={'logo-instagram'} size={50} color={'#fff'}/>
                            </TouchableOpacity>

                    </View>
                                </View>

                            </View>

                        </View>
                        </ScrollView> 

</TouchableWithoutFeedback>

                    </Modal>
                </View>
        }
    }

    const styles = StyleSheet.create({
        modalContainer: {
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            backgroundColor: 'rgba(64, 114, 150, 0.9)',
            flex:1
        },
        body: {
         width: Dimensions.get('window').width,
            height: '100%',
          //  backgroundColor: '#426d90', 
          
            
            // paddingHorizontal: 15,
            // borderTopLeftRadius: 10, 
            // borderTopRightRadius: 10,
            // paddingVertical: 30
        },
        bottomModal: {
            alignItems: 'flex-end',
            margin: 0,
        },

        header: {
            width: '100%',
            
         //   backgroundColor: '#426d90', 
        },

        menu_logo: {
            width: 110,
            height: 100,
            marginLeft: 70
        },
        signIn_btn: {
            height: 43,
            borderRadius: 4,
            fontFamily: 'cairo-extralight',
            backgroundColor: '#5450f7',
            alignItems: "center", 
            justifyContent: 'center', 
            marginBottom: 10
          },
    });


