import { View,Text,Image } from "react-native"
import 'react-native-reanimated';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GetStarted from "./pages/Getstartedpage";
import SplashScreen from "./pages/Splashscreen";
import Signin from "./pages/Signinpage";
import Signup from "./pages/Signuppage";
import Home from "./pages/Homepage";
import Message from "./pages/Messagepage";
import store from "./reduxStore/store";
import { Provider } from "react-redux";
import Profile from "./pages/Profilepage";
import PropertyVeiw from "./pages/Propertyview";
import Wishlist from "./pages/Wishlistpage";
import SeeAll from "./pages/Seeallpage";
 

function  RootStack(){
  const Stack=createNativeStackNavigator();
  return(
  <Stack.Navigator initialRouteName="Getstarted" screenOptions={{headerShown:false}}>
    <Stack.Screen name="Splashscreen" component={SplashScreen}/>
    <Stack.Screen name="Getstarted" component={GetStarted} />
    <Stack.Screen name="Signin" component={Signin} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="Mytabs" component={MyTabs} />
    <Stack.Screen name="Propertyview" component={PropertyVeiw} />
    <Stack.Screen name="Seeall" component={SeeAll} />
  </Stack.Navigator>
  )
}



function MyTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false,
      tabBarShowLabel:false,
      tabBarStyle:{
       
        height:60,
      paddingTop:10
        
    }
      
    }} initialRouteName="Home">
      <Tab.Screen options={{
         tabBarIcon:({focused})=>{
          return(
              
              <View style={{justifyContent:'center',width:'100%'}}>
                  <Image resizeMode="contain"  source={
                    focused
                      ? require('./assets/appimages/home-icon-active.png') // Active image
                      : require('./assets/appimages/home-icon.png') // Inactive image
                  }/>
                  {/* <Text style={{color:'white',fontSize:8,textAlign:'center'}}>Home</Text> */}
              </View>
          )
      }
      }} name="Home" component={Home} />
      <Tab.Screen options={{
         tabBarIcon:({focused})=>{
          return(
              
              <View style={{justifyContent:'center',width:'100%'}}>
                  <Image resizeMode="contain"  source={
                    focused
                      ? require('./assets/appimages/chat-icon-active.png') // Active image
                      : require('./assets/appimages/chat-icon.png') // Inactive image
                  }/>
                  {/* <Text style={{color:'white',fontSize:8,textAlign:'center'}}>Home</Text> */}
              </View>
          )
      }
      }} name="Message" component={Message} />

<Tab.Screen options={{
         tabBarIcon:({focused})=>{
          return(
              
              <View style={{justifyContent:'center',width:'100%'}}>
                  <Image resizeMode="contain"  source={
                    focused
                      ? require('./assets/appimages/chat-icon-active.png') // Active image
                      : require('./assets/appimages/save-icon.png') // Inactive image
                  }/>
                  {/* <Text style={{color:'white',fontSize:8,textAlign:'center'}}>Home</Text> */}
              </View>
          )
      }
      }} name="Wishlist" component={Wishlist} />
       <Tab.Screen options={{
         tabBarIcon:({focused})=>{
          return(
              
              <View style={{justifyContent:'center',width:'100%'}}>
                  <Image resizeMode="contain"  source={
                    focused
                      ? require('./assets/appimages/profile-icon-active.png') // Active image
                      : require('./assets/appimages/profile-icon.png') // Inactive image
                  }/>
                  {/* <Text style={{color:'white',fontSize:8,textAlign:'center'}}>Home</Text> */}
              </View>
          )
      }
      }} name="Profile" component={Profile} />
      
    </Tab.Navigator>
  );
}

const App=()=>{

  return(
    <Provider store={store}>
    <NavigationContainer >
      <RootStack/>
    </NavigationContainer>
    </Provider>
  )

}

export default App;