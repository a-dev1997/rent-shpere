import React, { useState, useEffect, useMemo } from 'react';
import { BASE_ASSET, BASE_URL } from '../config';
import Carousel from 'react-native-reanimated-carousel';
import { ScrollView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Animated, ActivityIndicator, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchProperties } from '../reduxStore/getpropertiesslice';
import axios from 'axios';
import { fetchWishlist } from '../reduxStore/wishlistslice';

const Home = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('rent');
  const [applyflter,setApplyfilter]=useState(false)
  const [animatedValue] = useState(new Animated.Value(0)); // Used to animate the background position
  const [activeFilter, setActivefilter] = useState('All');
  const [wishlistLoading,setWishlistLoading]=useState(false);
  const { data, status } = useSelector((state) => state.userInfo);
  const { propdata, propstatus, currentPage, hasMore,lastPage } = useSelector((state) => state.getproperties);
  // const [properties,setProperties]=useState(null)
  const { catData, catStatus } = useSelector((state) => state.category);
  const { locationdata, locationstatus } = useSelector((state) => state.getcurrentlocation);
  const {wishlistdata,wishliststatus}=useSelector((state)=>state.userWishlist)
   const facility=['WiFi','Shelf check-in',"kitchen",'Free parking','Air condition','Security']
  console.log("wishlist"+JSON.stringify({wishlistdata}))
 
  const [loading, setLoading] = useState(false);

  // Sample data for the carousel
// const carouselData = [
//   {
//     id: '1',
//     image: 'https://www.lytmeals.in/storage/uploads/images/172632167549.jpg',
//     title: 'Image 1',
//   },
//   {
//     id: '2',
//     image: 'https://www.lytmeals.in/storage/uploads/images/172503281294.png',
//     title: 'Image 2',
//   },
//   {
//     id: '3',
//     image: 'https://www.lytmeals.in/storage/uploads/images/172632156948.jpg',
//     title: 'Image 3',
//   },
//   {
//     id: '4',
//     image: 'https://pgjaipur.com/blog/wp-content/uploads/2022/09/Tiffin-Service-in-Jaipur-3.jpg',
//     title: 'Image 4',
//   },
// ];



// const renderCarousel= ({ item, index }) => {
//   return (
//     <View style={{}}>
//       <Image  source={{ uri: item.image }} style={{height:100,width:'100%',objectFit:'contain'}} />
     
//     </View>
//   );
// };

  // Fetch properties when propstatus is succeeded
 const properties=useMemo(() => {
    if (propstatus == 'succeeded') {
    
       
        
      
        return propdata
        
     
      
      }
    
  }, [ propdata,addWishlist,removeProperty]);


  const handleEndReached = () => {
    // Prevent fetching if already loading or there are no more items
    if (loading || !hasMore) {
      return;
    }
  
     // Set loading to true while new data is being fetched
    if(hasMore){
     
      setLoading(true);
    // After fetching data successfully
    setTimeout(() => {
      dispatch(fetchProperties(currentPage+1));
      
      if (propstatus == 'succeeded') {
        
       

  
        setLoading(false);  // Reset loading state after data has been fetched
      }
    }, 4000);
    }  // Simulating a loading delay
    console.log('loading data ')
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



// Check if property is in wishlist
const isPropertyInWishlist = (propertyId) => {
  if (wishlistdata != null) {
      return wishlistdata?.data?.some(item => item.property_id == propertyId);
  }

};

  const renderItem = ({ item }) => {
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
    );
  };

  return (
    <LinearGradient colors={['white','#6246EA']} style={{ flex: 5, backgroundColor: 'white', paddingBottom: 80 }}>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10,}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View>

        <View style={{ flexDirection: 'row', justifyContent: 'start', alignItems: 'center', marginVertical: 5 }}>
          <Image source={require('../assets/appimages/location.png')} />
          <Text style={{ fontWeight: 700, fontFamily: 'Hind', fontSize: 20, color: '#1A1E25' }}>
            {locationdata ? locationdata.location : 'not found'}
          </Text>
        </View>
       
        </View>
        <Image style={{height:30,width:30,objectFit:'contain'}} source={require('../assets/appimages/notification.png')} />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',height:100}}>
          <View
            style={{
              backgroundColor: '#F2F2F3',
              borderWidth: 1,
              borderColor: '#E3E3E7',
              borderRadius: 72,
             
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
             
              width:'80%'
            }}
          >
            <TextInput
              style={{ fontSize: 16, fontWeight: 400, fontFamily: 'Hind', width: '70%' }}
              placeholder="Search address, city, location"
            />
            <TouchableOpacity style={{ width: '20%' }}>
              <LinearGradient colors={['#6246EA', '#6246EA']} style={{ borderRadius: 72, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Search</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=>{setApplyfilter(!applyflter)}} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',overflow:'hidden'}}>
            <Image  source={require('../assets/appimages/filtter.png')} />
          </TouchableOpacity>
        </View>
        {/* <View style={{ flex:4, justifyContent: 'center', alignItems: 'center' }}>
      <Carousel
        loop
        width={400} // Set carousel width
        height={200} // Set carousel height
        autoPlay={true} // Auto play the carousel
        data={carouselData} // Data array for carousel
        renderItem={renderCarousel}
      />
    </View> */}
    
      </View>

      {/* Category Filter */}
      <View style={{ width: '100%', flex:5 }}>
        {/* <View>
          <ScrollView horizontal={true}>
            <TouchableOpacity style={[styles.shadow]} onPress={() => setActivefilter('All')}>
              <LinearGradient colors={activeFilter === 'All' ? ['#315EE7', '#6246EA'] : ['#F2F2F3', '#F2F2F3']} style={{ borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ color: 'white', fontWeight: 700, fontSize: 14, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10 }}>
                  All
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
        </View> */}

        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontWeight: 700, fontSize: 18, color: '#1A1E25' }}>Near Your Location</Text>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Text style={{ fontWeight: 400, fontSize: 13, color: '#7D7F88' }}>3333 properties</Text>
            <TouchableOpacity onPress={() => nav.navigate('Seeall')}>
              <Text style={{ color: '#7879F1', fontWeight: 500, fontSize: 14 }}>See all</Text>
            </TouchableOpacity>
          </View> */}

          {/* FlatList for properties */}
          {/* <View style={{ flex: 1, width: '100%' ,height:100}}> */}
           
            <FlatList
         
              data={properties} // Use the properties state here
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading && hasMore==true ? <ActivityIndicator size="large" color="#315EE7" /> : ''
              }
            />
            
          {/* </View> */}
        </View>
      </View>
      <View style={{display:applyflter==true?'block':'none',backgroundColor:'white',margin:10,borderRadius:10,padding:10,position:'absolute',zIndex:999,top:100}}>
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
              {facility.map((val)=>{
                return(
                  <TouchableOpacity style={[styles.shadow]} onPress={() => setActivefilter('All')}>
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
    </LinearGradient>
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
