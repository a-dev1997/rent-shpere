import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BASE_ASSET, BASE_URL } from '../config';
import Carousel from 'react-native-reanimated-carousel';
import { ScrollView, View, Text, Image, TextInput, BackHandler,TouchableOpacity, StyleSheet, ActivityIndicator,KeyboardAvoidingView ,Alert,RefreshControl} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

import axios from 'axios';
import { fetchWishlist } from '../reduxStore/wishlistslice';
import Pusher from 'pusher-js';
import { notificationAlert } from '../component/notification';
import { fetchMessage } from '../reduxStore/messageslice';
import {MessageNotify } from '../component/messageNotification';
import { fetchCurrentlocation } from '../reduxStore/currentlocationslice';
import { fetchUserData } from '../reduxStore/userdataslice';
import { fetchProfile } from '../reduxStore/profiledataslice';
import SkeletonLoader from '../component/skeleton';
import { fetchStates } from '../reduxStore/getstatesslice';


const Home = () => {
  const nav = useNavigation();
  const route =useRoute()
 
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('rent');
  const [applyflter,setApplyfilter]=useState(false)
  const [count,setCount]=useState(1)
  const [notification,setNotification]=useState(0)
  const [activeFilter, setActivefilter] = useState('All');
  const [wishlistLoading,setWishlistLoading]=useState(false);
  const { data, status } = useSelector((state) => state.userInfo);
  const [properties,setProperties]=useState(null)
  const [isloading,setIsloading]=useState(false)
  const { catData, catStatus } = useSelector((state) => state.category);
  const { locationdata, locationstatus } = useSelector((state) => state.getcurrentlocation);
  const {wishlistdata,wishliststatus}=useSelector((state)=>state.userWishlist)
   const facility=['WiFi','Shelf check-in',"kitchen",'Free parking','Air condition','Security']
  
 
  const [loading, setLoading] = useState(false);
  const [backPressed, setBackPressed] = useState(0);

  // useEffect(() => {
  //      const backAction = () => {
      
  //         BackHandler.exitApp();
  //         return true;
       
  //      };
   
  //      // Add back handler listener
  //      BackHandler.addEventListener('hardwareBackPress', backAction);
   
  //      // Cleanup the listener when the component unmounts
  //      return () => {
  //        BackHandler.removeEventListener('hardwareBackPress', backAction);
  //      };
  //    }, [backPressed]);
  // Sample data for the carousel
const carouselData = [
  {
    id: '1',
    image: 'https://www.lytmeals.in/storage/uploads/images/172632167549.jpg',
    title: 'Image 1',
  },
  {
    id: '2',
    image: 'https://www.lytmeals.in/storage/uploads/images/172503281294.png',
    title: 'Image 2',
  },
  {
    id: '3',
    image: 'https://www.lytmeals.in/storage/uploads/images/172632156948.jpg',
    title: 'Image 3',
  },
  {
    id: '4',
    image: 'https://pgjaipur.com/blog/wp-content/uploads/2022/09/Tiffin-Service-in-Jaipur-3.jpg',
    title: 'Image 4',
  },
];



const renderCarousel= ({ item, index }) => {
  return (
    <View style={{}}>
      
      <Image  source={{ uri: item.image }} style={{height:200,width:'100%',objectFit:'cover'}} />
     
    </View>
  );
};

  

  
  const wishlistdat=useMemo(()=>{return wishlistdata},[addWishlist,removeProperty])

  //add wishlist

  const addWishlist = async (prop) => {
    try {
      const response = await axios.post(
        `${BASE_URL}post-wishlist`,
        {
          property_id: prop,  // Pass the property_id directly in the body as an object
        },
        {
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);  // Log the response if needed
      dispatch(fetchWishlist())
    } catch (error) {
      console.error(error);  // Log any errors that happen
    }
  };





  // remove whishlist 
  const removeProperty = async (property_id) => {
    try {
      const response = await fetch(`${BASE_URL}remove-property/${property_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove property');
      }
  
      const result = await response.json();
  
      // Update count on successful response
      // setCount(count + 1);
      dispatch(fetchWishlist())
     
    } catch (err) {
      // Handle error
      console.log('Error occurred:', err.message || err);
    }
  };

    
  

  const nearProperty = async (location) => {
    setIsloading(true)
    try {
      // Make the GET request using Axios
      const response = await axios.get(`${BASE_URL}near-properties/${location}`);
      
      // Check if response has data and set it
      if (response && response.data) {
        setProperties(response.data.data); // Assuming response.data contains a 'data' property
    console.log("properited"+JSON.stringify(response.data))
        setIsloading(false)
      } else {
        throw new Error('No data found');
      }
    } catch (err) {
      // Handle error
      console.log('Error occurred:', err.message || err);
    }
  };
  



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
    //  setNotification(response.data); // Or handle further based on your requirements
     let count =0;
     response.data.data.forEach((val) => {
     
      if(val.seen==0){
        count++
      }
      
     });
     setNotification(count)
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
        console.error('Error message:', error);
      }
    }
  };



// Check if property is in wishlist
const isPropertyInWishlist = (propertyId) => {
  if (wishlistdata != null) {
      return wishlistdata?.data?.some(item => item.property_id == propertyId);
  }

};



useEffect(()=>{
  
// dispatch(fetchProperties())
dispatch(fetchUserData());
      
dispatch(fetchMessage());
dispatch(fetchWishlist());
dispatch(fetchProfile());
dispatch(fetchCurrentlocation());
dispatch(fetchStates());
},[])
useEffect(()=>{
  fetchNotifications()
},[count])
useFocusEffect(
  useCallback(()=>{
    
    if(locationstatus=='succeeded'){
      nearProperty(locationdata.location)
    }else{
      nearProperty('delhi')
    }
  },[locationstatus])


)
const calculateRatings = (reviews) => {
  let totalRating = 0;
  let totalUser = 0;

  reviews?.forEach((val) => {
    if (val?.rating) {
      totalRating += val.rating;
      totalUser += 1;
    }
  });

  return { totalRating, totalUser };
};


  return (
    <View style={{ flex: 5, backgroundColor: 'white'}}>
  <MessageNotify/>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10,flex:1}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View>

        <View style={{ flexDirection: 'row', justifyContent: 'start', alignItems: 'center', marginVertical: 5 }}>
          <Image source={require('../assets/appimages/location.png')} />
          <Text style={{ fontWeight: 700, fontFamily: 'Hind', fontSize: 20, color: '#1A1E25' }}>
            {locationdata ? locationdata.location : 'not found'}
          </Text>
        </View>
       
        </View>
        <TouchableOpacity style={{position:'relative'}} onPress={()=>{nav.navigate('Notification')}}>
        <Image style={{height:30,width:30,objectFit:'contain'}} source={require('../assets/appimages/notification.png')} />
        <Text style={{ color: 'white',padding:3,backgroundColor:'red',fontSize:8,textAlign:'center',borderRadius:50,position:'absolute',right:-1,top:1 }}>
  {notification}
</Text>
        </TouchableOpacity>
       
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',height:100}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#F2F2F3',
              borderWidth: 1,
              borderColor: '#E3E3E7',
              borderRadius: 13,
              paddingHorizontal:10,
              flexDirection: 'row',
              justifyContent:'flex-start',
              alignItems: 'center',
               height:50,
              width:'100%'
            }}
            onPress={()=>{nav.navigate('Seeall')}}
          >
            <Text>Search for city,location.....</Text>
            {/* <TextInput
              style={{ fontSize: 16, fontWeight: 400, fontFamily: 'Hind' }}
              placeholder="Search address, city, location....."
            /> */}
            {/* <TouchableOpacity style={{ width: '20%' }}>
              <LinearGradient colors={['#6246EA', '#6246EA']} style={{ borderRadius: 72, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Search</Text>
              </LinearGradient>
            </TouchableOpacity> */}
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={()=>{setApplyfilter(!applyflter)}} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',overflow:'hidden'}}>
            <Image  source={require('../assets/appimages/filtter.png')} />
          </TouchableOpacity> */}
        </View>
        
    
      </View>

      {/* Category Filter */}
      <View style={{ width: '100%', flex:5,height:'100%' }}>
      
       
        <ScrollView   >

        <View style={{ paddingHorizontal: 0,marginVertical:20,backgroundColor:'#E5E5E5'}}>
          <Text style={{ fontWeight: 700, fontSize: 18, color: '#1A1E25' }}>Near Your Location</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Text style={{ fontWeight: 400, fontSize: 13, color: '#7D7F88' }}>3333 properties</Text>
            <TouchableOpacity onPress={() => nav.navigate('Seeall')}>
              <Text style={{ color: '#7879F1', fontWeight: 500, fontSize: 14 }}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* FlatList for properties */}
          {/* <View style={{ flex: 1, width: '100%' ,height:100}}> */}
           
            {/* <FlatList
         
              data={properties} // Use the properties state here
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading && hasMore==true ? <ActivityIndicator size="large" color="#315EE7" /> : ''
              }
            /> */}
            
          {/* </View> */}

              <ScrollView horizontal={true} contentContainerStyle={{width:properties==null?'100%':''}}>
           {properties==null && isloading  ? <SkeletonLoader/> :  properties?.map(( item ) => {
    const dataFormat = (date) => {
      if (!date) return "";
      const a = new Date(date);
      const options = { year: "numeric", month: "long" ,day: "numeric"};
      return a.toLocaleDateString("en-US", options);
    };

    const isInWishlist = isPropertyInWishlist(item.id);
    const handleWishlistToggle = (propertyId) => {
      setWishlistLoading(prevState => ({ ...prevState, [propertyId]: true }));

      if (isInWishlist) {
          removeProperty(propertyId).finally(() => {
              setWishlistLoading(prevState => ({ ...prevState, [propertyId]: false }));
          });
      } else {
          addWishlist( propertyId).finally(() => {
              setWishlistLoading(prevState => ({ ...prevState, [propertyId]: false }));
          });
      }
  };
  const { totalRating, totalUser } = calculateRatings(item.property_review);
 
    return (
      <TouchableOpacity
      key={item.id}
        onPress={() => {
          // Navigate to the property view
          nav.navigate('Propertyview', { id: item.id });
        }}
        style={[styles.cardContainer,styles.shadow]}
      >
      
        <Image
          style={styles.cardImage}
          source={{ uri: `${BASE_ASSET}uploads/propertyImages/${item.featured_image}` }}
        />
        <View style={styles.cardContent}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          
        <Image source={require('../assets/appimages/small-star.png')} />
        
       {item?.property_review?.length === 0 ? '' : (
  <View style={{ flexDirection: 'row' }}>
    <Text>{ totalUser==0?"0": totalRating / totalUser}</Text>
    <Text>{"(" + totalUser + ")"}</Text>
  </View>
)
           }
      
      </View>
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
           
           <TouchableOpacity  onPress={() => handleWishlistToggle(item.id)}>
            
           {wishlistLoading[item.id] ? (
                                        <ActivityIndicator />
                                    ) : (
                                        <Image
                                            source={isInWishlist ? require('../assets/appimages/heart-active.png') : require('../assets/appimages/heart.png')}
                                            style={{ width: 25, height: 25 }}
                                        />
                                    )}
            </TouchableOpacity>
  
          </View>
          <View>
            <Text style={{ fontWeight: 400, fontSize: 10, color: '#7D7F88' }}>Posted on:{dataFormat(new Date())==dataFormat(item.created_at)?'Today':dataFormat(item.created_at)}</Text>
          </View>
        </View>
      </TouchableOpacity>
           )} )
  }
              </ScrollView>

              

        </View>
        <View style={{ paddingHorizontal: 0,marginVertical:20 }}>
          <Text style={{ fontWeight: 700, fontSize: 18, color: '#1A1E25' }}>Top Rated</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Text style={{ fontWeight: 400, fontSize: 13, color: '#7D7F88' }}>3333 properties</Text>
            <TouchableOpacity onPress={() => nav.navigate('Seeall')}>
              <Text style={{ color: '#7879F1', fontWeight: 500, fontSize: 14 }}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* FlatList for properties */}
          {/* <View style={{ flex: 1, width: '100%' ,height:100}}> */}
           
            {/* <FlatList
         
              data={properties} // Use the properties state here
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading && hasMore==true ? <ActivityIndicator size="large" color="#315EE7" /> : ''
              }
            /> */}
            
          {/* </View> */}

              {/* <ScrollView horizontal={true}>
           {properties.map(( item ) => {
    const dataFormat = (date) => {
      if (!date) return "";
      const a = new Date(date);
      const options = { year: "numeric", month: "long" ,day: "numeric"};
      return a.toLocaleDateString("en-US", options);
    };

    const isInWishlist = isPropertyInWishlist(item.id);
    const handleWishlistToggle = (propertyId) => {
      setWishlistLoading(prevState => ({ ...prevState, [propertyId]: true }));

      if (isInWishlist) {
          removeProperty(propertyId).finally(() => {
              setWishlistLoading(prevState => ({ ...prevState, [propertyId]: false }));
          });
      } else {
          addWishlist( propertyId).finally(() => {
              setWishlistLoading(prevState => ({ ...prevState, [propertyId]: false }));
          });
      }
  };
    return (
      <TouchableOpacity
      key={"ggg"+item.id}
        onPress={() => {
          // Navigate to the property view
          nav.navigate('Propertyview', { id: item.id });
        }}
        style={[styles.cardContainer,styles.shadow]}
      >
      
        <Image
          style={styles.cardImage}
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
           
           <TouchableOpacity  onPress={() => handleWishlistToggle(item.id)}>
            
           {wishlistLoading[item.id] ? (
                                        <ActivityIndicator />
                                    ) : (
                                        <Image
                                            source={isInWishlist ? require('../assets/appimages/heart-active.png') : require('../assets/appimages/heart.png')}
                                            style={{ width: 25, height: 25 }}
                                        />
                                    )}
            </TouchableOpacity>
  
          </View>
          <View>
            <Text style={{ fontWeight: 400, fontSize: 10, color: '#7D7F88' }}>Posted on:{dataFormat(new Date())==dataFormat(item.created_at)?'Today':dataFormat(item.created_at)}</Text>
          </View>
        </View>
      </TouchableOpacity>
           )} )
  }
              </ScrollView> */}

              

        </View>
        <View style={{ paddingHorizontal: 0 ,marginVertical:20,backgroundColor:'#E5E5E5'}}>
          <Text style={{ fontWeight: 700, fontSize: 18, color: '#1A1E25' }}>Properties in top cities</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Text style={{ fontWeight: 400, fontSize: 13, color: '#7D7F88' }}>3333 properties</Text>
            <TouchableOpacity onPress={() => nav.navigate('Seeall')}>
              <Text style={{ color: '#7879F1', fontWeight: 500, fontSize: 14 }}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* FlatList for properties */}
          {/* <View style={{ flex: 1, width: '100%' ,height:100}}> */}
           
            {/* <FlatList
         
              data={properties} // Use the properties state here
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading && hasMore==true ? <ActivityIndicator size="large" color="#315EE7" /> : ''
              }
            /> */}
            
          {/* </View> */}

              {/* <ScrollView horizontal={true}>
           {properties.map(( item,index ) => {
    const dataFormat = (date) => {
      if (!date) return "";
      const a = new Date(date);
      const options = { year: "numeric", month: "long" ,day: "numeric"};
      return a.toLocaleDateString("en-US", options);
    };

    const isInWishlist = isPropertyInWishlist(item.id);
    const handleWishlistToggle = (propertyId) => {
      setWishlistLoading(prevState => ({ ...prevState, [propertyId]: true }));

      if (isInWishlist) {
          removeProperty(propertyId).finally(() => {
              setWishlistLoading(prevState => ({ ...prevState, [propertyId]: false }));
          });
      } else {
          addWishlist( propertyId).finally(() => {
              setWishlistLoading(prevState => ({ ...prevState, [propertyId]: false }));
          });
      }
  };
    return (
      <TouchableOpacity
      key={"ddd"+index}
        onPress={() => {
          // Navigate to the property view
          nav.navigate('Propertyview', { id: item.id });
        }}
        style={[styles.cardContainer,styles.shadow,{height:300,flexDirection:'column'}]}
      >
      
        <Image
          style={[styles.cardImage,{width:'100%'}]}
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
           
           <TouchableOpacity  onPress={() => handleWishlistToggle(item.id)}>
            
           {wishlistLoading[item.id] ? (
                                        <ActivityIndicator />
                                    ) : (
                                        <Image
                                            source={isInWishlist ? require('../assets/appimages/heart-active.png') : require('../assets/appimages/heart.png')}
                                            style={{ width: 25, height: 25 }}
                                        />
                                    )}
            </TouchableOpacity>
  
          </View>
          <View>
            <Text style={{ fontWeight: 400, fontSize: 10, color: '#7D7F88' }}>Posted on:{dataFormat(new Date())==dataFormat(item.created_at)?'Today':dataFormat(item.created_at)}</Text>
          </View>
        </View>
      </TouchableOpacity>
           )} )
  }
              </ScrollView> */}

              

        </View>
        <View style={{ flex:4, justifyContent: 'center', alignItems: 'center' }}>
      <Carousel
        loop
        width={400} // Set carousel width
        height={200} // Set carousel height
        autoPlay={true} // Auto play the carousel
        data={carouselData} // Data array for carousel
        renderItem={renderCarousel}
      />
    </View>
        </ScrollView>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    marginHorizontal: 10,
    flexDirection:'row',
    width:300
   
   
  },
  cardImage: {
    width: '30%',
    height: 160,
  },
  cardContent: {
    padding: 10,
    justifyContent:'space-between'
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  shadow: {
    elevation: 5,
    shadowColor: '#171717',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  
});

export default Home;
