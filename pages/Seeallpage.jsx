import { ScrollView ,View,TouchableOpacity,Text,StyleSheet,Image} from "react-native"
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { BASE_ASSET } from "../config";


const SeeAll=()=>{
const {catData,catStatus}=useSelector((state)=>state.category);
const {propdata,propstatus}=useSelector((state)=>state.getproperties)

    return(
        <View style={{flex:1}}>
            <View style={{paddingVertical:10}}>

            
            <ScrollView horizontal={true}>
            <TouchableOpacity>
                                
                                <LinearGradient
                                      colors={ ['#315EE7', '#6246EA']}
                                      style={{borderRadius:10,marginHorizontal:10,marginVertical:10}}
                                    >
                                      <Text
                                       style={{color:'white',fontWeight:700,fontSize:14,fontStyle:'italic',paddingHorizontal:15,paddingVertical:10}}
                                      >
                                       All
                                      </Text>
                                    </LinearGradient>
                      
                                      </TouchableOpacity>
                {catData?.data?.map((val,index)=>{
                    return(
                                  <TouchableOpacity key={index}>
                                
                                          <LinearGradient
                                                colors={ ['#315EE7', '#6246EA']}
                                                style={{borderRadius:10,marginHorizontal:10,marginVertical:10}}
                                              >
                                                <Text
                                                 style={{color:'white',fontWeight:700,fontSize:14,fontStyle:'italic',paddingHorizontal:15,paddingVertical:10}}
                                                >
                                                  {val.category}
                                                </Text>
                                              </LinearGradient>
                                
                                                </TouchableOpacity>
                    )
                })}
            </ScrollView>
            </View>
            <View style={{padding:10}}>
            <ScrollView >
        { propstatus=='succeeded' ? propdata?.data?.map((val,index)=>{
         
            return(
                <TouchableOpacity onPress={()=>{nav.navigate('Propertyview',{index:index})}} key={index} style={styles.cardContainer}>
  <Image
    style={styles.cardImage}
    source={{ uri: `${BASE_ASSET}uploads/propertyImages/${val.featured_image}` }}
  />
  <View style={styles.cardContent}>
    <Text style={styles.cardText}>{val.property_name}</Text>
    <Text style={{color:'#7D7F88'}}>{val.city + val.state}</Text>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
            <Image source={require('../assets/appimages/room.png')} />
            <Text style={{color:"#7D7F88"}}>{val.bedrooms} room</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Image source={require('../assets/appimages/home-hashtag.png')} />
            <Text style={{color:"#7D7F88"}}>{val.carpet_area}m2</Text>
        </View>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-between'}} >
        <View style={{flexDirection:'row'}}>
        <Text style={{fontWeight:700,fontSize:12,color:'#000000'}}>{val.price}</Text><Text style={{fontWeight:400,fontSize:10,color:'#7D7F88'}}>/{val.payment_type}</Text>
        </View>
        
            <Image style={{height:18,width:18}}  source={require('../assets/appimages/heart.png')} />
        
    </View>
  </View>
</TouchableOpacity>
            )
        }) :''}
        </ScrollView>
            </View>
            
        </View>
    )
}

export default SeeAll;

const styles = StyleSheet.create({
  
    
   
  
      // Shadow effect
      shadow: {
          // iOS shadow properties
          shadowColor: '#000', // Shadow color
          shadowOffset: { width: 0, height: 4 }, // Offset of the shadow
          shadowOpacity: 0.2, // Opacity of the shadow
          shadowRadius: 6, // Radius of the shadow blur
      
          // Android shadow properties
          elevation: 5, // Elevation for Android devices to create shadow
        },
        cardContainer: {
          flexDirection: 'row',
          borderRadius: 10,
          overflow: 'hidden',
          marginVertical: 10,
          backgroundColor: 'white', // White background for the floating effect
          elevation: 5, // For Android shadow effect
          shadowColor: '#000', // Shadow color for iOS
          shadowOffset: { width: 0, height: 2 }, // Shadow offset (vertical)
          shadowOpacity: 0.2, // Shadow opacity (0 is no shadow, 1 is fully opaque)
          shadowRadius: 5, // Shadow blur radius
        },
        cardImage: {
          height: 200,
          width: '40%',
          objectFit: 'cover', // Ensure the image fits the container properly
        },
        cardContent: {
          justifyContent: 'start',
          paddingLeft: 20,
          flex: 1, // This will make the content area take the remaining space
          justifyContent:'space-between',
          padding:20
        },
        cardText: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#222', // Text color
        },
  });