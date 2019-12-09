import React from 'react';
import { Platform, Image,View, AsyncStorage, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import OfferScreen from '../screens/offerScreens/OfferScreen';
import OfferDetailScreen from '../screens/offerScreens/OfferDetailScreen';
import OfferSearchScreen from '../screens/offerScreens/OfferSearchScreen';


import CouponScreen from '../screens/couponScreens/CouponScreen';
import CouponDetailScreen from '../screens/couponScreens/CouponDetailScreen';
import QrBarcode from '../screens/couponScreens/QrBarcode';
import QrBarcodeReader from '../screens/couponScreens/QrBarcodeReader';
import QrBarcodeAndroid from '../screens/couponScreens/QrBarcodeAndroid';


import CategoryScreen from '../screens/categoryScreens/CategoryScreen';
import CategoryDetailScreen from '../screens/categoryScreens/CategoryDetailScreen';
// import EventScreen from '../screens/eventScreen/eventScreen';

import AdsScreen from '../screens/categoryScreens/AdsScreen';
import AdsDetailScreen from '../screens/categoryScreens/AdsDetailScreen';
import AdsSearchScreen from '../screens/categoryScreens/AdsSearchScreen';


import NewsScreen from '../screens/newsScreens/NewsScreen';
import NewsDetailScreen from '../screens/newsScreens/NewsDetailScreen';

import RadioScreen from '../screens/RadioScreens/RadioScreen';

import TvCategory from '../screens/TvScreens/TvCategory';
import SyrianCategory from '../screens/TvScreens/TvCategories/SyrianCategory';

import eventScreen from '../screens/eventScreen/eventScreen';
import eventDetailScreen from '../screens/eventScreen/eventDetailScreen';

import jobScreen from '../screens/jobScreens/jobScreen';
import jobDetailScreen from '../screens/jobScreens/jobDetailScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const OfferStack = createStackNavigator(
  {
    Home: OfferScreen,
    OfferSearchScreen: OfferSearchScreen,
    OfferDetailScreen: OfferDetailScreen
  },
  config
);

OfferStack.navigationOptions = {
  // tabBarLabel: global.en_lan? 'Offers' : 'عروض',
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <Image
      source={ focused ? require('../assets/images/advertising_active.png') : require('../assets/images/advertising_unactive.png')}
      size={20}
      style={{ marginBottom: -20 }}
    />
  ),
};

OfferStack.path = '';




const CouponStack = createStackNavigator(
  {
    CouponScreen: CouponScreen,
    CouponDetailScreen: CouponDetailScreen,
    QrBarcode:QrBarcode,
    QrBarcodeReader:QrBarcodeReader,
    QrBarcodeAndroid:QrBarcodeAndroid
  },
  config
);

CouponStack.navigationOptions = {
  // tabBarLabel: global.en_lan? 'Coupons' : 'كوبونات',
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <Image
      source={ focused ? require('../assets/images/productActive.png') : require('../assets/images/productInactive.png')}
      size={26}
      style={{ marginBottom: -3 }}
    />
  ),
  config
};

CouponStack.path = '';




const OrderStack = createStackNavigator(
  {
    CategoryScreen: CategoryScreen,
    CategoryDetailScreen: CategoryDetailScreen,
    AdsScreen: AdsScreen,
    AdsDetailScreen: AdsDetailScreen,
    AdsSearchScreen: AdsSearchScreen,
    RadioScreen: RadioScreen,
    eventScreen:eventScreen,
    eventDetailScreen:eventDetailScreen,
    jobScreen:jobScreen,
    jobDetailScreen:jobDetailScreen,

  },
  config
);

OrderStack.navigationOptions = {
  // tabBarLabel: global.en_lan? 'Categories' : 'الاقسام',
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <Image
      source={ focused ? require('../assets/images/location_active.png') : require('../assets/images/location_unactive.png')}
      size={20}
      style={{ marginBottom: -20 }}
    />
  ),
};

OrderStack.path = '';


const RadioStack = createStackNavigator(
  {
    RadioScreen: RadioScreen,
   
  },
  config
);

RadioStack.navigationOptions = {
  // tabBarLabel: global.en_lan? 'Categories' : 'الاقسام',
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <Image
      source={ focused ? require('../assets/images/radio_active.png') : require('../assets/images/radio_unactive.png')}
      size={20}
      style={{ marginBottom: -20}}
    />
  ),
};

RadioStack.path = '';

const TvStack = createStackNavigator(
  {
    TvCategory:TvCategory,
    SyrianCategory:SyrianCategory,
    
  },
  config
);


TvStack.navigationOptions = {
  // tabBarLabel: global.en_lan? 'Categories' : 'الاقسام',
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <Image
      source={ focused ? require('../assets/images/television_active.png') : require('../assets/images/television_unactive.png')}
      size={20}
      style={{ marginBottom: -20 }}
    />
  ),
};
TvStack.path = '';


const NewsStack = createStackNavigator(
  {
    NewsScreen: NewsScreen,
    NewsDetailScreen: NewsDetailScreen,
    RadioScreen: RadioScreen,

  },
  config
);

NewsStack.navigationOptions = {
  // tabBarLabel: global.en_lan? 'News' : 'أخبار',
  tabBarLabel:  ' ' ,
  tabBarIcon: ({ focused }) => (
    <Image
      source={ focused ? require('../assets/images/newspaper_active.png') : require('../assets/images/newspaper_unactive.png')}
      size={20}
      style={{ marginBottom: -20 }}
    />
  ),
};

NewsStack.path = '';


const tabNavigator = createBottomTabNavigator({
  OrderStack,
  OfferStack,
 // CouponStack,
  TvStack,
  RadioStack,
  NewsStack,
  // EventsStack,
  // JobsStack
});

tabNavigator.path = '';

export default tabNavigator;
