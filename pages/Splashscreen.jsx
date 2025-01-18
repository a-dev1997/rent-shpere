import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../reduxStore/getpropertiesslice";
import { fetchCatData } from "../reduxStore/categorydataslice";
import { fetchUserData } from "../reduxStore/userdataslice";
import { fetchMessage } from "../reduxStore/messageslice";
import { fetchWishlist } from "../reduxStore/wishlistslice";
import { fetchProfile } from "../reduxStore/profiledataslice";
const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  const nav = useNavigation();
  const dispatch = useDispatch();

  // Selectors to track the status of each action
//   const { propstatus } = useSelector((state) => state.getproperties);
//   const { catStatus } = useSelector((state) => state.category);
//   const { messagestatus } = useSelector((state) => state.messages);
//   const { wishliststatus } = useSelector((state) => state.userWishlist);
//  const {profilestatus}=useSelector((state)=>state.userProfile)
console.log('splash')
  const totalRequests = 5;  // We only have 4 requests now
  const [loadedCount, setLoadedCount] = useState(0); // Count successful requests

  // Function to check AsyncStorage and navigate
  const checkUserStatus = async () => {
    // dispatch(fetchProperties(1));
      dispatch(fetchCatData());
    let check = await AsyncStorage.getItem("user");
    if (check) {
     
      setTimeout(() => {
        nav.navigate("Mytabs"); 
      }, 5000);
    } else {
      setTimeout(() => {
        nav.navigate("Mytabs"); 
      }, 5000);
    }
  };

useFocusEffect(  useCallback(() => {
    checkUserStatus();
  }, [])
)

//   // Track the progress of successful requests
//   useFocusEffect(
//   useCallback(() => {
//     let successCount = 0;

//     // Check if each request is succeeded and increment the success count
//     if (propstatus === "succeeded") successCount++;
//     if (catStatus === "succeeded") successCount++;
//     if (messagestatus === "succeeded") successCount++;
//     if (wishliststatus === "succeeded") successCount++;
//     if(profilestatus ==='succeeded')  successCount++;
//     // Calculate progress based on successful requests
//     setLoadedCount(successCount);
//     setProgress((successCount / totalRequests) * 100);

//     // If all requests succeed, navigate to the next screen
//     if (successCount == totalRequests) {
//        // Or the screen you want to navigate to
//       setTimeout(() => {
//         nav.navigate("Mytabs"); 
//       }, 2000);
//     }
//   }, [propstatus, catStatus, messagestatus, wishliststatus,profilestatus])
// )
// useEffect(() => {
//   let successCount = 0;

//   // Check if each request is succeeded and increment the success count
//   if (propstatus === "succeeded") successCount++;
//   if (catStatus === "succeeded") successCount++;
//   if (messagestatus === "succeeded") successCount++;
//   if (wishliststatus === "succeeded") successCount++;
//   if(profilestatus ==='succeeded')  successCount++;
//   // Calculate progress based on successful requests
//   setLoadedCount(successCount);
//   setProgress((successCount / totalRequests) * 100);
// console.log('render from splash')
//   // If all requests succeed, navigate to the next screen

// }, [propstatus, catStatus, messagestatus, wishliststatus,profilestatus])

// useEffect(()=>{
  
 
 
// },[loadedCount])
  return (
    <View style={{ flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>
      <Image source={require("../assets/appimages/applogwhite.png")} />
      {/* <Text style={{ color: "white", fontWeight: "600", fontSize: 25, marginTop: 40, textAlign: "center" }}>
        {Math.round(progress)}%
      </Text> */}
      <ActivityIndicator size="large"  />
    </View>
  );
};

export default SplashScreen;
