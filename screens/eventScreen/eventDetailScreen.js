import React from 'react';
import { StyleSheet, StatusBar, Text, View, ScrollView, TouchableOpacity, TextInput, Image, ImageBackground, Linking } from 'react-native';
import { MaterialIcons, Feather, Foundation, AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import Style from "../../constants/Style";
import ModalVideo from '../ModalVideo';
import { Icon } from 'react-native-elements';

export default class eventDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventDetail_data: global.eventDetail_data,
        };
        global.video_url = this.state.eventDetail_data.video_url;
    }

    static navigationOptions = {
        header: null,
    };

    phone_call = (phone_number) => {
        Linking.openURL(`tel:${phone_number}`)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={Style.header}>
                    <TouchableOpacity style={Style.left} onPress={() => this.props.navigation.goBack()}>
                        <Feather name='arrow-left' size={30} color="#fff" />
                    </TouchableOpacity>
                    <View style={Style.middle}>
                        <Text style={{ fontFamily: 'cairo-semibold', color: '#fff', fontSize: 27, marginTop: -3 }}>{global.en_lan ? 'Event Detail' : "تفاصيل الحدث"} </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>

                <ScrollView style={{ marginBottom: 20 }}>
                    <Swiper style={{ height: 250, borderRadius: 10 }} showsButtons={false} loop={true} autoplay={true} autoplayTimeout={2.5} >
                        {this.state.eventDetail_data.images.map((data, index) => (
                            <Image source={{ uri: global.server + data.image }} style={styles.image_block} key={index} />
                        ))}
                    </Swiper>

                    <View flexDirection='row'>
                        <View style={styles.businessLogo_block} marginLeft={20}>
                            <TouchableOpacity onPress={() => this.refModalShare.open()} style={{ alignItems: "center"}}>
                                <Image source={{ uri: global.server + this.state.eventDetail_data.logo_attachment }} style={styles.businessLogo} />
                                <Text style={{ fontSize: 15, alignItems: 'center' }}>{global.en_lan ? this.state.eventDetail_data.name : this.state.eventDetail_data.name}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 10, marginLeft: 30 }}>
                            <TouchableOpacity
                                onPress={() => Linking.openURL('mailto:' + this.state.eventDetail_data.email)} title={this.state.eventDetail_data.email} >
                                <Icon
                                    size={50}
                                    name='envelope'
                                    type='evilicon'
                                    color='#426d90'
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 20 }}>

                            <TouchableOpacity
                                onPress={() => Linking.openURL('https://www.google.com/maps/place/' + this.state.eventDetail_data.location)} title={this.state.eventDetail_data.location} >

                                <Icon
                                    size={50}
                                    name='location'
                                    type='evilicon'
                                    color='#426d90'
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => this.phone_call(this.state.eventDetail_data.phone_number)}>
                                <Feather name='phone' size={35} color="#426d90" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 30 }} />
                    {
                        global.en_lan ?
                            <View style={styles.offerDescription_left}>
                                <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: '#426d90', marginBottom: 10 }}>{this.state.eventDetail_data.en_name}</Text>
                                <Text style={{ fontFamily: 'cairo-semibold', marginTop: 12 }}>Date: {this.state.eventDetail_data.date}         Time: {this.state.eventDetail_data.time}</Text>
                            </View>
                            :
                            <View style={styles.offerDescription}>
                                <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: '#426d90' }}>{this.state.eventDetail_data.ar_name}</Text>
                                <Text style={{ fontFamily: 'cairo-semibold', marginTop: 12 }}>تاريخ : {this.state.eventDetail_data.date}            زمن: {this.state.eventDetail_data.time}</Text>
                            </View>
                    }
                </ScrollView>
                <ModalVideo ref={(c) => { this.refModalShare = c }}> </ModalVideo>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    newsDetail_header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    image_block: {
        width: '100%',
        height: '100%',
        resizeMode: "stretch",
        borderWidth: 1,
        borderColor: '#dddddd',
    },
    news_description: {
        padding: 20
    },
    businessLogo_block: {
        height: 70,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: -30,
        marginHorizontal: 10,
    },

    businessLogo: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
        borderWidth: 1,
        borderColor: '#dddddd',
        alignItems: 'flex-start',
    },

    offerDescription: {
        alignItems: 'flex-end',
        marginHorizontal: 20
    },
    offerDescription_left: {
        alignItems: 'flex-start',
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#dddddd',
        padding: 10
    },
    offerPicture: {
        width: '100%',
        height: 200
    },
    call: {
        flex: 1,
        backgroundColor: '#426d90',
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        flex: 1,
        backgroundColor: '#ababab',
        alignItems: 'center',
        justifyContent: 'center',
    },
    location: {
        flex: 1,
        backgroundColor: '#ec2228',
        alignItems: 'center',
        justifyContent: 'center',
    }
});