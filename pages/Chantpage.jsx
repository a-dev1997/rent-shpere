import { ScrollView, View,Text, Image, TouchableOpacity,TextInput } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import axios from "axios"
import { useFocusEffect, useRoute } from "@react-navigation/native"
import { useSelector,useDispatch } from "react-redux"
import { useEffect, useState ,useRef, useCallback} from "react"
import { BASE_ASSET } from "../config"
import { fetchMessage } from "../reduxStore/messageslice"



const Chat=()=>{
  
const dispatch = useDispatch()
    const route=useRoute();
    const {id,name,profile}=route.params;
 const {data,status}=useSelector((state)=>state.userInfo);
 const{messagedata,messagestatus}=useSelector((state)=>state.messages)
 const [userdata,setUserdata]=useState(null)
 const [newmessage,setMessage]=useState('');
 const scrollViewRef = useRef(null);
 const sendMessage = async (message) => {
  let receiver_id=id;
  setMessage('')
  try {
    // Make the GET request to the API
    const response = await axios.post('https://rentsphere.onavinfosolutions.com/api/send-message',{receiver_id,message},{

      headers: {
          'Authorization': `Bearer ${data.token}`,
        
        },
    });

    // Log the data if the request is successful
    // console.log('User send message:', response.data);
    
      dispatch(fetchMessage())
      fetchUserMessage()
      seenMessage()
      // scrollViewRef.current?.scrollToEnd({ animated: false });
      
    // You can return or handle the response data as needed
    // return response.data;
  } catch (error) {
    // Handle errors from the API call
    console.error('Error fetching send message:', error);

    // You can throw the error or handle it as needed
    throw error; // Optional: re-throw the error or return an error message
  }
};

 const seenMessage = async () => {
  try {
    // Make the GET request to the API
    const response = await axios.get(`https://rentsphere.onavinfosolutions.com/api/message-seen/${id}`,{

      headers: {
          'Authorization': `Bearer ${data.token}`,
        
        },
    });

    // Log the data if the request is successful
    // console.log('User seen message:', response.data);
      dispatch(fetchMessage())
    // You can return or handle the response data as needed
    // return response.data;
  } catch (error) {
    // Handle errors from the API call
    console.error('Error fetching seen message:', error);

    // You can throw the error or handle it as needed
    throw error; // Optional: re-throw the error or return an error message
  }
};

    const fetchUserMessage = async () => {
        try {
          // Make the GET request to the API
          const response = await axios.get(`https://rentsphere.onavinfosolutions.com/api/user-messages/${id}`,{

            headers: {
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json',
              },
          });
      
          // Log the data if the request is successful
          // console.log('User Profile:', response.data);
          setUserdata(response.data)
          // You can return or handle the response data as needed
          return response.data;
        } catch (error) {
          // Handle errors from the API call
          console.error('Error fetching user profile:', error);
      
          // You can throw the error or handle it as needed
          throw error; // Optional: re-throw the error or return an error message
        }
      };
      
      // Call the function to fetch user profile
      // fetchUserProfile().then(data => {
      //   // Handle the data if necessary
      // }).catch(error => {
      //   // Handle the error here if you need to
      // });

     useEffect(()=>{
      scrollViewRef.current?.scrollToEnd({ animated: false });
     },[messagedata])
      useEffect(()=>{
      
        seenMessage()
        fetchUserMessage()
            
      },[messagedata])

    return(

        <View style={{flex:1,backgroundColor:'white'}}>
         
                  <LinearGradient
                                  colors={['#917AFD','#6246EA']}
                                  style={{flexDirection:'row',paddingVertical:10,paddingHorizontal:10}}
                                  >
                                    <Image style={{height:50,width:50,objectFit:'cover',zIndex:99,borderRadius:40}} source={profile!=null && profile  ?{uri:`${BASE_ASSET}/${profile}`} : require('../assets/appimages/dummyimg.png')} />
                            <Text style={{fontWeight:500,fontSize:20,color:'white',textAlign:'center',paddingVertical:10,marginLeft:'2%'}}>{name}</Text>
                                  </LinearGradient>

            <ScrollView ref={scrollViewRef}>
                {userdata?.text?.map((val,index)=>{
                  if(id==val.receiver_id){
                    return(
                    <View key={index} style={{width:'70%',marginVertical:10,padding:10,borderRadius:10,marginLeft:'27%',backgroundColor:"#917AFD",
                      elevation: 5,
                      shadowColor: '#171717',
                      shadowOffset: { width: 1, height: 3 },
                      shadowOpacity: 0.4,
                      shadowRadius: 2,
                    }}>
                      <Text>
                        {val.message}
                      </Text>
                    </View>
                    )
                    
                  }else{
                    return(
                      <View key={index} style={{width:'70%',marginVertical:10,padding:10,borderRadius:10,backgroundColor:"white",marginLeft:10,

                        elevation: 5,
                        shadowColor: '#171717',
                        shadowOffset: { width: 1, height: 3 },
                        shadowOpacity: 0.4,
                        shadowRadius: 2,
                      }}>
                        <Text style={{fontSize:15}}>
                          {val.message}
                        </Text>
                      </View>
                      )

                  }
                })}
            </ScrollView>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:5,marginVertical:10,}}>
              <TextInput onChangeText={(text)=>{setMessage(text)}} style={{backgroundColor:'#F2F3F3',width:'70%',borderRadius:10,paddingHorizontal:10}} placeholder="type here..." multiline={true}  value={newmessage}/>
              <TouchableOpacity onPress={()=>{
                if(newmessage!=''){
                  sendMessage(newmessage)
                }
              }} style={{backgroundColor:'green',width:'25%',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                <Text  style={{fontWeight:500,fontSize:15,color:'white',textAlign:'center'}}>Send</Text>
              </TouchableOpacity>
            </View>
        </View>
    )
}

export default Chat;