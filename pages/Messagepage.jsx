import { ScrollView, TextInput,View } from "react-native"
import Input from "../component/input";


const Message=()=>{

    return(
        <ScrollView style={{backgroundColor:"white"}}>
            <View>
                <Input placeholder={'Search Messages'} />
            </View>
        </ScrollView>
    )
}

export default Message;