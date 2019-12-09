import React from 'react';
import { StyleSheet, StatusBar, Text, View, ScrollView, TouchableOpacity, TextInput, Image, ImageBackground, Linking } from 'react-native';
import { MaterialIcons, Feather, Foundation, AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import Style from "../../constants/Style";
import ModalVideo from '../ModalVideo';
import { Icon } from 'react-native-elements';



export default class OfferDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offerDetail_data: global.offerDetail_data,
        };
        global.video_url = this.state.offerDetail_data.video_url;
    }

    static navigationOptions = {
        header: null,
    };

    phone_call = (phone_number) => {
        console.log("this is a phone call button click!!!!", phone_number);
        Linking.openURL(`tel:${phone_number}`)
    }

    componentDidMount() {
        console.log("this is a phone call button click!!!!", this.state.offerDetail_data);
    }

    open() {

    }


    render() {
        return (
            <View style={styles.container}>
                <View style={Style.header}>
                    <TouchableOpacity style={Style.left} onPress={() => this.props.navigation.goBack()}>
                        <Feather name='arrow-left' size={30} color="#fff" />
                    </TouchableOpacity>
                    <View style={Style.middle}>
                        <Text style={{ fontFamily: 'cairo-semibold', color: '#fff', fontSize: 27, marginTop: -3 }}>{global.en_lan ? 'Offers Detail' : "عرض التفاصيل"} </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>

                {/* <ImageBackground source={require('../../assets/images/BackgroundImage.png')} style={{width: '100%', height: '100%'}}> */}
                <ScrollView style={{ marginBottom: 20 }}>
                    <Swiper style={{ height: 400, borderRadius: 10 }} showsButtons={false} loop={true} autoplay={true} autoplayTimeout={2.5} >
                        {this.state.offerDetail_data.images.map((data, index) => (
                            <Image source={{ uri: global.server + data.image }} style={styles.image_block} key={index} />
                        ))}
                    </Swiper>

                    <View flexDirection='row'>
                        <View style={styles.businessLogo_block} marginLeft={20}>
                            <TouchableOpacity onPress={() => this.refModalShare.open()}>

                                <Image source={{ uri: global.server + this.state.offerDetail_data.logo_attachment }} style={styles.businessLogo} />
                                <Text style={Style.text_fontOffer}>{global.en_lan ? this.state.offerDetail_data.name : this.state.offerDetail_data.name}</Text>
                            </TouchableOpacity>
                        </View>



                        <View style={{ marginTop: 10, marginLeft: 80 }}>
                            <TouchableOpacity
                                onPress={() => Linking.openURL('mailto:' + this.state.offerDetail_data.email)} title={this.state.offerDetail_data.email} >
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
                                onPress={() => Linking.openURL('https://www.google.com/maps/place/' + this.state.offerDetail_data.adress)} title={this.state.offerDetail_data.adress} >

                                <Icon
                                    size={50}
                                    name='location'
                                    type='evilicon'
                                    color='#426d90'

                                />
                            </TouchableOpacity>


                        </View>
                        <View style={{ marginTop: 8, marginLeft: 22 }}>


                            <TouchableOpacity onPress={() => this.phone_call(this.state.offerDetail_data.phone_number)}>
                                <Foundation name='telephone' size={50} color="#426d90" />

                            </TouchableOpacity>


                        </View>
                    </View>

                    <View style={{ height: 40 }} />
                    {
                        global.en_lan ?
                            <View style={styles.offerDescription_left}>
                                <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: '#426d90', marginBottom: 10 }}>{this.state.offerDetail_data.en_title}</Text>
                                <Text style={{ fontFamily: 'cairo-semibold', fontSize: 14 }}> {this.state.offerDetail_data.en_description}</Text>
                                <Text style={{ fontFamily: 'cairo-semibold', marginTop: 10 }}>From: {this.state.offerDetail_data.start_date}         To: {this.state.offerDetail_data.end_date}</Text>
                                {/* <Text style={{ fontFamily: 'cairo-extralight'}}></Text> */}
                            </View>
                            :
                            <View style={styles.offerDescription}>
                                <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: '#426d90' }}>{this.state.offerDetail_data.ar_title}</Text>
                                <Text style={{ fontFamily: 'cairo-semibold', fontSize: 14 }}> {this.state.offerDetail_data.ar_description}</Text>
                                <Text style={{ fontFamily: 'cairo-semibold', marginTop: 10 }}>من : {this.state.offerDetail_data.start_date}            إلى: {this.state.offerDetail_data.end_date}</Text>
                                {/* <Text style={{ fontFamily: 'cairo-extralight'}}>إلى: {this.state.offerDetail_data.end_date}</Text> */}
                            </View>
                    }

                    {/* <View style={{margin: 20}}>
                        <View style={{width: '100%', height: 50, flexDirection: 'row', marginTop: 30}}>
                            <TouchableOpacity style={styles.call} onPress={() => this.phone_call(this.state.offerDetail_data.phone_number)}>
                                <Foundation name='telephone' size={30} color="#FFF"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.message}
                                    onPress={() => Linking.openURL('mailto:'+ this.state.offerDetail_data.email) } title={this.state.offerDetail_data.email} >
                                <AntDesign name='message1' size={30} color="#FFF"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.location}
                                    onPress={() => Linking.openURL('https://www.google.com/maps/place/'+ this.state.offerDetail_data.adress) } title={this.state.offerDetail_data.adress} >
                                <MaterialIcons name='location-on' size={30} color="#FFF"/>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                </ScrollView>
                {/* </ImageBackground> */}
                <ModalVideo ref={(c) => { this.refModalShare = c }}>



                </ModalVideo>
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
        borderRadius: 10,
    },
    news_description: {
        padding: 20
    },
    businessLogo_block: {
        // width: '80%',
        height: 70,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: -30,
        marginHorizontal: 10,


        borderColor: '#dddddd'
    },
    businessLogo: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dddddd',
        resizeMode: "stretch",
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