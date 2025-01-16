import { View ,Text ,ScrollView, TouchableOpacity} from "react-native"
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Notification=()=>{

    const [notification ,setNotification]=useState(null)
        const {data,status}=useSelector((state)=>state.userInfo)
    const fetchNotifications = async () => {
        try {
          // Make the GET request to the provided API URL
          const response = await axios.get('https://rentsphere.onavinfosolutions.com/api/notifications',{
            headers: {
                'Authorization': `Bearer ${data.token}`,
                
              },
          })
          
          // Handle the successful response
          console.log('Notifications:', response.data);
          
          // You can update your state or perform any other logic with the data
         setNotification(response.data); // Or handle further based on your requirements
      console.log(response.data)
        } catch (error) {
          // Handle errors
          if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
          } else if (error.request) {
            // No response was received from the server
            console.error('No response received:', error.request);
          } else {
            // Something else caused the error
            console.error('Error message:', error.message);
          }
        }
      };
useEffect(()=>{
    fetchNotifications()
},[])
    return(
        <View style={{flex:1}}>

              <LinearGradient
                  colors={['#917AFD','#6246EA']}
                  >
            <Text style={{fontWeight:500,fontSize:20,color:'white',textAlign:'center',paddingVertical:10}}>Notification</Text>
                  </LinearGradient>
                    
            <ScrollView>
                {notification?.data?.map((val,index)=>{
                  if(val.seen){
                    return(
                      <TouchableOpacity>

              <LinearGradient
                  colors={['white','white']}
                  >
            <Text style={{fontWeight:500,fontSize:20,color:'black',textAlign:'center',paddingVertical:10}}>Notification</Text>
                  </LinearGradient>
                      </TouchableOpacity>
                    )
                  }else{
                    return(
                      <TouchableOpacity style={{marginVertical:5,}}>

              <LinearGradient
                  colors={['#917AFD','#6246EA']}
                  style={{paddingVertical:5,marginHorizontal:5,paddingHorizontal:5,borderRadius:10}}
                  >
            <Text style={{fontWeight:500,fontSize:20,color:'white',paddingVertical:10}}>{val.title}</Text>
            <Text style={{color:'white',fontWeight:500,fontSize:15}}>{val.message}</Text>
            <Text style={{color:'white',fontSize:10}}>{val.created_at}</Text>
                  </LinearGradient>
                      </TouchableOpacity>
                    )
                  }
                })}
            </ScrollView>
        </View>

    )
}

export default Notification;