import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, RefreshControl } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import ModalShare from '../ModalShare'
import Style from "../../constants/Style";
import api from '../../constants/Api'
import { width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';


export default class jobScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            refreshing: false,
            page: 1,
            isLoading: false,
            last_page: 0
        };

        this.gotoSelectScreen = this.gotoSelectScreen.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true }, this.getData);
    }

    gotoSelectScreen = () => {
        this.props.navigation.navigate('SelectScreen');
    }

    static navigationOptions = {
        header: null,
    };

    getData = async () => {
        api.getJobs(global.country_id, global.city_id, this.state.page).then((res) => {
            console.log('Jobs_response____', res);
            this.setState({ jobs: res.jobs, isLoading: false, last_page: res.last_page });
        })
    }

    jobsDetail(data) {
        global.jobsDetail_data = data;
        this.props.navigation.navigate('jobDetailScreen')
    };

    _onRefresh() {
        this.setState({ refreshing: true, page: 1 });
        api.getJobs(global.country_id, global.city_id, this.state.page).then((res) => {

            if (res.status == "200") {
                this.setState({ jobs: res.jobs });
                this.setState({ refreshing: false, isLoading: false });

            } else {
                console.log("faild to get jobs.");
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
            <TouchableOpacity style={[styles.featuredFLItem, { width: width(95) }]} onPress={() => this.jobsDetail(item)} >
                <Image source={{ uri: global.server + item.logo_attachment }} style={styles.featuredImg}></Image>
                <View style={styles.txtViewCon}>
                    {
                        global.en_lan ?
                            <View style={{ width: width(50), alignItems: 'flex-start' }}>
                                <Text style={styles.subHeadingTxt} numberOfLines={1} allowFontScaling={false}>{global.en_lan ? item.name : item.name}</Text>
                            </View>
                            :
                            <View style={{ width: width(50), alignItems: 'flex-end' }}>
                                <Text style={styles.subHeadingTxtAr} numberOfLines={1} allowFontScaling={false}>{global.en_lan ? item.name : item.name}</Text>
                            </View>
                    }

                    {
                        global.en_lan ?

                            <View style={{ width: width(50), alignItems: 'flex-start' }}>
                                <Text style={styles.txtViewHeading} numberOfLines={2} allowFontScaling={false}>{global.en_lan ? item.en_title : item.ar_title}</Text>
                            </View>
                            :
                            <View style={{ width: width(50), alignItems: 'flex-end' }}>
                                <Text style={styles.txtViewHeadingAr} numberOfLines={2} allowFontScaling={false}>{global.en_lan ? item.en_title : item.ar_title}</Text>
                            </View>

                    }

                    <View style={{ marginTop: 2, width: width(45), marginHorizontal: 8, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            size={18}
                            name='calendar'
                            type='evilicon'
                            color='#426d90'
                            containerStyle={{ marginHorizontal: 0, marginVertical: 0 }}
                        />
                        <Text style={{ fontSize: 13, color: '#8a8a8a' }} numberOfLines={1} allowFontScaling={false}>{item.created_at}</Text>
                    </View>
                </View>


            </TouchableOpacity>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={Style.header}>
                    <View style={{ flex: 1 }}></View>

                    <View style={Style.middle}>
                        <Text style={{ fontFamily: 'cairo-semibold', color: '#fff', fontSize: 27 }}>{global.en_lan ? "Jobs" : "وظائف"}</Text>
                    </View>
                    <TouchableOpacity style={Style.right} onPress={() => this.refModalShare.open()}>
                        <MaterialIcons name='menu' size={30} color="#fff" />
                    </TouchableOpacity>
                </View>

                <ImageBackground source={require('../../assets/images/BackgroundImage.png')} style={{ width: '100%', height: '100%' }}>

                    <FlatList
                        style={{ marginHorizontal: 10, marginTop: 3, fontFamily: 'cairo-extralight' }}
                        data={this.state.jobs}
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
    },

    loader: {
        marginBottom: 30,
        alignItems: 'center'
    },

    featuredFLItem: {
        alignSelf: 'center',
        marginHorizontal: 5,
        resizeMode: "stretch",
        height: 100,
        width: width(95),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        marginVertical: 5,
        marginBottom: 6
    },
    featuredImg: {
        height: 80,
        width: 80,
        margin: 0,
        alignItems: 'flex-start',
        borderRadius: 80/2,
        borderWidth: 1,
        borderColor: '#dddddd',
        margin:10
    },
    subHeadingTxt: {
        marginTop: 0,
        marginLeft: 10,
        fontSize: 15, 
        textAlign: 'left',
        width: 50
    },
    subHeadingTxtAr: {
        marginTop: 0,
        marginLeft: 10,
        fontSize: 15, 
        textAlign: 'right',
        width: 50
    },
    txtViewHeading: {
        textAlign: 'left',
        fontWeight: 'bold',
        marginTop: 3,
        marginBottom: 1,
        marginLeft: 10,
        fontSize: 15, 
        color: 'black',
    },
    txtViewHeadingAr: {
        textAlign: 'right',
        fontWeight: 'bold',
        marginTop: 3,
        marginBottom: 1,
        marginLeft: 10,
        fontSize: 15, 
        color: 'black',
    },
    txtViewCon: {
        height: 100,
        width: 55,
        justifyContent: 'center'
    },
});
