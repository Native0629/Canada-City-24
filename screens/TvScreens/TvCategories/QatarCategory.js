
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import api from '../../../constants/Api';


export default class QatarCategory extends React.Component {


    constructor(props) {
        super(props);
        this.state = { 
              tvData: [],
              refreshing: false,
              status1: 1
          };     
      }
  
      componentDidMount(){
  
          api.getTvs("Qatar").then((res)=>{
              console.log('tv', res);
          
              if(res.status == "200"){
                  this.setState({tvData: res.tv})
                  this.setState({status1: 1})
                //   console.log('this.state.tvData=============================> ', this.state.tvData);
  
              }else{
                  console.log("Faild to get tv data")
                  this.setState({status1: 0})
              }
          })
          .catch((error) => {
              console.log(error);
          })
      }
  
      tvDetail(data){
          this.props.method();
          global.tvDetail_data = data;
      }
  
      _onRefresh(){
          this.setState({refreshing: true});
          api.getTvs("Lebanon").then((res)=>{
            // console.log('tv', res);
        
            if(res.status == "200"){
                this.setState({tvData: res.tvs})
                this.setState({status1: 1})

            }else{
                console.log("Faild to get tv data")
                this.setState({status1: 0})
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <View style={{flexDirection: 'row',  flexWrap: 'wrap', justifyContent: 'flex-end'}}>
        
                {this.state.tvData.map((data, index)=>(
                        
                <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd',backgroundColor:'#fff' }} key = {index}>
                    <TouchableOpacity style={{ flex: 2 }} onPress={()=>this.tvDetail(data)}>
                        <Image source={{uri:global.server + data.logo_url}}  style={{ flex: 1, width: null, height: null, resizeMode: 'stretch' }}/>
                    </TouchableOpacity>

                    <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                        <Text>{data.name}</Text>
                    </View>
                </View>
        
                ))}   
            </View>
           
   
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});