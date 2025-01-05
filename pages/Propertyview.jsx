import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity,View,Text } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import { BASE_ASSET, BASE_URL } from "../config";

const PropertyVeiw=()=>{
const route=useRoute();
const [propertydata,setPropertydata]=useState(null)
const [img,setImg]=useState([])
const [viewimg,setViewimg]=useState(null)
const {index}=route.params;
const {propdata,propstatus}=useSelector((state)=>state.getproperties)
console.log(propdata.data[index].user_data.profile_img)
useEffect(()=>{
if(propdata.data[index]){
        setPropertydata(propdata.data[index])
        // console.log(propertydata.images)
        if(propertydata!=null){
       setViewimg(propertydata.featured_image)
        setImg(propertydata.images.split(','))
        }
}
},[propertydata])

   if(propstatus=='succeeded'&& propertydata!=null){
    return(
     <View style={{flex:1,paddingBottom:40,backgroundColor:'white'}}>
        <ScrollView contentContainerStyle={{position:"relative"}} >
            <Image style={{height:300,width:'100%'}} source={{uri:`${BASE_ASSET}uploads/propertyImages/${viewimg}`}} />
            <ScrollView horizontal={true}>
                {
                    img?.map((val,index)=>{
                        return(
                            <TouchableOpacity key={index} onPress={()=>{setViewimg(val)}} style={{borderRadius:10,overflow:"hidden",marginVertical:10,marginHorizontal:10,borderWidth:1,borderColor:'#E3E3E7'}}>
                            <Image style={{height:100,width:100}} source={{uri:`${BASE_ASSET}uploads/propertyImages/${val}`}} />
                        </TouchableOpacity>
                        )
                    })
                
                }        
            </ScrollView>
        <View style={{margin:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontWeight:700,fontSize:20,color:'#1A1E25',paddingVertical:10}}>
                    {propertydata.property_name}
                </Text>
                <Image style={{height:40,width:40}} source={require('../assets/appimages/heart.png')} />
            </View>
            <View >
                <View style={{flexDirection:'row',marginVertical:10}}>
                <Image style={{height:18,width:18}}  source={require('../assets/appimages/location-small.png')} />
                <Text style={{fontWeight:400,fontSize:16,color:'#7D7F88'}}>{propertydata.city},{propertydata.state}</Text>
                </View>
                
                <View style={{flexDirection:'row',justifyContent:'space-between',width:'60%',marginVertical:10}}>
                    <View style={{flexDirection:'row'}} ><Image source={require("../assets/appimages/room.png")} /><Text style={{fontWeight:400,fontSize:16,color:'#7D7F88',marginHorizontal:5}}>{propertydata.bedrooms} room</Text></View>
                    <View style={{flexDirection:'row'}}><Image source={require('../assets/appimages/home-hashtag.png')} /><Text style={{fontWeight:400,fontSize:16,color:'#7D7F88',marginHorizontal:5}}>{propertydata.carpet_area}m2</Text></View>
                </View>
                <View style={{borderWidth:1,borderColor:'#D6D6D6',marginVertical:10}}>

                </View>
            </View>
            
            <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10}}>
                <View style={{flexDirection:"row"}}>
                <Image style={{height:50,width:50,borderRadius:50}} source={ propertydata && propertydata.user_data && propertydata.user_data.profile_img!=null ? {uri:`${BASE_ASSET}/${propertydata.user_data.profile_img}`}:''} />
                <View style={{marginHorizontal:20}}>
                    <Text>{propertydata.user_data && propertydata.user_data!=null ? propertydata.user_data.name:'anonymous'}</Text>
                    <Text style={{color:'#7D7F88',fontStyle:'italic'}}>
                        {propertydata.listed_by}
                    </Text>
                </View>
                </View>
                <Image style={{height:50,width:50,objectFit:'cover'}} source={require('../assets/appimages/phone.png')} />
            </View>
            <View style={{borderWidth:1,borderColor:'#D6D6D6',marginVertical:10}}>

            </View>
            <View>
                <Text style={{fontWeight:700,fontSize:20,color:'#1A1E25',paddingVertical:10}}>
                    Home facilities
                </Text>
            </View>
            <View>
            <Text style={{fontWeight:700,fontSize:20,color:'#1A1E25',paddingVertical:10}}>
                    Description
                </Text>
                <Text style={{fontWeight:400,fontSize:16,color:'#7D7F88'}}>
                    {propertydata.description}
                </Text>
            </View>
        </View>
        
 </ScrollView>
 <View style={{ 
        position: 'absolute', 
        bottom: 0, 
        flexDirection: 'row', 
        width: '100%', 
        backgroundColor: 'white', 
        justifyContent: 'space-between', 
        paddingHorizontal: 16,  // Added horizontal padding
        paddingVertical: 10 ,    // Added vertical padding
        borderWidth:1,
        borderColor:'#E3E3E7'
      }}>
      
      {/* Price and Payment Type Text */}
      <Text style={{
        fontWeight: '700', 
        fontSize: 20, 
        color: '#1A1E25',
        paddingVertical: 10
      }}>
        {propertydata.price}/{propertydata.payment_type}
      </Text>
      
      {/* Apply Button */}
      <TouchableOpacity onPress={() => { /* handle apply button click */ }}>
        <LinearGradient
          colors={['#315EE7', '#6246EA']}
          style={{
            height: 40,  // Defined height for button
            width: 120,  // Defined width for button
            borderRadius: 8, // Rounded corners
            justifyContent: 'center', 
            alignItems: 'center'
          }}
        >
          <Text style={{
            color: 'white', 
            fontWeight: '600', 
            fontSize: 16
          }}>
            Apply
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
</View>
    )
}
}

export default PropertyVeiw;