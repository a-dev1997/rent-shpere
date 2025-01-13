import { useEffect, useMemo, useState } from "react";
import { View ,ScrollView,Text,TouchableOpacity,Image,StyleSheet,Alert} from "react-native"
import { useSelector } from "react-redux";
import { BASE_ASSET } from "../config";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
const Myproperty=()=>{
    const nav=useNavigation()
    const {data,status}=useSelector((state)=>state.userInfo)
    const [prop,setProp]=useState(null)
    const [count,setCount]=useState(1)
    const getMyProp = async () => {
        try {
            const response = await axios.get('https://rentsphere.onavinfosolutions.com/api/my-properties', {
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                    'Content-Type': 'application/json',
                }
            });
             console.log(response.data.data)
          setProp(response.data.data)
        
           
        } catch (err) {
            console.error(err)
        }
    }

      // Function to handle the Delete action
      const handleDelete = (prop_id) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => deleteItem(prop_id) // Call the deleteItem function if confirmed
                }
            ],
            { cancelable: false }
        );
    };

    // Function to call the API to delete the item
    const deleteItem = async (prop_id) => {
        try {
            const response = await axios.get(`https://rentsphere.onavinfosolutions.com/api/delete-my-property/${prop_id}`, {
                headers: {
                    'Authorization': `Bearer ${data.token}`, // Replace with your actual token
                   
                }
            });
            setCount(count+1)
            console.log('Deleted successfully', response.data);
            // Optionally, you can update the UI or navigate away after successful deletion
        } catch (err) {
            console.error('Failed to delete item', err);
            // Handle error, show a message to the user
        }
    };


  useEffect(()=>{
    getMyProp()
  },[count])
    return(
        <View style={{flex:1}}>
            <Text style={{textAlign:'center',fontWeight:500,fontSize:20}}>My Property</Text>
                <ScrollView>
      {prop?.map((item,index)=>{
return(
<TouchableOpacity
key={index}
  onPress={() => {
    // Navigate to the property view
    nav.navigate('Propertyview', { id: item.id });
  }}
  style={[styles.cardContainer,styles.shadow]}
>

  <Image
    style={[styles.cardImage]}
    source={{ uri: `${BASE_ASSET}uploads/propertyImages/${item.featured_image}` }}
  />
  <View style={styles.cardContent}>
    <Text style={styles.cardText}>{item.property_name}</Text>
    <Text style={{ color: '#7D7F88' }}>
      {item.city + ' ' + item.state}
    </Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={require('../assets/appimages/room.png')} />
        <Text style={{ color: '#7D7F88' }}>{item.bedrooms} room</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Image source={require('../assets/appimages/home-hashtag.png')} />
        <Text style={{ color: '#7D7F88' }}>{item.carpet_area}m2</Text>
      </View>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 700, fontSize: 12, color: '#000000' }}>
          {item.price}
        </Text>
        <Text style={{ fontWeight: 400, fontSize: 10, color: '#7D7F88' }}>
          /{item.payment_type}
        </Text>
      </View>
     
   
    </View>
   <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
      
      <TouchableOpacity style={[{alignItems:'center',backgroundColor:'green',borderRadius:5},styles.shadow]}>
        
            <Text style={{paddingVertical:5,paddingHorizontal:10,fontWeight:400,color:'white'}}>{item.status}</Text>
       
      </TouchableOpacity>
    </View> 
</View>
</TouchableOpacity>
     

       ) })} 
                 
                </ScrollView>

        </View>
    )

}

export default Myproperty;

const styles=StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        marginHorizontal: 10,
        flexDirection:'row',
       
       
       
      },
      shadow: {
        elevation: 5,
        shadowColor: '#171717',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
      cardImage: {
        width: '30%',
        height: 160,
      },
      cardContent: {
        padding: 10,
        justifyContent:'space-between',
        alignItems:'space-between',
        width:'70%',
        
      },
      cardText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
      },

})