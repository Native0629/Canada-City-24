const React = require("react-native");
import { Constants } from 'expo';
import {Dimensions} from 'react-native';

const { StyleSheet } = React;

export default {
  //--------------header--------------
    logo: {
      height: 50,
      width: 60
    },
    text_font: {
      fontFamily: 'cairo-extralight',
    },
    header: {
      width: '100%', 
      height: 80,
      flexDirection: 'row',
      alignItems: 'center', 
      paddingTop: 25,
      zIndex: 2,
      backgroundColor: '#34495E'
    },
    header1: {
      width: '100%', 
      height: 50,
      flexDirection: 'row',
      alignItems: 'center', 
    },

    circleHeader: {
      width: '100%', 
      height: 80,
      flexDirection: 'row',
      paddingTop: 25
    },
    left: {
      flex: 1, 
      alignItems: 'flex-start',
      padding:15
    },
    middle: {
      flex: 5,
      alignItems: 'center'
    },
    right: {
      flex: 1,  
      alignItems: 'center',
    },
  //--------- Login, Register---------
    loginCategoryText: {
      fontSize: 22, 
      fontFamily: 'cairo-extralight',
      textAlign: 'center', 
      fontWeight: "500",
    },
    login_TextInput: {

        height: "35%", 
        fontSize: 17,
        borderBottomWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: 'transparent',
        paddingBottom: 2,
        color: 'white',
    },

    signup_TextInput: {
      height: "15%", 
        fontSize: 17,
        borderBottomWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: 'transparent',
        paddingBottom: 2,
        color: 'white',
    },

    signIn_btn: {
      height: 43,
      borderRadius: 4,
      fontFamily: 'cairo-extralight',
      backgroundColor: 'rgba(64, 114, 150, 0.9)',
      alignItems: "center", 
      justifyContent: 'center', 
      marginBottom: 10
    },

    signInBtn_text: {
      fontSize: 18,
      fontWeight: "500",
      fontFamily: 'cairo-extralight',
      color: '#FFF',
    },

    facebookSignIn_btn: {
      height: 43,
      paddingHorizontal: '10%',
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: "center", 
      justifyContent: 'space-around',
      elevation: 2,
      shadowOffset: {
        width: 10,
        height: 10
      },
      shadowColor: 'rgba(0,0,0,0.1)',
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },

    facebookSignInBtn_text: {
      fontSize: 18,
      fontWeight: "500",
      fontFamily: 'cairo-extralight',
    },

    facebookMark: {
      // width: 24, 
      // height: 24, 
      // borderRadius: 12, 
      // backgroundColor: '#4172b8',  
      // alignItems: 'center', 
    },

    facebookMark_text: {
      fontSize: 26, 
      fontFamily: 'cairo-extralight',
      fontWeight: "500", 
      color: '#FFF'
    },

    alreadyPreText: {
      fontSize: 14, 
      fontFamily: 'cairo-extralight',
      color: '#fff',
    },
    alreadyNextText:{
      fontSize: 14, 
      fontFamily: 'cairo-extralight',
      color: '#fff',
    },
  //............................

    empty_screen:{
      fontSize: 15, 
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'cairo-extralight',
      marginTop:'50%',
      width: '100%',
      height: 30
    },

    coupon_empty_screen:{
      fontSize: 15, 
      flex: 1, 
      alignItems: 'center',
      fontFamily: 'cairo-extralight',
      justifyContent: 'center',
      width: '100%',
      marginTop:'35%',
      height: 230
    },
  //-------offerScreen-----------
    business_block: {
      height: 150,
      padding: 5,
      borderRadius: 4,
      borderColor: '#dddddd',
      borderWidth: 1,
      flexDirection: 'row', 
      marginBottom: 10,
      backgroundColor:'#fff'
    },
    business_block1: {
      height: 100,
      padding: 5,
      borderRadius: 4,
      borderColor: '#dddddd',
      borderWidth: 1,
      flexDirection: 'row', 
      marginBottom: 10,
      backgroundColor:'#fff'
    },
    businessLogo: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    businessDescription: {
      flex:2.5,
      paddingRight: 15,
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    },
    newsImage: {
      flex: 2
    },
  //----------------------------

  //---------couponScreen-------
    coupon: {
       width: Dimensions.get('window').width/2,
        height: 200,
        paddingHorizontal: 10,
        marginVertical: 10 
    },
    coupon_block: {
        // width: Dimensions.get('window').width/2.5,
        // height: 200,
        width: '100%',
        height: '100%',
        padding: 5,
        // margin: 15,
        // marginLeft: 0,
        borderRadius: 4,
        borderColor: '#b3b3c2',
        borderWidth: 1,
    },

    couponLogo: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    couponDescription: {
        flex:1,
        justifyContent: 'space-between'
    },

    savedPeopleLogo: {
        width: 10,
        height: 15
    }
  //---------------------------

};