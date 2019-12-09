
import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ImageBackground, TextInput, Linking, RefreshControl } from 'react-native';
import { MaterialIcons, Foundation, Feather, FontAwesome } from '@expo/vector-icons';
import Style from "../../constants/Style";
import Spinner from 'react-native-loading-spinner-overlay';
import * as Font from 'expo-font';
import { width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';

const getSubcatesUrl = global.server + "/api/location?";

export default class OfferSearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigate = this.props.navigation.navigate;
        this.state = {
            spinner: false,
            offerLocationData: [],
            status: 1,
            refreshing: false,
            page: 1,
            isLoading: false,
            last_page: 0
        };
    }

    getData = async () => {
        var url = getSubcatesUrl + "&per_page=" + 30 + "&current_page=" + this.state.page + "&offer_location=" + global.offer_location;

        fetch(url, {
            method: 'GET'
        }).then((response) => response.json())
            .then((res) => {

                console.log('Offers_Location_Data_response____', res);
                if (res.status == "200") {
                    this.setState({ offerLocationData: res.offers });
                    this.setState({ status: 1, isLoading: false, last_page: res.last_page });
                } else {
                    this.setState({ status: 0 })
                }
            })
    }

    componentDidMount() {
        this.setState({ isLoading: true }, this.getData);
    }

    handleLoadMore = () => {
        console.log("this.state.page=========", this.state.page);

        if (this.state.page < this.state.last_page) {
            this.setState({ page: this.state.page + 1, isLoading: true }, this.getData);
        } else {
            this.setState({ isLoading: false });
        }
    };

    renderFooter = () => {
        return (
            this.state.isLoading ?
                <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                </View> : null
        )
    }

    static navigationOptions = {
        header: null,
    };

    phone_call = (phone_number) => {
        console.log("this is a phone call button click!!!!", phone_number);
        Linking.openURL(`tel:${phone_number}`)
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        var url = getSubcatesUrl + "&per_page=" + 30 + "&current_page=" + this.state.page + "&$offer_location=" + global.offer_location;

        fetch(url, {
            method: 'GET'
        }).then((response) => response.json())
            .then((res) => {
                console.log('offerLocationData_response____', res);
                this.setState({ refreshing: false });

                if (res.status == "200") {
                    this.setState({ offerLocationData: res.offers });
                    this.setState({ status: 1 });

                } else {
                    console.log("get offerLocationData data failed")
                    this.setState({ status: 0 })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    offerDetail(){
        global.offerDetail_data = data;
        this.props.navigation.navigate('AdsSearchScreen')
    }
    
    renderRow = ({ item }) => {
        return (
            <View >

                <TouchableOpacity style={[styles.featuredFLItem, { width: width(95) }]} onPress={() => this.offerDetail(item)}>
                    <Image source={{ uri: global.server + item.attachment }} style={styles.featuredImg}>

                    </Image>
                    {
                        global.en_lan ?

                            <View style={styles.txtViewCon}>
                                <View style={{ width: width(50), alignItems: 'flex-start' }}>
                                    <Text style={styles.subHeadingTxt} numberOfLines={1} allowFontScaling={false}>{item.name}</Text>
                                </View>
                                <View style={{ width: width(50), alignItems: 'flex-start' }}>
                                    <Text style={styles.txtViewHeading} numberOfLines={2} allowFontScaling={false}>{global.en_lan ? item.en_description : item.ar_description}</Text>
                                </View>
                                <View style={styles.ratingCon}>

                                    <Icon
                                        size={20}
                                        name='eye'
                                        type='evilicon'
                                        color='#426d90'
                                        containerStyle={{ marginLeft: 0, marginVertical: 3 }}
                                    />
                                    <Text style={styles.ratingTxt} numberOfLines={1} allowFontScaling={false}>25555</Text>
                                </View>
                                <View style={{ marginTop: 2, width: width(45), marginHorizontal: 8, flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon
                                        size={18}
                                        name='calendar'
                                        type='evilicon'
                                        color='#426d90'
                                        containerStyle={{ marginHorizontal: 0, marginVertical: 0 }}
                                    />
                                    <Text style={{ fontSize: 10, color: '#8a8a8a' }} numberOfLines={1} allowFontScaling={false}>{item.created_at}</Text>
                                </View>
                            </View>


                            :
                            <View style={styles.txtViewCon}>
                                <View style={{ width: width(50), alignItems: 'flex-end' }}>
                                    <Text style={styles.subHeadingTxtAr} numberOfLines={1} allowFontScaling={false}>{item.name}</Text>
                                </View>
                                <View style={{ width: width(50), alignItems: 'flex-end' }}>
                                    <Text style={styles.txtViewHeadingAr} numberOfLines={2} allowFontScaling={false}>{global.en_lan ? item.en_description : item.ar_description}</Text>
                                </View>
                                <View style={styles.ratingCon}>

                                    <Icon
                                        size={20}
                                        name='eye'
                                        type='evilicon'
                                        color='#426d90'
                                        containerStyle={{ marginLeft: 0, marginVertical: 3 }}
                                    />
                                    <Text style={styles.ratingTxt} numberOfLines={1} allowFontScaling={false}>25555</Text>
                                </View>
                                <View style={{ marginTop: 2, width: width(45), marginHorizontal: 8, flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon
                                        size={18}
                                        name='calendar'
                                        type='evilicon'
                                        color='#426d90'
                                        containerStyle={{ marginHorizontal: 0, marginVertical: 0 }}
                                    />
                                    <Text style={{ fontSize: 10, color: '#8a8a8a' }} numberOfLines={1} allowFontScaling={false}>{item.created_at}</Text>
                                </View>
                            </View>
                    }
                </TouchableOpacity>
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.spinner} />

                <ImageBackground source={require('../../assets/images/header.png')} style={Style.header}>
                    <TouchableOpacity style={Style.left} onPress={() => this.props.navigation.goBack()}>
                        <Feather name='arrow-left' size={30} color="#8b999f" />
                    </TouchableOpacity>

                    <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10, borderWidth: 1, borderColor: '#fff' }}>
                        <Text style={{ color: '#8b999f', fontSize: 27, fontFamily: 'cairo-semibold' }}>{global.en_lan? 'Offers Search' : 'عروض البحث'} </Text>
                    </View>

                    <TouchableOpacity style={Style.right}>
                    </TouchableOpacity>
                </ImageBackground>


                <View>
                    {
                        this.state.status ?
                            <ImageBackground source={require('../../assets/images/BackgroundImage.png')} style={{ width: '100%', height: '100%', marginTop: 10 }}>

                                <FlatList
                                    style={{ marginHorizontal: 10, marginTop: 5, marginBottom: 110 }}
                                    data={this.state.offerLocationData}
                                    renderItem={this.renderRow}
                                    keyExtractor={(item, index) => index.toString()}
                                    onEndReached={this.handleLoadMore}
                                    onEndReachedThreshold={10}
                                    ListFooterComponent={this.renderFooter}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={this._onRefresh.bind(this)}
                                        />
                                    }
                                />
                            </ImageBackground>

                            :
                            <View style={Style.empty_screen} >
                                <Text style={{ fontFamily: 'cairo-extralight' }}>
                                    There are not any matched records.
                                </Text>
                            </View>
                    }

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    newsBlock: {
        height: 250,
        borderColor: '#b3b3c2',
        borderWidth: 0.5,
        marginBottom: 20
    },
    newsBlock_description: {
        padding: 5
    },
    business_block: {
        height: 100,
        padding: 5,
        borderRadius: 4,
        borderColor: '#b3b3c2',
        borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 20

    },
    callAndLocation: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff'
    },
    txtInput: {
        fontSize: 14,
        width: width(80),
        height: 42,
        margin: 2,
        paddingHorizontal: 5,
        textAlign: 'left',
    },
    txtInputAr: {
        fontSize: 14,
        width: width(80),
        height: 42,
        margin: 2,
        paddingHorizontal: 5,
        textAlign: 'right',
    },
    businessDescription: {
        flex: 2.5,
        paddingRight: 15,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    newsImage: {
        flex: 2,
    },
    ratingTxt: {
        marginHorizontal: 2,
        marginVertical: 3,
        fontSize: 11, //totalSize(S15)
        color: '#8a8a8a',
    },
    ratingCon: {
        // height: height(8),
        marginTop: 3,
        width: 55,
        flexDirection: 'row',
    },
    featuredFLItem: {
        alignSelf: 'center',
        marginHorizontal: 5,
        resizeMode: "stretch",

        height: 118,
        width: width(95),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        marginVertical: 5,
        marginBottom: 6
    },
    featuredImg: {
        height: 118,
        width: width(35),
        resizeMode: "stretch",

        margin: 0,

        alignItems: 'flex-start',
        borderRadius: 5
    },
    subHeadingTxt: {
        marginTop: 0,
        marginLeft: 10,
        fontSize: 11, //totalSize(S15),
        textAlign: 'left',
        width: 50
    },
    subHeadingTxtAr: {
        marginTop: 0,
        marginLeft: 10,
        fontSize: 11, //totalSize(S15),
        textAlign: 'right',
        width: 50
    },
    txtViewHeading: {
        textAlign: 'left',
        fontWeight: 'bold',
        // height: height(6),
        // width: width(45),
        marginTop: 3,
        marginBottom: 1,
        marginLeft: 10,
        fontSize: 14, //totalSize(S16)
        color: 'black',
    },
    txtViewHeadingAr: {
        textAlign: 'right',
        fontWeight: 'bold',
        // height: height(6),
        // width: width(45),
        marginTop: 3,
        marginBottom: 1,
        marginLeft: 10,
        fontSize: 14, //totalSize(S16)
        color: 'black',
    },
    txtViewCon: {
        height: 118,
        width: 55,
        justifyContent: 'center'
    },

});