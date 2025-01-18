import { ScrollView, TouchableOpacity, Image, Text, View, StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux";
import { BASE_ASSET, BASE_URL } from "../config";
import { useNavigation } from "@react-navigation/native";
import { fetchWishlist } from "../reduxStore/wishlistslice";
import { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";


const Wishlist = () => {
  const nav = useNavigation()
  const dispatch = useDispatch()
  const { data, status } = useSelector((state) => state.userInfo)
  const [count, setCount] = useState(1)
  const { wishlistdata, wishlsitstatus } = useSelector((state) => state.userWishlist)
  console.log('dfjdkfjd' + JSON.stringify(wishlistdata))
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
      setCount(count + 1);
      dispatch(fetchWishlist())

    } catch (err) {
      // Handle error
      console.log('Error occurred:', err.message || err);
    }
  };
  useEffect(() => {
    console.log('render')
  }, [count])
  if(data){
  return (
    <View style={{ flex: 1 }} >
      <LinearGradient
      colors={['#917AFD','#6246EA']}
      >
<Text style={{fontWeight:500,fontSize:20,color:'white',textAlign:'center',paddingVertical:10}}>Wishlist</Text>
      </LinearGradient>
        
      <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 20 }}>

        {wishlistdata.data[0].message ? <Text>{wishlistdata.data[0].message}</Text> : wishlistdata?.data?.map((item, index) => {
          if (item.get_property != null) {
            return (

              <TouchableOpacity
                key={index}
                onPress={() => {
                  // Navigate to the property view
                  nav.navigate('Propertyview', { id: item.get_property.id });
                }}
                style={[styles.cardContainer, styles.shadow]}
              >

                <Image
                  style={styles.cardImage}
                  source={{ uri: `${BASE_ASSET}uploads/propertyImages/${item.get_property.featured_image}` }}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>{item.get_property.property_name}</Text>
                  <Text style={{ color: '#7D7F88' }}>
                    {item.get_property.city + ' ' + item.get_property.state}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={require('../assets/appimages/room.png')} />
                      <Text style={{ color: '#7D7F88' }}>{item.get_property.bedrooms} room</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={require('../assets/appimages/home-hashtag.png')} />
                      <Text style={{ color: '#7D7F88' }}>{item.get_property.carpet_area}m2</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 200 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 700, fontSize: 12, color: '#000000' }}>
                        {item.get_property.price}
                      </Text>
                      <Text style={{ fontWeight: 400, fontSize: 10, color: '#7D7F88' }}>
                        /{item.get_property.payment_type}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => removeProperty(item.get_property.id)}>
                      <Image source={require('../assets/appimages/remove.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                  </View>
                  {/* <View>
                        <Text style={{ fontWeight: 400, fontSize: 10, color: '#7D7F88' }}>Posted on:{dataFormat(new Date())==dataFormat(item.created_at)?'Today':dataFormat(item.created_at)}</Text>
                      </View> */}
                </View>
              </TouchableOpacity>
            )
          }
        })
        }
      </ScrollView>
    </View>
  )
}else{
  nav.navigate('Signin')
}
}

export default Wishlist;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    marginHorizontal: 10,
    flexDirection: 'row',


  },
  cardImage: {
    width: '30%',
    height: 160,
  },
  cardContent: {
    padding: 10,
    justifyContent: 'space-between'
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