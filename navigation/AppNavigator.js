import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator,  } from 'react-navigation';


import LoginScreen from '../screens/loginScreens/LoginScreen';
import RegisterScreen from '../screens/registerScreens/RegisterScreen';
import ForgotPassScreen from '../screens/loginScreens/ForgotPassScreen';
import SelectScreen from '../screens/loginScreens/SelectScreen'
import TvScreen from '../screens/TvScreens/TvScreen';
import ContactUS from '../screens/ContactUs';
import MainTabNavigator from './MainTabNavigator';

const MainNavigators = createStackNavigator({
  LoginScreen: {screen: LoginScreen},
  RegisterScreen: {screen: RegisterScreen},
  ForgotPassScreen: {screen: ForgotPassScreen},  
  MainTabNavigator: {screen: MainTabNavigator},
  TvScreen: {screen: TvScreen},
  ContactUS: {screen: ContactUS},

},{
  initialRouteName: 'MainTabNavigator',
  headerMode: 'none',
});

export default createAppContainer(
  createSwitchNavigator({
  
    Main: MainNavigators

  })
);
