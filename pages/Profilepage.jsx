import { Image, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { BASE_ASSET } from "../config";
import { useNavigation } from "@react-navigation/native";
import { fetchUserData } from "../reduxStore/userdataslice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
    const dispatch=useDispatch()
    const nav = useNavigation()
    const { profiledata, profilestatus } = useSelector((state) => state.userProfile);
    const {data,status}=useSelector((state)=>state.userInfo);
    const { mypropdata, mypropstatus } = useSelector((state) => state.getmyproperties);
    console.log('profidatafetch' + JSON.stringify(profiledata))

    const [userData, setUserdata] = useState(null)
//  useEffect(()=>{
// if(!data){
//     nav.navigate('Signin')
// }
//  },[])

   // Function to send POST request to logout API
const logout = async () => {
    try {
      // Make the POST request
      console.log(data.token)
      const response = await axios.post('https://rentsphere.onavinfosolutions.com/api/logout', { access_token: data.token },{
       
        headers: {
            'Authorization': `Bearer ${data.token}`,
           
          }
      });
      await AsyncStorage.removeItem('user');
      dispatch(fetchUserData())
      // Handle successful response
      console.log('Logout successful:', response.data);
      nav.navigate('Splashscreen')
      return response.data;
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error request:', error.request);
      } else {
        // Something else went wrong during setting up the request
        console.error('Error message:', error.message);
      }
      return null; // or return an error message depending on the use case
    }
  };

 



    // <ScrollView  contentContainerStyle={{flex:1,flexDirection:'column',justifyContent:'space-around',alignItems:'center',backgroundColor:'white'}}>
    //         <View style={{justifyContent:'center',alignItems:'center'}}>
    //             <Image style={{height:80,width:80,objectFit:'cover',borderRadius:50}} source={userData.profile_img?{uri:`${BASE_ASSET}/${userData.profile_img}`}:{uri:'https://s3-alpha-sig.figma.com/img/a296/3f70/a7feed7f191c17b1327b305679a65ff7?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ypsc6G4VY~wuSSG47f7kDCsa8zGHoC8~uwKAU84MQLwZtt3h3xWuPZcLkjf8FBhBOjX6kpV~EUDzARGRLfeb-q8aa5fMeA02TYdju7FfRWEoKfe8SfsCP7J1Fah5zrN94ehnRJhgSf~-7WbW8xz57qBIFhOfNE5ptjKGCOTggH3yj-VFBBdswjvnhdmwrVjWdpjwiA1p1hj69NB5IhgfdORzJ8~6yHWWe0l7LK41G03uQXKC8qTd0ygb39fEJe-maJaabER4RqwnboIzkI1V1kRrK4CPuZEfg4zM7Xi3MVw6O3oTRLD5uziSUIc8fdO0SkfMeVs~~aQi6jfJLfvDsw__'}}/>
    //             <Text style={{fontWeight:700,fontSize:24,color:'#1A1E25'}}>{userData.name}</Text>
    //             <Text style={{fontWeight:400,fontSize:16,color:'#7D7F88'}}>{userData.email}</Text>
    //         </View>
    //         <View style={{width:'80%',justifyContent:'space-around'}}>
    //             <View style={{height:1,backgroundColor:"#D6D6D6",margin:10}}>

    //             </View>
    //             <TouchableOpacity style={{flexDirection:'row',paddingVertical:10,justifyContent:'space-between',borderColor:"#E3E3E7",borderWidth:1,backgroundColor:'white',borderRadius:7, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.5, shadowRadius: 6,marginVertical:10}}>

    //                 <Image style={{height:22,width:22}} source={require('../assets/appimages/account.png')} />


    //                 <Text style={{color:'#1A1E25',fontWeight:500,fontSize:16}}>Profile details</Text>
    //                 <Image style={{height:22,width:22}} source={require("../assets/appimages/greaterthan.png")} />
    //             </TouchableOpacity>
    //             <TouchableOpacity style={{flexDirection:'row',paddingVertical:10,justifyContent:'space-between',borderColor:"#E3E3E7",borderWidth:1,backgroundColor:'white',borderRadius:7, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.5, shadowRadius: 6,marginVertical:10}}>

    //                 <Image style={{height:22,width:22}} source={require('../assets/appimages/settingicon.png')} />


    //                 <Text style={{color:'#1A1E25',fontWeight:500,fontSize:16}}>Settings</Text>
    //                 <Image style={{height:22,width:22}} source={require("../assets/appimages/greaterthan.png")} />
    //             </TouchableOpacity>
    //             <TouchableOpacity style={{flexDirection:'row',paddingVertical:10,justifyContent:'space-between',borderColor:"#E3E3E7",borderWidth:1,backgroundColor:'white',borderRadius:7, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.5, shadowRadius: 6,marginVertical:10}}>

    //                 <Image style={{height:22,width:22}} source={require('../assets/appimages/faq.png')} />


    //                 <Text style={{color:'#1A1E25',fontWeight:500,fontSize:16}}>FAQ</Text>
    //                 <Image style={{height:22,width:22}} source={require("../assets/appimages/greaterthan.png")} />
    //             </TouchableOpacity>

    //             <View style={{height:1,backgroundColor:"#D6D6D6",margin:10}}>

    //             </View>

    //         </View>
    //         <View style={{width:'80%'}}>
    //         <TouchableOpacity onPress={()=>{moveChild();setTimeout(() => {
    //                 nav.navigate('Tenenttabs')
    //         }, 1000);}} >
    //                 <Animated.View
    //                 style={{flexDirection:'row',paddingVertical:10,justifyContent:'space-between',alignItems:'center',borderColor:"#E3E3E7",borderWidth:1,borderRadius:7, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.5, shadowRadius: 6,marginVertical:10,backgroundColor}}
    //                 >
    //                <View style={{width:40,height:20,backgroundColor:'white',justifyContent:'center',borderRadius:10,padding:2,marginLeft:5, }}>
    //                         <Animated.View style={{height:15,width:15,backgroundColor:'black',borderRadius:50,transform: [{ translateX: moveAnim }]}}>

    //                         </Animated.View>
    //                </View>


    //                 <Text style={{color:'white',fontWeight:500,fontSize:16}}>Switch to landlord</Text>
    //                 <Image style={{height:22,width:22}} source={require("../assets/appimages/greaterthan.png")} />
    //                 </Animated.View>
    //             </TouchableOpacity>

    //         </View>
    //         <View style={{width:"80%",height:50}}>
    //            <TouchableOpacity

    //                        >
    //                          <LinearGradient
    //                            colors={['#917AFD', '#6246EA']}
    //                           style={{borderRadius:7,justifyContent:'center',alignItems:"center",height:50}}
    //                          >
    //                            <Text
    //                             style={{color:'white',textAlign:'center',fontFamily:'Hind',fontSize:22,fontWeight:500}}
    //                            >
    //                             LogOut
    //                            </Text>
    //                          </LinearGradient>
    //                        </TouchableOpacity>
    //         </View>
    // </ScrollView>
    if(data){

    
    return (
    <View style={{ flex: 1, padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10' }}>
            <Text style={{ fontWeight: 700, fontSize: 20 }}>Welcome , {profiledata.data.name}</Text>
            <Image style={{ height: 60, width: 60, objectFit: 'cover', borderRadius: 50 }} source={profiledata.data.profile_img ? { uri: `${BASE_ASSET}/${profiledata.data.profile_img}` } : { uri: 'https://s3-alpha-sig.figma.com/img/a296/3f70/a7feed7f191c17b1327b305679a65ff7?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ypsc6G4VY~wuSSG47f7kDCsa8zGHoC8~uwKAU84MQLwZtt3h3xWuPZcLkjf8FBhBOjX6kpV~EUDzARGRLfeb-q8aa5fMeA02TYdju7FfRWEoKfe8SfsCP7J1Fah5zrN94ehnRJhgSf~-7WbW8xz57qBIFhOfNE5ptjKGCOTggH3yj-VFBBdswjvnhdmwrVjWdpjwiA1p1hj69NB5IhgfdORzJ8~6yHWWe0l7LK41G03uQXKC8qTd0ygb39fEJe-maJaabER4RqwnboIzkI1V1kRrK4CPuZEfg4zM7Xi3MVw6O3oTRLD5uziSUIc8fdO0SkfMeVs~~aQi6jfJLfvDsw__' }} />
        </View>
        <TouchableOpacity onPress={() => { nav.navigate('Editprofile') }}>
            <Text>edit</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <TouchableOpacity onPress={() => { nav.navigate('Myproperty') }} style={{ height: 100, width: '45%', borderRadius: 10, overflow: 'hidden' }}>
                <LinearGradient
                    colors={['#6560F7', '#345EE8']}
                    style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ fontWeight: 700, color: 'white', textAlign: 'center' }}>My property</Text>
                    <Text></Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { nav.navigate('Tenentlist') }} style={{ height: 100, width: '45%', borderRadius: 10, overflow: 'hidden' }}>
                <LinearGradient
                    colors={['#315EE7', '#039BFF']}
                    style={{ height: '100%', justifyContent: 'center' }}
                >
                    <Text style={{ fontWeight: 700, color: 'white', textAlign: 'center' }}>Total Tenent</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <TouchableOpacity style={[styles.shadow, styles.cardContainer]}>
                <Image style={{ height: 60, width: 60, objectFit: "cover" }} source={require('../assets/appimages/payment.png')} />
                <Text>payment received</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shadow, styles.cardContainer]}>
                <Image style={{ height: 60, width: 60, objectFit: "cover" }} source={require('../assets/appimages/view.png')} />
                <Text>Total views</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity
            onPress={()=>{logout()}}
        >
            <LinearGradient
                colors={['#917AFD', '#6246EA']}
                style={{ borderRadius: 7, justifyContent: 'center', alignItems: "center", height: 50 }}
            >
                <Text
                    style={{ color: 'white', textAlign: 'center', fontFamily: 'Hind', fontSize: 22, fontWeight: 500 }}
                >
                    LogOut
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    </View>
    )
}else{
    nav.navigate('Signin')
}
}


export default Profile;


const styles = StyleSheet.create({
    shadow: {
        elevation: 5,
        shadowColor: '#171717',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        alignItems: 'center',
        flexDirection: 'column',
        width: '45%',
        height: 150,
        justifyContent: 'center',
        marginVertical: 20

    },
})