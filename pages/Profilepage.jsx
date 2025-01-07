import { Image, ScrollView, View ,Text, TouchableOpacity, ActivityIndicator} from "react-native"
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BASE_ASSET } from "../config";

const Profile=()=>{
    
    const {profiledata,profilestatus}=useSelector((state)=>state.userProfile);
    console.log(profiledata)
    
    const [userData,setUserdata]=useState(null)
    // const profiledata=async()=>{
    //     try{
    //     let response = await axios.get('https://rentsphere.onavinfosolutions.com/api/profile-data',{
    //         headers:{
    //              'Authorization': `Bearer ${data.token}`
    //         }
    //     })
    //     setUserdata(response.data.data)
    //     console.log(response.data.data)

    // }catch(error){
    //     console.log(error)
    // }
    // }
    useEffect(()=>{
    if(profilestatus=='succeeded'){
        setUserdata(profiledata.data )
    }
    },[profilestatus])
    if(userData==null){
        return(
            <ActivityIndicator />
        )
    }else{
    return(
        <ScrollView  contentContainerStyle={{flex:1,flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'white'}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image style={{height:80,width:80,objectFit:'cover',borderRadius:50}} source={userData.profile_img?{uri:`${BASE_ASSET}/${userData.profile_img}`}:{uri:'https://s3-alpha-sig.figma.com/img/a296/3f70/a7feed7f191c17b1327b305679a65ff7?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ypsc6G4VY~wuSSG47f7kDCsa8zGHoC8~uwKAU84MQLwZtt3h3xWuPZcLkjf8FBhBOjX6kpV~EUDzARGRLfeb-q8aa5fMeA02TYdju7FfRWEoKfe8SfsCP7J1Fah5zrN94ehnRJhgSf~-7WbW8xz57qBIFhOfNE5ptjKGCOTggH3yj-VFBBdswjvnhdmwrVjWdpjwiA1p1hj69NB5IhgfdORzJ8~6yHWWe0l7LK41G03uQXKC8qTd0ygb39fEJe-maJaabER4RqwnboIzkI1V1kRrK4CPuZEfg4zM7Xi3MVw6O3oTRLD5uziSUIc8fdO0SkfMeVs~~aQi6jfJLfvDsw__'}}/>
                    <Text style={{fontWeight:700,fontSize:24,color:'#1A1E25'}}>{userData.name}</Text>
                    <Text style={{fontWeight:400,fontSize:16,color:'#7D7F88'}}>{userData.email}</Text>
                </View>
                <View style={{width:'80%',justifyContent:'space-around'}}>
                    <View style={{height:1,backgroundColor:"#D6D6D6",margin:10}}>

                    </View>
                    <TouchableOpacity style={{flexDirection:'row',height:40,paddingVertical:10,justifyContent:'space-between',borderColor:"#E3E3E7",borderWidth:1,backgroundColor:'white',borderRadius:7, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.5, shadowRadius: 6,marginVertical:10}}>
                        
                        <Image style={{height:22,width:22}} source={require('../assets/appimages/account.png')} />
                    
                        
                        <Text style={{color:'#1A1E25',fontWeight:500,fontSize:16}}>Profile details</Text>
                        <Image style={{height:22,width:22}} source={require("../assets/appimages/greaterthan.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row',height:40,paddingVertical:10,justifyContent:'space-between',borderColor:"#E3E3E7",borderWidth:1,backgroundColor:'white',borderRadius:7, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.5, shadowRadius: 6,marginVertical:10}}>
                        
                        <Image style={{height:22,width:22}} source={require('../assets/appimages/settingicon.png')} />
                    
                        
                        <Text style={{color:'#1A1E25',fontWeight:500,fontSize:16}}>Settings</Text>
                        <Image style={{height:22,width:22}} source={require("../assets/appimages/greaterthan.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row',height:40,paddingVertical:10,justifyContent:'space-between',borderColor:"#E3E3E7",borderWidth:1,backgroundColor:'white',borderRadius:7, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.5, shadowRadius: 6,marginVertical:10}}>
                        
                        <Image style={{height:22,width:22}} source={require('../assets/appimages/faq.png')} />
                    
                        
                        <Text style={{color:'#1A1E25',fontWeight:500,fontSize:16}}>FAQ</Text>
                        <Image style={{height:22,width:22}} source={require("../assets/appimages/greaterthan.png")} />
                    </TouchableOpacity>

                    <View style={{height:1,backgroundColor:"#D6D6D6",margin:10}}>

                    </View>
                    
                </View>
                <View style={{width:"80%",height:50}}>
                   <TouchableOpacity
                                
                               >
                                 <LinearGradient
                                   colors={['#917AFD', '#6246EA']}
                                  style={{borderRadius:7,justifyContent:'center',alignItems:"center",height:50}}
                                 >
                                   <Text
                                    style={{color:'white',textAlign:'center',fontFamily:'Hind',fontSize:22,fontWeight:500}}
                                   >
                                    LogOut
                                   </Text>
                                 </LinearGradient>
                               </TouchableOpacity>
                </View>
        </ScrollView>
    )
}
}

export default Profile;