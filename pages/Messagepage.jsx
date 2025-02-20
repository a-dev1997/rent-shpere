import { Image, ScrollView, TextInput,TouchableOpacity,View ,Text} from "react-native"
import Input from "../component/input";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_ASSET } from "../config";
import { useNavigation } from "@react-navigation/native";
import { MessageNotify } from "../component/messageNotification";
const Message=()=>{
    const nav=useNavigation()
    const {data,status}=useSelector((state)=>state.userInfo);
    const{messagedata,messagestatus}=useSelector((state)=>state.messages)
    // const [messagedata,setmessagedata]=useState(null)

    return(
        <View style={{flex:1, backgroundColor:"white"}}>
            <MessageNotify/>
            <View style={{marginHorizontal:10}}>
                <Input placeholder={'Search Messages'} />
            </View>
            <ScrollView>
                {messagedata!=null ?
                messagedata?.data?.map((val,index)=>{
                    if(val.user_data!=null ){
                        return(
                            <TouchableOpacity key={index} onPress={()=>{nav.navigate('Chat',{id:val.user_data.id,name:val.user_data.name,profile:val.user_data.profile_img})}} style={{flexDirection:'row',marginVertical:10,backgroundColor:'#F2F3F3',paddingVertical:10,marginHorizontal:10,paddingHorizontal:10,borderRadius:10,overflow:'hidden',position:'relative'}}>
                                <Image style={{height:60,width:60,borderRadius:50}} source={ val.user_data.profile_img? {uri:`${BASE_ASSET}/${val.user_data.profile_img}`}:require('../assets/appimages/dummyimg.png')} />
                                <View style={{justifyContent:'space-between'}}>
                                <Text style={{fontWeight:500,color:'black',fontSize:15}}>{val?.user_data?.name}</Text>
                                <Text >{val?.message.length > 40 ? val?.message.slice(0, 40) + '...' : val?.message}</Text>
                               
                                </View>
                                {val?.seencount?.length?<Text style={{position:'absolute',top:'50%',right:'5%',backgroundColor:'#917AFD',paddingHorizontal:10,paddingVertical:5,borderRadius:50,fontWeight:500,fontSize:12}}>{val?.seencount.length}</Text>:''}
                            </TouchableOpacity>

                        )
                    }
                })  
                :""  
            }
            </ScrollView>

        </View>
    )
}

export default Message;