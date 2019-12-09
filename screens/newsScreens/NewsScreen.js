import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, RefreshControl} from 'react-native';
import { MaterialIcons, FontAwesome} from '@expo/vector-icons';
import ModalShare from '../ModalShare'
import Style from "../../constants/Style";
import api from '../../constants/Api'

export default class NewsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            news: [],         
            refreshing: false,  
            page: 1,
            isLoading: false,
            last_page: 0
        };     

        this.gotoSelectScreen=this.gotoSelectScreen.bind(this); 
    }

    componentDidMount(){


        this.setState({isLoading: true}, this.getData );

    }

    gotoSelectScreen=()=>{
        this.props.navigation.navigate('SelectScreen');
    }
    
    static navigationOptions = {
        header: null,
    };

    getData = async () =>{
        api.getNews(global.country_id, global.city_id, this.state.page).then((res)=>{
            console.log('News_response____', res);
            this.setState({news: res.news, isLoading: false, last_page: res.last_page});
        })
    }

    newsDetail(data){
        global.newsDetail_data = data;
        this.props.navigation.navigate('NewsDetailScreen')
    };

    _onRefresh(){
        this.setState({refreshing: true, page: 1});
        api.getNews(global.country_id, global.city_id, this.state.page).then((res)=>{
           
            if(res.status == "200"){
                this.setState({news: res.news});
                this.setState({refreshing: false, isLoading: false});

            }else{
                console.log("faild to get news");
            }
        })
        .catch((error) => {
            console.log(error);
        })
    };

    handleLoadMore = () => {
        console.log("this.state.page=========", this.state.page   );

        if(this.state.page < this.state.last_page){
            this.setState({page: this.state.page + 1, isLoading: true}, this.getData );
        }else{
            this.setState({isLoading: false});
        }
    };

    renderFooter = () => {
        return (
            this.state.isLoading?
            <View style={styles.loader}>
                <ActivityIndicator size="large"/>
            </View> : null
        )
    };

    renderRow = ({item}) => {
        return(
            <View style={styles.newsBlock}>
                <TouchableOpacity onPress={()=>this.newsDetail(item)}>
                    <Image source={{ uri: global.server + item.attachment}}  style={{width: '100%', height:200}}/>
                </TouchableOpacity>
                {global.en_lan?
                    <View style={styles.newsBlock_description}>
                        <Text style={Style.text_fonts} numberOfLines={1}>{global.en_lan? item.en_title : item.ar_title}</Text>
                        <Text style={Style.text_fontss}>{item.created_at}</Text>
                    </View>
                    :
                    <View style={styles.newsBlock_description}>
                        <Text  style={{fontFamily: 'cairo-extralight', textAlign: 'right', }} numberOfLines={1}>{global.en_lan? item.en_title : item.ar_title}</Text>
                        <Text style={{fontFamily: 'cairo-extralight', textAlign: 'right', }}>{item.created_at}</Text>
                    </View>
                }
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <View  style={Style.header}>
                    {/* <View style={Style.left}>
                    <TouchableOpacity onPress={() => Linking.openURL('http://youbeksoft.com/radio')}>
                        <FontAwesome name='podcast' size={30} color="#C21807"/>
                        </TouchableOpacity>
                    </View> */}
                    <View style={Style.middle}>
                        <Text style={{  fontFamily: 'cairo-semibold', color: '#fff', fontSize: 27 }}>{global.en_lan? "News" : "أخبار"}</Text>
                    </View>
                    <TouchableOpacity style={Style.right} onPress={() => this.refModalShare.open()}>
                        <MaterialIcons name='menu' size={30} color="#fff"/>
                    </TouchableOpacity>
                </View>

                <ImageBackground source={require('../../assets/images/BackgroundImage.png')} style={{width: '100%', height: '100%'}}>
                <View style={{paddingHorizontal: 20, paddingTop: 10,  alignItems: "flex-end",}}>
                    {/* <Text style={{color: '#426d90'}}>{global.en_lan? 'New News': "اخبار جديدة"}</Text> */}
                </View>
      
                <FlatList
                
                    style = {{marginHorizontal: 10,marginTop: 3, fontFamily: 'cairo-extralight'}}
                    data = {this.state.news}     
                    renderItem = {this.renderRow}       
                    keyExtractor = {(item, index) => index.toString()}    
                    onEndReached = {this.handleLoadMore}
                    onEndReachedThreshold={10}
                    ListFooterComponent = {this.renderFooter}
                    refreshControl={
                        <RefreshControl 
                            refreshing = {this.state.refreshing}
                            onRefresh = {this._onRefresh.bind(this)}
                        />
                    }
                />
  
                <ModalShare ref={(c) => { this.refModalShare = c }} navigation={this.props.navigation}/>
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
        height: 250,
        borderColor: '#b3b3c2',
        borderWidth: 0.5,
        marginBottom: 20,
        borderRadius:10
        
    },
    newsBlock_description: {
        padding: 5,
        backgroundColor:'#fff',
        borderColor: '#b3b3c2'
    },
   
    loader:{
        marginBottom: 30,
        alignItems: 'center'
    },
    image_block: {
        width: '100%',
        height:'100%',
        resizeMode:"stretch"
    },
});