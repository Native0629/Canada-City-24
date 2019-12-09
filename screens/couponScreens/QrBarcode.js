import React, { Component } from 'react';
import { Modal,TouchableHighlight,Alert ,StatusBar, Text, ScrollView, TouchableOpacity,Image, ImageBackground, Share, FlatList } from 'react-native';
import Style from "../../constants/Style";
import { MaterialIcons, Feather, Entypo } from '@expo/vector-icons';

import {Ionicons, } from '@expo/vector-icons';

import QRCode from 'react-native-qrcode-svg';

import { StyleSheet, View, TextInput } from 'react-native';

export default class QrBarcode extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            couponDetail_data: global.couponDetail_data,
            visibleModal: false,
        };     
        
        console.log("===============this.state.couponDetail_data==========for QrBarcode======", couponDetail_data)
        
    }

    open() {
      this.setState({visibleModal: true});
   }
  render() {
    return (
     <View>
      <Modal
         isVisible={this.state.visibleModal}
         >

         <View style={styles.modalContainer}>
             <View style={{alignItems: 'flex-end' }}>
             <TouchableOpacity  onPress={()=>this.setState({visibleModal: false})}>
               <Ionicons name={'md-close-circle'} size={30} color={'#C21807'}/>
            </TouchableOpacity>
            </View>
      <View>

            
   <QRCode
    value={"Businees Name: "+"123456"+"CounponDescription:  "+"56789"}//// import QRCode from 'react-native-qrcode';
  size={200}
  /> 
        
            </View>
         </View>
      </Modal>
      </View>
    );
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

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});