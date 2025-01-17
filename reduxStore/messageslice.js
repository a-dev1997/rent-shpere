import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
 export const fetchMessage=createAsyncThunk('messages',async()=>{
    try {
        // Get the token from AsyncStorage
        const response = await AsyncStorage.getItem('user');
        if (response) {
            const user = JSON.parse(response); // Parse the user object from AsyncStorage
               
            // Fetch profile data using the token from AsyncStorage
            const msg = await axios.get('https://rentsphere.onavinfosolutions.com/api/message', {
                headers: {
                    'Authorization': `Bearer ${user.token}`, // Use the token from AsyncStorage
                },
            });
  
            // Log profile data (can be removed in production)
           
            let count=0
            // Return the profile data in the expected shape
            msg.data.data.forEach((val) => {
                if(!val.seen && val.user_data!=null){
                    count++
                }
            });
        // console.log('seen count'+count+msg.data);
            return { data: msg.data,seencount:count };
        } else {
            throw new Error("User not found in AsyncStorage");
        }
    } catch (error) {
        console.error("Error fetching message data:", error);
        throw error;
    }
 })

 const myMessages = createSlice({
   name: 'messages',
   initialState: {
     messagedata: null, // Initialize with an empty array for paginated results
     messagestatus: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
     messageerror: null,
     counting:0,
     // currentPage: 1, // Track the current page
     // hasMore: true, // Flag to determine if more data is available
     // lastPage:1
   },
 
   extraReducers: (builder) => {
     builder
       .addCase(fetchMessage.pending, (state) => {
         state.messagestatus = 'loading';
       })
       .addCase(fetchMessage.fulfilled, (state, action) => {
         state.messagestatus = 'succeeded';
         // Append the new data to the existing data
         state.messagedata =action.payload.data;
        state.counting=action.payload.seencount;
         
       })
       .addCase(fetchMessage.rejected, (state, action) => {
         state.messagestatus = 'failed';
         state.messageerror = action.error.message;
       });
   },
 });
 
 export default myMessages.reducer;