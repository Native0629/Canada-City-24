import React from 'react';
import Modal from 'react-native-modal'
import {AsyncStorage, Image, Dimensions,Platform, TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import {Ionicons, } from '@expo/vector-icons';

import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import Style from "../constants/Style";
import { Icon } from 'react-native-elements';
import { Linking } from 'react-native';
import ModalContactUs from './ModalContactUs';
export default class ModalShare extends React.Component {
   constructor() {
        super()
        this.state = {
            visibleModal: false,
            refreshing: false,
            listData: [
                {select: 'Settings',},
            ],
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

    _passSelect=async ()=>{
        this.setState({visibleModal: false});
        // this.props.method();
        global.country_id = null
        global.city_id = null
        //global.en_lan = null    
        this.props.navigation.navigate('SelectScreen');        
    }

    _contactUs(){
        this.setState({visibleModal: false});
        console.log("Dont disturb me!!!");
        this.props.navigation.navigate('ContactUS');        
    }


    gotoContactUs=()=>{
      this.props.navigation.navigate('SelectScreen');
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

                        <View style={styles.modalContainer}>
                            <View style={styles.header}>
                        
                        {(Platform.OS != 'ios') && (
                                <TouchableOpacity style={{alignItems: 'flex-end', padding: 15}} onPress={()=>this.setState({visibleModal: false})}>
                                    <Ionicons name={'md-close-circle'} size={25} color={'#fff'}/>
                                </TouchableOpacity>
                            )}


                            </View>
                            
                            <View style={styles.body}>
                                <TouchableOpacity style={{paddingVertical: 10, borderColor: '#b3b3c2', alignItems:'center',paddingTop:100}} onPress={() =>this._passSelect()}>
                                    <Text style={{color: '#fff',fontSize:18 }}>{global.en_lan? 'Settings' : 'الإعدادت'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{paddingVertical: 10, borderColor: '#b3b3c2',alignItems:'center',paddingTop:40}}  onPress={() =>this._contactUs()}>
                                    <Text style={{color: '#fff',fontSize:18 }}>{global.en_lan? 'Contact Us' : 'اتصل بنا'}</Text>
                                </TouchableOpacity>

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
</TouchableWithoutFeedback>

                    </Modal>

                    <ModalContactUs
                    ref={(c) => { this.refModalShare = c  }}  
                />

                </View>
        }
    }

    const styles = StyleSheet.create({
        modalContainer: {
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            backgroundColor: 'rgba(40, 100, 110, 0.9)'
        },
        body: {
         width: Dimensions.get('window').width,
            height: '100%',
          //  backgroundColor: '#426d90', 
            paddingHorizontal: 10,
            
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
            height: 180,
         //   backgroundColor: '#426d90', 
        },

        menu_logo: {
            width: 110,
            height: 100,
            marginLeft: 70
        },
    });


