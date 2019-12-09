import React from 'react';
import { StyleSheet, StatusBar, Text, View, ScrollView, TouchableOpacity, TextInput, Image, ImageBackground, Share } from 'react-native';
import { MaterialIcons, Feather, Entypo } from '@expo/vector-icons';


import Style from "../../constants/Style";
import * as Font from 'expo-font';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default class jobDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobsDetail_data: global.jobsDetail_data
        };
    }

    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={Style.header}>
                    <TouchableOpacity style={Style.left} onPress={() => this.props.navigation.goBack()}>
                        <Feather name='arrow-left' size={30} color="#fff" />
                    </TouchableOpacity>
                    <View style={Style.middle}>
                        <Text style={{ fontFamily: 'cairo-semibold', color: '#fff', fontSize: 27 }}>{global.en_lan ? "Job Detail" : "تفاصيل الوظيفة"}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
                <View style={styles.newsDetail_header}>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={Style.text_fonts}>{this.state.jobsDetail_data.name}</Text>
                        <Text style={Style.text_fontss}>{this.state.jobsDetail_data.created_at}</Text>
                    </View>
                </View>



                <ImageBackground source={require('../../assets/images/BackgroundImage.png')} style={{ width: '100%', height: '100%' }}>

                    <ScrollView style={{}}>
                        <Image source={{ uri: global.server + this.state.jobsDetail_data.logo_attachment }} style={{ width: '100%', height: 200 }} />
                        {global.en_lan ?
                            <View style={styles.newsDetail_header}>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Text style={Style.text_fonts}>{this.state.jobsDetail_data.en_title}</Text>
                                </View>
                            </View>
                            :
                            <View style={styles.newsDetail_header}>
                                <View style={{ fontFamily: 'cairo-semibold', alignItems: 'flex-end' }}>
                                    <Text style={{ fontFamily: 'cairo-semibold ', color: '#426d90' }}>{this.state.jobsDetail_data.ar_title}</Text>
                                </View>
                            </View>
                        }
                        <View style={styles.news_description}>
                            <Text style={{ fontFamily: 'cairo-semibold', color: '#8b999f', fontSize: 16 }}>{global.en_lan ? this.state.jobsDetail_data.en_description : this.state.jobsDetail_data.ar_description}</Text>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    newsDetail_header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    news_description: {
        paddingHorizontal: 20
    }
});