import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, RefreshControl } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import ModalShare from '../ModalShare'
import Style from "../../constants/Style";
import api from '../../constants/Api'
import { Linking } from 'react-native';
import * as Font from 'expo-font';
import Swiper from 'react-native-swiper';


export default class eventScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            refreshing: false,
            page: 1,
            isLoading: false,
            last_page: 0
        };

    }

    componentDidMount() {
        this.setState({ isLoading: true }, this.getData);
    }

    static navigationOptions = {
        header: null,
    };

    getData = async () => {
        api.getEvents(global.country_id, global.city_id, this.state.page).then((res) => {
            console.log('Events_response____', res);
            this.setState({ events: res.events, isLoading: false, last_page: res.last_page });
        })
    }

    _passDetail(data) {
        global.eventDetail_data = data;
        this.props.navigation.navigate('eventDetailScreen')
    };

    _onRefresh() {
        this.setState({ refreshing: true, page: 1 });
        api.getEvents(global.country_id, global.city_id, this.state.page).then((res) => {

            if (res.status == "200") {
                this.setState({ events: res.events });
                this.setState({ refreshing: false, isLoading: false });

            } else {
                console.log("faild to get events.");
            }
        })
            .catch((error) => {
                console.log(error);
            })
    };

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
    };

    renderRow = ({ item }) => {
        return (
            <View style={styles.newsBlock}>
                <TouchableOpacity onPress={() => this._passDetail(item)}>
                    <Image source={{ uri: global.server + item.images[0].image }} style={{ width: '100%', height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                </TouchableOpacity>
                {global.en_lan ?
                    <View style={{ padding: 8,
                        backgroundColor: '#fff',
                        borderColor: '#b3b3c2',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        height: 98}}
                        >
                        <Text style={Style.text_fonts} numberOfLines={1}>Name: {item.en_name}</Text>
                        <Text style={Style.text_fonts} numberOfLines={1}>Place: {item.place}</Text>
                        <Text style={Style.text_fonts} numberOfLines={1}>Price: {item.price}</Text>
                        <Text style={Style.text_fonts} numberOfLines={1}>Date/Time {item.date}  {item.time}</Text>
                    </View>
                    :
                    <View style={styles.newsBlock_description}>
                        <Text style={{ fontFamily: 'cairo-extralight', textAlign: 'right', fontSize: 13}} numberOfLines={1}>اسم: {item.ar_name}</Text>
                        <Text style={{ fontFamily: 'cairo-extralight', textAlign: 'right'}} numberOfLines={1}>مكان: {item.place}</Text>
                        <Text style={{ fontFamily: 'cairo-extralight', textAlign: 'right'}} numberOfLines={1}>السعر: {item.price}</Text>
                        <Text style={{ fontFamily: 'cairo-extralight', textAlign: 'right'}} numberOfLines={1}>تاريخ / وقت {item.date}  {item.time}</Text>
                    </View>
                }
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={Style.header}>
                    <View style={{ flex: 1 }}></View>
                    <View style={Style.middle}>
                        <Text style={{ fontFamily: 'cairo-semibold', color: '#fff', fontSize: 27 }}>{global.en_lan ? "Events" : "أحداث"}</Text>
                    </View>
                    <TouchableOpacity style={Style.right} onPress={() => this.refModalShare.open()}>
                        <MaterialIcons name='menu' size={30} color="#fff" />
                    </TouchableOpacity>
                </View>

                <ImageBackground source={require('../../assets/images/BackgroundImage.png')} style={{ width: '100%', height: '100%' }}>

                    <FlatList
                        style={{ marginHorizontal: 10, marginTop: 3, fontFamily: 'cairo-extralight', marginTop: 10 }}
                        data={this.state.events}
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

                    <ModalShare ref={(c) => { this.refModalShare = c }} navigation={this.props.navigation} />
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: ''

    },
    newsBlock: {
        height: 300,
        borderColor: '#b3b3c2',
        borderWidth: 0.5,
        marginBottom: 20,
        borderRadius: 10

    },
    newsBlock_description: {
        padding: 5,
        backgroundColor: '#fff',
        borderColor: '#b3b3c2',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        height: 98
    },

    loader: {
        marginBottom: 30,
        alignItems: 'center'
    },
    image_block: {
        width: '100%',
        height: '100%',
        resizeMode: "stretch",
        borderRadius: 10
    },
});