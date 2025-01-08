import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View,TouchableOpacity } from "react-native"

import LinearGradient from "react-native-linear-gradient";



const AddProperty=()=>{
const nav=useNavigation()
    return(
        <View style={{flex:1,backgroundColor:'white',padding:20}}>
           <View>
            <Text style={{fontWeight:500,fontSize:20}}>
                What Would you like to offer?
            </Text>
            <Text style={{color:'#737B7D'}}>
            List in the market where people are waiting!
            </Text>
           </View>
           <View>
           <TouchableOpacity style={{}} onPress={() =>{nav.navigate('Propertyform')} }>
              <LinearGradient colors={['#315EE7', '#6246EA']} style={{ borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ color: 'white', fontWeight: 700, fontSize: 14, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10 }}>
                  List property for rent
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={{}} onPress={() => setActivefilter('All')}>
              <LinearGradient colors={['#315EE7', '#6246EA']} style={{ borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ color: 'white', fontWeight: 700, fontSize: 14, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10 }}>
                  List property for sell
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={{}} onPress={() => setActivefilter('All')}>
              <LinearGradient colors={['#315EE7', '#6246EA']} style={{ borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ color: 'white', fontWeight: 700, fontSize: 14, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10 }}>
                  Start tiffin servce
                </Text>
              </LinearGradient>
            </TouchableOpacity>
           </View>
        </View>
    )
}

export default AddProperty;