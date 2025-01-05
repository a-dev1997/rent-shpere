import React, { useState, useEffect } from 'react';
import { BASE_ASSET } from '../config';
import { ScrollView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector,useDispatch } from 'react-redux';
import { fetchUserData } from '../reduxStore/userdataslice';
import { fetchProperties } from '../reduxStore/getpropertiesslice';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const nav=useNavigation();
  const [activeTab, setActiveTab] = useState('rent');
  const [animatedValue] = useState(new Animated.Value(0)); // Used to animate the background position
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.userInfo);
  const {propdata,propstatus}=useSelector((state)=>state.getproperties)
  
  const [porperties,setProperties]=useState(null);
 
  // Function to animate the background color and position
  const animateTabChange = () => {
    Animated.timing(animatedValue, {
      toValue: activeTab === 'rent' ? 0 : 1, // 0 for rent, 1 for service
      duration: 300, // Shortened duration for smoother transition
      useNativeDriver: false, // We are animating properties that are not native
    }).start();
  };

  // Call animation function whenever activeTab changes
  useEffect(() => {
    animateTabChange();
  }, [activeTab]);
  useEffect(()=>{
    dispatch(fetchUserData())
    dispatch(fetchProperties())
   console.log('render')
  },[])
  useEffect(()=>{
    if(propstatus=='succeeded'){
        console.log(propdata.data)
        setProperties(propdata.data)
        console.log('render')
    }
  },[propdata])
  // Interpolate the background position to slide the background
  const backgroundPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'], // Moving background from left (0%) to right (50%)
  });

  return (
    <ScrollView style={{ paddingHorizontal: 30, backgroundColor: 'white' }}>
      <View>
        <Text style={{ fontSize: 14, fontWeight: 400, fontFamily: 'Hind', color: '#7D7F88' }}>
          Your current location
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'start', alignItems: 'center',marginVertical:10 }}>
        <Image source={require('../assets/appimages/location.png')} />
        <Text style={{ fontWeight: 700, fontFamily: 'Hind', fontSize: 20, color: '#1A1E25' }}>
          current location
        </Text>
      </View>

      <View>
        <View
          style={{
            backgroundColor: '#F2F2F3',
            borderWidth: 1,
            borderColor: '#E3E3E7',
            borderRadius: 72,
            height: 50,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical:20
          }}
        >
          <TextInput
            style={{ fontSize: 16, fontWeight: 400, fontFamily: 'Hind', width: '100%' }}
            placeholder="Search address, city, location"
          />
        </View>
      </View>

      <View style={{marginVertical:10}}>
        <Text style={{ color: '#1A1E25', fontWeight: 700, fontFamily: 'Hind', fontSize: 18 ,marginBottom:10}}>
          Welcome to RentSphere
        </Text>

        {/* Tab Buttons Section */}
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            {/* Animated background */}
            <Animated.View
              style={[
                styles.animatedBackground,
                {
                  transform: [{ translateX: backgroundPosition }],
                },
              ]}
            />

            {/* I need to rent button with LinearGradient background */}
            <TouchableOpacity
              style={[styles.button, activeTab === 'rent' && { backgroundColor: '#315EE7' }]}
              onPress={() => setActiveTab('rent')}
            >
              <LinearGradient
                colors={activeTab === 'rent' ? ['#315EE7', '#6246EA'] : ['#F2F2F3', '#F2F2F3']}
                style={styles.linearGradient} // Apply linear gradient
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: activeTab === 'rent' ? '#fff' : '#000' }, // Active text color is white, inactive is black
                  ]}
                >
                  I need to rent
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* I want service button with LinearGradient background */}
            <TouchableOpacity
              style={[styles.button, activeTab === 'service' && { backgroundColor: '#315EE7' },styles.shadow,]}
              onPress={() => setActiveTab('service')}
            >
              <LinearGradient
                colors={activeTab === 'service' ? ['#315EE7', '#6246EA'] : ['#F2F2F3', '#F2F2F3']}
                style={styles.linearGradient} // Apply linear gradient
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: activeTab === 'service' ? '#fff' : '#000' }, // Active text color is white, inactive is black
                  ]}
                >
                  I want service
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{width:'100%'}}>
        <Text style={{fontWeight:700,fontSize:18,color:'#1A1E25'}}>
            Near Your Location
        </Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
            <Text style={{fontWeight:400,fontSize:13,color:'#7D7F88'}}>3333 properties</Text>
            <TouchableOpacity>
                <Text style={{color:'#7879F1',fontWeight:500,fontSize:14}}>See all</Text>
            </TouchableOpacity>
        </View>
        { propstatus=='succeeded' ? porperties?.map((val,index)=>{
         
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
            <Text style={{color:"#7D7F88"}}>{val.bedrooms} rooms</Text>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20
  },
  buttonContainer: {
    padding:5,
    backgroundColor: '#F2F2F3',
    borderWidth: 1,
    borderColor: '#E3E3E7',
    borderRadius: 72,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Adjust this based on your layout needs
    position: 'relative', // Required for animated background
  },
  button: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 72,
    backgroundColor: 'transparent', // Default background color
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 72,
    height: '100%',
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Hind',
  },
  animatedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%', // The background should cover one button width at a time
    height: '100%',
    borderRadius: 72,
  },
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

export default Home;
