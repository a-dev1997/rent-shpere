import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity,View,Text } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import { BASE_ASSET, BASE_URL } from "../config";
import axios from "axios";

const PropertyVeiw=()=>{
const route=useRoute();
const nav=useNavigation()
const [propertydata,setPropertydata]=useState(null)

const [img,setImg]=useState([])
const [viewimg,setViewimg]=useState(null)
const {id}=route.params;
const [count,setCount]=useState(1)

const [property,setPorperty]=useState(null)
const {data,status}=useSelector((state)=>state.userInfo)
const {profiledata,profilestatus}=useSelector((state)=>state.userProfile);
// console.log('fjd'+JSON.stringify(profiledata))



const getProperty = async () => {
    try {
        // Make the API call with axios
        const response = await axios.post('https://rentsphere.onavinfosolutions.com/api/single-property', 
            { id },
            {
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Handle the response data
        
        setPorperty(response.data.data);
        // setImages(response.data.data.images.split(","));
        setCount(count+1)

    } catch (err) {
        // Handle any errors that occur during the request
        console.error('Error occurred:', err.message || err);
    } finally {
        // Ensure loading is set to false, regardless of success or failure
        setLoading(false);
    }
};


useEffect(()=>{
    getProperty()

},[])
useEffect(()=>{
    if(property){
        console.log(count)
        
         
         
        setViewimg(property.featured_image)
         setImg(property.images.split(','))
        
         
         // console.log(img)
 }
},[property])

   if(property!=null){
    return(
       
     <View style={{flex:1,paddingBottom:40,backgroundColor:'white'}}>
        <ScrollView contentContainerStyle={{position:"relative"}} >
            <Image style={{height:300,width:'100%'}} source={{uri:`${BASE_ASSET}uploads/propertyImages/${viewimg}`}} />
            <TouchableOpacity onPress={()=>{nav.goBack()}} style={{position:"absolute",zIndex:999,top:10,left:5,borderColor:'black',borderWidth:1,borderRadius:50,opacity:0.5}}>
                <Image style={{height:50,width:50,objectFit:'contain'}} source={require('../assets/appimages/backbtn.png')} />
            </TouchableOpacity>
            <ScrollView horizontal={true}>
                {
                    img?.map((val,index)=>{
                        return(
                            <View>
                            <TouchableOpacity key={index} onPress={()=>{setViewimg(val)}} style={{borderRadius:10,overflow:"hidden",marginVertical:10,marginHorizontal:10,borderWidth:1,borderColor:'#E3E3E7'}}>
                            <Image style={{height:100,width:100}} source={{uri:`${BASE_ASSET}uploads/propertyImages/${val}`}} />
                        </TouchableOpacity>
                        
                      { profiledata.data.id==property.user_id  && val!=property.featured_image?
                       <TouchableOpacity style={{padding:5}}>
                            <Text style={{color:'#315EE7',fontWeight:500,fontSize:12,textAlign:'center'}}>set display image</Text>
                        </TouchableOpacity>:<Text style={{textAlign:'center'}}>display image</Text>
                    }:
                
                        </View>
                        )
                    })
                
                }        
            </ScrollView>
        <View style={{margin:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontWeight:700,fontSize:20,color:'#1A1E25',paddingVertical:10}}>
                    {property.property_name}
                </Text>
                <Image style={{height:40,width:40,objectFit:'contain'}} source={require('../assets/appimages/heart.png')} />
            </View>
            <View >
                <View style={{flexDirection:'row',marginVertical:10}}>
                <Image style={{height:18,width:18}}  source={require('../assets/appimages/location-small.png')} />
                <Text style={{fontWeight:400,fontSize:16,color:'#7D7F88'}}>{property.city},{property.state}</Text>
                </View>
                
                <View style={{flexDirection:'row',justifyContent:'space-between',width:'60%',marginVertical:10}}>
                    <View style={{flexDirection:'row'}} ><Image source={require("../assets/appimages/room.png")} /><Text style={{fontWeight:400,fontSize:16,color:'#7D7F88',marginHorizontal:5}}>{property.bedrooms} room</Text></View>
                    <View style={{flexDirection:'row'}}><Image source={require('../assets/appimages/home-hashtag.png')} /><Text style={{fontWeight:400,fontSize:16,color:'#7D7F88',marginHorizontal:5}}>{property.carpet_area}m2</Text></View>
                </View>
                <View style={{borderWidth:1,borderColor:'#D6D6D6',marginVertical:10}}>

                </View>
            </View>
            
            <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10}}>
                <View style={{flexDirection:"row"}}>
                <Image style={{height:50,width:50,borderRadius:50}} source={ property && property.user_data && property.user_data.profile_img!=null ? {uri:`${BASE_ASSET}/${property.user_data.profile_img}`}:''} />
                <View style={{marginHorizontal:20}}>
                    <Text>{property.user_data && property.user_data!=null ? property.user_data.name:'anonymous'}</Text>
                    <Text style={{color:'#7D7F88',fontStyle:'italic'}}>
                        {property.listed_by}
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
                    {property.description}
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
        {property.price}/{property.payment_type}
      </Text>
      
      {/* Apply Button */}
      <TouchableOpacity onPress={() => { /* handle apply button click */ }}>
        <LinearGradient
          colors={['#917AFD', '#6246EA']}
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