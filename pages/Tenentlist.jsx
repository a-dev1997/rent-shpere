import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect ,useState} from "react";
import LinearGradient from "react-native-linear-gradient";

const TenentList=()=>{
    const {data,status}=useSelector((state)=>state.userInfo);
    const [list ,setList]=useState(null)
    const getTenant = async () => {
        const apiUrl = 'https://rentsphere.onavinfosolutions.com/api/get-tenent';
       
      
        try {
          // Make the GET request using Axios with the authorization header
          const response = await axios.get(apiUrl, {
            headers: {
              'Authorization': `Bearer ${data.token}`,
            },
          });
      
          // Handle successful response
          setList(response.data.data); // Assuming 'data' contains the tenant data
          console.log(response.data.data)
        } catch (error) {
          // Handle error during the request
          if (error.response) {
            // The server responded with a status code outside the 2xx range
            console.error('Error response from server:', error.response.data);
            console.error('Error status:', error.response.status);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
          } else {
            // Something else went wrong in setting up the request
            console.error('Error setting up the request:', error.message);
          }
        }
      };

      useEffect(()=>{
        getTenant()
      },[])
    return(
        <View style={{flex:1 ,backgroundColor:'white'}}>
            <Text style={{fontWeight:500,fontSize:20,textAlign:'center'}}>
                Tenents
            </Text>
            <View style={{flexDirection:'row',justifyContent:"center"}}>
                <TextInput style={{backgroundColor:"#F2F2F3",borderRadius:70,width:'90%',padding:10,height:50}} placeholder="Search..." />
            </View>
            <ScrollView style={{marginVertical:20,marginHorizontal:10}} contentContainerStyle={{alignItems:'center',justifyContent:'center'}}>
                {
                    list?.map((val,index)=>{
                            return(
                                <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'98%',borderBottomWidth:2,borderBottomColor:'grey',padding:10}}>
                                    <Image source={require('../assets/appimages/dummyimg.png')} />
                                    <Text style={{}}>{val.name}</Text>
                                    <Text>Due amount</Text>
                                </TouchableOpacity>
                            )
                    })
                }
            </ScrollView>
            <View style={{flexDirection:"row",justifyContent:'flex-end'}}>
                    <TouchableOpacity style={{flexDirection:'row',margin:'10',width:'40%'}}>
                                <LinearGradient
                                    colors={['#315EE7','#6760F7']}
                                    style={{borderRadius:70,paddingHorizontal:20,paddingVertical:10}}
                                >
                                    <Text style={{color:'white',fontWeight:500,textAlign:'center'}}>+ Add Tenent</Text>
                                </LinearGradient>
                    </TouchableOpacity>
                    </View>
        </View>
    )

}

export default TenentList;