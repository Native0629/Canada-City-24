import React from 'react';
import Modal from 'react-native-modal'
import {Dimensions, TouchableOpacity} from 'react-native';
import {Ionicons, } from '@expo/vector-icons';

import { StyleSheet, Text, View,Platform } from 'react-native';
import * as Font from 'expo-font';


import QRCode from 'react-native-qrcode-svg';
import QRCodeAndroid from 'react-native-qrcode';




export default class ModalShare extends React.Component {
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

  

   render() {
    return <View>
            <Modal
               isVisible={this.state.visibleModal}
               >

               <View style={styles.modalContainer}>
                   <View style={{alignItems: 'flex-end' }}>
                   <TouchableOpacity  onPress={()=>this.setState({visibleModal: false})}>
                     <Ionicons name={'md-close-circle'} size={30} color={'#C21807'}/>
                  </TouchableOpacity>
                  </View>

                  {(Platform.OS !== 'ios') && (
                  <View style={{alignItems: 'center' ,flex:1}}>
                     <QRCode
                             value={"Businees Name: "+"123456"+"CounponDescription:  "+"56789"}
                                  size={300}
                                           /> 
                  </View>
                  )}
                     {(Platform.OS == 'ios') && (
                  <View style={{alignItems: 'center' ,flex:1}}>
                      <QRCode
                             value={"Businees Name: "+"123456"+"CounponDescription:  "+"56789"}
                                  size={300}
                                           /> 
                  </View>
                  )}
                  
               </View>
            </Modal>
        </View>
   }
}

const styles = StyleSheet.create({
    modalContainer: {
      height: 400,
      width: '100%',
      backgroundColor: '#FFF', 
      borderTopLeftRadius: 10, 
      borderTopRightRadius: 10,
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,

   },   
   modalContainer1: {

    backgroundColor: '#FFF', 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
    justifyContent:'center',
    alignItems:'center'
 },


   bottomModal: {
      alignItems: 'center',
      margin: 0,
   },
 
modalsmallContainer: {
  width:'100%',
  height:'50%',
  alignItems:'center',
  justifyContent:'center'
},
});


