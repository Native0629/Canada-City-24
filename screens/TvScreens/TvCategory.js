import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import SyrianCategory from '../TvScreens/TvCategories/SyrianCategory';
import LebanonCategory from '../TvScreens/TvCategories/LebanonCategory';
import EgyptCategory from '../TvScreens/TvCategories/EgyptCategory';
import QatarCategory from '../TvScreens/TvCategories/QatarCategory';
import SaudiCategory from '../TvScreens/TvCategories/SaudiCategory';
import {ScreenOrientation} from 'expo'
import TvScreen from '../TvScreens/TvScreen';
import Style from "../../constants/Style";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';


const { height, width } = Dimensions.get('window')

export default class TvCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            refreshing: false               
        };     
        this.gotvDetailScreen=this.gotvDetailScreen.bind(this); 
        this.props.navigation.addListener('didFocus',(payload)=>{
            ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
        })
    }

    static navigationOptions = {
        header: null,
    };

    gotvDetailScreen=async()=> {
        await ScreenOrientation.unlockAsync()
        this.props.navigation.navigate('TvScreen');
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/header.png')} style={Style.header}>
                    <View style={Style.left}>
                        <TouchableOpacity onPress={() => Linking.openURL('http://youbeksoft.com/radio')}>
                            <FontAwesome name='podcast' size={30} color="#C21807"/>
                        </TouchableOpacity>
                    </View>
                    <View style={Style.middle}>
                        <Text style={{  fontFamily: 'cairo-semibold', color: '#426d90', fontSize: 27 }}>{global.en_lan? "AlJaleya TV" : "تلفزيون الجالية"}</Text>
                    </View>
                    <TouchableOpacity style={Style.right} onPress={() => this.refModalShare.open()} >
                        <MaterialIcons name='menu' size={30} color="#C21807"/>
                    </TouchableOpacity>
                </ImageBackground>
                <ImageBackground source={require('../../assets/images/BackgroundImage.png')} style={{width: '100%', height: '100%'}}resizeMode="stretch">

                    <SafeAreaView style={{ flex: 1 }}>
                        <ScrollView scrollEventThrottle={16}>
                            <View style={{ flex: 1,  paddingTop: 20 }}>
                                <Text style={{ fontSize: 14,  paddingHorizontal: 20 }}>
                                    Syria TV's
                                </Text>

                                <View style={{ height: 130, marginTop: 20 }}>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}>
                                        
                                        <SyrianCategory  method={this.gotvDetailScreen}/>

                                    </ScrollView>
                                </View>
                            </View>

                            <View style={{ flex: 1, paddingTop: 20 }}>
                                <Text style={{ fontSize: 14,  paddingHorizontal: 20 }}>
                                    Lebanon TV's
                                </Text>

                                <View style={{ height: 130, marginTop: 20 }}>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}>
                                        <LebanonCategory  method={this.gotvDetailScreen}/>
                                    </ScrollView>
                                </View>
                            </View>

                            <View style={{ flex: 1, paddingTop: 20 }}>
                                <Text style={{ fontSize: 14,  paddingHorizontal: 20 }}>
                                    Egypt TV's
                                </Text>

                                <View style={{ height: 130, marginTop: 20 }}>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}>
                                        <EgyptCategory  method={this.gotvDetailScreen}/>

                                    </ScrollView>
                                </View>
                            </View>

                            <View style={{ flex: 1, paddingTop: 20 }}>
                                <Text style={{ fontSize: 14,  paddingHorizontal: 20 }}>
                                    Saudi Arabia TV's
                                </Text>

                                <View style={{ height: 130, marginTop: 20 }}>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}>
                                        
                                        <SaudiCategory  method={this.gotvDetailScreen}/>

                                    </ScrollView>
                                </View>
                            </View>

                            <View style={{ flex: 1, paddingTop: 20, marginBottom: 100 }}>
                                <Text style={{ fontSize: 14,  paddingHorizontal: 20 }}>
                                    Qatar TV's
                                </Text>

                                <View style={{ height: 130, marginTop: 20 }}>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}>
                                        
                                        <QatarCategory  method={this.gotvDetailScreen}/>

                                    </ScrollView>
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </ImageBackground>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    }
});