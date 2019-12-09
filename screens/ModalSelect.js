import React from 'react';
import Modal from 'react-native-modal'
import {Dimensions, TouchableOpacity} from 'react-native';
import {Ionicons, } from '@expo/vector-icons';

import { StyleSheet, Text, View,Platform } from 'react-native';
import * as Font from 'expo-font';
import RNPickerSelect from 'react-native-picker-select';
import Style from "../constants/Style";


import { Video } from 'expo-av';



export default class ModalSelect extends React.Component {
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







               <View style={{ flex: 3, alignItems: 'center', justifyContent: 'space-between', marginTop: '10%'}}>
                  <View style={{width: '100%', }}>
                        <RNPickerSelect
                           placeholder="{this.state.placeholder_country}"
                           items="{this.state.country}"
                          // onValueChange={(value)=>this.select_country(value)}
                           style={pickerSelectStyles}
                          // value={this.state.country_name}
                          useNativeAndroidPickerStyle={false}
                        />
                  </View>
                  <View style={{width: '100%', marginVertical: 20}}>
                        <RNPickerSelect
                          placeholder="{this.state.placeholder_city}"
                           items="{this.state.city}"
                         //  onValueChange={(value)=>this.select_city(value)}
                           style={pickerSelectStyles}
                         //  value={this.state.city_name}
                           useNativeAndroidPickerStyle={false}
                        />
                  </View>
                  <View style={{width: '100%'}}>
                        <RNPickerSelect
                          placeholder="{this.state.placeholder_language}"
                         items="{this.state.language}"
                         //  onValueChange={(value, id)=>this.change_language(value, id)}
                           style={pickerSelectStyles}
                        //   value={this.state.language1}
                           useNativeAndroidPickerStyle={false}
                        />
                  </View>
               </View>

               <View style={{flex: 3, marginTop: 10}}>
                  <TouchableOpacity style={Style.signIn_btn} >
                     <Text style={Style.signInBtn_text}>Pass to Main Page</Text>
                  </TouchableOpacity>
               </View>







               </View>

            </Modal>
        </View>


   }
}

const styles = StyleSheet.create({
    modalContainer: {
      height: 400,
      width: '100%',
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
 