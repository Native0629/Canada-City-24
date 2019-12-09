import { AppLoading, ScreenOrientation } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import api from './constants/Api';
import UserData from './constants/UserData'
import SelectScreen from './screens/loginScreens/SelectScreen'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';


export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AppNavigator />
            </View>
        );
    }
}

async function loadResourcesAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let latlng = '';
    if (status !== 'granted') {
        let errorMessage = 'Permission to access location was denied';
    }

    let location = await Location.getCurrentPositionAsync({});

    if(location != null){
        global.lat = location.coords.latitude;
        global.lot = location.coords.longitude;
    }
    console.log("Current Location:  ", global.lat, global.lot);

    console.disableYellowBox = true;
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
    await Promise.all([
        Asset.loadAsync([
            require('./assets/images/bgSignIn.png'),
        ]),

        Font.loadAsync({
            'cairo-black': require('./assets/fonts/Cairo-Black.ttf'),
            'cairo-bold': require('./assets/fonts/cairo-bold.ttf'),
            'cairo-bold_0': require('./assets/fonts/Cairo-Bold_0.ttf'),
            'cairo-extralight': require('./assets/fonts/Cairo-ExtraLight.ttf'),
            'cairo-light_0': require('./assets/fonts/Cairo-Light_0.ttf'),
            'cairo-regular': require('./assets/fonts/Cairo-Regular.ttf'),
            'cairo-semibold': require('./assets/fonts/Cairo-SemiBold.ttf'),
        })
    ]);
}

function handleLoadingError(error) {
    console.warn(error);
}

// findCurrentLocationAsync = async () => {


// };

function handleFinishLoading(setLoadingComplete) {


    var url =  "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ global.lat+","+global.lot + "&key=AIzaSyDW6KqsghAYaiDoGO5rMxMUjqjrehYEm20";
    console.log('location Url: ', url);

    fetch(url, {
        method: 'GET'
    }).then((response) => response.json())
    .then((res)=>{
        if(res.status == "OK"){
            var addressArray = res.plus_code.compound_code.split(', ');
            var address = res.plus_code.compound_code.split(' ');
            global.currentlocation = address[1];

            console.log('Adress: ', global.currentlocation);
            global.country_id = "1";
            global.city_id = "3";
            global.en_lan = true;
        
            console.log("Loading ...")
            setLoadingComplete(true);
        }else{ 
            console.log('Adress: ', "error");
        }
    })
    

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});