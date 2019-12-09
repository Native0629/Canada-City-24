import React from 'react';
import { StyleSheet, StatusBar, Text, View, ScrollView, TouchableOpacity, TextInput, Image, ImageBackground, Share } from 'react-native';
import { MaterialIcons, Feather, Entypo } from '@expo/vector-icons';


import Style from "../../constants/Style";
import * as Font from 'expo-font';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default class NewsDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsDetail_data: global.newsDetail_data
        };
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {

    }

    share() {
        FileSystem.downloadAsync(global.server + this.state.newsDetail_data.attachment, FileSystem.documentDirectory + '.jpeg'
        )
            .then(({ uri }) => {
                console.log('Finished downloading to ', uri);

                Sharing.shareAsync(uri);
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={Style.header}>
                    <TouchableOpacity style={Style.left} onPress={() => this.props.navigation.goBack()}>
                        <Feather name='arrow-left' size={30} color="#fff" />
                    </TouchableOpacity>
                    <View style={Style.middle}>
                        <Text style={{ fontFamily: 'cairo-semibold', color: '#fff', fontSize: 27 }}>{global.en_lan ? "News Detail" : "تفاصيل الخبر"}</Text>
                    </View>
                </View>

                {global.en_lan ?
                    <View style={styles.newsDetail_header}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={Style.text_fonts}>{this.state.newsDetail_data.en_title}</Text>
                            <Text style={Style.text_fontss}>{this.state.newsDetail_data.created_at}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.share()} style={{ alignItems: 'flex-end' }}>
                            <Entypo name='share' size={30} color="#30416d" />
                        </TouchableOpacity>

                    </View>
                    :
                    <View style={styles.newsDetail_header}>
                        <TouchableOpacity onPress={() => this.share()}>
                            <Entypo name='share' size={30} color="#30416d" />
                        </TouchableOpacity>
                        <View style={{ fontFamily: 'cairo-semibold', alignItems: 'flex-end' }}>
                            <Text style={{ fontFamily: 'cairo-semibold ', color: '#426d90' }}>{global.en_lan ? this.state.newsDetail_data.en_title : this.state.newsDetail_data.ar_title}</Text>
                            <Text style={Style.text_fontss}>{this.state.newsDetail_data.created_at}</Text>
                        </View>
                    </View>
                }

                <ImageBackground source={require('../../assets/images/BackgroundImage.png')} style={{ width: '100%', height: '100%' }}>

                    <ScrollView style={{}}>
                        <Image source={{ uri: global.server + this.state.newsDetail_data.attachment }} style={{ width: '100%', height: 200 }} />
                        <View style={styles.news_description}>
                            <Text style={{ fontFamily: 'cairo-semibold', color: '#8b999f', fontSize: 16 }}>{global.en_lan ? this.state.newsDetail_data.en_description : this.state.newsDetail_data.ar_description}</Text>
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
        padding: 20
    }
});