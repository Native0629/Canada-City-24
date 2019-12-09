import React, { Component, Fragment } from 'react';
import { StyleSheet, StatusBar, Text, View, ScrollView, TouchableOpacity, TextInput, Image, SafeAreaView, ImageBackground, Linking } from 'react-native';
import { MaterialIcons, Feather, Foundation, AntDesign, FontAwesome } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import * as Font from 'expo-font';
import Style from "../../constants/Style";
import ModalVideo from '../ModalVideo';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps'
export default class AdsDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;

        this.state = {
            ads_id: this.params.ads_id,
            adsData: [],
            offerData: []
        };
    }

    componentDidMount() {
        const getSubcatesUrl = global.server + "/api/ads?";

        var url = getSubcatesUrl + "ads_id=" + this.state.ads_id;
        console.log("ads_detail_url", url);
        result = fetch(url, {
            method: 'GET'
        }).then((response) => response.json())

            .then((res) => {
                console.log('adsData_response____', res);

                if (res.status == "200") {
                    this.setState({ adsData: res.ads_info });
                    this.setState({ offerData: res.offers });
                    this.setState({ status: 1 });

                    global.video_url = this.state.adsData.video_url;

                    console.log('ads__offerData============', this.state.offerData);
                } else {
                    console.log("get adsData data failed")
                    this.setState({ status: 0 })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    offerDetail(data) {
        global.offerDetail_data = data;
        this.props.navigation.navigate('OfferDetailScreen')
    }

    static navigationOptions = {
        header: null,
    };

    phone_call = (phone_number) => {
        console.log("this is a phone call button click!!!!", phone_number);
        Linking.openURL(`tel:${phone_number}`)
    }

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#C2185B' }} />
                <View style={styles.container}>

                    <ImageBackground source={require('../../assets/images/BackgroundImage.png')} style={{ width: '100%', height: '100%' }}>

                        <ScrollView style={{ marginBottom: 20 }}>
                            <View style={{ backgroundColor: '#fff', borderColor: '#dddddd', borderWidth: 1, width: '100%' }}>

                                <View style={{ height: 300, width: '100%' }}   >

                                    <Image source={{ uri: global.server + this.state.adsData.logo_attachment }} style={styles.businessLogo} />
                                    <TouchableOpacity style={Style.left} onPress={() => this.props.navigation.goBack()}>
                                        <Feather name='arrow-left' size={30} color='red' />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={Style.rightvideo} onPress={() => this.refModalShare.open()}>
                                        <Feather name='video' size={30} color='red' />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontFamily: 'openSans-SemiBold', color: 'black', marginLeft: 10, marginTop: 20, fontSize: 35 }}>{global.en_lan ? this.state.adsData.en_title : this.state.adsData.ar_title}</Text>
                                <Text style={{ fontFamily: 'cairo-semibold', color: 'black', marginLeft: 10, marginTop: 5, fontSize: 16 }}>{global.en_lan ? this.state.adsData.en_description : this.state.adsData.ar_description}</Text>

                                {
                                    global.en_lan ?
                                        <View style={styles.contactInfo}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                                                <View style={{ marginHorizontal: 10 }}>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                        <View style={styles.call}>
                                                            <Foundation name='telephone' size={28} color="#426d90" />
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ alignItems: 'flex-end', paddingRight: 5 }}>
                                                    <TouchableOpacity onPress={() => this.phone_call(this.state.adsData.phone_number)}>
                                                        <Text style={{ fontFamily: 'cairo-semibold', fontSize: 14, color: 'black' }}>{this.state.adsData.phone_number}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>

                                                <View style={{ marginHorizontal: 10 }}>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                        <View style={styles.message}
                                                        >
                                                            <Feather name='mail' size={28} color="#426d90" />
                                                        </View>
                                                    </View>
                                                </View>

                                                <View style={{ alignItems: 'flex-end', paddingRight: 5 }}>
                                                    <TouchableOpacity style={styles.message}
                                                        onPress={() => Linking.openURL('mailto:' + this.state.adsData.email)} title={this.state.adsData.email} >
                                                        <Text style={{ fontFamily: 'cairo-semibold', fontSize: 14, color: 'black' }}>{this.state.adsData.email}</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>

                                                <View style={{ marginHorizontal: 10 }}>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                        <View style={styles.location}
                                                        >
                                                            <FontAwesome name='internet-explorer' size={28} color="#426d90" />
                                                        </View>
                                                    </View>
                                                </View>

                                                <View style={{ alignItems: 'flex-end', paddingRight: 5 }}>
                                                    <TouchableOpacity style={styles.location}
                                                        onPress={() => Linking.openURL(this.state.adsData.web_url)} title={this.state.adsData.web_url} >
                                                        <Text style={{ fontFamily: 'cairo-semibold', fontSize: 14, color: 'black' }}>{this.state.adsData.web_url}</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                                                <View style={{ marginHorizontal: 10 }}>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                        <View style={styles.location}
                                                        >
                                                            <MaterialIcons name='location-on' size={28} color="#426d90" />
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ alignItems: 'flex-end', paddingRight: 5 }}>
                                                    <TouchableOpacity style={styles.location}
                                                        onPress={() => Linking.openURL('https://www.google.com/maps/place/' + this.state.adsData.adress)} title={this.state.adsData.adress} >
                                                        <Text style={{ fontFamily: 'cairo-semibold', fontSize: 14, color: 'black', right: 5 }}>{this.state.adsData.adress}</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                        </View>
                                        :
                                        <View style={styles.contactInfo}>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingVertical: 5, }}>

                                                <View style={{ flex: 4, alignItems: 'flex-end', paddingRight: 5 }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 12, color: '#426d90' }}>{this.state.adsData.phone_number}</Text>
                                                </View>
                                                <View style={{ marginHorizontal: 10 }}>
                                                    <View style={{ flex: 1, width: 30, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#426d90' }}>
                                                        <TouchableOpacity style={styles.call} onPress={() => this.phone_call(this.state.adsData.phone_number)}>
                                                            <Foundation name='telephone' size={15} color="#FFF" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingVertical: 5, }}>
                                                <View style={{ flex: 4, alignItems: 'flex-end', paddingRight: 5 }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 12, color: '#426d90' }}>{this.state.adsData.email}</Text>
                                                </View>
                                                <View style={{ marginHorizontal: 10 }}>
                                                    <View style={{ width: 30, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7aaef6' }}>
                                                        <TouchableOpacity style={styles.message}
                                                            onPress={() => Linking.openURL('mailto:' + this.state.adsData.email)} title={this.state.adsData.email} >
                                                            <Feather name='mail' size={15} color="#FFF" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                                                <View style={{ flex: 4, alignItems: 'flex-end', paddingRight: 5 }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 12, color: '#426d90' }}>{this.state.adsData.web_url}</Text>
                                                </View>
                                                <View style={{ marginHorizontal: 10 }}>
                                                    <View style={{ width: 30, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ababab' }}>
                                                        <TouchableOpacity style={styles.location}
                                                            onPress={() => Linking.openURL(this.state.adsData.web_url)} title={this.state.adsData.web_url} >
                                                            <FontAwesome name='internet-explorer' size={15} color="#FFF" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                                                <View style={{ flex: 4, alignItems: 'flex-end', paddingRight: 5 }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 12, color: '#426d90' }}>{this.state.adsData.adress}</Text>
                                                </View>
                                                <View style={{ marginHorizontal: 10 }}>
                                                    <View style={{ width: 30, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ec2228' }}>
                                                        <TouchableOpacity style={styles.location}
                                                            onPress={() => Linking.openURL('https://www.google.com/maps/place/' + this.state.adsData.adress)} title={this.state.adsData.adress} >
                                                            <MaterialIcons name='location-on' size={15} color="#FFF" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>

                                            </View>

                                        </View>
                                }
                            </View>

                            <View style={{ borderRadius: 10, backgroundColor: '#fff', borderColor: '#dddddd', borderWidth: 1, width: '100%', marginTop: 10 }}>
                                {this.state.adsData.langtitute !== null &&
                                    <MapView
                                        style={{
                                            flex: 1,
                                            width: '100%',
                                            height: 300
                                        }}
                                        initialRegion={{
                                            latitude: this.state.adsData.langtitute,
                                            longitude: this.state.adsData.longtitute,
                                            latitudeDelta: 0.01,
                                            longitudeDelta: 0.01
                                        }}
                                    />
                                }
                            </View>
                            <View style={{ backgroundColor: '#fff', borderColor: '#dddddd', borderWidth: 1, width: '100%', marginTop: 10 }}>
                                {
                                    global.en_lan ?
                                        <Text style={{ fontFamily: 'cairo-semibold', textAlign: 'left', fontSize: 16, color: '#426d90', marginLeft: 10 }}>Hours Of Operation</Text>
                                        :
                                        <Text style={{ fontFamily: 'cairo-semibold', textAlign: 'right', fontSize: 16, color: '#426d90' }}>أوقات العمل</Text>
                                }

                                {
                                    global.en_lan ?
                                        <View style={styles.contactInfo}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>

                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Mon:' : ':الإثنين'}</Text>
                                                </View>

                                                <View>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: 'black' }}>{this.state.adsData.work_time_from1} - {this.state.adsData.work_time_to1}</Text>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>

                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Tues:' : ':الثلاثاء'}</Text>
                                                </View>

                                                <View>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: 'black' }}>{this.state.adsData.work_time_from2} - {this.state.adsData.work_time_to2}</Text>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>

                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Wed:' : ':الأربعاء'}</Text>
                                                </View>

                                                <View>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: 'black' }}>{this.state.adsData.work_time_from3} - {this.state.adsData.work_time_to3}</Text>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Thu:' : ':الخميس'}</Text>
                                                </View>

                                                <View>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: 'black' }}>{this.state.adsData.work_time_from4} - {this.state.adsData.work_time_to4}</Text>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>

                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Fri:' : ':يوم الجمعة'}</Text>
                                                </View>

                                                <View>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: 'black' }}>{this.state.adsData.work_time_from5} - {this.state.adsData.work_time_to5}</Text>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Sat:' : ':يوم السبت'}</Text>
                                                </View>

                                                <View>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: 'black' }}>{this.state.adsData.work_time_from6} - {this.state.adsData.work_time_to6}</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Sun:' : ':الأحد'}</Text>
                                                </View>

                                                <View>
                                                    <Text style={{ fontFamily: 'cairo-semibold', fontSize: 16, color: 'black' }}>{this.state.adsData.work_time_from7} - {this.state.adsData.work_time_to7}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        :
                                        <View style={styles.contactInfo}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{this.state.adsData.work_time_from1} - {this.state.adsData.work_time_to1}</Text>
                                                </View>

                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Mon:' : ':الإثنين'}</Text>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{this.state.adsData.work_time_from2} - {this.state.adsData.work_time_to2}</Text>
                                                </View>
                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Tues:' : ':الثلاثاء'}</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>

                                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{this.state.adsData.work_time_from3} - {this.state.adsData.work_time_to3}</Text>
                                                </View>
                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Wed:' : ':الأربعاء'}</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{this.state.adsData.work_time_from4} - {this.state.adsData.work_time_to4}</Text>
                                                </View>

                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Thu:' : ':الخميس'}</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{this.state.adsData.work_time_from5} - {this.state.adsData.work_time_to5}</Text>
                                                </View>

                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Fri:' : ':يوم الجمعة'}</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{this.state.adsData.work_time_from6} - {this.state.adsData.work_time_to6}</Text>
                                                </View>

                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Sat:' : ':يوم السبت'}</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>

                                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{this.state.adsData.work_time_from7} - {this.state.adsData.work_time_to7}</Text>
                                                </View>

                                                <View style={{ width: 70, marginHorizontal: 10 }}>
                                                    <Text style={{ fontFamily: 'cairo-extralight', fontSize: 16, color: '#426d90' }}>{global.en_lan ? 'Sun:' : ':الأحد'}</Text>
                                                </View>


                                            </View>
                                        </View>
                                }
                            </View>
                        </ScrollView>
                    </ImageBackground>

                    <ModalVideo ref={(c) => { this.refModalShare = c }}></ModalVideo>
                </View>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    businessLogo_block: {
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderWidth: 20,

    },
    businessLogo: {
        width: '100%',
        height: '100%',
        resizeMode: "stretch",

    },
    contactInfo: {
        borderColor: '#b3b3c2',
        marginVertical: 10,
        marginLeft: 10
    },
    business_block: {
        height: 100,
        padding: 5,
        borderRadius: 4,
        borderColor: '#b3b3c2',
        borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 10
    },

    businessLogo2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    businessDescription: {
        flex: 2.5,
        paddingRight: 15,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    newsImage: {
        flex: 2
    },
    image_block: {
        width: '100%',
        height: '100%',
        resizeMode: "stretch"
    },
});



