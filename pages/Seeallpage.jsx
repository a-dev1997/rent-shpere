import { ScrollView ,View,TouchableOpacity,Text,StyleSheet,Image,TextInput} from "react-native"
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { BASE_ASSET } from "../config";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


const SeeAll=()=>{
  const nav=useNavigation()
const {catData,catStatus}=useSelector((state)=>state.category);
const {propdata,propstatus}=useSelector((state)=>state.getproperties)
  const [applyflter,setApplyfilter]=useState(false)

    const [activeFilter, setActivefilter] = useState('All');
    const facility=['WiFi','Shelf check-in',"kitchen",'Free parking','Air condition','Security']
    return(
        <View style={{flex:8}}>
         <View style={{flex:0.7,flexDirection:'row',padding:5,justifyContent:'space-between',alignItems:'center',width:'100%'}}>
          <TextInput style={{backgroundColor:'white',width:'80%',borderRadius:70,height:50,paddingHorizontal:10}}  placeholder="Search properties"  />
          <TouchableOpacity onPress={()=>{setApplyfilter(!applyflter);console.log(applyflter)}}>
                                
                                <LinearGradient
                                      colors={ ['#315EE7', '#6246EA']}
                                      style={{borderRadius:20,marginHorizontal:10,marginVertical:10}}
                                    >
                                      <Text
                                       style={{color:'white',fontWeight:700,fontSize:14,fontStyle:'italic',paddingHorizontal:15,paddingVertical:10}}
                                      >
                                       filter
                                      </Text>
                                    </LinearGradient>
                      
                                      </TouchableOpacity>
         </View>  
            {/* <View style={{paddingVertical:10}}>

            
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
            </View> */}
            <View style={{flex:7.5,padding:10,backgroundColor:'white',borderTopLeftRadius:10,borderTopRightRadius:10,display:applyflter==false?'block':'none'}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontWeight:500,fontSize:18,color:'black'}}>total properties</Text>
                <View style={{flexDirection:'row'}}>
                <Image  source={require('../assets/appimages/sort.png')} />
                <Text>sort</Text>
                </View>
               
              </View>
            <ScrollView >
        { propstatus=='succeeded' ? propdata?.map((val,index)=>{
         
            return(
                <TouchableOpacity onPress={()=>{nav.navigate('Propertyview',{id:val.id})}} key={index} style={styles.cardContainer}>
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
            <View style={{display:applyflter==true?'block':'none',backgroundColor:'white',margin:10,borderRadius:10,padding:10,flex:7.5}}>
        <ScrollView>
          <View>
            <Text style={{ fontWeight: 700, fontSize: 18, color: '#1A1E25' }}>Porperty type</Text>
            <ScrollView horizontal={true}>
            <TouchableOpacity style={[styles.shadow]} onPress={() => setActivefilter('All')}>
              <LinearGradient colors={activeFilter === 'All' ? ['#315EE7', '#6246EA'] : ['#F2F2F3', '#F2F2F3']} style={{ borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ color: 'white', fontWeight: 700, fontSize: 14, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10 }}>
                  Any
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            {catData?.data?.map((val, index) => {
              return (
                <TouchableOpacity key={index} style={[styles.shadow]} onPress={() => setActivefilter(val.id)}>
                  <LinearGradient
                    colors={activeFilter === val.id ? ['#315EE7', '#6246EA'] : ['#F2F2F3', '#F2F2F3']}
                    style={{ borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: 14,
                        fontStyle: 'italic',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      }}
                    >
                      {val.category}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View>
            <Text style={{ fontWeight: 700, fontSize: 18, color: '#1A1E25' }}>Price range</Text>
          </View>
          <View style={{flexDirection:'row',width:'90%'}}>
          <TouchableOpacity style={[styles.shadow]} onPress={() => setActivefilter('All')}>
              <LinearGradient colors={activeFilter === 'All' ? ['#315EE7', '#6246EA'] : ['#F2F2F3', '#F2F2F3']} style={{ borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ color: 'white', fontWeight: 700, fontSize: 14, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10 }}>
                  Any
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shadow]} onPress={() => setActivefilter('All')}>
              <LinearGradient colors={activeFilter === 'All' ? ['#315EE7', '#6246EA'] : ['#F2F2F3', '#F2F2F3']} style={{ borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ color: 'white', fontWeight: 700, fontSize: 14, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10 }}>
                  monthly
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shadow]} onPress={() => setActivefilter('All')}>
              <LinearGradient colors={activeFilter === 'All' ? ['#315EE7', '#6246EA'] : ['#F2F2F3', '#F2F2F3']} style={{ borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ color: 'white', fontWeight: 700, fontSize: 14, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10 }}>
                  Yearly
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          </View>
            <View>
              <Text style={{ fontWeight: 700, fontSize: 18, color: '#1A1E25' }}>Property facilities</Text>
              <View style={{flexDirection:'row',width:'99%',flexWrap:'wrap'}}>
              <TouchableOpacity style={[styles.shadow]} onPress={() => setActivefilter('All')}>
              <LinearGradient colors={activeFilter === 'All' ? ['#315EE7', '#6246EA'] : ['#F2F2F3', '#F2F2F3']} style={{ borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ color: 'white', fontWeight: 700, fontSize: 14, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10 }}>
                  Any
                </Text>
              </LinearGradient>
            </TouchableOpacity>
              {facility.map((val,index)=>{
                return(
                  <TouchableOpacity key={index} style={[styles.shadow]} onPress={() => setActivefilter('All')}>
              <LinearGradient colors={activeFilter === 'All' ? ['#315EE7', '#6246EA'] : ['#F2F2F3', '#F2F2F3']} style={{ borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ color: 'white', fontWeight: 700, fontSize: 14, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10 }}>
                  {val}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
                )
              })}
              </View>
            </View>
        </ScrollView>
        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:'99%'}}>
          <TouchableOpacity>
            <Text>Reset all</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'black',borderRadius:20,paddingVertical:10,paddingHorizontal:20}}>
            <Text style={{color:'white',textAlign:'center'}}>Show result</Text>
          </TouchableOpacity>
        </View>
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