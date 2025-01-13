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
import AddProperty from "./pages/Addproperty";
import PropertyForm from "./pages/Proppertyform";
import ShowModel from "./component/showmodal";
import Myproperty from "./pages/Myproperty";
import EditProperty from "./pages/Editproperty";
import TenentList from "./pages/Tenentlist";

 

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
    <Stack.Screen name="Propertyform" component={PropertyForm} />
    <Stack.Screen  name="showmodal" component={ShowModel} />
    <Stack.Screen name="Myproperty" component={Myproperty} />
    <Stack.Screen name="Editproperty" component={EditProperty}/>
    <Stack.Screen name="Tenentlist" component={TenentList}/>
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
                  <Image  style={{height:50,width:50}} resizeMode="contain"  source={
                    focused
                      ? require('./assets/appimages/chat-icon-active.png') // Active image
                      : require('./assets/appimages/addproperty.png') // Inactive image
                  }/>
                  {/* <Text style={{color:'white',fontSize:8,textAlign:'center'}}>Home</Text> */}
              </View>
          )
      }
      }} name="Addproperty" component={AddProperty} />

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