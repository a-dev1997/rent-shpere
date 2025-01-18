import { Image, ScrollView, Text, View,StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Screen } from "react-native-screens";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchUserData } from "../reduxStore/userdataslice";
import { fetchProperties } from "../reduxStore/getpropertiesslice";
import { fetchCatData } from "../reduxStore/categorydataslice";
import { fetchCurrentlocation } from "../reduxStore/currentlocationslice";
import { fetchProfile } from "../reduxStore/profiledataslice";
import { fetchWishlist } from "../reduxStore/wishlistslice";
import { fetchStates } from "../reduxStore/getstatesslice";
import { fetchMyProperties } from "../reduxStore/mypropertyslice";
import { fetchMessage } from "../reduxStore/messageslice";
const GetStarted=()=>{

    const nav=useNavigation();
    const dispatch=useDispatch();
    // const {propdata}=useSelector((state)=>state.getproperties)
    // const {data}=useSelector((state)=>state.userInfo)
    // const {catData}=useSelector((state)=>state.category)
    // console.log(propdata)
    // console.log(data)
    // console.log('dkfjd'+catData)
    // const {messagedata,messagestatus}=useSelector((state)=>state.messages);
  
 useEffect(()=>{
    dispatch(fetchUserData())
    dispatch(fetchProperties(1))
    dispatch(fetchCatData())
    dispatch(fetchCurrentlocation())
    dispatch(fetchProfile())
    dispatch(fetchWishlist())
    dispatch(fetchStates())
    dispatch((fetchMyProperties()))
    dispatch(fetchMessage())
   console.log('render')
  },[])
    return(
        <ScrollView>
            <View style={styles.imageview}>
                <Image source={require('../assets/appimages/applogo.png') } width={100} height={100}  />
            </View>
            <View style={styles.textdiv}>
                <Text style={styles.welcometext}>
                    Welcome to
                </Text>
                <Text style={styles.rentspheretext}>
                    RentSphere
                </Text>
                <Text style={styles.tagline}>
                Find the tenant, list your property in just a simple steps, in your hand.
                </Text>
                <Text style={styles.tagline}>
                    You are one step away.
                </Text>
            </View>
            <View style={styles.buttondiv}>
                <TouchableOpacity style={styles.startedbutton} onPress={()=>{nav.navigate('Signin')}}>
                    <Text style={styles.buttontext}>Get Started</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.startedbutton} onPress={()=>{nav.navigate('Mytabs',{
                    Screen:'Home'
                })}}>
                    <Text style={styles.buttontext}>skip to home</Text>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    )

}

export default GetStarted;

const styles=StyleSheet.create({
    imageview:{
        display:'flex',
        alignContent:'center',
        alignItems:'center',
        height:'30%',
       paddingTop:30,
        
    },
    textdiv:{
        marginHorizontal:20,
        marginVertical:40,
    },
    welcometext:{
        fontWeight:400,
        fontStyle:'italic',
        fontSize:24,
        color:'#22215B',
        fontFamily:'ABeeZee Italic'
    },
    rentspheretext:{
        fontWeight:700,
        fontSize:56,
        color:'#22215B',
        fontFamily:'Hind',
        marginVertical:10,
        
    },
    tagline:{
        fontWeight:400,
        fontSize:14,
        color:'#7B7F9E',
        marginVertical:10,
        fontFamily:'Hind'
    },
    buttondiv:{
        display:'flex',
        justifyContent:'center',
        alignItems:"center",
      marginTop:60,
    },
    startedbutton:{
        width:'80%',
        backgroundColor:'#567DF4',
        height:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },
    buttontext:{
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:700,
    }
})