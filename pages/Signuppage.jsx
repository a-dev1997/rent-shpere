import { Image, ScrollView, Text, TextInput, TouchableOpacity, View,StyleSheet } from "react-native";
import Input from "../component/input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


const Signup=()=>{
  const nav=useNavigation();
  const [verifyEmail,setVerifyEmail]=useState(null)
  const [signup,setSignup]=useState('none')
    return(
<ScrollView style={{flex:1,backgroundColor:'white'}} contentContainerStyle={{flexGrow:1,justifyContent:'space-between',alignItems:'center'}}>
        <View style={{justifyContent:'center',alignItems:'center',display:verifyEmail}}>
            <Image source={require('../assets/appimages/otpimg.png')} />
        </View>
        <View style={{width:'80%',display:verifyEmail}}>
            <Text style={{fontWeight:700,fontSize:57,color:'#22215B',fontFamily:'Hind'}}>
                Sign up
            </Text>
            <Input placeholder={'ENTER EMAIL'} label={'VERIFY THROUGH EMAIL'}/>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <TextInput style={styles.getcode} secureTextEntry={true} placeholder="CODE"/>
                <TouchableOpacity style={styles.getcodebtn}>
                    <Text style={{color:'white',fontWeight:600,fontSize:18}}>Get Code</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',height:38,backgroundColor:'#315EE7',borderRadius:7,marginVertical:20}}>
                <Text style={{fontSize:18,fontWeight:600,color:'white'}}>Verify</Text>
            </TouchableOpacity>

        </View>
        <View style={{width:'80%',display:verifyEmail}}>
            <TouchableOpacity onPress={()=>{setVerifyEmail('none');setSignup(null)}} style={{justifyContent:'center',alignItems:'center',height:38,backgroundColor:'#315EE7',borderRadius:7,marginVertical:20}}>
                <Text style={{fontSize:18,fontWeight:600,color:'white'}}>NEXT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{nav.navigate('Signin')}} style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{textAlign:'center',fontWeight:300,fontSize:16}}>
                    Back to Login
                </Text>
            </TouchableOpacity>
        </View>
        <View style={{width:'80%',display:signup}}>
             <Text style={{fontWeight:700,fontSize:26,color:'#22215B' ,textAlign:'center'}}>Congratulations</Text>
             <Text style={{fontWeight:400,fontWeight:20,color:'#22215B',textAlign:'center'}}>on verifying the email belongs to you</Text>
        </View>
        <View style={{width:'80%',display:signup}}>
             <Text style={{fontWeight:700,fontSize:26,color:'#22215B',textAlign:'center'}}>Sign up</Text>
             <Text style={{fontWeight:400,fontWeight:20,color:'#22215B',textAlign:'center',marginBottom:20}}>we need something more</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TextInput style={styles.inp} placeholder="FIRSTNAME"/><TextInput style={styles.inp} placeholder="LASTNAME"/>
            </View>
             <Input placeholder={'ENTER EMAIL'}/>
             <Input placeholder={'ENTER PASSWORD'}/>
             <Input placeholder={'CONFIRM PASSWORD'}/>
             <TouchableOpacity style={{justifyContent:'center',alignItems:'center',height:38,backgroundColor:'#315EE7',borderRadius:7,marginVertical:20}}>
                <Text style={{fontSize:18,fontWeight:600,color:'white'}}>Submit</Text>
             </TouchableOpacity>
        </View>
        <View style={{width:'80%',display:signup}}>
        <TouchableOpacity onPress={()=>{nav.navigate('Signin')}} style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{textAlign:'center',fontWeight:300,fontSize:16}}>
                    Back to Login
                </Text>
            </TouchableOpacity>
        </View>
</ScrollView>
    )

}

export default Signup;

const styles=StyleSheet.create({
 getcode:{height: 50,
    width:'45%',
    borderRadius: 10, // Rounded corners
    paddingLeft: 15, // Padding inside the text input
    fontSize: 16, // Font size
    backgroundColor: "#F2F3F3", // Background color
    paddingRight: 40,
 },
 getcodebtn:{
    backgroundColor:'#315EE7',
    borderRadius:7,
    height:50,
    width:'45%',
    justifyContent:'center',
    alignItems:'center'
 },
 inp:{
    width: "45%",
    height: 50,
    borderRadius: 10, // Rounded corners
    paddingLeft: 15, // Padding inside the text input
    fontSize: 16, // Font size
    backgroundColor: "#F2F3F3", // Background color
    paddingRight: 40, //
 }
})